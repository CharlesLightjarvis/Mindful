<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student\Courses;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LessonProgressController extends Controller
{
    public function store(Request $request, Lesson $lesson): RedirectResponse
    {
        $user = $request->user();

        $enrolled = Enrollment::where('user_id', $user->id)
            ->where('course_id', $lesson->module->course_id)
            ->exists();

        abort_unless($enrolled, 403);

        LessonProgress::firstOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $lesson->id],
            ['completed_at' => now()],
        );

        return back();
    }

    public function destroy(Request $request, Lesson $lesson): RedirectResponse
    {
        $user = $request->user();

        LessonProgress::where('user_id', $user->id)
            ->where('lesson_id', $lesson->id)
            ->delete();

        return back();
    }
}
