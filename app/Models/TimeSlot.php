<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TimeSlot
 *
 * @property int $id
 * @property string $type
 * @property string $start_time
 * @property string $end_time
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot query()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot active()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot pickup()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeSlot delivery()
 * @method static \Database\Factories\TimeSlotFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TimeSlot extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'start_time',
        'end_time',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active time slots.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include pickup time slots.
     */
    public function scopePickup($query)
    {
        return $query->where('type', 'pickup');
    }

    /**
     * Scope a query to only include delivery time slots.
     */
    public function scopeDelivery($query)
    {
        return $query->where('type', 'delivery');
    }

    /**
     * Get formatted time range.
     */
    public function getFormattedTimeAttribute(): string
    {
        return $this->start_time . ' - ' . $this->end_time;
    }
}