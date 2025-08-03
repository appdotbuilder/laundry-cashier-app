<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Wash & Fold',
                'Wash & Iron',
                'Dry Cleaning',
                'Express Service',
                'Bed Sheets',
                'Curtains',
                'Comforters',
                'Delicate Items'
            ]),
            'description' => fake()->sentence(),
            'unit_type' => fake()->randomElement(['kg', 'item']),
            'price_per_unit' => fake()->numberBetween(5000, 30000),
            'min_quantity' => fake()->numberBetween(1, 3),
            'processing_days' => fake()->numberBetween(1, 5),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the service is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}