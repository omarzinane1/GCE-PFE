<!-- resources/views/cheques/report.blade.php -->
<!DOCTYPE html>
<html lang="fr">

<head>
    <title>Rapport des Chèques</title>
    <style>
        /* Ajoutez des styles CSS si nécessaire */
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 5px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: center; margin-top: 3px;"><i>LOGO</i></div>
        <div style="border: black solid 1px; padding: 10px; text-align: center;"><h3>Régie Autonome Intercommunale de Distribution d’Eau, d’Électricité et de gestion d’Assainissement liquide des Provinces d’El Jadida et de Sidi Bennour</h3></div>

    </div>
    <h3 style="text-align: center;">Rapport des Chèques du {{ $cheques->last()->date_reception }}  au {{ $cheques->first()->date_reception }}</h1>
    <table>
        <thead>
            <tr>
                <th>Numéro de Chèque</th>
                <th>Montant</th>
                <th>Date Reception</th>
                <th>CIN</th>
                <th>Téléphone</th>
                <th>Statut</th>
                <th>Ville</th>
                <th>Banque</th>
                <th>Motif</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($cheques as $cheque)
            <tr>
                <td>{{ $cheque->NumCHEQUE }}</td>
                <td>{{ $cheque->montant }}</td>
                <td>{{ $cheque->date_reception }}</td>
                <td>{{ $cheque->CIN }}</td>
                <td>{{ $cheque->telephone }}</td>
                <td>{{ $cheque->statut }}</td>
                <td>{{ $cheque->ville }}</td>
                <td>{{ $cheque->banque }}</td>
                <td>{{ $cheque->motif }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
