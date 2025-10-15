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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ProductService, ProductFilters } from '../../../core/services/product.service';
import { CategoryService, Category } from '../../../core/services/category.service';
import { Product } from '../../../core/interfaces';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { StockDialogComponent } from './stock-dialog/stock-dialog.component';

@Component({
  selector: 'app-products',
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
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  products: Product[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = ['image', 'name', 'sku', 'price', 'stock', 'category', 'status', 'actions'];
  loading = false;

  // Filters
  searchTerm = '';
  selectedCategory = '';
  stockFilter = '';

  // Pagination
  totalProducts = 0;
  pageSize = 10;
  currentPage = 1;

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data.categories;
        }
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    const filters: ProductFilters = {
      page: this.currentPage,
      limit: this.pageSize
    };

    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.selectedCategory) filters.category = this.selectedCategory;
    // Solo agregar filtro de stock si hay uno seleccionado
    if (this.stockFilter === 'in_stock') {
      filters.inStock = true;
    } else if (this.stockFilter === 'out_of_stock') {
      filters.inStock = false;
    }
    // Si stockFilter está vacío, no se envía el parámetro (muestra todos)

    this.productService.getProducts(filters).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.products = response.data;
          this.totalProducts = response.meta?.pagination?.total || 0;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.showMessage('Error al cargar productos', 'error');
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.stockFilter = '';
    this.currentPage = 1;
    this.loadProducts();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '700px',
      maxHeight: '90vh',
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createProduct(result);
      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '700px',
      maxHeight: '90vh',
      data: { product, categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProduct(product.id, result);
      }
    });
  }

  openStockDialog(product: Product): void {
    const dialogRef = this.dialog.open(StockDialogComponent, {
      width: '500px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateStock(product.id, result);
      }
    });
  }

  createProduct(data: any): void {
    this.loading = true;
    this.productService.createProduct(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Producto creado exitosamente', 'success');
          this.loadProducts();
        }
      },
      error: (error) => {
        console.error('Error al crear producto:', error);
        this.showMessage(error.message || 'Error al crear producto', 'error');
        this.loading = false;
      }
    });
  }

  updateProduct(id: string, data: any): void {
    this.loading = true;
    this.productService.updateProduct(id, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Producto actualizado exitosamente', 'success');
          this.loadProducts();
        }
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
        this.showMessage(error.message || 'Error al actualizar producto', 'error');
        this.loading = false;
      }
    });
  }

  updateStock(id: string, data: any): void {
    this.loading = true;
    this.productService.updateStock(id, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Stock actualizado exitosamente', 'success');
          this.loadProducts();
        }
      },
      error: (error) => {
        console.error('Error al actualizar stock:', error);
        this.showMessage(error.message || 'Error al actualizar stock', 'error');
        this.loading = false;
      }
    });
  }

  deleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`)) {
      this.loading = true;
      this.productService.deleteProduct(product.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage('Producto eliminado exitosamente', 'success');
            this.loadProducts();
          } else {
            this.showMessage('Error al eliminar producto', 'error');
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.showMessage(error.error?.message || error.message || 'Error al eliminar producto', 'error');
          this.loading = false;
        }
      });
    }
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
