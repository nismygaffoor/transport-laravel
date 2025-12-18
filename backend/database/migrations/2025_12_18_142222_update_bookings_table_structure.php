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
        Schema::table('bookings', function (Blueprint $table) {
            // Drop old foreign keys and columns
            $table->dropForeign(['route_id']);
            $table->dropForeign(['seat_id']);
            $table->dropColumn(['route_id', 'seat_id', 'price']);
            
            // Add new columns
            $table->string('seat_numbers')->after('bus_id'); // Comma-separated seat numbers
            $table->decimal('total_price', 10, 2)->after('seat_numbers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Reverse the changes
            $table->dropColumn(['seat_numbers', 'total_price']);
            $table->foreignId('route_id')->constrained()->onDelete('cascade');
            $table->foreignId('seat_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 8, 2);
        });
    }
};
