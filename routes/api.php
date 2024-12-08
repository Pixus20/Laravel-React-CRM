<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\TaskController;


// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);

// Route::get('/users', [UserController::class, 'index']);
// Route::put('/user/{id}', [UserController::class, 'update']);
// Route::get('/users/{id}', [UserController::class, 'show']);

// Route::get('/me', [UserController::class, 'me']);

// Route::post('/tasks', [TaskController::class, 'store']);
// Route::get('/tasks', [TaskController::class, 'index']);
// Route::get('/tasks/{id}', [TaskController::class, 'show']);
// Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
// Route::delete('tasks/{id}', [TaskController::class, 'destroy']);

// Route::get('/total-bill', [TaskController::class, 'totalBill']);


// Route::post('/comments', [CommentController::class, 'store']);



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TelegramBotController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/users', [UserController::class, 'index']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/me', [UserController::class, 'me']);

Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/tasks/{id}', [TaskController::class, 'show']);
Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
Route::delete('tasks/{id}', [TaskController::class, 'destroy']);

Route::get('/total-bill', [TaskController::class, 'totalBill']);


Route::post('/comments', [CommentController::class, 'store']);



// Для налаштування вебхука
Route::post('/telegram/set-webhook', [TelegramBotController::class, 'setWebhook']);

// Для отримання повідомлень через вебхук
Route::post('/telegram/webhook', [TelegramBotController::class, 'handleWebhook']);
