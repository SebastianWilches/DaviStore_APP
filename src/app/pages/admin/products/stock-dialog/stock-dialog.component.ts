import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { Product } from '../../../../core/interfaces';

export interface StockDialogData {
  product: Product;
}

@Component({
  selector: 'app-stock-dialog',
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
    MatRadioModule
  ],
  templateUrl: './stock-dialog.component.html',
  styleUrl: './stock-dialog.component.scss'
})
export class StockDialogComponent implements OnInit {
  stockForm: FormGroup;
  product: Product;
  newStock = 0;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockDialogData
  ) {
    this.product = data.product;

    this.stockForm = this.fb.group({
      operation: ['set', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });

    // Calcular nuevo stock cuando cambie la operación o la cantidad
    this.stockForm.valueChanges.subscribe(() => {
      this.calculateNewStock();
    });
  }

  ngOnInit(): void {
    this.calculateNewStock();
  }

  calculateNewStock(): void {
    const operation = this.stockForm.get('operation')?.value;
    const amount = parseInt(this.stockForm.get('amount')?.value || '0', 10);
    
    switch (operation) {
      case 'set':
        this.newStock = amount;
        break;
      case 'add':
        this.newStock = this.product.stock_quantity + amount;
        break;
      case 'subtract':
        this.newStock = Math.max(0, this.product.stock_quantity - amount);
        break;
      default:
        this.newStock = this.product.stock_quantity;
    }
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      // El backend espera 'quantity' no 'stock'
      this.dialogRef.close({
        quantity: this.newStock
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
