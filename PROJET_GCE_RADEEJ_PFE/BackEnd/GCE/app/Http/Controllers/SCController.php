<?php

namespace App\Http\Controllers;

use App\Models\Cheque;
use App\Models\Client;
use App\Models\JSCheque;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;


class SCController extends Controller
{
    //show cheques
    public function index()
    {
        $qry = 'SELECT * FROM cheques WHERE (CIN IS NOT NULL OR telephone IS NOT NULL OR motif IS NOT NULL) AND statut = "impaye" ORDER BY id DESC';
        $cheques = DB::select($qry);

        return response()->json($cheques);
    }

    //create user
    public function store(Request $request)
    {
        $data = $request->validate([
            'CNI' => 'required|string|max:20',
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'email' => 'required|string|max:255',
            'telephone' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:30',
            'NumCHEQUE' => 'required|string|max:200',
        ]);
        $client = Client::create($data);
        return response()->json(['client' => $client], 201);
        return response()->json($client, 201);
    }

    public function pay(Request $request, $id)
    {

        $Cheque = Cheque::find($id);
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

        DB::table('j_s_cheques')->insert([
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
        DB::table('cheques')->where('id', $chequeId)->delete();

        return response()->json(['message' => 'Chèque inséré avec succès'], 201);
    }
    //select * form cheques where CIN = null or telephone = null or motif = null;
    public function chequesWithNulls()
    {
        $query = 'SELECT * FROM cheques WHERE CIN IS NULL OR telephone IS NULL OR motif IS NULL ORDER BY id DESC';
        $cheques = DB::select($query);

        return response()->json($cheques);
    }
    //ajouter les donnees de client dans le cheque
    public function update(Request $request, $id)
    {
        $cheque = Cheque::findOrFail($id);
        $cheque->update($request->all());
        return response()->json(['message' => $cheque]);
    }

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
