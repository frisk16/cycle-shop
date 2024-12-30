<?php

namespace App\Http\Controllers;

use App\Models\MajorCategory;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopController extends Controller
{
    //
    public function index()
    {
        // 
        $major_categories = MajorCategory::all();
        $categories = Category::all();

        return Inertia::render('Top', [
            'majorCategories' => $major_categories,
            'categories' => $categories,
        ]);
    }
}
