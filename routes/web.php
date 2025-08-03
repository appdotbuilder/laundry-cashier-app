<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Order management
    Route::resource('orders', OrderController::class);
    
    // Service management (Admin only)
    Route::resource('services', ServiceController::class);
    
    // User management routes (to be implemented)
    Route::get('/users', function () {
        return Inertia::render('users/index');
    })->name('users.index');
    
    // Reports routes (to be implemented)
    Route::get('/reports', function () {
        return Inertia::render('reports/index');
    })->name('reports.index');
    
    // Reviews routes (to be implemented)
    Route::get('/reviews', function () {
        return Inertia::render('reviews/index');
    })->name('reviews.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';