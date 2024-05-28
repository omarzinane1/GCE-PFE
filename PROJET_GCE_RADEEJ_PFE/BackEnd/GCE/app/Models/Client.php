<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    // Colonnes qui peuvent être assignées massivement
    protected $fillable = [
        'CNI',
        'nom',
        'prenom',
        'email',
        'telephone',
        'adresse',
        'ville',
        'NumCHEQUE'
    ];

    // Relation avec le modèle Cheque
    public function cheque()
    {
        return $this->belongsTo(Cheque::class, 'NumCHEQUE', 'NumCHEQUE');
    }
}
