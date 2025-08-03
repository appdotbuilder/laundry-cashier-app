import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import type { CustomerStats, Order, Service } from '@/types/dashboard';

interface Props {
    stats: CustomerStats;
    recentOrders: Order[];
    activeOrders: Order[];
    services: Service[];
    [key: string]: unknown;
}

export default function CustomerDashboard({ stats, recentOrders, activeOrders, services }: Props) {
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

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏠 Customer Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage your laundry orders and track progress</p>
                    </div>
                    <Link href="/orders/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">Place New Order 🧺</Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Active Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.active_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.completed_orders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Orders */}
                {activeOrders.length > 0 && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">🔄 Active Orders</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {activeOrders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{order.order_number}</h4>
                                                <p className="text-sm text-gray-500">
                                                    Placed on {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status.replace('_', ' ').toUpperCase()}
                                            </span>
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
                                                <p className="text-sm font-medium text-gray-700">
                                                    Total: {formatCurrency(order.estimated_total)}
                                                </p>
                                                {order.assigned_courier && (
                                                    <p className="text-sm text-gray-600">
                                                        Courier: {order.assigned_courier.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <Link href={`/orders/${order.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Services & Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Available Services */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">🧺 Available Services</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {services.slice(0, 4).map((service) => (
                                    <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{service.name}</p>
                                            <p className="text-sm text-gray-500">{service.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">
                                                {formatCurrency(service.price_per_unit)}
                                            </p>
                                            <p className="text-xs text-gray-500">per {service.unit_type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/orders/create" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">
                                Place New Order →
                            </Link>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">📋 Recent Orders</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{order.order_number}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status.replace('_', ' ')}
                                            </span>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {formatCurrency(order.estimated_total)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/orders" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">
                                View All Orders →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">⚡ Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/orders/create">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">🧺</span>
                                <span className="text-sm font-medium">New Order</span>
                            </div>
                        </Link>
                        <Link href="/orders">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">📦</span>
                                <span className="text-sm font-medium">Order History</span>
                            </div>
                        </Link>
                        <Link href="/profile">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">🏠</span>
                                <span className="text-sm font-medium">Manage Addresses</span>
                            </div>
                        </Link>
                        <Link href="/reviews">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">⭐</span>
                                <span className="text-sm font-medium">Reviews</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}