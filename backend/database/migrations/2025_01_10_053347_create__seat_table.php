<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatTable extends Migration
{
    public function up()
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();                        // Primary key
            $table->unsignedBigInteger('bus_id'); // Foreign key for buses table
            $table->integer('number');           // Seat number
            $table->boolean('is_available')->default(true); // Availability status
            $table->timestamps();               // Created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('seats');
    }
}
