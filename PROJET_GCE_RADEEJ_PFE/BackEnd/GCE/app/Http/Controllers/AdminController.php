<?php

namespace App\Http\Controllers;
use App\Mail\RoleUpdated;
use App\Models\Cheque;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{

    function index()
    {
        $users = DB::table('users')
            ->where('role', '!=', 'admin')
            ->get();

        return response()->json($users);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'error'], 404);
    }
    // update role par admin
    public function updateRoleByEmail(Request $request)
    {

        $email = $request->input('email');
        $newRole = $request->input('role');

        $user = User::where('email', $email)->firstOrFail();

        $user->role = $newRole;
        $user->save();

        Mail::to($user->email)->send(new RoleUpdated($user));

        return response()->json(['message' => 'Le rôle a été mis à jour avec succès']);
    }
    // update cheque
    public function update(Request $request, $id)
    {
        // Validation des données de mise à jour
        $data = $request->validate([
            'NumCHEQUE' => 'sometimes|required|string|max:255',
            'montant' => 'sometimes|required|numeric',
            'date_reception' => 'sometimes|required|date',
            'CIN' => 'sometimes|required|string|max:255',
            'ville' => 'sometimes|required|string',
            'banque' => 'sometimes|required|string',
            'telephone' => 'sometimes|required|string',
            'motif' => 'sometimes|required|string',
            'statut' => 'sometimes|required|string',
        ]);

        // Recherche du chèque par ID
        $cheque = Cheque::findOrFail($id);

        // Mise à jour des champs avec les nouvelles valeurs
        $cheque->update($data);

        return response()->json(['message' => 'Cheques mis à jour avec succès', 'cheque' => $cheque], 200);
    }
    //delete cheque
    public function deleteCheque($id)
    {
        $user = Cheque::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'error'], 404);
    }
    // chercher par toute les données
    public function searchCheques(Request $request): JsonResponse
    {
        $statut = $request->query('statut', 'impaye');
        $search = $request->query('search', '');

        $cheques = DB::table('cheques')
            ->where('statut', $statut)
            ->where(function ($query) use ($search) {
                $query->where('NumCHEQUE', 'LIKE', "%$search%")
                    ->orWhere('montant', 'LIKE', "%$search%")
                    ->orWhere('date_reception', 'LIKE', "%$search%")
                    ->orWhere('CIN', 'LIKE', "%$search%")
                    ->orWhere('ville', 'LIKE', "%$search%")
                    ->orWhere('banque', 'LIKE', "%$search%")
                    ->orWhere('telephone', 'LIKE', "%$search%")
                    ->orWhere('motif', 'LIKE', "%$search%");
            })
            ->where(function ($query) {
                $query->whereNotNull('CIN')
                    ->orWhereNotNull('telephone')
                    ->orWhereNotNull('motif');
            })
            ->orderBy('id', 'DESC')
            ->get();


        return response()->json($cheques);
    }
}
