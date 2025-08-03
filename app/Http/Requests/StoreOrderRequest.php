<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isCustomer();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pickup_address_id' => 'required|exists:customer_addresses,id',
            'delivery_address_id' => 'required|exists:customer_addresses,id',
            'pickup_scheduled_at' => 'required|date|after:now',
            'delivery_scheduled_at' => 'required|date|after:pickup_scheduled_at',
            'customer_notes' => 'nullable|string|max:1000',
            'estimated_total' => 'required|numeric|min:0',
            'delivery_fee' => 'nullable|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.service_id' => 'required|exists:services,id',
            'items.*.quantity' => 'required|numeric|min:0.1',
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
            'pickup_address_id.required' => 'Please select a pickup address.',
            'delivery_address_id.required' => 'Please select a delivery address.',
            'pickup_scheduled_at.required' => 'Please select a pickup time.',
            'pickup_scheduled_at.after' => 'Pickup time must be in the future.',
            'delivery_scheduled_at.required' => 'Please select a delivery time.',
            'delivery_scheduled_at.after' => 'Delivery time must be after pickup time.',
            'items.required' => 'Please add at least one service item.',
            'items.*.service_id.required' => 'Please select a service.',
            'items.*.quantity.required' => 'Please specify the quantity.',
            'items.*.quantity.min' => 'Quantity must be at least 0.1.',
        ];
    }
}