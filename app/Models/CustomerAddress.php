<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CustomerAddress
 *
 * @property int $id
 * @property int $user_id
 * @property string $label
 * @property string $address
 * @property string $city
 * @property string $postal_code
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string|null $notes
 * @property bool $is_default
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereUserId($value)
 * @method static \Database\Factories\CustomerAddressFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CustomerAddress extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'label',
        'address',
        'city',
        'postal_code',
        'latitude',
        'longitude',
        'notes',
        'is_default',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'is_default' => 'boolean',
    ];

    /**
     * Get the user that owns the address.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the full formatted address.
     */
    public function getFullAddressAttribute(): string
    {
        return "{$this->address}, {$this->city} {$this->postal_code}";
    }
}