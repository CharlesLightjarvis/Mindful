<?php

declare(strict_types=1);

namespace App\Http\Controllers\Trainer;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $trainer = $request->user();

        $courseIds = $trainer->courses()->pluck('id');

        return Inertia::render('trainer/dashboard', [
            'stats' => [
                'totalCourses' => $courseIds->count(),
                'totalStudents' => Enrollment::whereIn('course_id', $courseIds)->distinct('user_id')->count('user_id'),
                'publishedCourses' => $trainer->courses()->where('status', 'published')->count(),
            ],
        ]);
    }
}
