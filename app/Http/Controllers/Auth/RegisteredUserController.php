<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:10|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'name.required' => '入力必須です',
            'name.string' => '正しく入力してください',
            'name.max' => ':max文字まで',
            'name.unique' => 'そのユーザー名は既に使われています',
            'email.required' => '入力必須です',
            'email.string' => '正しく入力してください',
            'email.lowercase' => '小文字で入力してください',
            'email.email' => '入力形式が正しくありません',
            'email.max' => '文字数オーバーです',
            'email.unique' => 'そのEメールアドレスは既に存在します',
            'password.required' => '入力必須です',
            'password.confirmed' => '確認用パスワードと一致しません',
            'password.min' => '最低:min文字以上',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('profile.edit');
    }
}
