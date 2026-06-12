<?php

declare(strict_types=1);

namespace App\Actions\Admin\Courses;

use App\Models\Course;
use App\Repositories\Admin\Courses\CourseRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
                    // Fichier introuvable sur ImageKit, on continue la suppression.
                }
            }

            $this->repository->delete($course);
        });
    }
}
