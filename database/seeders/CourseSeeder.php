<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        User::factory(6)
            ->trainer()
            ->create()
            ->each(function (User $trainer) use ($categories): void {
                $trainer->syncRoles([RoleEnum::Trainer->value]);

                Course::factory()
                    ->published()
                    ->create([
                        'trainer_id'  => $trainer->id,
                        'category_id' => $categories->random()->id,
                    ]);
            });
    }
}
