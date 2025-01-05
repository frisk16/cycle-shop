<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_code',
        'des_name',
        'des_postal_code',
        'des_address',
        'des_phone_number',
        'postage',
        'total_qty',
        'total_price',
    ];
    
    public function ordered_products()
    {
        return $this->hasMany(OrderedProduct::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
