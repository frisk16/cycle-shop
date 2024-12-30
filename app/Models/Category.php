<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'major_category_id',
        'name',
    ];

    public function major_category()
    {
        return $this->belongsTo(MajorCategory::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
