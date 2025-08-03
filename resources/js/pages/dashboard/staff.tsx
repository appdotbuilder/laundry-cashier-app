import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import type { StaffStats, Order, User } from '@/types/dashboard';

interface Props {
    stats: StaffStats;
    todayOrders: Order[];
    availableCouriers: User[];
    [key: string]: unknown;
}

export default function StaffDashboard({ stats, todayOrders, availableCouriers }: Props) {
    const [updating, setUpdating] = useState(false);

    const getStatusColor = (status: string) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'confirmed': 'bg-blue-100 text-blue-800',
            'pickup_assigned': 'bg-indigo-100 text-indigo-800',
            'picked_up': 'bg-purple-100 text-purple-800',
            'in_process': 'bg-orange-100 text-orange-800',
            'ready': 'bg-green-100 text-green-800',
            'out_for_delivery': 'bg-cyan-100 text-cyan-800',
            'delivered': 'bg-emerald-100 text-emerald-800',
            'cancelled': 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    const updateOrderStatus = (orderId: number, status: string, courierId?: number) => {
        setUpdating(true);
        router.patch(`/orders/${orderId}`, {
            status,
            assigned_courier_id: courierId,
        }, {
            preserveState: true,
            onFinish: () => setUpdating(false),
        });
    };

    const nextStatusMap: { [key: string]: string } = {
        'pending': 'confirmed',
        'confirmed': 'pickup_assigned',
        'picked_up': 'in_process',
        'in_process': 'ready',
        'ready': 'out_for_delivery',
    };

    const getNextStatusLabel = (status: string) => {
        const labels: { [key: string]: string } = {
            'pending': 'Confirm Order',
            'confirmed': 'Assign Courier',
            'picked_up': 'Start Processing',
            'in_process': 'Mark as Ready',
            'ready': 'Send for Delivery',
        };
        return labels[status] || 'Update Status';
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👩‍💼 Staff Dashboard</h1>
                        <p className="text-gray-600 mt-1">Operational management and order processing</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Today: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Pending</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pending_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Confirmed</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.confirmed_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🔄</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Processing</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.in_process_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Ready</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.ready_orders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Orders */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">📦 Today's Orders</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {todayOrders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{order.order_number}</h4>
                                            <p className="text-sm text-gray-600">Customer: {order.customer.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Phone: {order.customer.phone || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {formatCurrency(order.estimated_total)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Services:</p>
                                            <ul className="text-sm text-gray-600">
                                                {order.items.map((item, index: number) => (
                                                    <li key={index}>
                                                        {item.service.name} - {item.estimated_quantity} {item.service.unit_type}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            {order.pickup_scheduled_at && (
                                                <p className="text-sm text-gray-600">
                                                    Pickup: {new Date(order.pickup_scheduled_at).toLocaleString()}
                                                </p>
                                            )}
                                            {order.assigned_courier && (
                                                <p className="text-sm text-gray-600">
                                                    Courier: {order.assigned_courier.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                        {nextStatusMap[order.status] && (
                                            <>
                                                {order.status === 'confirmed' ? (
                                                    <div className="flex items-center space-x-2 flex-wrap">
                                                        {availableCouriers.map((courier) => (
                                                            <Button
                                                                key={courier.id}
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => updateOrderStatus(order.id, 'pickup_assigned', courier.id)}
                                                                disabled={updating}
                                                            >
                                                                Assign to {courier.name}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateOrderStatus(order.id, nextStatusMap[order.status])}
                                                        disabled={updating}
                                                    >
                                                        {getNextStatusLabel(order.status)}
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => router.visit(`/orders/${order.id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {todayOrders.length === 0 && (
                            <div className="text-center py-12">
                                <span className="text-6xl">📋</span>
                                <h3 className="text-lg font-medium text-gray-900 mt-4">No orders today</h3>
                                <p className="text-gray-500">New orders will appear here as they come in.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div 
                            className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => router.visit('/orders?status=pending')}
                        >
                            <span className="text-3xl block mb-2">⏰</span>
                            <span className="text-sm font-medium">Pending Orders</span>
                        </div>
                        <div 
                            className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => router.visit('/orders?status=in_process')}
                        >
                            <span className="text-3xl block mb-2">🔄</span>
                            <span className="text-sm font-medium">In Process</span>
                        </div>
                        <div 
                            className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => router.visit('/orders?status=ready')}
                        >
                            <span className="text-3xl block mb-2">✅</span>
                            <span className="text-sm font-medium">Ready Orders</span>
                        </div>
                        <div 
                            className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => router.visit('/services')}
                        >
                            <span className="text-3xl block mb-2">🧺</span>
                            <span className="text-sm font-medium">Manage Services</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}