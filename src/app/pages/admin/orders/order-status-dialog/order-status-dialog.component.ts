import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Order } from '../../../../core/interfaces';

export interface OrderStatusDialogData {
  order: Order;
}

interface StatusOption {
  value: string;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'app-order-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './order-status-dialog.component.html',
  styleUrl: './order-status-dialog.component.scss'
})
export class OrderStatusDialogComponent {
  statusForm: FormGroup;
  order: Order;
  statusOptions: StatusOption[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderStatusDialogData
  ) {
    this.order = data.order;

    // Definir opciones de estado según el estado actual
    this.statusOptions = this.getAvailableStatuses(this.order.status);

    this.statusForm = this.fb.group({
      status: [this.order.status, Validators.required]
    });
  }

  getAvailableStatuses(currentStatus: string): StatusOption[] {
    const allStatuses: StatusOption[] = [
      { value: 'pending', label: 'Pendiente', disabled: false },
      { value: 'processing', label: 'Procesando', disabled: false },
      { value: 'shipped', label: 'Enviado', disabled: false },
      { value: 'delivered', label: 'Entregado', disabled: false },
      { value: 'cancelled', label: 'Cancelado', disabled: false }
    ];

    // Lógica de flujo de estados
    switch (currentStatus) {
      case 'pending':
        // Desde pendiente se puede ir a procesando o cancelar
        return allStatuses.map(s => ({
          ...s,
          disabled: s.value !== 'pending' && s.value !== 'processing' && s.value !== 'cancelled'
        }));
      
      case 'processing':
        // Desde procesando se puede ir a enviado o cancelar
        return allStatuses.map(s => ({
          ...s,
          disabled: s.value === 'pending' || (s.value !== 'processing' && s.value !== 'shipped' && s.value !== 'cancelled')
        }));
      
      case 'shipped':
        // Desde enviado solo se puede ir a entregado
        return allStatuses.map(s => ({
          ...s,
          disabled: s.value !== 'shipped' && s.value !== 'delivered'
        }));
      
      case 'delivered':
      case 'cancelled':
        // Estados finales, no se pueden cambiar
        return allStatuses.map(s => ({ ...s, disabled: true }));
      
      default:
        return allStatuses;
    }
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      const newStatus = this.statusForm.value.status;
      
      // Solo enviar si el estado cambió
      if (newStatus !== this.order.status) {
        this.dialogRef.close(this.statusForm.value);
      } else {
        this.dialogRef.close();
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
