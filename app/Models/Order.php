<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Order
 *
 * @property int $id
 * @property string $order_number
 * @property int $customer_id
 * @property int $pickup_address_id
 * @property int $delivery_address_id
 * @property string $status
 * @property string $payment_status
 * @property string|null $payment_method
 * @property \Illuminate\Support\Carbon|null $pickup_scheduled_at
 * @property \Illuminate\Support\Carbon|null $delivery_scheduled_at
 * @property \Illuminate\Support\Carbon|null $pickup_completed_at
 * @property \Illuminate\Support\Carbon|null $delivery_completed_at
 * @property float $estimated_total
 * @property float $final_total
 * @property float $delivery_fee
 * @property string|null $customer_notes
 * @property string|null $staff_notes
 * @property int|null $assigned_courier_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $customer
 * @property-read \App\Models\CustomerAddress $pickupAddress
 * @property-read \App\Models\CustomerAddress $deliveryAddress
 * @property-read \App\Models\User|null $assignedCourier
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderItem> $items
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderStatusHistory> $statusHistories
 * @property-read \App\Models\Review|null $review
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereAssignedCourierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCustomerNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeliveryAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeliveryCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeliveryFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeliveryScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereEstimatedTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereFinalTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePickupAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePickupCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePickupScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereStaffNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUpdatedAt($value)
 * @method static \Database\Factories\OrderFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_number',
        'customer_id',
        'pickup_address_id',
        'delivery_address_id',
        'status',
        'payment_status',
        'payment_method',
        'pickup_scheduled_at',
        'delivery_scheduled_at',
        'pickup_completed_at',
        'delivery_completed_at',
        'estimated_total',
        'final_total',
        'delivery_fee',
        'customer_notes',
        'staff_notes',
        'assigned_courier_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'pickup_scheduled_at' => 'datetime',
        'delivery_scheduled_at' => 'datetime',
        'pickup_completed_at' => 'datetime',
        'delivery_completed_at' => 'datetime',
        'estimated_total' => 'decimal:2',
        'final_total' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
    ];

    /**
     * Get the customer that owns the order.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get the pickup address.
     */
    public function pickupAddress(): BelongsTo
    {
        return $this->belongsTo(CustomerAddress::class, 'pickup_address_id');
    }

    /**
     * Get the delivery address.
     */
    public function deliveryAddress(): BelongsTo
    {
        return $this->belongsTo(CustomerAddress::class, 'delivery_address_id');
    }

    /**
     * Get the assigned courier.
     */
    public function assignedCourier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_courier_id');
    }

    /**
     * Get the order items.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the order status histories.
     */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

    /**
     * Get the order review.
     */
    public function review(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Review::class);
    }

    /**
     * Generate order number.
     */
    public static function generateOrderNumber(): string
    {
        return 'LND-' . date('Ymd') . '-' . str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get formatted status.
     */
    public function getFormattedStatusAttribute(): string
    {
        return ucwords(str_replace('_', ' ', $this->status));
    }

    /**
     * Get status color for UI.
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'yellow',
            'confirmed' => 'blue',
            'pickup_assigned' => 'indigo',
            'picked_up' => 'purple',
            'in_process' => 'orange',
            'ready' => 'green',
            'out_for_delivery' => 'cyan',
            'delivered' => 'emerald',
            'cancelled' => 'red',
            default => 'gray',
        };
    }
}