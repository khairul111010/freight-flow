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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->float('amount');
            $table->string('transaction_type');
            $table->date('transaction_date');
            $table->boolean('is_debit')->default(false);
            $table->boolean('record_payment')->default(false);
            $table->string('invoice_number');
            $table->foreignId('chart_of_account_id')->nullable()->constrained('chart_of_accounts')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('bill_id')->nullable()->constrained('bills')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('invoice_id')->nullable()->constrained('invoices')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('expense_id')->nullable()->constrained('expenses')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('manual_journal_id')->nullable()->constrained('manual_journals')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
