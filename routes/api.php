<?php
use App\Http\Controllers\MarkController;
use App\Http\Controllers\RowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::resource('/students', StudentController::class);
Route::resource('/teachers', TeacherController::class);
Route::resource('/subjects', SubjectController::class);
Route::resource('/marks', MarkController::class);
Route::resource('/rows', RowController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});