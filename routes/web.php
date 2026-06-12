<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/public.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/trainer.php';
require __DIR__ . '/student.php';
require __DIR__ . '/settings.php';
