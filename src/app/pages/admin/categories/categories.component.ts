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
import { CategoryService, Category } from '../../../core/services/category.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'slug', 'description', 'parent', 'status', 'actions'];
  loading = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories(true).subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data.categories;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.showMessage('Error al cargar categorías', 'error');
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '600px',
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createCategory(result);
      }
    });
  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '600px',
      data: { category, categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(category.id, result);
      }
    });
  }

  createCategory(data: any): void {
    this.loading = true;
    this.categoryService.createCategory(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Categoría creada exitosamente', 'success');
          this.loadCategories();
        }
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
        this.showMessage(error.message || 'Error al crear categoría', 'error');
        this.loading = false;
      }
    });
  }

  updateCategory(id: string, data: any): void {
    this.loading = true;
    this.categoryService.updateCategory(id, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage('Categoría actualizada exitosamente', 'success');
          this.loadCategories();
        }
      },
      error: (error) => {
        console.error('Error al actualizar categoría:', error);
        this.showMessage(error.message || 'Error al actualizar categoría', 'error');
        this.loading = false;
      }
    });
  }

  deleteCategory(category: Category): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${category.name}"?`)) {
      this.loading = true;
      this.categoryService.deleteCategory(category.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.showMessage('Categoría eliminada exitosamente', 'success');
            this.loadCategories();
          } else {
            this.showMessage('Error al eliminar categoría', 'error');
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Error al eliminar categoría:', error);
          this.showMessage(error.error?.message || error.message || 'Error al eliminar categoría', 'error');
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
