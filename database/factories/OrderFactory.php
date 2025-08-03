<?php

namespace Database\Factories;

use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $estimatedTotal = fake()->numberBetween(30000, 200000);
        $deliveryFee = 5000;
        
        $customer = User::factory()->create(['role' => 'customer']);
        $pickupAddress = CustomerAddress::factory()->create(['user_id' => $customer->id]);
        $deliveryAddress = CustomerAddress::factory()->create(['user_id' => $customer->id]);
        
        return [
            'order_number' => Order::generateOrderNumber(),
            'customer_id' => $customer->id,
            'pickup_address_id' => $pickupAddress->id,
            'delivery_address_id' => $deliveryAddress->id,
            'status' => fake()->randomElement([
                'pending', 'confirmed', 'pickup_assigned', 'picked_up', 
                'in_process', 'ready', 'out_for_delivery', 'delivered'
            ]),
            'payment_status' => fake()->randomElement(['pending', 'paid', 'refunded']),
            'payment_method' => fake()->randomElement(['online', 'cash', 'cod']),
            'pickup_scheduled_at' => fake()->dateTimeBetween('now', '+2 days'),
            'delivery_scheduled_at' => fake()->dateTimeBetween('+2 days', '+5 days'),
            'estimated_total' => $estimatedTotal,
            'final_total' => $estimatedTotal,
            'delivery_fee' => $deliveryFee,
            'customer_notes' => fake()->optional()->sentence(),
            'staff_notes' => fake()->optional()->sentence(),
            'assigned_courier_id' => fake()->optional()->passthrough(
                User::factory()->create(['role' => 'courier'])->id
            ),
        ];
    }

    /**
     * Indicate that the order is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);
    }

    /**
     * Indicate that the order is delivered.
     */
    public function delivered(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'delivered',
            'payment_status' => 'paid',
            'delivery_completed_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ]);
    }
}