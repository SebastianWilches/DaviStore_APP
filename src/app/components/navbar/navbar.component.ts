import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

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
export class NavbarComponent {
  cartItemsCount = 0;
  isAuthenticated = false;
  userFullName = '';

  onLogin(): void {
    // TODO: Implementar navegación a login
    console.log('Navigate to login');
  }

  onRegister(): void {
    // TODO: Implementar navegación a register
    console.log('Navigate to register');
  }

  onLogout(): void {
    // TODO: Implementar logout
    console.log('Logout');
  }

  onCartClick(): void {
    // TODO: Implementar navegación a carrito
    console.log('Navigate to cart');
  }

  onProfileClick(): void {
    // TODO: Implementar navegación a perfil
    console.log('Navigate to profile');
  }
}
