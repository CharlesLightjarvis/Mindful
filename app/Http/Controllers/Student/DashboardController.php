<?php

declare(strict_types=1);

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $student = $request->user();

        return Inertia::render('student/dashboard', [
            'stats' => [
                'enrolledCourses' => Enrollment::where('user_id', $student->id)->count(),
            ],
        ]);
    }
}
