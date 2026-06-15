<?php

use App\Http\Controllers\Student\Courses\CourseController;
use App\Http\Controllers\Student\Courses\LessonProgressController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('dashboard', [StudentDashboardController::class, 'index'])->name('dashboard');
    Route::get('courses', [CourseController::class, 'index'])->name('courses.index');
    Route::get('courses/{courseId}', [CourseController::class, 'show'])->name('courses.show');
    Route::post('lessons/{lesson}/progress', [LessonProgressController::class, 'store'])->name('lessons.progress.store');
    Route::delete('lessons/{lesson}/progress', [LessonProgressController::class, 'destroy'])->name('lessons.progress.destroy');
});
