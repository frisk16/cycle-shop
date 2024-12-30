<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    private function validator($request)
    {
        // 
        return Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:30'],
            'comment' => ['required', 'string', 'max:255'],
        ], [
            'title.required' => '入力必須',
            'title.string' => '使用できない文字があります',
            'title.max' => ':max文字以内',
            'comment.required' => '入力必須',
            'comment.string' => '使用できない文字があります',
            'comment.max' => ':max文字以内',
        ]);
    }

    /**
     * 各商品毎のレビュー取得
     */
    public function get(int $productId)
    {
        // 
        $reviews = Product::find($productId)
            ->reviews()
            ->orderBy('created_at', 'DESC')
            ->get();
        
        $response = [
            'reviews' => $reviews,
        ];

        return response()->json($response);
    }

    /**
     * 各商品毎のレビューページ
     */
    public function show(int $productId)
    {
        // 
        $product = Product::find($productId);
        $reviews = $product
            ->reviews()
            ->orderBy('created_at', 'DESC')
            ->paginate(5);

        if ($reviews->count() > 4) {
            return Inertia::render('Review/Show', [
                'reviews' => $reviews,
                'product' => $product,
            ]);
        } else {
            return back();
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(int $productId, Request $request)
    {
        //
        $data = $this->validator($request);

        $myReviewsCnt = Review::where('product_id', $productId)->where('user_id', Auth::id())->count();
        if ($myReviewsCnt > 2) {
            return response()->json([
                'status' => 502,
            ]);
        }

        if ($data->fails()) {
            $response = [
                'status' => 400,
                'errors' => $data->errors(),
            ];
        } else {
            $review = Review::create([
                'user_id' => Auth::id(),
                'product_id' => $productId,
                'name' => Auth::user()->name,
                'title' => $request->title,
                'score' => $request->score,
                'comment' => $request->comment,
            ]);
    
            $response = [
                'status' => 201,
                'review' => $review,
            ];
        }

        return response()->json($response);
    }

    /**
     * レビュースコア一覧取得
     */
    public function get_review_score(int $productId)
    {
        // 
        $reviews = Product::find($productId)->reviews;
        $max_review_cnt = $reviews->count();
        $review_scores = [];
        $scores_avg = [];
        if ($reviews->first()) {
            for ($n = 5; $n > 0; $n--) {
                $review_scores[] = $reviews->where('score', $n)->count();
            }
            foreach($review_scores as $review_score) {
                $scores_avg[] = floor($review_score / $max_review_cnt * 100);
            }
        } else {
            $scores_avg = [0, 0, 0, 0, 0];
        }

        $response = [
            'scores' => $scores_avg,
        ];

        return response()->json($response);
    }

    /**
     * レビュースコア平均値取得
     */
    public function get_avg_score(int $productId)
    {
        // 
        $product = Product::find($productId);
        if ($product->reviews()->first()) {
            $total_reviews = $product->reviews()->count();
            $total_score = $product->reviews()->sum('score');
            $avg_score = number_format($total_score / $total_reviews, 1);
        } else {
            $avg_score = 0;
        }

        $response = [
            'avgScore' => $avg_score,
        ];

        return response()->json($response);
    }

    /**
     * ユーザー画像取得
     */
    public function get_user_image(int $reviewId)
    {
        // 
        $user = Review::find($reviewId)->user;

        $response = [
            'image' => $user->image_url,
        ];

        return response()->json($response);
    }
}
