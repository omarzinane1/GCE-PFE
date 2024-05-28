<?php

namespace App\Http\Controllers;

use App\Models\JSCCheque;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SJCController extends Controller
{
    //show jsn cheques
   public function index()
   {
       $qry = 'SELECT * FROM s_j_c_cheques WHERE (CIN IS NOT NULL OR telephone IS NOT NULL OR motif IS NOT NULL) AND statut = "impaye" ORDER BY id DESC';
       $cheques = DB::select($qry);

       return response()->json($cheques);
   }
   public function pay(Request $request, $id)
    {

        $Cheque = JSCCheque::find($id);
        if ($Cheque) {
            $Cheque->statut = 'payé';
            $Cheque->save();
            return response()->json(['success' => $id]);
        }

        // Si le chèque n'est pas trouvé
        return response()->json(['success' => false, 'message' => 'Chèque non trouvé', 'paymentId' => null], 404);
    }
    //Méthode pour la rechercher par SJC
    public function SJCsearchCheques(Request $request): JsonResponse
    {
        $statut = $request->query('statut', 'impaye');
        $search = $request->query('search', '');

        $cheques = DB::table('s_j_c_cheques')
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
