import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  // Estadísticas (mock data por ahora - se conectarán con servicios después)
  stats: StatCard[] = [
    {
      title: 'Total Productos',
      value: '0',
      icon: 'inventory_2',
      color: '#E31E2D',
      trend: '+0%',
      trendUp: true
    },
    {
      title: 'Total Categorías',
      value: '0',
      icon: 'category',
      color: '#FF4757',
      trend: '+0%',
      trendUp: true
    },
    {
      title: 'Órdenes Pendientes',
      value: '0',
      icon: 'pending',
      color: '#FF6B7A',
      trend: '0',
      trendUp: false
    },
    {
      title: 'Total Usuarios',
      value: '0',
      icon: 'people',
      color: '#C41E3A',
      trend: '+0%',
      trendUp: true
    }
  ];

  // Acciones rápidas
  quickActions: QuickAction[] = [
    {
      title: 'Crear Producto',
      description: 'Agregar un nuevo producto al catálogo',
      icon: 'add_shopping_cart',
      route: '/admin/products',
      color: '#E31E2D'
    },
    {
      title: 'Nueva Categoría',
      description: 'Crear una nueva categoría de productos',
      icon: 'create_new_folder',
      route: '/admin/categories',
      color: '#FF4757'
    },
    {
      title: 'Gestionar Órdenes',
      description: 'Ver y procesar órdenes pendientes',
      icon: 'fact_check',
      route: '/admin/orders',
      color: '#FF6B7A'
    },
    {
      title: 'Administrar Usuarios',
      description: 'Gestionar usuarios del sistema',
      icon: 'manage_accounts',
      route: '/admin/users',
      color: '#C41E3A'
    }
  ];
}
