<?php

declare(strict_types=1);

namespace App\Actions\Trainer\Courses;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
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
        private readonly UploadLessonMediaAction $uploadMedia,
        private readonly CreateLessonAction $createLesson,
    ) {}

    public function handle(Course $course, array $data): Course
    {
        return DB::transaction(function () use ($course, $data) {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $data['image'] = $this->uploadImage->handle($data['image'], $course->image ?? null);
            } else {
                unset($data['image']);
            }

            $modulesData = $data['modules'] ?? [];
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

            $this->syncModules($updated, $modulesData);

            return $updated->fresh(['category']);
        });
    }

    /** @param array<int, array<string, mixed>> $modulesData */
    private function syncModules(Course $course, array $modulesData): void
    {
        $existingIds = $course->modules()->pluck('id')->toArray();
        $submittedIds = collect($modulesData)->pluck('id')->filter()->map(fn ($id) => (int) $id)->toArray();
        $idsToDelete = array_diff($existingIds, $submittedIds);

        if (! empty($idsToDelete)) {
            $course->modules()->whereIn('id', $idsToDelete)->get()->each(function (Module $module) {
                $module->lessons->each->delete();
                $module->delete();
            });
        }

        foreach ($modulesData as $moduleData) {
            $moduleId = isset($moduleData['id']) ? (int) $moduleData['id'] : null;
            $lessons = $moduleData['lessons'] ?? [];
            unset($moduleData['id'], $moduleData['lessons']);

            if ($moduleId && in_array($moduleId, $existingIds, true)) {
                /** @var Module $module */
                $module = $course->modules()->find($moduleId);
                $module->update($moduleData);
            } else {
                $module = $course->modules()->create($moduleData);
            }

            $this->syncLessons($module, $lessons);
        }
    }

    /** @param array<int, array<string, mixed>> $lessonsData */
    private function syncLessons(Module $module, array $lessonsData): void
    {
        $existingIds = $module->lessons()->pluck('id')->toArray();
        $submittedIds = collect($lessonsData)->pluck('id')->filter()->map(fn ($id) => (int) $id)->toArray();
        $idsToDelete = array_diff($existingIds, $submittedIds);

        if (! empty($idsToDelete)) {
            $module->lessons()->whereIn('id', $idsToDelete)->get()->each->delete();
        }

        foreach ($lessonsData as $lessonData) {
            $lessonId = isset($lessonData['id']) ? (int) $lessonData['id'] : null;
            $audioFile = $lessonData['audio_file'] ?? null;
            $pdfFile = $lessonData['pdf_file'] ?? null;
            unset($lessonData['id'], $lessonData['audio_file'], $lessonData['pdf_file']);

            if ($lessonId && in_array($lessonId, $existingIds, true)) {
                /** @var Lesson $lesson */
                $lesson = $module->lessons()->find($lessonId);

                if ($audioFile instanceof UploadedFile) {
                    $lessonData['audio_url'] = $this->uploadMedia->handleAudio($audioFile, $lesson->audio_url);
                }

                if ($pdfFile instanceof UploadedFile) {
                    $lessonData['pdf_url'] = $this->uploadMedia->handlePdf($pdfFile, $lesson->pdf_url);
                }

                $lesson->update($lessonData);
            } else {
                $this->createLesson->handle($module, $lessonData);
            }
        }
    }
}
