import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, User } from '../interfaces';

export interface UserFilters {
  role?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// La respuesta del backend devuelve un array de usuarios directamente en data
// y la paginación en meta.pagination

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  role_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  /**
   * Listar usuarios (Admin)
   */
  getUsers(filters?: UserFilters): Observable<ApiResponse<User[]>> {
    let params = new HttpParams();
    
    if (filters) {
      // El backend espera 'roleId' no 'role'
      if (filters.role) params = params.set('roleId', filters.role);
      if (filters.isActive !== undefined) params = params.set('isActive', filters.isActive.toString());
      if (filters.page !== undefined) params = params.set('page', filters.page.toString());
      if (filters.limit !== undefined) params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<ApiResponse<User[]>>(this.apiUrl, { params });
  }

  /**
   * Obtener usuario por ID
   */
  getUserById(id: string): Observable<ApiResponse<{ user: User }>> {
    return this.http.get<ApiResponse<{ user: User }>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualizar usuario
   */
  updateUser(id: string, data: UpdateUserData): Observable<ApiResponse<{ user: User }>> {
    return this.http.put<ApiResponse<{ user: User }>>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Eliminar usuario (Admin)
   */
  deleteUser(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Activar usuario (Admin)
   */
  activateUser(id: string): Observable<ApiResponse<{ user: User }>> {
    return this.http.patch<ApiResponse<{ user: User }>>(`${this.apiUrl}/${id}/activate`, {});
  }

  /**
   * Desactivar usuario (Admin)
   */
  deactivateUser(id: string): Observable<ApiResponse<{ user: User }>> {
    return this.http.patch<ApiResponse<{ user: User }>>(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
