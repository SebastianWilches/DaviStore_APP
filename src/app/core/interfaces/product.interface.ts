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
  // Datos de categoría que devuelve el backend
  category_name?: string;
  category_slug?: string;
  // Objeto category opcional (para compatibilidad)
  category?: {
    id?: string;
    name?: string;
    slug?: string;
  };
}

/**
 * Interfaz de Categoría
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  parent_name?: string | null;
  parent_slug?: string | null;
  children?: Category[];
}

/**
 * Filtros para búsqueda de productos
 */
export interface ProductFilters {
  search?: string;
  category?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isActive?: boolean;
  sortBy?: string;
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

