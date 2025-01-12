<?php

namespace App\Admin\Controllers;

use App\Models\Product;
use App\Models\Category;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class ProductController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Product';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Product());

        $grid->column('id', __('Id'))->sortable();
        $grid->column('image_url', '画像')->image();
        $grid->column('category.name', 'カテゴリー');
        $grid->column('name', '名前');
        $grid->column('price', '価格');
        $grid->column('postage', '送料');
        $grid->column('recommend', 'おすすめ')->editable('select', [0 => '無し', 1 => 'おすすめ']);
        $grid->column('pop', '人気')->editable('select', [0 => '無し', 1 => '人気']);
        $grid->column('enabled', '公開')->editable('select', [0 => '無効', 1 => '公開']);
        $grid->column('created_at', '登録日時')->display(function($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        })->sortable();
        $grid->column('updated_at', '更新日時')->display(function($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        })->sortable();

        $grid->filter(function($filter) {
            $filter->disableIdFilter();
            $filter->in('category_id', 'カテゴリー')->multipleSelect(Category::all()->pluck('name', 'id'));
            $filter->like('name', '名前');
            $filter->between('price', '価格');
            $filter->between('postage', '送料');
            $filter->equal('recommend', 'おすすめ')->radio(['' => '全て', 0 => '無し', 1 => 'おすすめ']);
            $filter->equal('pop', '人気')->radio(['' => '全て', 0 => '無し', 1 => '人気']);
            $filter->equal('enabled', '公開')->radio(['' => '全て', 0 => '無効', 1 => '公開']);
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
        $show = new Show(Product::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('category.name', 'カテゴリー');
        $show->field('name', '名前');
        $show->field('image_url', '画像URL');
        $show->field('price', '価格');
        $show->field('description', '詳細');
        $show->field('postage', '送料');
        $show->field('recommend', 'おすすめ')->using([0 => '無し', 1 => 'おすすめ']);
        $show->field('pop', '人気')->using([0 => '無し', 1 => '人気']);
        $show->field('enabled', '公開')->using([0 => '無効', 1 => '公開']);
        $show->field('created_at', '登録日時');
        $show->field('updated_at', '更新日時');

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Product());

        $form->select('category_id', 'カテゴリー')->options(Category::all()->pluck('name', 'id'))->rules('required', [
            'required' => '選択必須',
        ]);
        $form->text('name', '名前')->rules('required|max:80', [
            'required' => '入力必須',
            'max' => ':max文字まで',
        ]);
        $form->image('image_url', '画像')->uniqueName();
        $form->number('price', '価格')->rules('required|numeric|min:100', [
            'required' => '入力必須',
            'min' => '￥:min円以上',
        ]);
        $form->textarea('description', '詳細')->rules('required|min:10|max:1000', [
            'required' => '入力必須',
            'min' => '最低:min文字以上',
            'max' => ':max文字まで',
        ]);
        $form->number('postage', '送料')->rules('numeric|min:0', [
            'min' => '￥:min円以上',
        ]);
        $form->switch('recommend', 'おすすめ');
        $form->switch('pop', '人気');
        $form->switch('enabled', '公開')->default(1);

        return $form;
    }
}
