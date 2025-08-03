<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\OrderStatusHistory;
use App\Models\Service;
use App\Models\TimeSlot;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Order::with(['customer', 'items.service', 'assignedCourier']);

        // Filter based on user role
        if ($user->isCustomer()) {
            $query->where('customer_id', $user->id);
        } elseif ($user->isCourier()) {
            $query->where('assigned_courier_id', $user->id);
        }

        // Apply filters
        if ($request->status) {
            $query->where('status', $request->status);
        }

        $orders = $query->latest()->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        
        return Inertia::render('orders/create', [
            'services' => Service::active()->get(),
            'addresses' => $user->addresses,
            'timeSlots' => [
                'pickup' => TimeSlot::active()->pickup()->get(),
                'delivery' => TimeSlot::active()->delivery()->get(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $user = $request->user();
        $validated = $request->validated();

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'customer_id' => $user->id,
            'pickup_address_id' => $validated['pickup_address_id'],
            'delivery_address_id' => $validated['delivery_address_id'],
            'pickup_scheduled_at' => $validated['pickup_scheduled_at'],
            'delivery_scheduled_at' => $validated['delivery_scheduled_at'],
            'customer_notes' => $validated['customer_notes'] ?? null,
            'estimated_total' => $validated['estimated_total'],
            'delivery_fee' => $validated['delivery_fee'] ?? 0,
        ]);

        // Create order items
        foreach ($validated['items'] as $item) {
            $service = Service::findOrFail($item['service_id']);
            $subtotal = $item['quantity'] * $service->price_per_unit;
            
            $order->items()->create([
                'service_id' => $item['service_id'],
                'estimated_quantity' => $item['quantity'],
                'price_per_unit' => $service->price_per_unit,
                'estimated_subtotal' => $subtotal,
            ]);
        }

        // Create status history
        OrderStatusHistory::create([
            'order_id' => $order->id,
            'status' => 'pending',
            'notes' => 'Order created by customer',
            'updated_by' => $user->id,
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order placed successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load([
            'customer',
            'pickupAddress',
            'deliveryAddress',
            'items.service',
            'statusHistories.updatedBy',
            'assignedCourier',
            'review'
        ]);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $user = $request->user();
        $validated = $request->validate([
            'status' => 'required|string|in:confirmed,pickup_assigned,picked_up,in_process,ready,out_for_delivery,delivered,cancelled',
            'notes' => 'nullable|string',
            'assigned_courier_id' => 'nullable|exists:users,id',
            'actual_quantities' => 'nullable|array',
            'actual_quantities.*.order_item_id' => 'required|exists:order_items,id',
            'actual_quantities.*.quantity' => 'required|numeric|min:0',
        ]);

        // Update order status
        $order->update([
            'status' => $validated['status'],
            'assigned_courier_id' => $validated['assigned_courier_id'] ?? $order->assigned_courier_id,
        ]);

        // Update actual quantities if provided
        if (isset($validated['actual_quantities'])) {
            foreach ($validated['actual_quantities'] as $quantityData) {
                $orderItem = $order->items()->find($quantityData['order_item_id']);
                if ($orderItem) {
                    $pricePerUnit = (float) $orderItem->getAttribute('price_per_unit');
                    $actualSubtotal = $quantityData['quantity'] * $pricePerUnit;
                    $orderItem->update([
                        'actual_quantity' => $quantityData['quantity'],
                        'actual_subtotal' => $actualSubtotal,
                    ]);
                }
            }

            // Recalculate final total
            $finalTotal = $order->items()->sum('actual_subtotal') + (float) $order->delivery_fee;
            $order->update(['final_total' => $finalTotal]);
        }

        // Create status history
        OrderStatusHistory::create([
            'order_id' => $order->id,
            'status' => $validated['status'],
            'notes' => $validated['notes'],
            'updated_by' => $user->id,
        ]);

        return redirect()->back()
            ->with('success', 'Order updated successfully!');
    }
}