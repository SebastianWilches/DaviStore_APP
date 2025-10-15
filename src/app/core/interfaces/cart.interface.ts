import { Product } from './product.interface';

/**
 * Interfaz de Carrito
 */
export interface Cart {
  id: string;
  user_id: string;
  status: CartStatus;
  total_items: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

/**
 * Interfaz de Item del Carrito
 */
export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

/**
 * Estados del carrito
 */
export enum CartStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned'
}

/**
 * Resumen del carrito
 */
export interface CartSummary {
  total_items: number;
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
}

/**
 * Datos para agregar producto al carrito
 */
export interface AddToCartData {
  product_id: string;
  quantity: number;
}

/**
 * Datos para actualizar cantidad de item
 */
export interface UpdateCartItemData {
  quantity: number;
}

