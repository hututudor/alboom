<?php

use Illuminate\Http\Request;

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

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@authenticate');

// middleware for auth-only routes
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'AuthController@getAuthenticatedUser');

    Route::get('albums/{uuid}', 'AlbumsController@get');
    Route::get('albums', 'AlbumsController@getall');
    Route::post('albums', 'AlbumsController@add');
    Route::put('albums/{uuid}', 'AlbumsController@edit');
    Route::delete('albums/{uuid}', 'AlbumsController@delete');
});
