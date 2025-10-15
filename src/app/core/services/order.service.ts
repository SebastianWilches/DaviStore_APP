import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Order } from '../interfaces';

export interface OrderFilters {
  status?: string;
  page?: number;
  limit?: number;
}

// La respuesta del backend devuelve un array de órdenes directamente en data
// y la paginación en meta.pagination

export interface UpdateOrderStatusData {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface CreateOrderData {
  shipping_address: string;
  payment_method: 'credit_card' | 'debit_card' | 'cash';
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/orders`;

  /**
   * Crear orden (checkout)
   */
  createOrder(data: CreateOrderData): Observable<ApiResponse<{ order: Order }>> {
    return this.http.post<ApiResponse<{ order: Order }>>(this.apiUrl, data);
  }

  /**
   * Listar órdenes (con filtros para admin)
   */
  getOrders(filters?: OrderFilters): Observable<ApiResponse<Order[]>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.status) params = params.set('status', filters.status);
      if (filters.page !== undefined) params = params.set('page', filters.page.toString());
      if (filters.limit !== undefined) params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<ApiResponse<Order[]>>(this.apiUrl, { params });
  }

  /**
   * Obtener orden por ID
   */
  getOrderById(id: string): Observable<ApiResponse<{ order: Order }>> {
    return this.http.get<ApiResponse<{ order: Order }>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualizar estado de orden (Admin)
   */
  updateOrderStatus(id: string, data: UpdateOrderStatusData): Observable<ApiResponse<{ order: Order }>> {
    return this.http.patch<ApiResponse<{ order: Order }>>(`${this.apiUrl}/${id}/status`, data);
  }

  /**
   * Cancelar orden
   */
  cancelOrder(id: string): Observable<ApiResponse<{ order: Order }>> {
    return this.http.post<ApiResponse<{ order: Order }>>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
