<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('boards','App\Http\Controllers\API\BoardsController');
Route::apiResource('comments','App\Http\Controllers\API\CommentController');

Route::get('auth/create-token','App\Http\Controllers\API\Auth\AuthAPIController@createToken');

Route::post('auth/login','App\Http\Controllers\API\Auth\AuthAPIController@login');
Route::post('auth/register','App\Http\Controllers\API\Auth\AuthAPIController@register');

