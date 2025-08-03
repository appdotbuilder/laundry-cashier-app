<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $stats = [
                'total_orders' => Order::count(),
                'pending_orders' => Order::where('status', 'pending')->count(),
                'active_customers' => User::customers()->where('is_active', true)->count(),
                'total_revenue' => Order::where('payment_status', 'paid')->sum('final_total'),
                'active_services' => Service::where('is_active', true)->count(),
                'staff_count' => User::staff()->where('is_active', true)->count(),
                'courier_count' => User::couriers()->where('is_active', true)->count(),
            ];

            $recentOrders = Order::with(['customer', 'assignedCourier'])
                ->latest()
                ->take(10)
                ->get();

            $recentReviews = Review::with(['customer', 'order'])
                ->latest()
                ->take(5)
                ->get();

            return Inertia::render('dashboard/admin', [
                'stats' => $stats,
                'recentOrders' => $recentOrders,
                'recentReviews' => $recentReviews,
            ]);
        }

        if ($user->role === 'staff') {
            $stats = [
                'pending_orders' => Order::where('status', 'pending')->count(),
                'confirmed_orders' => Order::where('status', 'confirmed')->count(),
                'in_process_orders' => Order::where('status', 'in_process')->count(),
                'ready_orders' => Order::where('status', 'ready')->count(),
            ];

            $todayOrders = Order::with(['customer', 'items.service', 'assignedCourier'])
                ->whereDate('created_at', today())
                ->latest()
                ->take(20)
                ->get();

            $availableCouriers = User::couriers()
                ->where('is_active', true)
                ->get();

            return Inertia::render('dashboard/staff', [
                'stats' => $stats,
                'todayOrders' => $todayOrders,
                'availableCouriers' => $availableCouriers,
            ]);
        }

        if ($user->role === 'courier') {
            $stats = [
                'pending_pickup' => Order::where('assigned_courier_id', $user->id)
                    ->where('status', 'pickup_assigned')
                    ->count(),
                'pending_delivery' => Order::where('assigned_courier_id', $user->id)
                    ->where('status', 'out_for_delivery')
                    ->count(),
                'completed_today' => Order::where('assigned_courier_id', $user->id)
                    ->whereIn('status', ['delivered'])
                    ->whereDate('delivery_completed_at', today())
                    ->count(),
            ];

            $assignedOrders = Order::with([
                'customer',
                'pickupAddress',
                'deliveryAddress',
                'items.service'
            ])
                ->where('assigned_courier_id', $user->id)
                ->whereIn('status', ['pickup_assigned', 'picked_up', 'out_for_delivery'])
                ->orderBy('pickup_scheduled_at')
                ->get();

            return Inertia::render('dashboard/courier', [
                'stats' => $stats,
                'assignedOrders' => $assignedOrders,
            ]);
        }

        if ($user->role === 'customer') {
            $stats = [
                'total_orders' => Order::where('customer_id', $user->id)->count(),
                'active_orders' => Order::where('customer_id', $user->id)
                    ->whereNotIn('status', ['delivered', 'cancelled'])
                    ->count(),
                'completed_orders' => Order::where('customer_id', $user->id)
                    ->where('status', 'delivered')
                    ->count(),
            ];

            $recentOrders = Order::with(['items.service', 'assignedCourier'])
                ->where('customer_id', $user->id)
                ->latest()
                ->take(5)
                ->get();

            $activeOrders = Order::with(['items.service', 'assignedCourier'])
                ->where('customer_id', $user->id)
                ->whereNotIn('status', ['delivered', 'cancelled'])
                ->latest()
                ->get();

            return Inertia::render('dashboard/customer', [
                'stats' => $stats,
                'recentOrders' => $recentOrders,
                'activeOrders' => $activeOrders,
                'services' => Service::active()->get(),
            ]);
        }

        return redirect()->route('home');
    }
}