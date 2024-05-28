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
        Schema::create('etats', function (Blueprint $table) {
            $table->id();
            $table->enum('etat', ['DFC', 'SC', 'SJ'])->default('DFC');
            $table->unsignedBigInteger('num_cheque');
            $table->foreign('num_cheque')
              ->references('id')
              ->on('cheques')
              ->onDelete('cascade');
            $table->date('date_envoi');
            $table->string('service_envoi');
            $table->string('service_succes')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etats');
    }
};
