import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Category } from '../../../../core/services/category.service';

export interface CategoryDialogData {
  category?: Category;
  categories: Category[];
}

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean;
  availableParents: Category[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryDialogData
  ) {
    this.isEditMode = !!data.category;
    
    // Filtrar categorías disponibles como padres (excluir la categoría actual si está en modo edición)
    this.availableParents = data.categories.filter(cat => 
      !data.category || cat.id !== data.category.id
    );

    this.categoryForm = this.fb.group({
      name: [data.category?.name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: [data.category?.description || ''],
      parent_id: [data.category?.parent_id || null],
      is_active: [data.category?.is_active !== false]
    });
  }

  ngOnInit(): void {}

  /**
   * Genera un slug a partir del nombre
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
      .trim()
      .replace(/\s+/g, '-') // Reemplazar espacios por guiones
      .replace(/-+/g, '-'); // Eliminar guiones duplicados
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      
      // Generar slug desde el nombre
      formValue.slug = this.generateSlug(formValue.name);
      
      // Si parent_id es null o vacío, no enviarlo
      if (!formValue.parent_id) {
        delete formValue.parent_id;
      }

      // Si description está vacío, no enviarlo
      if (!formValue.description?.trim()) {
        delete formValue.description;
      }

      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
