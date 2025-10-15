import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard]
  },
  // Rutas protegidas (requieren autenticación)
  // TODO: Agregar aquí las rutas de productos, carrito, checkout, perfil, etc.
  
  // Redirección de rutas no encontradas
  {
    path: '**',
    redirectTo: ''
  }
];
