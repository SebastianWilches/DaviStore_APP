import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  returnUrl: string = '/';

  constructor() {
    // Crear formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Obtener URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Enviar formulario de login
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          this.snackBar.open('¡Bienvenido!', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });

          // Redirigir a la página de retorno o al home
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(
          error.message || 'Error al iniciar sesión. Verifica tus credenciales.',
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
    const field = this.loginForm.get(fieldName);
    
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
