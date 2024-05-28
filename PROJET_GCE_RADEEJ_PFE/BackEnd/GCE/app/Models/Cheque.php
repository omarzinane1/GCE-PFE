<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cheque extends Model
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

    public function clients()
    {
        return $this->hasMany(Client::class, 'NumCHEQUE', 'NumCHEQUE');
    }


}
