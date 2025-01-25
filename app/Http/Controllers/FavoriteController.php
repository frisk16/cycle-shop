<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $favorites = Auth::user()->favorites()->paginate(10);

        return Inertia::render('Favorite/Index', [
            'favorites' => $favorites
        ]);
    }

    /**
     * 登録 / 解除
     */
    public function toggle(Request $request)
    {
        //
        $favorite = Favorite::where('user_id', Auth::id())
            ->where('product_id', $request->productId)
            ->first();

        $response = [];
        if($favorite) {
            $favorite->delete();
            $response = [
                'status' => 200
            ];
        } else {
            $new_favorite = new Favorite();
            $new_favorite->user_id = Auth::id();
            $new_favorite->product_id = $request->productId;
            $new_favorite->save();
            $response = [
                'status' => 201
            ];
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorite $favorite)
    {
        //
    }
}
