<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderStatusHistory>
 */
class OrderStatusHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'status' => fake()->randomElement([
                'pending', 'confirmed', 'pickup_assigned', 'picked_up', 
                'in_process', 'ready', 'out_for_delivery', 'delivered'
            ]),
            'notes' => fake()->optional()->sentence(),
            'updated_by' => User::factory(),
        ];
    }
}