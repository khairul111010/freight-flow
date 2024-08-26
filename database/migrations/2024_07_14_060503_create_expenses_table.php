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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('expense_number');
            $table->string('description');
            $table->date('date');
            $table->float('amount');
            $table->string('currency')->nullable()->default('bdt');
            $table->float('tax')->nullable();
            $table->string('expense_note')->nullable();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('chart_of_account_id')->nullable()->constrained('chart_of_accounts')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
