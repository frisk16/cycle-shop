<?php

namespace App\Http\Controllers;

use App\Models\MajorCategory;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(int $categoryId)
    {
        //
        $category = Category::find($categoryId);
        $major_categories = MajorCategory::all();
        $categories = Category::all();
        
        return Inertia::render('Category/Show', [
            'category' => $category,
            'majorCategories' => $major_categories,
            'categories' => $categories,
        ]);
    }

    /**
     * カテゴリー取得「API」
     */
    public function get()
    {
        // 
        $major_categories = MajorCategory::all();
        $categories = Category::all();

        $response = [
            'majorCategories' => $major_categories,
            'categories' => $categories,
        ];

        return response()->json($response);
    }

    /**
     * カテゴリー毎に商品データ取得
     */
    public function get_products(int $categoryId)
    {
        $products = Category::find($categoryId)
            ->products()
            ->where('enabled', TRUE)
            ->orderBy('created_at', 'DESC')
            ->paginate(12);

        $response = [
            'products' => $products,
        ];

        return response()->json($response);
    }
}
