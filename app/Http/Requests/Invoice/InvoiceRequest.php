<?php

namespace App\Http\Requests\Invoice;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'invoice_number' => 'required|string',
            'invoice_issue_date' => 'required|date',
            'due_date' => 'required|date',
            'destination' => 'required|string',
            'cartoon_amount' => 'required|numeric',
            'vat' => 'numeric',
            'exchange' => 'numeric',
            'paid_amount' => 'required|numeric',
            'due_balance' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'notes' => 'string',
            'currency' => 'required|string',
        ];
    }
}
