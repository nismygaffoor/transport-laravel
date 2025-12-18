<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('seats', function (Blueprint $table) {
            // Add foreign key with cascade if not already present
            // Ensure column exists (it does in prior migration)
            $table->foreign('bus_id')
                ->references('id')->on('buses')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('seats', function (Blueprint $table) {
            $table->dropForeign(['bus_id']);
        });
    }
};
