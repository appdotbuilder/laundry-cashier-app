import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import type { CourierStats, Order } from '@/types/dashboard';

interface Props {
    stats: CourierStats;
    assignedOrders: Order[];
    [key: string]: unknown;
}

export default function CourierDashboard({ stats, assignedOrders }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            'pickup_assigned': 'bg-indigo-100 text-indigo-800',
            'picked_up': 'bg-purple-100 text-purple-800',
            'out_for_delivery': 'bg-cyan-100 text-cyan-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    const updateOrderStatus = (orderId: number, status: string) => {
        router.patch(`/orders/${orderId}`, {
            status,
        }, {
            preserveState: true,
        });
    };

    const getGoogleMapsUrl = (address: string) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    const nextActionMap: { [key: string]: { status: string, label: string } } = {
        'pickup_assigned': { status: 'picked_up', label: 'Mark as Picked Up' },
        'out_for_delivery': { status: 'delivered', label: 'Mark as Delivered' },
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🚚 Courier Dashboard</h1>
                        <p className="text-gray-600 mt-1">Pickup and delivery task management</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        Today: {new Date().toLocaleDateString()}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">📦</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Pending Pickup</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pending_pickup}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-cyan-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🚚</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Pending Delivery</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pending_delivery}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Completed Today</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.completed_today}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assigned Tasks */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">📋 Your Assigned Tasks</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {assignedOrders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{order.order_number}</h4>
                                            <p className="text-sm text-gray-600">Customer: {order.customer.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Phone: {order.customer.phone || 'N/A'}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                    
                                    {/* Task Type */}
                                    <div className="mb-4">
                                        {order.status === 'pickup_assigned' && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                <div className="flex items-center mb-2">
                                                    <span className="text-xl mr-2">📦</span>
                                                    <h5 className="font-medium text-blue-900">PICKUP TASK</h5>
                                                </div>
                                                <p className="text-sm text-blue-800 mb-2">
                                                    <strong>Address:</strong> {order.pickup_address?.full_address || order.pickup_address?.address}
                                                </p>
                                                {order.pickup_scheduled_at && (
                                                    <p className="text-sm text-blue-800 mb-2">
                                                        <strong>Scheduled:</strong> {new Date(order.pickup_scheduled_at).toLocaleString()}
                                                    </p>
                                                )}
                                                <div className="flex space-x-2 mt-3">
                                                    <a
                                                        href={getGoogleMapsUrl(order.pickup_address?.full_address || order.pickup_address?.address || '')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        📍 Navigate
                                                    </a>
                                                    <a
                                                        href={`tel:${order.customer.phone}`}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                                                    >
                                                        📞 Call Customer
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {order.status === 'out_for_delivery' && (
                                            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                                                <div className="flex items-center mb-2">
                                                    <span className="text-xl mr-2">🚚</span>
                                                    <h5 className="font-medium text-cyan-900">DELIVERY TASK</h5>
                                                </div>
                                                <p className="text-sm text-cyan-800 mb-2">
                                                    <strong>Address:</strong> {order.delivery_address?.full_address || order.delivery_address?.address}
                                                </p>
                                                {order.delivery_scheduled_at && (
                                                    <p className="text-sm text-cyan-800 mb-2">
                                                        <strong>Scheduled:</strong> {new Date(order.delivery_scheduled_at).toLocaleString()}
                                                    </p>
                                                )}
                                                <div className="flex space-x-2 mt-3">
                                                    <a
                                                        href={getGoogleMapsUrl(order.delivery_address?.full_address || order.delivery_address?.address || '')}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-cyan-600 hover:bg-cyan-700"
                                                    >
                                                        📍 Navigate
                                                    </a>
                                                    <a
                                                        href={`tel:${order.customer.phone}`}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
                                                    >
                                                        📞 Call Customer
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                                            <p className="text-sm font-medium text-gray-700">
                                                Total: {formatCurrency(order.estimated_total)}
                                            </p>
                                            {order.customer_notes && (
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <strong>Notes:</strong> {order.customer_notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        {nextActionMap[order.status] && (
                                            <Button
                                                size="sm"
                                                onClick={() => updateOrderStatus(order.id, nextActionMap[order.status].status)}
                                            >
                                                {nextActionMap[order.status].label}
                                            </Button>
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

                        {assignedOrders.length === 0 && (
                            <div className="text-center py-12">
                                <span className="text-6xl">🚚</span>
                                <h3 className="text-lg font-medium text-gray-900 mt-4">No assigned tasks</h3>
                                <p className="text-gray-500">New pickup and delivery tasks will appear here when assigned.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">📊 Today's Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{stats.pending_pickup + stats.pending_delivery}</div>
                            <div className="text-sm text-gray-500">Total Active Tasks</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.completed_today}</div>
                            <div className="text-sm text-gray-500">Completed Today</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.completed_today > 0 ? Math.round((stats.completed_today / (stats.completed_today + stats.pending_pickup + stats.pending_delivery)) * 100) : 0}%
                            </div>
                            <div className="text-sm text-gray-500">Completion Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}