<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student\Courses;

use App\Http\Controllers\Controller;
use App\Http\Resources\Public\ModuleResource;
use App\Http\Resources\Student\EnrollmentResource;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class CourseController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        $enrollments = Enrollment::with([
            'course' => fn ($q) => $q->with(['trainer', 'category', 'modules.lessons']),
        ])
            ->where('user_id', $userId)
            ->latest('enrolled_at')
            ->get();

        $completedByEnrollment = [];

        foreach ($enrollments as $enrollment) {
            $lessonIds = $enrollment->course->modules
                ->flatMap(fn ($m) => $m->lessons)
                ->pluck('id')
                ->all();

            $completedCount = LessonProgress::where('user_id', $userId)
                ->whereIn('lesson_id', $lessonIds)
                ->count();

            $completedByEnrollment[$enrollment->course_id] = [
                'completed_count' => $completedCount,
                'total_count' => count($lessonIds),
            ];
        }

        $resolvedEnrollments = collect(EnrollmentResource::collection($enrollments)->resolve())
            ->map(function (array $item) use ($completedByEnrollment): array {
                $stats = $completedByEnrollment[$item['course_id']] ?? ['completed_count' => 0, 'total_count' => 0];
                $item['completed_lesson_count'] = $stats['completed_count'];
                $item['progress_percentage'] = $stats['total_count'] > 0
                    ? (int) round($stats['completed_count'] / $stats['total_count'] * 100)
                    : 0;

                return $item;
            })
            ->values();

        return Inertia::render('student/courses/index', [
            'enrollments' => $resolvedEnrollments,
        ]);
    }

    public function show(Request $request, int $courseId): Response|SymfonyResponse
    {
        $user = $request->user();

        Enrollment::where('user_id', $user->id)
            ->where('course_id', $courseId)
            ->firstOrFail();

        $course = Course::with(['trainer', 'modules.lessons'])
            ->published()
            ->findOrFail($courseId);

        $allLessonIds = $course->modules->flatMap(fn ($m) => $m->lessons)->pluck('id')->all();

        $completedLessonIds = LessonProgress::where('user_id', $user->id)
            ->whereIn('lesson_id', $allLessonIds)
            ->pluck('lesson_id')
            ->all();

        $totalLessons = count($allLessonIds);
        $completedCount = count($completedLessonIds);
        $progressPercentage = $totalLessons > 0
            ? (int) round($completedCount / $totalLessons * 100)
            : 0;

        return Inertia::render('student/courses/show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'image' => $course->image,
                'trainer' => $course->trainer->name,
                'modules' => ModuleResource::collection($course->modules)->resolve(),
            ],
            'completedLessonIds' => $completedLessonIds,
            'progressPercentage' => $progressPercentage,
            'completedCount' => $completedCount,
            'totalLessons' => $totalLessons,
        ]);
    }
}
