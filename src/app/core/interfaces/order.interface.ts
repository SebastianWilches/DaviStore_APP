/**
 * Interfaz de Orden
 */
export interface Order {
  id: string;
  user_id: string;
  cart_id: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_postal_code: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  payment?: Payment;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

/**
 * Interfaz de Item de Orden
 */
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  product_name: string;
  product_sku: string;
}

/**
 * Interfaz de Pago
 */
export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  status: PaymentStatus;
  payment_method: string;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Estados de orden
 */
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

/**
 * Estados de pago
 */
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

/**
 * Datos para crear orden (checkout)
 */
export interface CreateOrderData {
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_postal_code: string;
  payment_method: string;
}

/**
 * Filtros para órdenes
 */
export interface OrderFilters {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

