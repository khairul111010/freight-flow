<?php

namespace App\Http\Requests\Organization;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationRequest extends FormRequest
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
            'name' => 'string',
            'description' => 'string',
            'address' => 'string',
            'logo' => 'mimes:jpeg,jpg,png,webp|max:10000',
            'currency' => 'string',
            'invoice_prefix' => 'string',
            'invoice_start_number' => 'numeric'
        ];
    }
}
