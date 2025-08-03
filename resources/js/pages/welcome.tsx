import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    const user = auth.user;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">🧺 CleanFlow</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">Welcome, {user.name}</span>
                                    <Link
                                        href="/dashboard"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        🧺 Professional Laundry & Cashier Management
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Complete business solution for laundry services with pickup & delivery, 
                        real-time tracking, payment processing, and comprehensive staff management.
                    </p>
                    {!user && (
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" className="px-8 py-3 text-lg">
                                    Start Free Trial 🚀
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Everything You Need to Run Your Laundry Business
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Customer Features */}
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Portal</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Online order placement</li>
                                <li>• Multiple address management</li>
                                <li>• Real-time order tracking</li>
                                <li>• Payment & order history</li>
                                <li>• Service reviews & ratings</li>
                            </ul>
                        </div>

                        {/* Staff Features */}
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                            <div className="text-4xl mb-4">👩‍💼</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Staff Dashboard</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Order management system</li>
                                <li>• Weight/quantity verification</li>
                                <li>• Price calculation & billing</li>
                                <li>• Receipt printing</li>
                                <li>• Cash & QRIS payments</li>
                            </ul>
                        </div>

                        {/* Courier Features */}
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Courier App</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Mobile-optimized interface</li>
                                <li>• Pickup & delivery tasks</li>
                                <li>• Google Maps integration</li>
                                <li>• Status updates</li>
                                <li>• Route optimization</li>
                            </ul>
                        </div>

                        {/* Admin Features */}
                        <div className="text-center p-6 bg-orange-50 rounded-xl">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Control</h3>
                            <ul className="text-gray-600 space-y-2 text-sm">
                                <li>• Business analytics dashboard</li>
                                <li>• Staff & courier management</li>
                                <li>• Service & pricing setup</li>
                                <li>• Sales & performance reports</li>
                                <li>• System configuration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Flow */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Streamlined Order Flow
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">1. Customer Orders</h4>
                            <p className="text-gray-600 text-sm">Online ordering with pickup scheduling</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✅</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">2. Staff Confirms</h4>
                            <p className="text-gray-600 text-sm">Order verification and courier assignment</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🚚</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">3. Pickup & Process</h4>
                            <p className="text-gray-600 text-sm">Courier pickup and laundry processing</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏠</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">4. Delivery</h4>
                            <p className="text-gray-600 text-sm">Clean clothes delivered to customer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Multiple Payment Options
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-8 text-2xl">
                        <div className="flex items-center space-x-2">
                            <span>💳</span>
                            <span className="text-gray-700">Credit/Debit Cards</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>📱</span>
                            <span className="text-gray-700">E-Wallets</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>🏦</span>
                            <span className="text-gray-700">Virtual Account</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>📊</span>
                            <span className="text-gray-700">QRIS</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>💵</span>
                            <span className="text-gray-700">Cash/COD</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!user && (
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Streamline Your Laundry Business?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join hundreds of laundry businesses already using CleanFlow to manage their operations efficiently.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                    Start Free Trial 🚀
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">🧺 CleanFlow</h3>
                    <p className="text-gray-400 mb-4">
                        Complete laundry business management solution with pickup & delivery services.
                    </p>
                    <div className="flex justify-center space-x-6 text-sm text-gray-400">
                        <span>© 2024 CleanFlow. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}