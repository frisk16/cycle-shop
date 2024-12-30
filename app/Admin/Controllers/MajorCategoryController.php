<?php

namespace App\Admin\Controllers;

use App\Models\MajorCategory;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class MajorCategoryController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'MajorCategory';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new MajorCategory());

        $grid->column('id', __('Id'))->sortable();
        $grid->column('name', '名称');
        $grid->column('created_at', '登録日時')->display(function ($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        })->sortable();
        $grid->column('updated_at', '更新日時')->display(function ($time) {
            return date('Y/m/d H:i:s', strtotime($time));
        })->sortable();
        
        $grid->actions(function ($action) {
            $action->disableView();
        });
        
        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->like('name', '名称');
        });

        return $grid;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new MajorCategory());

        $form->text('name', '名称')->rules('required|max:10', [
            'required' => '入力必須',
            'max' => ':max文字まで',
        ]);

        return $form;
    }
}
