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
            $table->date('issue_date');
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
            $table->float('invoice_freight_amount')->nullable();
            $table->float('thc')->nullable();
            $table->float('ssc')->nullable();
            $table->float('cd')->nullable();
            $table->float('cgc')->nullable();
            $table->float('dtc')->nullable();
            $table->float('ait')->nullable();
            $table->float('ams')->nullable();
            $table->float('itt')->nullable();
            $table->float('others')->nullable();
            $table->float('invoice_vat')->nullable();
            $table->float('invoice_total_usd')->nullable();
            $table->float('exchange_rate')->default(0);
            $table->float('invoice_receivable_amount_bdt')->default(0);
            $table->float('invoice_received_amount')->default(0);
            $table->float('invoice_due_balance')->default(0);
            $table->float('invoice_discounted_amount')->default(0)->nullable();
            $table->text('invoice_note')->nullable();
            // $table->string('currency')->default('bdt');
            $table->foreignId('customer_id')->constrained('customers')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('chart_of_account_id')->nullable()->constrained('chart_of_accounts')->onUpdate('cascade')->onDelete('cascade');

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
