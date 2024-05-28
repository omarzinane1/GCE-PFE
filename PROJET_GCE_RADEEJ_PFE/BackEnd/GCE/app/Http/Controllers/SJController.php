<?php

namespace App\Http\Controllers;

use App\Models\JSCheque;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class SJController extends Controller
{

   //show jsn cheques
   public function index()
   {
       $qry = 'SELECT * FROM j_s_cheques WHERE (CIN IS NOT NULL OR telephone IS NOT NULL OR motif IS NOT NULL) AND statut = "impaye" ORDER BY id DESC';
       $cheques = DB::select($qry);

       return response()->json($cheques);
   }

   
    //Méthode pour la rechercher par SJN
    public function SJNsearchCheques(Request $request): JsonResponse
    {
        $statut = $request->query('statut', 'impaye');
        $search = $request->query('search', '');

        $cheques = DB::table('j_s_cheques')
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
    public function pay(Request $request, $id)
    {

        $Cheque = JSCheque::find($id);
        if ($Cheque) {
            $Cheque->statut = 'payé';
            $Cheque->save();
            return response()->json(['success' => $id]);
        }

        // Si le chèque n'est pas trouvé
        return response()->json(['success' => false, 'message' => 'Chèque non trouvé', 'paymentId' => null], 404);
    }
    //Méthode pour inséré Cheque dans la table JSCheques
    public function shareCheque(Request $request)
    {

        DB::table('s_j_c_cheques')->insert([
            'NumCHEQUE' => $request->NumCHEQUE,
            'montant' => $request->montant,
            'date_reception' => $request->date_reception,
            'CIN' => $request->CIN,
            'telephone' => $request->telephone,
            'statut' => $request->statut,
            'ville' => $request->ville,
            'banque' => $request->banque,
            'motif' => $request->motif,
            'date_validation' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

        ]);
        $chequeId = $request->id;
        DB::table('j_s_cheques')->where('id', $chequeId)->delete();

        return response()->json(['message' => 'Chèque partage avec succès'], 201);
    }
}
