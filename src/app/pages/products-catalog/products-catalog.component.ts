import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { AuthService } from '../../core/services/auth.service';
import { Product, ProductFilters, Category } from '../../core/interfaces';

@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './products-catalog.component.html',
  styleUrl: './products-catalog.component.scss'
})
export class ProductsCatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  products: Product[] = [];
  categories: Category[] = [];
  loading = false;
  
  // Filtros
  searchTerm = '';
  selectedCategory = '';
  sortBy = 'name';

  // Paginación
  totalProducts = 0;
  pageSize = 12;
  currentPage = 1;

  // Estado de autenticación
  isAuthenticated$ = this.authService.isAuthenticated$;

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data.categories.filter(c => c.is_active);
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
      limit: this.pageSize,
      isActive: true // Solo mostrar productos activos
    };

    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.selectedCategory) filters.category = this.selectedCategory;
    if (this.sortBy) filters.sortBy = this.sortBy;

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

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: Product): void {
    // Verificar si está autenticado
    if (!this.authService.isAuthenticated()) {
      this.showMessage('Debes iniciar sesión para agregar productos al carrito', 'warning');
      // Redirigir al login después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: '/products' }
        });
      }, 1000);
      return;
    }

    // Verificar stock
    if (product.stock_quantity <= 0) {
      this.showMessage('Producto agotado', 'error');
      return;
    }

    // Agregar al carrito
    this.cartService.addToCart({
      product_id: product.id,
      quantity: 1
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Producto agregado al carrito', 'success');
        }
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
        this.showMessage(
          error.error?.message || 'Error al agregar al carrito',
          'error'
        );
      }
    });
  }

  viewProductDetail(product: Product): void {
    this.router.navigate(['/products', product.id]);
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
