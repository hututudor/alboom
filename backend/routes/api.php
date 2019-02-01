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

    Route::get('resources/{uuid}', 'ResourcesController@get');
    Route::get('resources/album/{album_uuid}', 'ResourcesController@getAll');
    Route::post('resources/{album_uuid}', 'ResourcesController@add');
    Route::put('resources/{uuid}', 'ResourcesController@edit');
    Route::delete('resources/{uuid}', 'ResourcesController@delete');

    Route::get('preferences', 'PreferencesController@getall');
    Route::put('preferences', 'PreferencesController@edit');

    Route::post('user', 'AuthController@changeName');
    Route::put('user', 'AuthController@changePass');
});
