<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student\Courses;

use App\Http\Controllers\Controller;
use App\Http\Resources\Public\ModuleResource;
use App\Http\Resources\Student\EnrollmentResource;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class CourseController extends Controller
{
    public function index(Request $request): Response
    {
        $enrollments = Enrollment::with([
            'course' => fn ($q) => $q->with(['trainer', 'category', 'modules.lessons']),
        ])
            ->where('user_id', $request->user()->id)
            ->latest('enrolled_at')
            ->get();

        return Inertia::render('student/courses/index', [
            'enrollments' => EnrollmentResource::collection($enrollments)->resolve(),
        ]);
    }

    public function show(Request $request, int $courseId): Response|SymfonyResponse
    {
        $enrollment = Enrollment::where('user_id', $request->user()->id)
            ->where('course_id', $courseId)
            ->firstOrFail();

        $course = Course::with(['trainer', 'modules.lessons'])
            ->published()
            ->findOrFail($courseId);

        return Inertia::render('student/courses/show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'image' => $course->image,
                'trainer' => $course->trainer->name,
                'modules' => ModuleResource::collection($course->modules)->resolve(),
            ],
        ]);
    }
}
