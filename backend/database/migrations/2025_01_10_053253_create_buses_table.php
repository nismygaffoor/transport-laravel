<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusesTable extends Migration
{
    public function up()
    {
        Schema::create('buses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('operator');
            $table->string('type');
            $table->time('departure_time');
            $table->time('arrival_time');
            $table->string('from');
            $table->string('to');
            $table->integer('price');
            $table->integer('available_seats');
            $table->integer('total_seats');
            $table->json('amenities');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('buses');
    }
}


