/**
 * Interfaces del Carrito de Compras
 */

import { Product } from './product.interface';

/**
 * Item del carrito
 */
export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  price_at_addition: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

/**
 * Carrito completo
 */
export interface Cart {
  id: string;
  user_id: string;
  status: 'active' | 'completed' | 'abandoned';
  created_at: string;
  updated_at: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total: number;
}

/**
 * Resumen del carrito
 */
export interface CartSummary {
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping_cost: number;
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
