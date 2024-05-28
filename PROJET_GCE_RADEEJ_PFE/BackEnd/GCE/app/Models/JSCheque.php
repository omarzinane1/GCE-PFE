<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JSCheque extends Model
{
    use HasFactory;
    protected $fillable = [
        'NumCHEQUE',
        'montant',
        'date_reception',
        'CIN',
        'telephone',
        'statut',
        'ville',
        'banque',
        'motif',
        'date_validation'
    ];
}
