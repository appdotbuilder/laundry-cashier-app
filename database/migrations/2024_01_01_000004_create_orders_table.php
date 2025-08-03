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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('pickup_address_id')->constrained('customer_addresses');
            $table->foreignId('delivery_address_id')->constrained('customer_addresses');
            $table->enum('status', [
                'pending',
                'confirmed',
                'pickup_assigned',
                'picked_up',
                'in_process',
                'ready',
                'out_for_delivery',
                'delivered',
                'cancelled'
            ])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->enum('payment_method', ['online', 'cash', 'cod'])->nullable();
            $table->datetime('pickup_scheduled_at')->nullable();
            $table->datetime('delivery_scheduled_at')->nullable();
            $table->datetime('pickup_completed_at')->nullable();
            $table->datetime('delivery_completed_at')->nullable();
            $table->decimal('estimated_total', 10, 2)->default(0);
            $table->decimal('final_total', 10, 2)->default(0);
            $table->decimal('delivery_fee', 10, 2)->default(0);
            $table->text('customer_notes')->nullable();
            $table->text('staff_notes')->nullable();
            $table->foreignId('assigned_courier_id')->nullable()->constrained('users');
            $table->timestamps();
            
            $table->index(['customer_id', 'status']);
            $table->index('order_number');
            $table->index('status');
            $table->index('assigned_courier_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};