import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../core/interfaces';

export interface UserDialogData {
  user: User;
}

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  userForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {
    this.user = data.user;

    this.userForm = this.fb.group({
      first_name: [data.user.first_name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      last_name: [data.user.last_name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [data.user.email, [Validators.required, Validators.email]],
      phone: [data.user.phone || '', Validators.maxLength(20)]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };

      // Si phone está vacío, no enviarlo
      if (!formValue.phone?.trim()) {
        delete formValue.phone;
      }

      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
