<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

// Route::post('/register', [AuthController::class, 'register']);

// Route::post('/login', [AuthController::class, 'login']);


// Route::get('/users', [UserController::class, 'index']);

// Route::put('/user/{id}', [UserController::class, 'update']);

// Route::get('/users/{id}', [UserController::class, 'show']);

// Route::post('/tasks', [TaskController::class, 'store']);

// Route::get('/tasks/{id}', [TaskController::class, 'show']);


// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\UserController;
// use App\Http\Controllers\TaskController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks/{id}', [TaskController::class, 'show']);
