<?php

use App\Http\Controllers\TopController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Top
Route::get('/', [TopController::class, 'index'])->name('top');

// Profile
Route::middleware(['auth', 'verified'])->controller(ProfileController::class)->group(function() {
    Route::get('/profile', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
    Route::get('/profile/mypage', 'mypage')->name('profile.mypage');

    Route::post('/profile/api/update_image', 'update_image')->name('profile.update_image');
});

// Category
Route::controller(CategoryController::class)->group(function() {
    Route::get('/categories/{categoryId}', 'show')->name('categories.show');
    
    Route::get('/categories/api/get', 'get')->name('categories.get');
    Route::get('/categories/api/{categoryId}/get', 'get_products')->name('categories.get_products');
});

// Product
Route::controller(ProductController::class)->group(function() {
    Route::get('/products/history', 'history')->name('products.history');
    Route::get('/products/{productId}', 'show')->name('products.show');

    Route::get('/products/api/get_recommend', 'get_recommend_products')->name('products.get_recommend');
    Route::get('/products/api/get_pop', 'get_pop_products')->name('products.get_pop');
    Route::get('/products/api/get_history', 'get_history_products')->name('products.get_history');
    Route::get('/products/api/{productId}/get', 'get')->name('products.get');
});

// Review
Route::controller(ReviewController::class)->group(function() {
    Route::get('/reviews/product/{productId}', 'show')->name('reviews.show');

    Route::get('/reviews/api/product/{productId}/get', 'get')->name('reviews.get');
    Route::get('/reviews/api/product/{productId}/get_review_score', 'get_review_score')->name('reviews.get_score');
    Route::get('/reviews/api/product/{productId}/get_avg_score', 'get_avg_score')->name('reviews.get_avg_score');
    Route::post('/reviews/api/product/{productId}/store', 'store')->name('reviews.store');
    Route::get('/reviews/api/{reviewId}/get_user_image', 'get_user_image')->name('reviews.get_user_image');
});

// Cart
Route::controller(CartController::class)->group(function() {
    Route::get('/carts', 'index')->name('carts.index');

    Route::get('/carts/api/get', 'get')->name('carts.get');
    Route::get('/carts/api/get_total_price', 'get_total_price')->name('carts.get_total_price');
    Route::get('/carts/api/get_carts_count', 'get_carts_count')->name('carts.get_carts_count');
    Route::post('/carts/api/add', 'add')->name('carts.add');
    Route::post('/carts/api/destroy', 'destroy')->name('carts.destroy');
    Route::put('/carts/api/update_qty', 'update_qty')->name('carts.update_qty');
});

require __DIR__.'/auth.php';
