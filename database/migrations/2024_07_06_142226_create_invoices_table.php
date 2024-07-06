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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('customer_id')->constrained();
            // $table->foreignId('vendor_id')->constrained();
            $table->string('invoice_number');
            $table->date('invoice_issue_date');
            $table->date('due_date');
            $table->string('destination');
            $table->integer('cartoon_amount');
            $table->float('vat')->default(0);
            $table->float('exchange')->default(0);
            $table->float('paid_amount')->default(0);
            $table->float('due_balance')->default(0);
            $table->float('total_amount');
            $table->text('notes')->nullable();
            $table->string('currency');
            $table->string('isPaid')->default(0)->comment('0 = unpaid, 1 = paid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
