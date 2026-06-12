<?php

namespace App\Actions\Trainer\Courses;

use App\Models\Course;
use App\Models\User;
use App\Repositories\Trainer\Courses\CourseRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class CreateCourseAction
{
    public function __construct(
        private readonly CourseRepository $repository,
        private readonly UploadCourseImageAction $uploadImage,
    ) {}

    public function handle(User $trainer, array $data): Course
    {
        return DB::transaction(function () use ($trainer, $data) {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $this->uploadImage->handle($data['image']);
            }

            $data['trainer_id'] = $trainer->id;

            $modules = $data['modules'] ?? [];
            unset($data['modules']);

            Stripe::setApiKey(config('cashier.secret'));

            $product = Product::create([
                'name' => $data['title'],
                'metadata' => ['type' => 'course', 'trainer_id' => $trainer->id],
            ]);

            $price = Price::create([
                'product' => $product->id,
                'unit_amount' => (int) round((float) $data['price'] * 100),
                'currency' => 'eur',
            ]);

            $data['stripe_product_id'] = $product->id;
            $data['stripe_price_id'] = $price->id;

            $course = $this->repository->create($data);

            foreach ($modules as $moduleData) {
                $lessons = $moduleData['lessons'] ?? [];
                unset($moduleData['lessons']);

                $module = $course->modules()->create($moduleData);

                foreach ($lessons as $lessonData) {
                    $module->lessons()->create($lessonData);
                }
            }

            return $course->fresh(['category']);
        });
    }
}
