<?php

use App\Http\Controllers\Admin\Courses\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\Plans\PlanController as AdminPlanController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('courses', AdminCourseController::class)->except(['show']);
    Route::patch('courses/{course}/status', [AdminCourseController::class, 'toggleStatus'])->name('courses.toggle-status');
    Route::resource('plans', AdminPlanController::class)->except(['show']);
});
