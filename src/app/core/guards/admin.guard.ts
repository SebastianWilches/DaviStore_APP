import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si está autenticado y es admin
  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }

  // Si no es admin, redirigir al home
  router.navigate(['/']);
  return false;
};

