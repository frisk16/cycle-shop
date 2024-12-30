<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(int $productId)
    {
        //
        if(!isset($_COOKIE['product_history'])) {
            setcookie("product_history[0]", $productId, time() + 60 * 60 * 24 * 30 * 3);
        } else {
            $index = count($_COOKIE['product_history']);
            setcookie("product_history[$index]", $productId, time() + 60 * 60 * 24 * 30 * 3);
        }
        $product = Product::find($productId);
        $category = $product->category()->first();

        if ($product->enabled) {
            return Inertia::render('Product/Show', [
                'product' => $product,
                'category' => $category,
            ]);
        } else {
            return to_route('top');
        }
    }

    /**
     * 商品データ取得
     */
    public function get(int $productId)
    {
        // 
        $product = Product::find($productId);

        $response = [
            'product' => $product,
        ];

        return response()->json($response);
    }

    /**
     * おすすめ商品
     */
    public function get_recommend_products()
    {
        // 
        $products = Product::where('recommend', TRUE)
            ->where('enabled', TRUE)
            ->orderBy('updated_at', 'DESC')
            ->limit(4)
            ->get();

        $response = [
            'products' => $products,
        ];

        return response()->json($response);
    }

    /**
     * 人気商品
     */
    public function get_pop_products()
    {
        // 
        $products = Product::where('pop', TRUE)
            ->where('enabled', TRUE)
            ->orderBy('updated_at', 'DESC')
            ->limit(4)
            ->get();

        $response = [
            'products' => $products,
        ];

        return response()->json($response);
    }

    /**
     * 閲覧履歴ページ
     */
    public function history()
    {
        // 
        return Inertia::render('Product/History');
    }

    /**
     * 閲覧履歴取得
     */
    public function get_history_products()
    {
        // 
        $products = [];
        if (isset($_COOKIE['product_history'])) {
            $product_histories = $_COOKIE['product_history'];

            for($i = count($product_histories) - 1; $i >= 0; $i--) {
                $products[] = Product::find($product_histories[$i]);
            }
        }

        $response = [
            'products' => $products,
        ];

        return response()->json($response);
    }
}
