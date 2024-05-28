<?php

namespace App\Http\Controllers;

use App\Models\Cheque;
use App\Models\JSCCheque;
use App\Models\JSCheque;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

class DFCController extends Controller
{
    public function index()
    {
        $cheques = DB::table('cheques')->get();
        return response()->json($cheques);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'NumCHEQUE' => 'required|string|max:255',
            'montant' => 'required|numeric',
            'date_reception' => 'required|date',
            // 'statut' => 'required|string',
            'ville' => 'required|string',
            'banque' => 'required|string',
        ]);

        $cheque = Cheque::create($data);

        return response()->json(['cheque' => $cheque], 201);
        return response()->json($cheque, 201);
    }

    //update cheque
    // public function update(Request $request, $id)
    // {

    //     $data = $request->validate([
    //         'NumCHEQUE' => 'sometimes|string|max:255',
    //         'montant' => 'sometimes|required|numeric',
    //         'date_reception' => 'sometimes|required|date',
    //         'statut' => 'sometimes|required|string',
    //         'client_id' => 'sometimes|required|string|exists:clients,id',
    //     ]);

    //     // Recherche du chèque par ID
    //     $cheque = Cheque::findOrFail($id);


    //     $cheque->update($data);

    //     return response()->json(['message' => 'Chèque mis à jour avec succès', 'cheque' => $cheque], 200);
    // }

    

    //pour export les cheques ce form excel
    public function exportChequesToExcel(Request $request)
    {
        $startDate = $request->query('date_reception');
        $endDate = $request->query('date_validation');
        $statut = $request->query('statut');

        $parameters = [];
        $sql = '';

        if ($startDate && $endDate && $statut) {
            $parameters = [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'statut' => $statut,
                'startDate1' => $startDate,
                'endDate1' => $endDate,
                'statut1' => $statut,
                'startDate2' => $startDate,
                'endDate2' => $endDate,
                'statut2' => $statut,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (date_reception BETWEEN :startDate AND :endDate)
                  AND (statut = :statut)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (date_reception BETWEEN :startDate1 AND :endDate1)
                  AND (statut = :statut1)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (date_reception BETWEEN :startDate2 AND :endDate2)
                  AND (statut = :statut2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception ASC";
        } elseif ($startDate && $endDate) {
            $parameters = [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'startDate1' => $startDate,
                'endDate1' => $endDate,
                'startDate2' => $startDate,
                'endDate2' => $endDate,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (date_reception BETWEEN :startDate AND :endDate)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (date_reception BETWEEN :startDate1 AND :endDate1)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (date_reception BETWEEN :startDate2 AND :endDate2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception DESC";
        } elseif ($statut) {
            $parameters = [
                'statut' => $statut,
                'statut2' => $statut,
                'statut3' => $statut,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (statut = :statut)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (statut = :statut2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (statut = :statut3)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception DESC";
        }

        if ($sql !== '') {
            $cheques = DB::select($sql, $parameters);
        } else {
            $cheques = [];
        }
        //le classeur Excel
        $spreadsheet = new Spreadsheet();

        //feuille
        $sheet = $spreadsheet->getActiveSheet();

        // Titre
        $paddingColumns = 1;

        $mergeStart = 'A';
        $mergeEnd = chr(ord('I') + $paddingColumns);
        $sheet->mergeCells("{$mergeStart}1:{$mergeEnd}1");

        $sheet->setCellValue('A1', 'Liste des Chèques');

        $sheet->getStyle("{$mergeStart}1:{$mergeEnd}1")->getFont()->setSize(16);
        $sheet->getStyle("{$mergeStart}1:{$mergeEnd}1")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle("{$mergeStart}1:{$mergeEnd}1")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FFD3D3D3');

        // En-têtes de colonnes
        $sheet->setCellValue('A2', 'NumCHEQUE');
        $sheet->setCellValue('B2', 'Montant');
        $sheet->setCellValue('C2', 'Date de réception');
        $sheet->setCellValue('D2', 'CIN ');
        $sheet->setCellValue('E2', 'Téléphone');
        $sheet->setCellValue('F2', 'Statut');
        $sheet->setCellValue('G2', 'Ville');
        $sheet->setCellValue('H2', 'banque');
        $sheet->setCellValue('I2', 'Motif');
        $sheet->setCellValue('J2', 'Date Validation');

        // Styles des en-têtes
        $sheet->getStyle('A2:J2')->getFont()->setBold(true)->setSize(12);
        $sheet->getStyle('A2:J2')->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FFFFD700'); // Jaune doré
        $sheet->getStyle('A2:J2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);


        $row = 3;
        foreach ($cheques as $cheque) {
            $sheet->setCellValue("A{$row}", $cheque->NumCHEQUE);
            $sheet->setCellValue("B{$row}", $cheque->montant);
            $sheet->setCellValue("C{$row}", $cheque->date_reception);
            $sheet->setCellValue("D{$row}", $cheque->CIN);
            $sheet->setCellValue("E{$row}", $cheque->telephone);
            $sheet->setCellValue("F{$row}", $cheque->statut);
            $sheet->setCellValue("G{$row}", $cheque->ville);
            $sheet->setCellValue("H{$row}", $cheque->banque);
            $sheet->setCellValue("I{$row}", $cheque->motif);
            $sheet->setCellValue("J{$row}", $cheque->created_at);
            $row++;
        }

        foreach (range('A', 'J') as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(true);
        }

        //le fichier Excel
        $writer = new Xlsx($spreadsheet);

        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return response()->make($content, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="cheques.xlsx"',
        ]);
    }

    //Méthode pour Filtere les cheques par DateReception et statut
    public function getFilteredByDateReception(Request $request): JsonResponse
    {
        $startDate = $request->query('date_reception');
        $endDate = $request->query('date_validation');
        $statut = $request->query('statut');

        $parameters = [];
        $sql = '';

        if ($startDate && $endDate && $statut) {
            $parameters = [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'statut' => $statut,
                'startDate1' => $startDate,
                'endDate1' => $endDate,
                'statut1' => $statut,
                'startDate2' => $startDate,
                'endDate2' => $endDate,
                'statut2' => $statut,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (date_reception BETWEEN :startDate AND :endDate)
                  AND (statut = :statut)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (date_reception BETWEEN :startDate1 AND :endDate1)
                  AND (statut = :statut1)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (date_reception BETWEEN :startDate2 AND :endDate2)
                  AND (statut = :statut2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception ASC";
        } elseif ($startDate && $endDate) {
            $parameters = [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'startDate1' => $startDate,
                'endDate1' => $endDate,
                'startDate2' => $startDate,
                'endDate2' => $endDate,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (date_reception BETWEEN :startDate AND :endDate)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (date_reception BETWEEN :startDate1 AND :endDate1)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (date_reception BETWEEN :startDate2 AND :endDate2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception DESC";
        } elseif ($statut) {
            $parameters = [
                'statut' => $statut,
                'statut2' => $statut,
                'statut3' => $statut,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (statut = :statut)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (statut = :statut2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (statut = :statut3)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception DESC";
        }

        if ($sql !== '') {
            $cheques = DB::select($sql, $parameters);
        } else {
            $cheques = [];
        }

        return response()->json($cheques);
    }


    //Méthode pour export PDF
    public function exportPDF(Request $request)
    {
        $startDate = $request->query('date_reception');
        $endDate = $request->query('date_validation');
        $statut = $request->query('statut');

        $parameters = [];
        $sql = '';

        // Construction de la requête SQL pour chaque cas possible
        if ($startDate && $endDate && $statut) {
            $parameters = [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'statut' => $statut,
                'startDate1' => $startDate,
                'endDate1' => $endDate,
                'statut1' => $statut,
                'startDate2' => $startDate,
                'endDate2' => $endDate,
                'statut2' => $statut,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (date_reception BETWEEN :startDate AND :endDate)
                  AND (statut = :statut)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (date_reception BETWEEN :startDate1 AND :endDate1)
                  AND (statut = :statut1)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (date_reception BETWEEN :startDate2 AND :endDate2)
                  AND (statut = :statut2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception ASC";
        } elseif ($startDate && $endDate) {
            $parameters = [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'startDate1' => $startDate,
                'endDate1' => $endDate,
                'startDate2' => $startDate,
                'endDate2' => $endDate,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (date_reception BETWEEN :startDate AND :endDate)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (date_reception BETWEEN :startDate1 AND :endDate1)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (date_reception BETWEEN :startDate2 AND :endDate2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception DESC";
        } elseif ($statut) {
            $parameters = [
                'statut' => $statut,
                'statut2' => $statut,
                'statut3' => $statut,
            ];

            $sql = "SELECT * FROM cheques
                WHERE
                  (statut = :statut)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM j_s_cheques
                WHERE
                  (statut = :statut2)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                UNION
                SELECT * FROM s_j_c_cheques
                WHERE
                  (statut = :statut3)
                  AND CIN IS NOT NULL AND telephone IS NOT NULL AND motif IS NOT NULL
                ORDER BY date_reception DESC";
        }

        if ($sql !== '') {
            $cheques = DB::select($sql, $parameters);
            $cheques = collect($cheques);
        } else {
            $cheques = collect();
        }

        $pdf = Pdf::loadView('liste_cheques_pdf', compact('cheques'));

        return $pdf->download('cheques.pdf');
    }



    //rechercher par tous les chompes
    public function search(Request $request)
    {
        $searchParams = [
            'NumCHEQUE' => $request->input('numero_cheque'),
            'montant' => $request->input('montant'),
            'date_reception' => $request->input('date_reception'),
            'CIN' => $request->input('CIN'),
            'telephone' => $request->input('telephone'),
            'ville' => $request->input('ville'),
            'banque' => $request->input('banque'),
            'motif' => $request->input('motif'),
            'date_validation' => $request->input('date_validation'),
            'statut' => $request->input('statut')
        ];

        $query = DB::table('cheques');

        foreach ($searchParams as $key => $value) {
            if ($value) {
                $query->where($key, 'LIKE', '%' . $value . '%');
            }
        }
        $query->whereNotNull('CIN');
        $query->whereNotNull('motif');
        $query->whereNotNull('telephone');

        $query1 = DB::table('j_s_cheques');
        foreach ($searchParams as $key => $value) {
            if ($value) {
                $query1->where($key, 'LIKE', '%' . $value . '%');
            }
        }
        $query2 = DB::table('s_j_c_cheques');
        foreach ($searchParams as $key => $value) {
            if ($value) {
                $query2->where($key, 'LIKE', '%' . $value . '%');
            }
        }

        $query->union($query1);
        $query->union($query2);

        $cheques = $query->get();

        return response()->json($cheques);
    }
}
