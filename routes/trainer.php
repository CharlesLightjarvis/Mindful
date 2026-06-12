<?php

use App\Http\Controllers\Trainer\Courses\CourseController as TrainerCourseController;
use App\Http\Controllers\Trainer\StripeConnectController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:trainer'])->prefix('trainer')->name('trainer.')->group(function () {
    Route::resource('courses', TrainerCourseController::class)->except(['show']);

    Route::get('stripe-connect', [StripeConnectController::class, 'edit'])->name('stripe-connect.edit');
    Route::get('stripe-connect/onboard', [StripeConnectController::class, 'onboard'])->name('stripe-connect.onboard');
    Route::get('stripe-connect/return', [StripeConnectController::class, 'return'])->name('stripe-connect.return');
    Route::delete('stripe-connect', [StripeConnectController::class, 'disconnect'])->name('stripe-connect.disconnect');
});
