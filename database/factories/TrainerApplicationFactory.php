<?php

namespace Database\Factories;

use App\Models\TrainerApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrainerApplication>
 */
class TrainerApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'     => null,
            'name'        => fake()->name(),
            'email'       => fake()->unique()->safeEmail(),
            'status'      => \App\Enums\TrainerApplicationStatus::Pending,
            'motivation'  => fake()->paragraphs(2, true),
            'experience'  => fake()->paragraph(),
            'specialties' => fake()->randomElements(['Méditation', 'Yoga', 'Pleine conscience', 'Respiration', 'Relaxation']),
        ];
    }

    public function approved(): static
    {
        return $this->state(fn() => [
            'status'      => \App\Enums\TrainerApplicationStatus::Approved,
            'reviewed_by' => \App\Models\User::factory(),
            'reviewed_at' => now(),
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn() => [
            'status'           => \App\Enums\TrainerApplicationStatus::Rejected,
            'reviewed_by'      => \App\Models\User::factory(),
            'reviewed_at'      => now(),
            'rejection_reason' => fake()->sentence(),
        ]);
    }
}
