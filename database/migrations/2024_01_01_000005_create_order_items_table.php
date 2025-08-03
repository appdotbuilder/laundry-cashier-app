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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained();
            $table->decimal('estimated_quantity', 8, 2);
            $table->decimal('actual_quantity', 8, 2)->nullable();
            $table->decimal('price_per_unit', 10, 2);
            $table->decimal('estimated_subtotal', 10, 2);
            $table->decimal('actual_subtotal', 10, 2)->nullable();
            $table->timestamps();
            
            $table->index('order_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};