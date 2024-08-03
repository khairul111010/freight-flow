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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number');
            $table->date('bill_issue_date');
            $table->date('bill_due_date');
            $table->string('destination');
            $table->string('master_air_way_bill')->nullable();
            $table->float('master_air_way_bill_fee')->nullable();
            $table->integer('unit')->nullable();
            $table->integer('cartoon_amount');
            $table->float('gross_weight')->nullable();
            $table->float('chargeable_weight')->nullable();
            $table->float('bill_rate')->nullable();
            $table->float('bill_freight_amount')->nullable();
            $table->float('bill_thc')->nullable();
            $table->float('bill_ssc')->nullable();
            $table->float('bill_cd')->nullable();
            $table->float('bill_cgc')->nullable();
            $table->float('bill_ams')->nullable();
            $table->float('bill_itt')->nullable();
            $table->float('bill_total_usd')->nullable();
            $table->float('bill_ait')->nullable();
            $table->float('bill_vat')->nullable();
            $table->float('bill_exchange_rate')->nullable();
            $table->float('bill_payable_bdt')->default(0);
            $table->float('bill_paid_amount')->default(0);
            $table->float('bill_due_balance')->default(0);
            $table->text('bill_notes')->nullable();
            // $table->string('currency')->default('bdt');
            $table->string('bill_payment_method')->nullable();
            $table->foreignId('vendor_id')->constrained('vendors')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('chart_of_account_id')->nullable()->constrained('chart_of_accounts')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('bill_bank_account_id')->nullable()->constrained('bank_accounts')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
