<?php

namespace App\Admin\Controllers;

use App\Models\User;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Illuminate\Support\Facades\Hash;

class UserController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'User';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new User());

        $grid->column('id', __('Id'))->sortable();
        $grid->column('name', '名前');
        $grid->column('email', __('Email'));
        $grid->column('area', '都道府県');
        $grid->column('address', '住所');
        $grid->column('enabled', '状態')->editable('select', [0 => '無効', 1 => '有効']);
        $grid->column('created_at', '登録日時')->display(function ($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        })->sortable();
        $grid->column('updated_at', '更新日時')->display(function ($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        })->sortable();

        $grid->actions(function ($action) {
            $action->disableDelete();
        });

        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->like('name', '名前');
            $filter->like('email', 'Email');
            $filter->in('area', '都道府県')->multipleSelect(User::all()->pluck('area', 'area'));
            $filter->like('address', '住所');
            $filter->equal('enabled', '状態')->select(['0' => '無効', '1' => '有効']);
            $filter->between('created_at', '登録日時')->datetime();
        });

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(User::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('name', '名前');
        $show->field('email', __('Email'));
        $show->field('email_verified_at', __('Email verified at'));
        $show->field('password', __('Password'));
        $show->field('area', '都道府県');
        $show->field('address', '住所');
        $show->field('remember_token', __('Remember token'));
        $show->field('enabled', '状態')->using([0 => '無効', 1 => '有効']);
        $show->field('created_at', '登録日時')->display(function ($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        });
        $show->field('updated_at', '更新日時')->display(function ($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        });

        $show->panel()->tools(function ($tool) {
            $tool->disableDelete();
        });

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $areas = ['北海道' => '北海道','青森県' => '青森県','岩手県' => '岩手県',
            '宮城県' => '宮城県','秋田県' => '秋田県','山形県' => '山形県','福島県' => '福島県',
            '茨城県' => '茨城県','栃木県' => '栃木県','群馬県' => '群馬県','埼玉県' => '埼玉県',
            '千葉県' => '千葉県','東京都' => '東京都','神奈川県' => '神奈川県', '新潟県' => '新潟県',
            '富山県' => '富山県','石川県' => '石川県','福井県' => '福井県','山梨県' => '山梨県',
            '長野県' => '長野県','岐阜県' => '岐阜県', '静岡県' => '静岡県','愛知県' => '愛知県',
            '三重県' => '三重県','滋賀県' => '滋賀県','京都府' => '京都府','大阪府' => '大阪府',
            '兵庫県' => '兵庫県', '奈良県' => '奈良県','和歌山県' => '和歌山県','鳥取県' => '鳥取県',
            '島根県' => '島根県','岡山県' => '岡山県','広島県' => '広島県','山口県' => '山口県',
            '徳島県' => '徳島県','香川県' => '香川県','愛媛県' => '愛媛県','高知県' => '高知県',
            '福岡県' => '福岡県','佐賀県' => '佐賀県','長崎県' => '長崎県', '熊本県' => '熊本県',
            '大分県' => '大分県','宮崎県' => '宮崎県','鹿児島県' => '鹿児島県','沖縄県' => '沖縄県'
        ];

        $form = new Form(new User());

        $form->text('name', '名前')->rules('required|max:10', [
            'required' => '入力必須',
            'max' => ':max文字まで',
        ]);
        $form->email('email', __('Email'))->rules('required|max:255|email', [
            'required' => '入力必須',
            'max' => '文字数オーバー',
            'email' => '入力形式が正しくない',
        ]);
        $form->datetime('email_verified_at', __('Email verified at'))->default(date('Y-m-d H:i:s'));
        $form->password('password', __('Password'))->rules('max:255', [
            'max' => '文字数オーバー',
        ]);
        $form->select('area', '都道府県')->options($areas);
        $form->text('address', '住所')->rules('max:255', [
            'max' => '文字数オーバー',
        ]);
        $form->radio('enabled', '状態')->options([0 => '無効', 1 => '有効']);

        $form->saving(function (Form $form) {
            if ($form->password && $form->model()->password != $form->password) {
                $form->password = Hash::make($form->password);
            } else {
                $form->password = $form->model()->password;
            }
        });

        $form->tools(function (Form\Tools $tool) {
            $tool->disableDelete();
        });

        return $form;
    }
}
