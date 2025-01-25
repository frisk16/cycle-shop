<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'image_url',
        'price',
        'description',
        'postage',
        'recommend',
        'pop',
        'enabled',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function ordered_products()
    {
        return $this->hasMany(OrderedProduct::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
