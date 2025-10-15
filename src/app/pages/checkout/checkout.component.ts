import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { Cart } from '../../core/interfaces';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cart: Cart | null = null;
  loading = false;
  processingOrder = false;

  shippingForm: FormGroup;
  paymentForm: FormGroup;

  paymentMethods = [
    { value: 'credit_card', label: 'Tarjeta de Crédito', icon: 'credit_card' },
    { value: 'debit_card', label: 'Tarjeta de Débito', icon: 'credit_card' },
    { value: 'paypal', label: 'PayPal', icon: 'account_balance' },
    { value: 'bank_transfer', label: 'Transferencia Bancaria', icon: 'account_balance' },
    { value: 'cash_on_delivery', label: 'Pago contra entrega', icon: 'local_shipping' }
  ];

  constructor() {
    this.shippingForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]],
      zip: ['', [Validators.required, Validators.minLength(4)]],
      country: ['Colombia', [Validators.required]]
    });

    this.paymentForm = this.fb.group({
      payment_method: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success && response.data.cart) {
          this.cart = response.data.cart;
          
          // Si el carrito está vacío, redirigir a productos
          if (this.cart.items.length === 0) {
            this.showMessage('Tu carrito está vacío', 'warning');
            this.router.navigate(['/products']);
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar carrito:', error);
        this.showMessage('Error al cargar el carrito', 'error');
        this.loading = false;
        this.router.navigate(['/cart']);
      }
    });
  }

  placeOrder(): void {
    if (this.shippingForm.invalid || this.paymentForm.invalid) {
      this.showMessage('Por favor completa todos los campos requeridos', 'warning');
      return;
    }

    const orderData = {
      shipping_address: this.shippingForm.value,
      payment_method: this.paymentForm.value.payment_method,
      notes: this.paymentForm.value.notes || undefined
    };

    this.processingOrder = true;
    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        if (response.success && response.data.order) {
          this.showMessage('¡Pedido realizado exitosamente!', 'success');
          
          // Esperar un momento antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/orders', response.data.order.id]);
          }, 1500);
        }
        this.processingOrder = false;
      },
      error: (error) => {
        console.error('Error al crear orden:', error);
        this.showMessage(
          error.error?.message || 'Error al procesar el pedido',
          'error'
        );
        this.processingOrder = false;
      }
    });
  }

  backToCart(): void {
    this.router.navigate(['/cart']);
  }

  getPaymentMethodLabel(value: string): string {
    const method = this.paymentMethods.find(m => m.value === value);
    return method ? method.label : 'No seleccionado';
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
