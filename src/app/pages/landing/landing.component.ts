import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  features = [
    {
      icon: 'inventory_2',
      title: 'Amplio Catálogo',
      description: 'Miles de productos de las mejores marcas a tu disposición'
    },
    {
      icon: 'local_shipping',
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas en toda la región'
    },
    {
      icon: 'verified_user',
      title: 'Compra Segura',
      description: 'Tus datos protegidos con tecnología de encriptación'
    },
    {
      icon: 'support_agent',
      title: 'Soporte 24/7',
      description: 'Estamos aquí para ayudarte en cualquier momento'
    }
  ];

  categories = [
    {
      name: 'Electrónica',
      icon: 'devices',
      color: '#E31E2D'
    },
    {
      name: 'Moda',
      icon: 'checkroom',
      color: '#FF4757'
    },
    {
      name: 'Hogar',
      icon: 'home',
      color: '#FF6B7A'
    },
    {
      name: 'Deportes',
      icon: 'sports_soccer',
      color: '#C41E3A'
    }
  ];

  onShopNow(): void {
    // TODO: Implementar navegación a productos
    console.log('Navigate to products');
  }

  onExploreCategory(category: string): void {
    // TODO: Implementar navegación a categoría específica
    console.log('Explore category:', category);
  }
}
