<?php

use App\Http\Controllers\Student\Courses\CourseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('courses', [CourseController::class, 'index'])->name('courses.index');
    Route::get('courses/{courseId}', [CourseController::class, 'show'])->name('courses.show');
});
