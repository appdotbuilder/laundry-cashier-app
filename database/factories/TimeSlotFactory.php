<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimeSlot>
 */
class TimeSlotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startHour = fake()->numberBetween(8, 16);
        $endHour = $startHour + 2;

        return [
            'type' => fake()->randomElement(['pickup', 'delivery']),
            'start_time' => sprintf('%02d:00', $startHour),
            'end_time' => sprintf('%02d:00', $endHour),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the time slot is for pickup.
     */
    public function pickup(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'pickup',
        ]);
    }

    /**
     * Indicate that the time slot is for delivery.
     */
    public function delivery(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'delivery',
        ]);
    }
}