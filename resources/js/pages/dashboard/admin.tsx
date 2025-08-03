import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import type { AdminStats, Order, Review } from '@/types/dashboard';

interface Props {
    stats: AdminStats;
    recentOrders: Order[];
    recentReviews: Review[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentOrders, recentReviews }: Props) {
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
                        <h1 className="text-3xl font-bold text-gray-900">📊 Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Business overview and management</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/services/create">
                            <Button>Add Service</Button>
                        </Link>
                        <Link href="/reports">
                            <Button variant="outline">View Reports</Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">📦</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⏰</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pending_orders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.total_revenue)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Active Customers</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.active_customers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Staff & Services Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Staff Members</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.staff_count}</p>
                            </div>
                            <span className="text-3xl">👩‍💼</span>
                        </div>
                        <Link href="/users?role=staff" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                            Manage Staff →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Couriers</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.courier_count}</p>
                            </div>
                            <span className="text-3xl">🚚</span>
                        </div>
                        <Link href="/users?role=courier" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                            Manage Couriers →
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Services</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.active_services}</p>
                            </div>
                            <span className="text-3xl">🧺</span>
                        </div>
                        <Link href="/services" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                            Manage Services →
                        </Link>
                    </div>
                </div>

                {/* Recent Orders & Reviews */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentOrders.slice(0, 5).map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{order.order_number}</p>
                                            <p className="text-sm text-gray-500">{order.customer.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {order.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/orders" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">
                                View All Orders →
                            </Link>
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentReviews.map((review) => (
                                    <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-medium text-gray-900">{review.customer.name}</p>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                                        ⭐
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {review.comment && (
                                            <p className="text-sm text-gray-600">{review.comment}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Link href="/reviews" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">
                                View All Reviews →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/orders">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">📦</span>
                                <span className="text-sm font-medium">Manage Orders</span>
                            </div>
                        </Link>
                        <Link href="/services">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">🧺</span>
                                <span className="text-sm font-medium">Services & Pricing</span>
                            </div>
                        </Link>
                        <Link href="/users">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">👥</span>
                                <span className="text-sm font-medium">User Management</span>
                            </div>
                        </Link>
                        <Link href="/settings">
                            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-3xl block mb-2">⚙️</span>
                                <span className="text-sm font-medium">System Settings</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}