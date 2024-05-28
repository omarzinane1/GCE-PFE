<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DFCController;
use App\Http\Controllers\SCController;
use App\Http\Controllers\SJCController;
use App\Http\Controllers\SJController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// routes/Api.php
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('/user/{id}', [AuthController::class, 'findUserById']);
});
//***************************************************** */
// Route::prefix('SC')->middleware('auth')->group(function () {
//     Route::post('/createClient', 'ClientController@store');
//     Route::delete('/{id}', 'ClientController@destroy');
//     Route::put('/{id}', 'ClientController@update');
//     Route::get('/searchByName', 'ClientController@searchByName');
//     Route::get('/{id}', 'ClientController@searchById');
// });

//the route for admin
Route::group(['prefix' => 'admin'],function () {
    Route::get('/admindisplay', [AdminController::class, 'index']);
    Route::delete('/deleteUser/{id}', [AdminController::class, 'deleteUser']);
    Route::put('/updaterolebyemail', [AdminController::class, 'updateRoleByEmail']);
    Route::put('/cheques/{id}', [AdminController::class, 'update']);
});

//the route for dfc
Route::group(['prefix' => 'dfc'],function () {
    Route::get('/display', [DFCController::class, 'index']);
    Route::post('/store', [DFCController::class, 'store']);
    Route::put('/cheques/{id}', [DFCController::class, 'update']);
    Route::delete('/deleteCheque/{id}', [DFCController::class, 'deleteCheque']);
    Route::get('/export-cheques', [DFCController::class, 'exportChequesToExcel']);
    Route::get('/data-filtered', [DFCController::class, 'getFilteredByDateReception']);
    Route::get('/export-pdf', [DFCController::class, 'exportPDF']);
    Route::get('/search', [DFCController::class, 'search']);

});

//the route for SC
Route::group(['prefix' => 'sc'],function () {
    Route::get('/display', [SCController::class, 'index']);
    Route::post('/createClient', [SCController::class, 'store']);
    Route::get('/export-pdf', [SCController::class, 'exportPDF']);
    Route::get('/data-filtered', [SCController::class, 'getFilteredByParames']);
    Route::get('/export-clients', [SCController::class, 'exportClientsToExcel']);
    Route::put('/pay/{id}', [SCController::class, 'pay']);
    Route::post('/shareCheque', [SCController::class, 'shareCheque']);
    Route::get('/cheques/with-null-values', [SCController::class, 'chequesWithNulls']);
    Route::put('/cheques/{id}', [SCController::class, 'update']);
    Route::get('/searchCheques', [SCController::class, 'searchCheques']);
});

//the route for SJ
Route::group(['prefix' => 'sjn'],function () {
    Route::get('/display', [SJController::class, 'index']);
    Route::get('/export-cheques', [SJController::class, 'exportChequesToExcel']);
    Route::get('/data-filtered', [SJController::class, 'getFilteredByDateReception']);
    Route::get('/export-pdf', [SJController::class, 'exportPDF']);
    Route::post('/SJNshareCheque', [SJController::class, 'shareCheque']);
    Route::get('/SJNsearchCheques', [SJController::class, 'SJNsearchCheques']);
    Route::put('/cheques/{id}', [SCController::class, 'update']);
    Route::get('/searchCheques', [SCController::class, 'searchCheques']);
    Route::put('/pay/{id}', [SJController::class, 'pay']);
});
//the route for SJ
Route::group(['prefix' => 'sjc'],function () {
    Route::get('/SJCdisplay', [SJCController::class, 'index']);
    Route::put('/pay/{id}', [SJCController::class, 'pay']);
    Route::get('/SJCsearchCheques', [SJCController::class, 'SJCsearchCheques']);
});

Route::post('/resetPassword', [AuthController::class, 'resetPassword']);
