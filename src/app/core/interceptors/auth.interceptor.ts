import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Interceptor que agrega el token de autenticación a todas las peticiones HTTP
 * y maneja la renovación automática del token si expira
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // URLs que no requieren token
  const excludedUrls = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh'
  ];

  // Verificar si la URL está excluida
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  // Si no requiere token o no hay token, enviar la petición sin modificar
  if (isExcluded || !authService.getAccessToken()) {
    return next(req);
  }

  // Clonar la petición y agregar el token
  const token = authService.getAccessToken();
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Enviar la petición y manejar errores 401 (token expirado)
  return next(clonedReq).pipe(
    catchError(error => {
      // Si es error 401 (Unauthorized), intentar refrescar el token
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Token refrescado exitosamente, reintentar la petición original
            const newToken = authService.getAccessToken();
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(retryReq);
          }),
          catchError(refreshError => {
            // No se pudo refrescar el token, cerrar sesión
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }

      // Para otros errores, simplemente propagarlos
      return throwError(() => error);
    })
  );
};
