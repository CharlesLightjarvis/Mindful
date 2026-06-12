<?php

namespace App\Actions\Trainer\Courses;

use App\Models\Course;
use App\Repositories\Trainer\Courses\CourseRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class DeleteCourseAction
{
    public function __construct(
        private readonly CourseRepository $repository,
    ) {}

    public function handle(Course $course): void
    {
        DB::transaction(function () use ($course) {
            if ($course->image) {
                $endpointUrl = rtrim(config('filesystems.disks.imagekit.endpoint_url'), '/');
                $path = ltrim(str_replace($endpointUrl.'/', '', $course->image), '/');

                try {
                    Storage::disk('imagekit')->delete($path);
                } catch (\Throwable) {
                    // Fichier introuvable sur ImageKit, on continue.
                }
            }

            if ($course->stripe_product_id) {
                Stripe::setApiKey(config('cashier.secret'));

                if ($course->stripe_price_id) {
                    Price::update($course->stripe_price_id, ['active' => false]);
                }

                Product::update($course->stripe_product_id, ['active' => false]);
            }

            $this->repository->delete($course);
        });
    }
}
