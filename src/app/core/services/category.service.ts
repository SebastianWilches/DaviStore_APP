import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Category } from '../interfaces';

// Re-exportar Category para mantener compatibilidad
export { Category };

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  is_active?: boolean;
}

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
  parent_id?: string;
  is_active?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  /**
   * Listar todas las categorías
   */
  getCategories(includeInactive: boolean = false): Observable<ApiResponse<{ categories: Category[] }>> {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<ApiResponse<{ categories: Category[] }>>(this.apiUrl, { params });
  }

  /**
   * Obtener árbol de categorías
   */
  getCategoriesTree(): Observable<ApiResponse<{ categories: Category[] }>> {
    return this.http.get<ApiResponse<{ categories: Category[] }>>(`${this.apiUrl}/tree`);
  }

  /**
   * Obtener categoría por ID
   */
  getCategoryById(id: string): Observable<ApiResponse<{ category: Category }>> {
    return this.http.get<ApiResponse<{ category: Category }>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener categoría por slug
   */
  getCategoryBySlug(slug: string): Observable<ApiResponse<{ category: Category }>> {
    return this.http.get<ApiResponse<{ category: Category }>>(`${this.apiUrl}/slug/${slug}`);
  }

  /**
   * Crear nueva categoría (Admin)
   */
  createCategory(data: CreateCategoryData): Observable<ApiResponse<{ category: Category }>> {
    return this.http.post<ApiResponse<{ category: Category }>>(this.apiUrl, data);
  }

  /**
   * Actualizar categoría (Admin)
   */
  updateCategory(id: string, data: UpdateCategoryData): Observable<ApiResponse<{ category: Category }>> {
    return this.http.put<ApiResponse<{ category: Category }>>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Eliminar categoría (Admin)
   */
  deleteCategory(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
