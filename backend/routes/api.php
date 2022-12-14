<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\PeriodsController;
use App\Http\Controllers\NoteController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(JwtMiddleware::class)->group(function () {
    Route::get('/classes', [ClassesController::class, 'getClasses']);
    Route::get('/lessons', [LessonsController::class, 'getLessons']);
    Route::get('/lessons/{id}', [LessonsController::class, 'getLesson']);
    Route::get('/lessons/{id}/notes', [NoteController::class, 'show']);
    Route::put('/lessons/{id}/notes', [NoteController::class, 'store']);
    Route::get('/periods', [PeriodsController::class, 'periodSchedule']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/deauth', [AuthController::class, 'deauth']);
});
Route::get('/demo/usernames', [EmployeesController::class, 'getAllUsernames']);
Route::name('login')->post('/auth', [AuthController::class, 'auth']);
