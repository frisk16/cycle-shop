<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderedProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * 注文履歴ページ
     */
    public function index()
    {
        //
        $orders = Auth::user()->orders()->orderBy('created_at', 'DESC')->paginate(10);

        return Inertia::render('Order/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * 各注文毎の詳細ページ
     */
    public function show(int $orderId)
    {
        // 
        $order = Auth::user()->orders()->where('id', $orderId)->first();
        if(!$order) {
            return redirect()->to('/');
        }
        $products = OrderedProduct::where('order_id', $orderId)->get();

        return Inertia::render('Order/Show', [
            'order' => $order,
            'products' => $products,
        ]);
    }

    /**
     * 購入確認ページ
     */
    public function confirm()
    {
        // 
        $user = Auth::user();
        if($user) {

            // ユーザー情報が不足
            if(
                $user->postal_code === NULL ||
                $user->phone_number === NULL ||
                $user->area === NULL ||
                $user->address === NULL
            ) {
                return redirect()->to('/');
            }

            // カートが空
            $carts = $user->carts;
            if(!$carts->first()) {
                return redirect()->to('/');
            }

            $postage = 0;
            $total_price = 0;
            foreach($carts as $cart) {
                $total_price += $cart->product->price * $cart->qty;
                if($postage < $cart->product->postage) {
                    $postage = $cart->product->postage;
                }
            }

            $order = [];
            $order['user_id'] = Auth::id();
            $order['des_name'] = $user->name;
            $order['des_postal_code'] = substr($user->postal_code, 0, 3).'-'.substr($user->postal_code, 3, 4);
            $order['des_address'] = $user->area.' '.$user->address;
            $order['des_phone_number'] = $user->phone_number;
            $order['postage'] = $postage;
            $order['total_price'] = $total_price;
            $order['total_qty'] = $carts->count();

            $products = [];
            $product_qty = [];
            foreach($carts as $cart) {
                $products[] = $cart->product;
                $product_qty[$cart->product->id] = $cart->qty;
            }

            return Inertia::render('Order/Confirm', [
                'order' => $order,
                'products' => $products,
                'productQty' => $product_qty,
            ]);
        } else {
            return redirect()->to('/');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $new_order = Order::create([
          'user_id' => Auth::id(),
          'order_code' => substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyz'), 0, 15),
          'des_name' => $request->desName,
          'des_postal_code' => $request->desPostalCode,
          'des_address' => $request->desAddress,
          'des_phone_number' => $request->desPhoneNumber,
          'postage' => $request->postage,
          'total_qty' => $request->totalQty,
          'total_price' => $request->totalPrice
        ]);

        if(!empty($new_order)) {
            foreach($request->products as $product) {
                OrderedProduct::create([
                    'order_id' => $new_order->id,
                    'product_id' => $product['id'],
                    'qty' => $request->productQty[$product['id']],
                    'price' => $product['price'],
                    'postage' => $product['postage'],
                    'completed' => FALSE
                ]);
            }

            $carts = Auth::user()->carts;
            foreach($carts as $cart) {
                $cart->delete();
            }
        }

        $response = [
            'orderCode' => $new_order->order_code,
        ];

        return response()->json($response);
    }

    /**
     * 注文完了ページ
     */
    public function complete(Request $request)
    {
        // 
        $target_order = Auth::user()->orders()->where('order_code', $request->order_code)->first();
        if(!$target_order) {
            return redirect()->to('/');
        }

        return Inertia::render('Order/Complete');
    }
}
