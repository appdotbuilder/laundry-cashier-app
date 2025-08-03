<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $service = Service::factory()->create();
        $estimatedQuantity = fake()->randomFloat(2, 0.5, 10);
        $actualQuantity = $estimatedQuantity + fake()->randomFloat(2, -0.5, 0.5);
        $pricePerUnit = $service->price_per_unit;
        $estimatedSubtotal = $estimatedQuantity * $pricePerUnit;
        $actualSubtotal = $actualQuantity * $pricePerUnit;

        return [
            'order_id' => Order::factory(),
            'service_id' => $service->id,
            'estimated_quantity' => $estimatedQuantity,
            'actual_quantity' => $actualQuantity,
            'price_per_unit' => $pricePerUnit,
            'estimated_subtotal' => $estimatedSubtotal,
            'actual_subtotal' => $actualSubtotal,
        ];
    }
}