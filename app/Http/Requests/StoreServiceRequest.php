<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'unit_type' => 'required|in:kg,item',
            'price_per_unit' => 'required|numeric|min:0',
            'min_quantity' => 'required|integer|min:1',
            'processing_days' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Service name is required.',
            'unit_type.required' => 'Please select a unit type.',
            'unit_type.in' => 'Unit type must be either kg or item.',
            'price_per_unit.required' => 'Price per unit is required.',
            'price_per_unit.min' => 'Price must be greater than or equal to 0.',
            'min_quantity.required' => 'Minimum quantity is required.',
            'min_quantity.min' => 'Minimum quantity must be at least 1.',
            'processing_days.required' => 'Processing days is required.',
            'processing_days.min' => 'Processing days must be at least 1.',
        ];
    }
}