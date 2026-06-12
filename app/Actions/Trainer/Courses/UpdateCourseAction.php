<?php

namespace App\Actions\Trainer\Courses;

use App\Models\Course;
use App\Repositories\Trainer\Courses\CourseRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class UpdateCourseAction
{
    public function __construct(
        private readonly CourseRepository $repository,
        private readonly UploadCourseImageAction $uploadImage,
    ) {}

    public function handle(Course $course, array $data): Course
    {
        return DB::transaction(function () use ($course, $data) {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $this->uploadImage->handle($data['image'], $course->image ?? null);
            } else {
                unset($data['image']);
            }

            $modules = $data['modules'] ?? [];
            unset($data['modules']);

            Stripe::setApiKey(config('cashier.secret'));

            $newPriceInCents = (int) round((float) $data['price'] * 100);
            $oldPriceInCents = (int) round((float) $course->price * 100);

            if ($course->stripe_product_id) {
                Product::update($course->stripe_product_id, ['name' => $data['title']]);
            }

            if ($course->stripe_price_id && $newPriceInCents !== $oldPriceInCents) {
                Price::update($course->stripe_price_id, ['active' => false]);

                $newPrice = Price::create([
                    'product' => $course->stripe_product_id,
                    'unit_amount' => $newPriceInCents,
                    'currency' => 'eur',
                ]);

                $data['stripe_price_id'] = $newPrice->id;
            }

            $updated = $this->repository->update($course, $data);

            $updated->modules()->each(fn ($m) => $m->lessons()->delete());
            $updated->modules()->delete();

            foreach ($modules as $moduleData) {
                $lessons = $moduleData['lessons'] ?? [];
                unset($moduleData['lessons']);

                $module = $updated->modules()->create($moduleData);

                foreach ($lessons as $lessonData) {
                    $module->lessons()->create($lessonData);
                }
            }

            return $updated;
        });
    }
}
