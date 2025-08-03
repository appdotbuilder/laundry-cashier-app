export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    name: string;
    description?: string;
    unit_type: 'kg' | 'item';
    price_per_unit: number;
    min_quantity: number;
    processing_days: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CustomerAddress {
    id: number;
    user_id: number;
    label: string;
    address: string;
    city: string;
    postal_code: string;
    latitude?: number;
    longitude?: number;
    notes?: string;
    is_default: boolean;
    full_address?: string;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    service_id: number;
    estimated_quantity: number;
    actual_quantity?: number;
    price_per_unit: number;
    estimated_subtotal: number;
    actual_subtotal?: number;
    service: Service;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    order_number: string;
    customer_id: number;
    pickup_address_id: number;
    delivery_address_id: number;
    status: string;
    payment_status: string;
    payment_method?: string;
    pickup_scheduled_at?: string;
    delivery_scheduled_at?: string;
    pickup_completed_at?: string;
    delivery_completed_at?: string;
    estimated_total: number;
    final_total: number;
    delivery_fee: number;
    customer_notes?: string;
    staff_notes?: string;
    assigned_courier_id?: number;
    customer: User;
    pickup_address?: CustomerAddress;
    delivery_address?: CustomerAddress;
    assigned_courier?: User;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    order_id: number;
    customer_id: number;
    rating: number;
    comment?: string;
    customer: User;
    order: Order;
    created_at: string;
    updated_at: string;
}

export interface AdminStats {
    total_orders: number;
    pending_orders: number;
    active_customers: number;
    total_revenue: number;
    active_services: number;
    staff_count: number;
    courier_count: number;
}

export interface StaffStats {
    pending_orders: number;
    confirmed_orders: number;
    in_process_orders: number;
    ready_orders: number;
}

export interface CourierStats {
    pending_pickup: number;
    pending_delivery: number;
    completed_today: number;
}

export interface CustomerStats {
    total_orders: number;
    active_orders: number;
    completed_orders: number;
}