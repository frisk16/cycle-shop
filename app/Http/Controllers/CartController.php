<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();
        $disabled_status = "";
        if(!$user) {
            $disabled_status = "nonAuthUser";
        } else {
            if(
                $user->postal_code === NULL ||
                $user->phone_number === NULL ||
                $user->area === NULL ||
                $user->address === NULL
            ) {
                $disabled_status = "nonUserDetail";
            }
        }
        
        return Inertia::render('Cart/Index', [
            'disabledStatus' => $disabled_status,
        ]);
    }

    /**
     * カート情報取得
     */
    public function get()
    {
        // 
        $user = Auth::user();
        $carts = [];
        if($user) {
            if(!$user->carts()->first() && isset($_COOKIE['cart'])) {
                $cookie_carts = Cart::where('cookie_code', $_COOKIE['cart'])->get();
                foreach($cookie_carts as $cart) {
                    $cart->user_id = Auth::id();
                    $cart->cookie_code = NULL;
                    $cart->update();
                }
                unset($_COOKIE['cart']);
            }

            $carts = $user->carts;
        } else {
            if(isset($_COOKIE['cart'])) {
                $carts = Cart::where('cookie_code', $_COOKIE['cart'])->get();
            }
        }

        $response = [
            'carts' => $carts,
        ];

        return response()->json($response);
    }

    /**
     * カート追加
     */
    public function add(Request $request)
    {
        // 
        $user = Auth::user();
        if($user) {
            $has_cart = Cart::where('user_id', Auth::id())
                ->where('product_id', $request->productId)
                ->first();
            if($has_cart) {
                $has_cart->qty += $request->qty;
                $has_cart->update();
            } else {
                $cart = new Cart();
                $cart->user_id = Auth::id();
                $cart->product_id = $request->productId;
                $cart->qty = $request->qty;
                $cart->save();
            }
        } else {
            $code = NULL;
            if(isset($_COOKIE['cart'])) {
                $code = $_COOKIE['cart'];
            } else {
                $code = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyz'), 0, 20);
                setcookie('cart', $code, time() + 60 * 60 * 24 * 30 * 3);
            }

            $has_cart = Cart::where('cookie_code', $code)
                ->where('product_id', $request->productId)
                ->first();
            if($has_cart) {
                $has_cart->qty += $request->qty;
                $has_cart->update();
            } else {
                $cart = new Cart();
                $cart->product_id = $request->productId;
                $cart->cookie_code = $code;
                $cart->qty = $request->qty;
                $cart->save();
            }
        }

        $response = [
            'status' => 201,
        ];

        return response()->json($response);
    }

    /**
     * カート合計金額取得
     */
    public function get_total_price()
    {
        // 
        $user = Auth::user();
        $total = 0;
        $postage = 0;
        if($user) {
            foreach($user->carts as $cart) {
                $total += $cart->product->price * $cart->qty;
                if($cart->product->postage) {
                    $postage = 500;
                }
            }
        } else {
            if(isset($_COOKIE['cart'])) {
                $code = $_COOKIE['cart'];
                $carts = Cart::where('cookie_code', $code)->get();
                foreach($carts as $cart) {
                    $total += $cart->product->price * $cart->qty;
                    if($cart->product->postage) {
                        $postage = 500;
                    }
                }
            }
        }

        $response = [
            'total' => $total,
            'postage' => $postage,
        ];

        return response()->json($response);
    }

    /**
     * カート個数取得
     */
    public function get_carts_count()
    {
        // 
        $user = Auth::user();
        $count = 0;
        if($user) {
            $count = $user->carts->count();
        } else {
            if(isset($_COOKIE['cart'])) {
                $count = Cart::where('cookie_code', $_COOKIE['cart'])->count();
            }
        }

        $response = [
            'count' => $count,
        ];

        return response()->json($response);
    }

    /**
     * 数量更新
     */
    public function update_qty(Request $request)
    {
        // 
        $target_cart = Cart::where('product_id', $request->productId);
        $user = Auth::user();
        if($user) {
            $cart = $target_cart->where('user_id', Auth::id())->first();
            $request->plus ? $cart->qty++ : $cart->qty--;
            if($cart->qty !== 0) {
                $cart->update();
            } else {
                $cart->delete();
            }
        } else {
            if(isset($_COOKIE['cart'])) {
                $cart = $target_cart->where('cookie_code', $_COOKIE['cart'])->first();
                $request->plus ? $cart->qty++ : $cart->qty--;
                if($cart->qty !== 0) {
                    $cart->update();
                } else {
                    $cart->delete();
                }
            }
        }

        $response = [
            'status' => 200,
        ];

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
        $user = Auth::user();
        if($user) {
            $cart = Cart::where('user_id', Auth::id())
                ->where('product_id', $request->productId)
                ->first();
            $cart->delete();
        } else {
            if(isset($_COOKIE['cart'])) {
                $cart = Cart::where('cookie_code', $_COOKIE['cart'])
                    ->where('product_id', $request->productId)
                    ->first();
                $cart->delete();
            }
        }

        $response = [
            'status' => 204,
        ];

        return response()->json($response);
    }
}
