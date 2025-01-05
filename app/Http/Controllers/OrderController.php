<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

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

            $postage = FALSE;
            $total_price = 0;
            foreach($carts as $cart) {
                $total_price += $cart->product->price * $cart->qty;
                if($cart->product->postage) {
                    $postage = TRUE;
                }
            }

            $order = [];
            $order['user_id'] = Auth::id();
            $order['des_name'] = $user->name;
            $order['des_postal_code'] = substr($user->postal_code, 0, 3).'-'.substr($user->postal_code, 3, 4);
            $order['des_address'] = $user->area.' '.$user->address;
            $order['des_phone_number'] = $user->phone_number;
            $order['postage'] = $postage ? 500 : 0;
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
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
