/**
 * Interfaz de Producto
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

/**
 * Interfaz de Categoría
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  parent_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  children?: Category[];
}

/**
 * Filtros para búsqueda de productos
 */
export interface ProductFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Datos para crear/actualizar producto
 */
export interface ProductData {
  name: string;
  description: string;
  sku: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  image_url?: string;
  is_active?: boolean;
}

