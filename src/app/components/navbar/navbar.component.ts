import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { User } from '../../core/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  cartItemsCount = 0;
  isAuthenticated = false;
  currentUser: User | null = null;
  userFullName = '';
  isAdmin = false;

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        
        // Inicializar contador de carrito cuando se autentica
        if (isAuth) {
          this.cartService.initializeCartCount();
        } else {
          this.cartService.updateCartCount(0);
        }
      });

    // Suscribirse al usuario actual
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.userFullName = `${user.first_name} ${user.last_name}`;
          this.isAdmin = this.authService.isAdmin();
        } else {
          this.userFullName = '';
          this.isAdmin = false;
        }
      });

    // Suscribirse al contador de carrito
    this.cartService.cartItemCount
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => {
        this.cartItemsCount = count;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  onLogout(): void {
    this.authService.logout();
  }

  onCartClick(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/cart' }
      });
      return;
    }
    this.router.navigate(['/cart']);
  }

  onProfileClick(): void {
    // TODO: Implementar vista de perfil en futuras iteraciones
    this.router.navigate(['/profile']);
  }

  onProductsClick(): void {
    this.router.navigate(['/products']);
  }
}
