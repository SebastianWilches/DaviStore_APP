import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/interfaces';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: User | null = null;
  sidenavOpened = true;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin',
      description: 'Vista general'
    },
    {
      label: 'Productos',
      icon: 'inventory_2',
      route: '/admin/products',
      description: 'Gestionar productos'
    },
    {
      label: 'Categorías',
      icon: 'category',
      route: '/admin/categories',
      description: 'Gestionar categorías'
    },
    {
      label: 'Órdenes',
      icon: 'shopping_bag',
      route: '/admin/orders',
      description: 'Gestionar órdenes'
    },
    {
      label: 'Usuarios',
      icon: 'people',
      route: '/admin/users',
      description: 'Gestionar usuarios'
    }
  ];

  // Estadísticas del dashboard (mock data por ahora)
  stats = [
    { label: 'Productos', value: '0', icon: 'inventory_2', color: '#E31E2D' },
    { label: 'Categorías', value: '0', icon: 'category', color: '#FF4757' },
    { label: 'Órdenes', value: '0', icon: 'shopping_bag', color: '#FF6B7A' },
    { label: 'Usuarios', value: '0', icon: 'people', color: '#C41E3A' }
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Verificar que sea admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
    }
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route || (route !== '/admin' && this.router.url.startsWith(route));
  }

  onLogout(): void {
    this.authService.logout();
  }
}
