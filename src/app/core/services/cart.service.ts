import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Cart, CartSummary, AddToCartData, UpdateCartItemData } from '../interfaces/cart.interface';

/**
 * Servicio de Carrito de Compras
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cart`;

  // Observable para el contador de items del carrito
  private cartItemCount$ = new BehaviorSubject<number>(0);
  public cartItemCount = this.cartItemCount$.asObservable();

  /**
   * Obtener el carrito completo del usuario
   */
  getCart(): Observable<ApiResponse<{ cart: Cart }>> {
    return this.http.get<ApiResponse<{ cart: Cart }>>(`${this.apiUrl}`).pipe(
      tap(response => {
        if (response.success && response.data.cart) {
          // Actualizar contador de items
          const itemCount = response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
          this.cartItemCount$.next(itemCount);
        }
      })
    );
  }

  /**
   * Obtener resumen del carrito (cantidad y totales)
   */
  getCartSummary(): Observable<ApiResponse<CartSummary>> {
    return this.http.get<ApiResponse<CartSummary>>(`${this.apiUrl}/summary`).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.cartItemCount$.next(response.data.itemCount);
        }
      })
    );
  }

  /**
   * Agregar producto al carrito
   */
  addToCart(data: AddToCartData): Observable<ApiResponse<{ cart: Cart }>> {
    return this.http.post<ApiResponse<{ cart: Cart }>>(`${this.apiUrl}/items`, data).pipe(
      tap(response => {
        if (response.success && response.data.cart) {
          // Actualizar contador de items
          const itemCount = response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
          this.cartItemCount$.next(itemCount);
        }
      })
    );
  }

  /**
   * Actualizar cantidad de un item en el carrito
   */
  updateCartItem(itemId: string, data: UpdateCartItemData): Observable<ApiResponse<{ cart: Cart }>> {
    return this.http.put<ApiResponse<{ cart: Cart }>>(`${this.apiUrl}/items/${itemId}`, data).pipe(
      tap(response => {
        if (response.success && response.data.cart) {
          // Actualizar contador de items
          const itemCount = response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
          this.cartItemCount$.next(itemCount);
        }
      })
    );
  }

  /**
   * Eliminar un item del carrito
   */
  removeFromCart(itemId: string): Observable<ApiResponse<{}>> {
    return this.http.delete<ApiResponse<{}>>(`${this.apiUrl}/items/${itemId}`).pipe(
      tap(() => {
        // Recargar resumen para actualizar contador
        this.getCartSummary().subscribe();
      })
    );
  }

  /**
   * Vaciar el carrito completo
   */
  clearCart(): Observable<ApiResponse<{}>> {
    return this.http.delete<ApiResponse<{}>>(`${this.apiUrl}`).pipe(
      tap(() => {
        this.cartItemCount$.next(0);
      })
    );
  }

  /**
   * Actualizar contador de items manualmente
   */
  updateCartCount(count: number): void {
    this.cartItemCount$.next(count);
  }

  /**
   * Inicializar el contador de items del carrito (llamar al inicio de la app)
   */
  initializeCartCount(): void {
    this.getCartSummary().subscribe({
      next: () => {
        // El contador se actualiza automáticamente en el tap
      },
      error: () => {
        // Si hay error (ej: usuario no autenticado), resetear contador
        this.cartItemCount$.next(0);
      }
    });
  }
}

