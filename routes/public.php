<?php

use App\Http\Controllers\Public\BecomeTrainer\CheckoutController;
use App\Http\Controllers\Public\BecomeTrainer\PaymentController;
use App\Http\Controllers\Public\BecomeTrainer\TrainerPlanController;
use App\Http\Controllers\Public\Courses\CheckoutController as CourseCheckoutController;
use App\Http\Controllers\Public\Courses\CourseController;
use App\Http\Controllers\Public\WebhookController;
use App\Http\Controllers\Public\Home\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::inertia('about', 'home/about')->name('about');
Route::inertia('blog', 'home/blog/index')->name('blog');
Route::inertia('contact', 'home/contact')->name('contact');
Route::inertia('realisations', 'home/realisations/index')->name('realisations');

// Courses
Route::get('courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('courses/{id}', [CourseController::class, 'show'])->name('courses.show');
Route::get('courses/{id}/checkout', [CourseCheckoutController::class, 'show'])->middleware(['auth', 'verified'])->name('courses.checkout.show');
Route::post('courses/checkout', [CourseCheckoutController::class, 'store'])->middleware(['auth', 'verified'])->name('courses.checkout');
Route::inertia('courses/purchase/success', 'home/courses/success')->middleware(['auth', 'verified'])->name('courses.purchase.success');

// Become trainer
Route::get('become-trainer', [TrainerPlanController::class, 'index'])->name('become-trainer.index');
Route::get('become-trainer/checkout/{plan}', [CheckoutController::class, 'show'])->middleware(['auth', 'verified'])->name('become-trainer.checkout.show');
Route::post('become-trainer/checkout', [CheckoutController::class, 'store'])->middleware(['auth', 'verified'])->name('become-trainer.checkout');
Route::inertia('become-trainer/success', 'home/become-trainer/success')->name('become-trainer.success');

// Stripe / Cashier
Route::post('stripe/webhook', [WebhookController::class, 'handleWebhook'])->name('cashier.webhook');
Route::get('stripe/payment/{payment}', [PaymentController::class, 'show'])->name('cashier.payment');
