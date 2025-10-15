import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { OrderService, OrderFilters } from '../../../core/services/order.service';
import { Order } from '../../../core/interfaces';
import { OrderStatusDialogComponent } from './order-status-dialog/order-status-dialog.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'user', 'date', 'total', 'status', 'actions'];
  loading = false;

  // Filters
  statusFilter = '';
  
  // Pagination
  totalOrders = 0;
  pageSize = 10;
  currentPage = 1;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    const filters: OrderFilters = {
      page: this.currentPage,
      limit: this.pageSize
    };

    if (this.statusFilter) filters.status = this.statusFilter;

    this.orderService.getOrders(filters).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.orders = response.data;
          this.totalOrders = response.meta?.pagination?.total || 0;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar órdenes:', error);
        this.showMessage('Error al cargar órdenes', 'error');
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadOrders();
  }

  clearFilters(): void {
    this.statusFilter = '';
    this.currentPage = 1;
    this.loadOrders();
  }

  openStatusDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      width: '500px',
      data: { order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateOrderStatus(order.id, result);
      }
    });
  }

  updateOrderStatus(id: string, data: any): void {
    this.loading = true;
    this.orderService.updateOrderStatus(id, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Estado actualizado exitosamente', 'success');
          this.loadOrders();
        }
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        this.showMessage(error.message || 'Error al actualizar estado', 'error');
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'pending': 'status-pending',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusClasses[status] || '';
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'pending': 'Pendiente',
      'processing': 'Procesando',
      'shipped': 'Enviado',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return statusLabels[status] || status;
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }
}
