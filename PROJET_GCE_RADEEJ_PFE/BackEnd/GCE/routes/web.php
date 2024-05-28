<?php

use App\Models\Client;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    // Récupérer les clients de la base de données
    $clients = Client::all();

    // Renvoyer la vue avec les données des clients
    return view('list_clients_pdf', ['clients' => $clients]);
});
