<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:10', Rule::unique(User::class)->ignore($this->user()->id)],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'postal_code' => ['nullable', 'string', 'max:7'],
            'phone_number' => ['nullable', 'string', 'max:12'],
            'area' => ['nullable', 'string'],
            'address' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '入力必須です',
            'name.string' => '正しく入力してください',
            'name.max' => '最大:max文字まで',
            'name.unique' => 'そのユーザー名は既に使用されています',
            'email.required' => '入力必須です',
            'email.string' => '正しく入力してください',
            'email.lowercase' => '小文字で入力してください',
            'email.email' => '入力形式が正しくありません',
            'email.max' => '文字数オーバーです',
            'email.unique' => 'そのEメールアドレスは既に登録されています',
            'postal_code.string' => '正しく入力してください',
            'postal_code.max' => ':max桁まで',
            'phone_number.string' => '正しく入力してください',
            'phone_number.max' => ':max桁まで',
            'area.string' => '正しく入力してください',
            'address.string' => '正しく入力してください',
            'address.max' => '文字数オーバーです',
        ];
    }
}
