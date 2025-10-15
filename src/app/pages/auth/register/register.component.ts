import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor() {
    // Crear formulario con validaciones
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(20)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Validador personalizado para verificar la fortaleza de la contraseña
   */
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  /**
   * Validador para verificar que las contraseñas coincidan
   */
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Enviar formulario de registro
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;

    // Extraer datos del formulario (sin confirmPassword)
    const { confirmPassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          this.snackBar.open(
            '¡Cuenta creada exitosamente! Bienvenido a DaviStore',
            'Cerrar',
            {
              duration: 4000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            }
          );

          // Redirigir al home después del registro exitoso
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(
          error.message || 'Error al crear la cuenta. Por favor intenta nuevamente.',
          'Cerrar',
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  /**
   * Obtener mensaje de error para un campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }

    if (field?.hasError('passwordStrength')) {
      return 'La contraseña debe contener mayúsculas, minúsculas y números';
    }

    if (fieldName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    
    return '';
  }

  /**
   * Marcar todos los campos como touched para mostrar errores
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
