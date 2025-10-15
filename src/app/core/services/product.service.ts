import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Product, ProductFilters } from '../interfaces';

// Re-exportar ProductFilters para mantener compatibilidad
export { ProductFilters };

// La respuesta del backend devuelve un array de productos directamente en data
// y la paginación en meta.pagination

export interface CreateProductData {
  name: string;
  description?: string;
  sku: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  image_url?: string;
  is_active?: boolean;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  sku?: string;
  price?: number;
  stock_quantity?: number;
  category_id?: string;
  image_url?: string;
  is_active?: boolean;
}

export interface UpdateStockData {
  stock: number;
  operation?: 'set' | 'add' | 'subtract';
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  /**
   * Listar productos con filtros
   */
  getProducts(filters?: ProductFilters): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams();
    
    if (filters) {
      // El backend espera 'categoryId' no 'category'
      if (filters.category) params = params.set('categoryId', filters.category);
      if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.search) params = params.set('search', filters.search);
      if (filters.inStock !== undefined) params = params.set('inStock', filters.inStock.toString());
      if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
      if (filters.page !== undefined) params = params.set('page', filters.page.toString());
      if (filters.limit !== undefined) params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<ApiResponse<Product[]>>(this.apiUrl, { params });
  }

  /**
   * Obtener producto por ID
   */
  getProductById(id: string): Observable<ApiResponse<{ product: Product }>> {
    return this.http.get<ApiResponse<{ product: Product }>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener producto por SKU
   */
  getProductBySku(sku: string): Observable<ApiResponse<{ product: Product }>> {
    return this.http.get<ApiResponse<{ product: Product }>>(`${this.apiUrl}/sku/${sku}`);
  }

  /**
   * Crear nuevo producto (Admin)
   */
  createProduct(data: CreateProductData): Observable<ApiResponse<{ product: Product }>> {
    return this.http.post<ApiResponse<{ product: Product }>>(this.apiUrl, data);
  }

  /**
   * Actualizar producto (Admin)
   */
  updateProduct(id: string, data: UpdateProductData): Observable<ApiResponse<{ product: Product }>> {
    return this.http.put<ApiResponse<{ product: Product }>>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Actualizar stock (Admin)
   */
  updateStock(id: string, data: UpdateStockData): Observable<ApiResponse<{ product: Product }>> {
    return this.http.patch<ApiResponse<{ product: Product }>>(`${this.apiUrl}/${id}/stock`, data);
  }

  /**
   * Eliminar producto (Admin)
   */
  deleteProduct(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
