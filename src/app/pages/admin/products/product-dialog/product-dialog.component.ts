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
import { Product } from '../../../../core/interfaces';
import { Category } from '../../../../core/services/category.service';

export interface ProductDialogData {
  product?: Product;
  categories: Category[];
}

@Component({
  selector: 'app-product-dialog',
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
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean;
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {
    this.isEditMode = !!data.product;
    this.categories = data.categories.filter(cat => cat.is_active);

    this.productForm = this.fb.group({
      name: [data.product?.name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: [data.product?.description || ''],
      sku: [data.product?.sku || '', [Validators.required, Validators.maxLength(100)]],
      price: [data.product?.price || '', [Validators.required, Validators.min(0)]],
      stock_quantity: [data.product?.stock_quantity || 0, [Validators.required, Validators.min(0)]],
      category_id: [data.product?.category_id || '', Validators.required],
      image_url: [data.product?.image_url || ''],
      is_active: [data.product?.is_active !== false]
    });

    // Si es modo edición, deshabilitar SKU (no se puede modificar)
    if (this.isEditMode) {
      this.productForm.get('sku')?.disable();
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = { ...this.productForm.value };

      // Si es modo edición, no enviar SKU
      if (this.isEditMode) {
        delete formValue.sku;
      }

      // Si description está vacío, no enviarlo
      if (!formValue.description?.trim()) {
        delete formValue.description;
      }

      // Si image_url está vacío, no enviarlo
      if (!formValue.image_url?.trim()) {
        delete formValue.image_url;
      }

      // Convertir price y stock_quantity a números
      formValue.price = parseFloat(formValue.price);
      formValue.stock_quantity = parseInt(formValue.stock_quantity, 10);

      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
