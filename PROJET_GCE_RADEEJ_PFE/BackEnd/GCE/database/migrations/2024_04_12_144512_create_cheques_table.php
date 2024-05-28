<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cheques', function (Blueprint $table) {
            $table->id();
            $table->string('NumCHEQUE', 255)->unique();
            $table->float('montant');
            $table->date('date_reception');
            $table->string('CIN')->unique();
            $table->string('telephone');
            $table->enum('statut', ['paye', 'impaye'])->default('impaye');
            //$table->enum('service', ['SC', 'SJN', 'SJC'])->default('SC');
            $table->string('ville');
            $table->string('banque');
            $table->string('motif');
            $table->date('date_validation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cheques');
    }
};
