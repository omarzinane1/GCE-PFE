<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JSCCheque extends Model
{
    use HasFactory;
    protected $table = 's_j_c_cheques';
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
