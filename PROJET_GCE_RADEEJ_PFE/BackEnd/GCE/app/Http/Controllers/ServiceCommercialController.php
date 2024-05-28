<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceCommercialController extends Controller
{
    public function store(Request $request)
    {
        // Logique pour créer un nouveau client
    }

    public function destroy($id)
    {
        // Logique pour supprimer un client par ID
    }

    public function update(Request $request, $id)
    {
        // Logique pour mettre à jour les détails d'un client par ID
    }

    public function searchByName(Request $request)
    {
        // Logique pour rechercher un client par nom
    }

    public function searchById($id)
    {
        // Logique pour rechercher un client par ID
    }
}
