<?php

namespace Database\Seeders;

use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusHistory;
use App\Models\Service;
use App\Models\Setting;
use App\Models\TimeSlot;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@laundry.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'phone' => '+62812345678',
            'is_active' => true,
        ]);

        // Create staff users
        $staff = User::create([
            'name' => 'Staff Member',
            'email' => 'staff@laundry.com',
            'password' => bcrypt('password'),
            'role' => 'staff',
            'phone' => '+62812345679',
            'is_active' => true,
        ]);

        // Create courier users
        $courier1 = User::create([
            'name' => 'John Courier',
            'email' => 'courier1@laundry.com',
            'password' => bcrypt('password'),
            'role' => 'courier',
            'phone' => '+62812345680',
            'is_active' => true,
        ]);

        $courier2 = User::create([
            'name' => 'Jane Courier',
            'email' => 'courier2@laundry.com',
            'password' => bcrypt('password'),
            'role' => 'courier',
            'phone' => '+62812345681',
            'is_active' => true,
        ]);

        // Create customer users
        $customer1 = User::create([
            'name' => 'Alice Customer',
            'email' => 'customer1@laundry.com',
            'password' => bcrypt('password'),
            'role' => 'customer',
            'phone' => '+62812345682',
            'is_active' => true,
        ]);

        $customer2 = User::create([
            'name' => 'Bob Customer',
            'email' => 'customer2@laundry.com',
            'password' => bcrypt('password'),
            'role' => 'customer',
            'phone' => '+62812345683',
            'is_active' => true,
        ]);

        // Create customer addresses
        CustomerAddress::create([
            'user_id' => $customer1->id,
            'label' => 'Home',
            'address' => 'Jl. Sudirman No. 123',
            'city' => 'Jakarta',
            'postal_code' => '12345',
            'is_default' => true,
        ]);

        CustomerAddress::create([
            'user_id' => $customer1->id,
            'label' => 'Office',
            'address' => 'Jl. Thamrin No. 456',
            'city' => 'Jakarta',
            'postal_code' => '12346',
            'is_default' => false,
        ]);

        CustomerAddress::create([
            'user_id' => $customer2->id,
            'label' => 'Home',
            'address' => 'Jl. Gatot Subroto No. 789',
            'city' => 'Jakarta',
            'postal_code' => '12347',
            'is_default' => true,
        ]);

        // Create services
        $services = [
            [
                'name' => 'Wash & Fold',
                'description' => 'Basic washing and folding service',
                'unit_type' => 'kg',
                'price_per_unit' => 8000,
                'min_quantity' => 1,
                'processing_days' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Wash & Iron',
                'description' => 'Washing and ironing service',
                'unit_type' => 'kg',
                'price_per_unit' => 12000,
                'min_quantity' => 1,
                'processing_days' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Dry Cleaning',
                'description' => 'Professional dry cleaning',
                'unit_type' => 'item',
                'price_per_unit' => 25000,
                'min_quantity' => 1,
                'processing_days' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Express Service',
                'description' => 'Same day service (additional charge)',
                'unit_type' => 'kg',
                'price_per_unit' => 15000,
                'min_quantity' => 1,
                'processing_days' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Bed Sheets & Comforters',
                'description' => 'Large items washing service',
                'unit_type' => 'item',
                'price_per_unit' => 20000,
                'min_quantity' => 1,
                'processing_days' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Create time slots
        $timeSlots = [
            // Pickup time slots
            ['type' => 'pickup', 'start_time' => '08:00', 'end_time' => '10:00', 'is_active' => true],
            ['type' => 'pickup', 'start_time' => '10:00', 'end_time' => '12:00', 'is_active' => true],
            ['type' => 'pickup', 'start_time' => '13:00', 'end_time' => '15:00', 'is_active' => true],
            ['type' => 'pickup', 'start_time' => '15:00', 'end_time' => '17:00', 'is_active' => true],
            
            // Delivery time slots
            ['type' => 'delivery', 'start_time' => '09:00', 'end_time' => '11:00', 'is_active' => true],
            ['type' => 'delivery', 'start_time' => '11:00', 'end_time' => '13:00', 'is_active' => true],
            ['type' => 'delivery', 'start_time' => '14:00', 'end_time' => '16:00', 'is_active' => true],
            ['type' => 'delivery', 'start_time' => '16:00', 'end_time' => '18:00', 'is_active' => true],
        ];

        foreach ($timeSlots as $slot) {
            TimeSlot::create($slot);
        }

        // Create settings
        $settings = [
            ['key' => 'business_name', 'value' => 'CleanFlow Laundry', 'type' => 'string', 'description' => 'Business name'],
            ['key' => 'business_phone', 'value' => '+62212345678', 'type' => 'string', 'description' => 'Business phone number'],
            ['key' => 'business_email', 'value' => 'info@cleanflow.com', 'type' => 'string', 'description' => 'Business email'],
            ['key' => 'business_address', 'value' => 'Jl. Raya Laundry No. 1, Jakarta', 'type' => 'string', 'description' => 'Business address'],
            ['key' => 'delivery_fee', 'value' => '5000', 'type' => 'integer', 'description' => 'Delivery fee in IDR'],
            ['key' => 'min_order_amount', 'value' => '20000', 'type' => 'integer', 'description' => 'Minimum order amount in IDR'],
            ['key' => 'operating_hours_start', 'value' => '08:00', 'type' => 'string', 'description' => 'Operating hours start time'],
            ['key' => 'operating_hours_end', 'value' => '18:00', 'type' => 'string', 'description' => 'Operating hours end time'],
            ['key' => 'is_pickup_delivery_active', 'value' => '1', 'type' => 'boolean', 'description' => 'Enable pickup and delivery service'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }

        // Create sample orders
        $order1 = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'customer_id' => $customer1->id,
            'pickup_address_id' => 1, // Customer1's home address
            'delivery_address_id' => 1, // Same address
            'status' => 'confirmed',
            'payment_status' => 'pending',
            'pickup_scheduled_at' => now()->addDay(),
            'delivery_scheduled_at' => now()->addDays(3),
            'estimated_total' => 50000,
            'final_total' => 50000,
            'delivery_fee' => 5000,
            'customer_notes' => 'Please handle with care, delicate fabrics included.',
            'assigned_courier_id' => $courier1->id,
        ]);

        // Create order items for order1
        OrderItem::create([
            'order_id' => $order1->id,
            'service_id' => 1, // Wash & Fold
            'estimated_quantity' => 3,
            'actual_quantity' => 3,
            'price_per_unit' => 8000,
            'estimated_subtotal' => 24000,
            'actual_subtotal' => 24000,
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'service_id' => 2, // Wash & Iron
            'estimated_quantity' => 2,
            'actual_quantity' => 2,
            'price_per_unit' => 12000,
            'estimated_subtotal' => 24000,
            'actual_subtotal' => 24000,
        ]);

        // Create order status history
        OrderStatusHistory::create([
            'order_id' => $order1->id,
            'status' => 'pending',
            'notes' => 'Order created by customer',
            'updated_by' => $customer1->id,
        ]);

        OrderStatusHistory::create([
            'order_id' => $order1->id,
            'status' => 'confirmed',
            'notes' => 'Order confirmed by staff',
            'updated_by' => $staff->id,
        ]);

        // Create another sample order
        $order2 = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'customer_id' => $customer2->id,
            'pickup_address_id' => 3, // Customer2's home address
            'delivery_address_id' => 3, // Same address
            'status' => 'pending',
            'payment_status' => 'pending',
            'pickup_scheduled_at' => now()->addHours(6),
            'delivery_scheduled_at' => now()->addDays(2),
            'estimated_total' => 75000,
            'final_total' => 0,
            'delivery_fee' => 5000,
            'customer_notes' => 'Express service needed.',
        ]);

        // Create order items for order2
        OrderItem::create([
            'order_id' => $order2->id,
            'service_id' => 4, // Express Service
            'estimated_quantity' => 4,
            'price_per_unit' => 15000,
            'estimated_subtotal' => 60000,
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'service_id' => 3, // Dry Cleaning
            'estimated_quantity' => 1,
            'price_per_unit' => 25000,
            'estimated_subtotal' => 25000,
        ]);

        // Create order status history for order2
        OrderStatusHistory::create([
            'order_id' => $order2->id,
            'status' => 'pending',
            'notes' => 'Order created by customer',
            'updated_by' => $customer2->id,
        ]);
    }
}