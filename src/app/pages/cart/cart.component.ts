import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { Cart, CartItem } from '../../core/interfaces';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cart: Cart | null = null;
  loading = false;
  updatingItem: string | null = null;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success && response.data.cart) {
          this.cart = response.data.cart;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar carrito:', error);
        this.showMessage('Error al cargar el carrito', 'error');
        this.loading = false;
      }
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity < 1) {
      this.showMessage('La cantidad mínima es 1', 'warning');
      return;
    }

    if (quantity > item.product.stock_quantity) {
      this.showMessage(`Solo hay ${item.product.stock_quantity} unidades disponibles`, 'warning');
      return;
    }

    this.updatingItem = item.id;
    this.cartService.updateCartItem(item.id, { quantity }).subscribe({
      next: (response) => {
        if (response.success && response.data.cart) {
          this.cart = response.data.cart;
          this.showMessage('Cantidad actualizada', 'success');
        }
        this.updatingItem = null;
      },
      error: (error) => {
        console.error('Error al actualizar cantidad:', error);
        this.showMessage('Error al actualizar cantidad', 'error');
        this.updatingItem = null;
      }
    });
  }

  removeItem(item: CartItem): void {
    if (!confirm(`¿Eliminar "${item.product.name}" del carrito?`)) {
      return;
    }

    this.updatingItem = item.id;
    this.cartService.removeFromCart(item.id).subscribe({
      next: () => {
        this.showMessage('Producto eliminado del carrito', 'success');
        this.loadCart();
        this.updatingItem = null;
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
        this.showMessage('Error al eliminar producto', 'error');
        this.updatingItem = null;
      }
    });
  }

  clearCart(): void {
    if (!confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      return;
    }

    this.loading = true;
    this.cartService.clearCart().subscribe({
      next: () => {
        this.showMessage('Carrito vaciado', 'success');
        this.loadCart();
      },
      error: (error) => {
        console.error('Error al vaciar carrito:', error);
        this.showMessage('Error al vaciar el carrito', 'error');
        this.loading = false;
      }
    });
  }

  proceedToCheckout(): void {
    if (!this.cart || this.cart.items.length === 0) {
      this.showMessage('El carrito está vacío', 'warning');
      return;
    }

    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  private showMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 
                  type === 'error' ? 'snackbar-error' : 'snackbar-warning'
    });
  }
}
