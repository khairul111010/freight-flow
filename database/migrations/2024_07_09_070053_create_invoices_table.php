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
            $table->string('invoice_number');
            $table->date('invoice_issue_date');
            $table->date('invoice_due_date');
            $table->string('destination');
            $table->string('master_air_way_bill')->nullable();
            $table->float('master_air_way_bill_fee')->nullable();
            $table->integer('unit')->nullable();
            $table->integer('cartoon_amount');
            $table->float('gross_weight')->nullable();
            $table->float('chargeable_weight')->nullable();
            $table->float('kg')->nullable();
            $table->float('invoice_rate')->nullable();
            $table->float('invoice_cgc')->nullable();
            $table->float('invoice_dtc')->nullable();
            $table->float('invoice_ait')->nullable();
            $table->float('invoice_vat')->default(0);
            $table->float('others')->nullable();
            $table->float('invoice_total_usd')->nullable();
            $table->float('invoice_exchange_rate')->default(0);
            $table->float('invoice_receivable_amount_bdt')->default(0);
            $table->float('invoice_received_amount')->default(0);
            $table->float('invoice_due_balance')->default(0);
            $table->text('invoice_notes')->nullable();
            // $table->string('currency')->default('bdt');
            $table->string('invoice_payment_method')->nullable();
            $table->foreignId('customer_id')->constrained('customers')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('chart_of_account_id')->nullable()->constrained('chart_of_accounts')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('invoice_bank_account_id')->nullable()->constrained('bank_accounts')->onUpdate('cascade')->onDelete('cascade');
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
