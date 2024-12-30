<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * アカウントTOPページ
     */
    public function mypage(): Response
    {
        // 
        return Inertia::render('Profile/Mypage');
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * プロフィール画像更新
     */
    public function update_image(Request $request)
    {
        // 
        $user = Auth::user();

        // DB上に登録済みのデータがあればS3含め先に削除
        if ($user->image_url !== NULL) {
            $path = explode('/', $user->image_url);
            $imageName = $path[5];
            Storage::disk('s3')->delete('cycle-shop-images/account/'.$imageName);
        }

        // フォームから画像データを受信した場合はS3とDBに登録、しなかった場合はDBにNULLを適用
        if ($request->file('userImage') !== NULL) {
            $path = Storage::disk('s3')->putFile('cycle-shop-images/account', $request->file('userImage'));
            $user->image_url = Storage::disk('s3')->url($path);
            $user->update();
        } else {
            $user->image_url = NULL;
            $user->update();
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ], [
            'password.required' => '入力必須です',
            'password.current_password' => 'パスワードが違います'
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
