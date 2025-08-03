<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\OrderItem
 *
 * @property int $id
 * @property int $order_id
 * @property int $service_id
 * @property float $estimated_quantity
 * @property float|null $actual_quantity
 * @property float $price_per_unit
 * @property float $estimated_subtotal
 * @property float|null $actual_subtotal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Order $order
 * @property-read \App\Models\Service $service
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereActualQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereActualSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereEstimatedQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereEstimatedSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem wherePricePerUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereUpdatedAt($value)
 * @method static \Database\Factories\OrderItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'service_id',
        'estimated_quantity',
        'actual_quantity',
        'price_per_unit',
        'estimated_subtotal',
        'actual_subtotal',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'estimated_quantity' => 'decimal:2',
        'actual_quantity' => 'decimal:2',
        'price_per_unit' => 'decimal:2',
        'estimated_subtotal' => 'decimal:2',
        'actual_subtotal' => 'decimal:2',
    ];

    /**
     * Get the order that owns the item.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the service for this item.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}