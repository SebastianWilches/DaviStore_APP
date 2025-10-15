# 🛍️ DaviStore - Frontend

<div align="center">

![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material](https://img.shields.io/badge/Material-18-757575?style=for-the-badge&logo=material-design&logoColor=white)

**Aplicación web moderna de comercio electrónico desarrollada con Angular 18**

[Demo](#) • [Reportar Bug](#) • [Solicitar Feature](#)

</div>

---

## 📋 Descripción General

DaviStore Frontend es una aplicación web progresiva (PWA) de comercio electrónico desarrollada con las últimas tecnologías de Angular. Ofrece una experiencia de usuario fluida y moderna para la compra de productos en línea, con un diseño responsivo inspirado en Davivienda, utilizando una paleta de colores roja como identidad visual.

### ✨ Características Principales

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con Material Design
- 📱 **Totalmente Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- 🔐 **Autenticación Completa**: Sistema de registro, login y manejo de sesiones con JWT
- 🛒 **Carrito de Compras**: Gestión intuitiva del carrito con persistencia
- 💳 **Proceso de Checkout**: Flujo de compra simplificado con múltiples métodos de pago
- 👥 **Panel de Administración**: CRUD completo para productos, categorías, órdenes y usuarios
- 🎯 **Guards de Ruta**: Protección de rutas según roles (usuario/admin)
- 🔄 **Interceptores HTTP**: Manejo automático de tokens y errores
- 📊 **Filtros y Búsqueda**: Sistema avanzado de filtrado de productos
- ⚡ **Lazy Loading**: Carga optimizada de módulos para mejor rendimiento

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **Angular CLI**: 18.x

```bash
# Instalar Angular CLI globalmente (si no lo tienes)
npm install -g @angular/cli@18
```

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SebastianWilches/DaviStore_APP.git
   cd DaviStore_APP/Frontend/davistore-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   El archivo de configuración de API se encuentra en:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api/v1'
   };
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   ng serve
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

---

## 📦 Módulos y Funcionalidades

### 🏠 Módulo Landing
- **Ruta**: `/`
- **Descripción**: Página de inicio con hero section, features y categorías
- **Componente**: `LandingComponent`

### 🔐 Módulo de Autenticación
- **Login**: `/login`
  - Formulario de inicio de sesión
  - Validación de credenciales
  - Manejo de tokens JWT
- **Registro**: `/register`
  - Formulario de registro de usuarios
  - Validación de contraseñas
  - Confirmación de email

### 🛍️ Módulo de Productos (Usuario)
- **Catálogo**: `/products`
  - Grid de productos con paginación
  - Filtros por categoría, precio y disponibilidad
  - Ordenamiento (precio, fecha)
  - Búsqueda en tiempo real
  - Agregar al carrito

### 🛒 Módulo de Carrito
- **Carrito**: `/cart`
  - Visualización de productos agregados
  - Vista read-only con detalles de productos
  - Cálculo automático de totales
  - Botón para vaciar carrito
  - Redirección a checkout

### 💳 Módulo de Checkout
- **Checkout**: `/checkout`
  - Formulario multi-paso:
    1. Dirección de envío
    2. Método de pago
    3. Confirmación de orden
  - Validación de formularios
  - Creación de orden

### 👨‍💼 Módulo de Administración
**Ruta base**: `/admin` (Protegido por `adminGuard`)

#### Dashboard Principal
- Resumen de estadísticas
- Acceso rápido a módulos

#### Gestión de Productos
- **Ruta**: `/admin/products`
- Tabla con paginación y filtros
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Gestión de stock
- Activar/Desactivar productos

#### Gestión de Categorías
- **Ruta**: `/admin/categories`
- Tabla con jerarquía de categorías
- CRUD completo
- Generación automática de slugs

#### Gestión de Órdenes
- **Ruta**: `/admin/orders`
- Tabla expandible con detalles de orden
- Filtros por estado
- Actualización de estados:
  - Pendiente → En Proceso → Enviado → Entregado → Completado
  - Cancelado (en cualquier momento)

#### Gestión de Usuarios
- **Ruta**: `/admin/users`
- Tabla de usuarios con roles
- Filtros por rol y estado
- Edición de información
- Activar/Desactivar usuarios

---

## 🏗️ Estructura del Proyecto

```
davistore-app/
├── public/                          # Assets estáticos (Angular 18)
│   ├── favicon.ico
│   └── productImage.png             # Imagen de productos
│
├── src/
│   ├── app/
│   │   ├── components/              # Componentes compartidos
│   │   │   └── navbar/              # Barra de navegación
│   │   │
│   │   ├── core/                    # Núcleo de la aplicación
│   │   │   ├── guards/              # Guards de ruta
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── no-auth.guard.ts
│   │   │   │   └── admin.guard.ts
│   │   │   │
│   │   │   ├── interceptors/        # HTTP Interceptors
│   │   │   │   └── auth.interceptor.ts
│   │   │   │
│   │   │   ├── interfaces/          # Interfaces TypeScript
│   │   │   │   ├── api-response.interface.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── product.interface.ts
│   │   │   │   ├── category.interface.ts
│   │   │   │   ├── cart.interface.ts
│   │   │   │   ├── order.interface.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── services/            # Servicios
│   │   │       ├── auth.service.ts
│   │   │       ├── product.service.ts
│   │   │       ├── category.service.ts
│   │   │       ├── cart.service.ts
│   │   │       ├── order.service.ts
│   │   │       └── user.service.ts
│   │   │
│   │   ├── pages/                   # Páginas/Vistas
│   │   │   ├── landing/             # Página de inicio
│   │   │   ├── auth/                # Login y registro
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   │
│   │   │   ├── products-catalog/    # Catálogo público
│   │   │   ├── cart/                # Carrito de compras
│   │   │   ├── checkout/            # Proceso de compra
│   │   │   │
│   │   │   └── admin/               # Módulo de administración
│   │   │       ├── dashboard/       # Dashboard principal
│   │   │       ├── overview/        # Vista general
│   │   │       ├── products/        # Gestión de productos
│   │   │       │   ├── product-dialog/
│   │   │       │   └── stock-dialog/
│   │   │       ├── categories/      # Gestión de categorías
│   │   │       │   └── category-dialog/
│   │   │       ├── orders/          # Gestión de órdenes
│   │   │       │   └── order-status-dialog/
│   │   │       └── users/           # Gestión de usuarios
│   │   │           └── user-dialog/
│   │   │
│   │   ├── app.component.ts         # Componente raíz
│   │   ├── app.config.ts            # Configuración de la app
│   │   └── app.routes.ts            # Definición de rutas
│   │
│   ├── environments/                # Variables de entorno
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── styles.scss                  # Estilos globales
│   ├── index.html                   # HTML principal
│   └── main.ts                      # Punto de entrada
│
├── IA Documentation/                # Documentación generada por IA
├── angular.json                     # Configuración de Angular
├── package.json                     # Dependencias
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Este archivo
```

---

## 🏛️ Arquitectura

### Patrón de Diseño: **Componentes Standalone**

A partir de Angular 15+, utilizamos componentes standalone que simplifican la arquitectura eliminando la necesidad de NgModules.

```typescript
@Component({
  selector: 'app-products-catalog',
  standalone: true,
  imports: [CommonModule, MaterialModules, ...],
  templateUrl: './products-catalog.component.html'
})
export class ProductsCatalogComponent { }
```

### Principios Aplicados

- **Separation of Concerns**: Separación clara entre servicios, componentes y lógica de negocio
- **DRY (Don't Repeat Yourself)**: Reutilización de componentes y servicios
- **Single Responsibility**: Cada componente/servicio tiene una responsabilidad única
- **Reactive Programming**: Uso extensivo de RxJS Observables
- **Type Safety**: TypeScript para prevenir errores en tiempo de compilación

### Flujo de Datos

```
Componente
    ↓ (llama al servicio)
Servicio (HTTP)
    ↓ (hace petición)
Backend API
    ↓ (responde)
Servicio (procesa respuesta)
    ↓ (retorna Observable)
Componente (subscribe y actualiza UI)
```

### Guards y Seguridad

```typescript
// Proteger rutas que requieren autenticación
{ path: 'cart', component: CartComponent, canActivate: [authGuard] }

// Proteger rutas de admin
{ path: 'admin', component: DashboardComponent, canActivate: [authGuard, adminGuard] }

// Prevenir acceso a login si ya está autenticado
{ path: 'login', component: LoginComponent, canActivate: [noAuthGuard] }
```

### Interceptores HTTP

```typescript
// Inyectar token JWT en todas las peticiones
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Angular** | 18.x | Framework principal |
| **TypeScript** | 5.5.x | Superset tipado de JavaScript |
| **Angular Material** | 18.x | Biblioteca de componentes UI |
| **RxJS** | 7.8.x | Programación reactiva |
| **SCSS** | - | Preprocesador CSS |
| **Zone.js** | 0.14.x | Detección de cambios |
| **TSLib** | 2.6.x | Helpers de TypeScript |

### Dependencias Principales

```json
{
  "@angular/animations": "^18.0.0",
  "@angular/common": "^18.0.0",
  "@angular/compiler": "^18.0.0",
  "@angular/core": "^18.0.0",
  "@angular/forms": "^18.0.0",
  "@angular/material": "^18.0.0",
  "@angular/platform-browser": "^18.0.0",
  "@angular/platform-browser-dynamic": "^18.0.0",
  "@angular/router": "^18.0.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.6.0",
  "zone.js": "~0.14.0"
}
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia el servidor de desarrollo (ng serve)
ng serve              # Servidor de desarrollo en http://localhost:4200
ng serve --open       # Abre automáticamente el navegador

# Compilación
npm run build         # Build de producción
ng build              # Build con optimizaciones
ng build --configuration production  # Build de producción

# Testing
npm test              # Ejecuta tests unitarios (Karma)
ng test               # Tests con watch mode
ng test --code-coverage  # Tests con coverage

# Análisis
ng lint               # Ejecuta ESLint
ng build --stats-json # Genera estadísticas del bundle
```

---

## 🎨 Guía de Estilo

### Paleta de Colores

```scss
// Colores principales (inspirados en Davivienda)
$primary-red: #E31E2D;           // Rojo principal
$secondary-red: #FF4757;         // Rojo secundario
$primary-red-light: #FF6B7A;     // Rojo claro

// Colores de texto
$dark-text: #1A1A1A;             // Texto oscuro
$gray-text: #666666;             // Texto gris

// Colores de fondo
$white: #FFFFFF;
$light-gray: #F5F5F5;
```

### Tipografía

- **Principal**: Poppins (títulos)
- **Secundaria**: Inter (cuerpo)
- **Fuentes de Google Fonts**

---

## 🔐 Sistema de Autenticación

### Flujo de Login

1. Usuario ingresa credenciales
2. Frontend envía POST a `/api/v1/auth/login`
3. Backend valida y retorna:
   - `access_token` (JWT, 15 min)
   - `refresh_token` (7 días)
4. Tokens se almacenan en `localStorage`
5. `authInterceptor` inyecta el token en peticiones

### Manejo de Tokens

```typescript
// AuthService
login(credentials: LoginCredentials): Observable<AuthResponse> {
  return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, credentials)
    .pipe(
      tap(response => {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        this.loadCurrentUser();
      })
    );
}
```

### Refresh Token Automático

El interceptor detecta errores 401 y refresca el token automáticamente:

```typescript
if (error.status === 401 && !req.url.includes('/refresh')) {
  // Refrescar token y reintentar la petición
}
```

---

## 🚦 Sistema de Rutas

### Rutas Públicas

- `/` - Landing page
- `/products` - Catálogo de productos
- `/login` - Inicio de sesión
- `/register` - Registro de usuario

### Rutas Protegidas (requieren autenticación)

- `/cart` - Carrito de compras
- `/checkout` - Proceso de compra

### Rutas de Administrador (requieren rol admin)

- `/admin` - Dashboard principal
- `/admin/products` - Gestión de productos
- `/admin/categories` - Gestión de categorías
- `/admin/orders` - Gestión de órdenes
- `/admin/users` - Gestión de usuarios

---

## 🌐 Integración con Backend

### URL Base de API

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

### Formato de Respuestas

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

---

## 📱 Responsive Design

Breakpoints:

```scss
// Mobile First
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

---

## 🐛 Debugging

### Angular DevTools

Instala la extensión de Angular DevTools para Chrome:
- [Angular DevTools - Chrome Web Store](https://chrome.google.com/webstore/detail/angular-devtools)

### Logs en Desarrollo

```typescript
// Habilitar logs de RxJS
import { tap } from 'rxjs/operators';

getProducts().pipe(
  tap(data => console.log('Products:', data))
).subscribe();
```

---

## 📝 Convenciones de Código

- **Componentes**: PascalCase (`ProductsCatalogComponent`)
- **Archivos**: kebab-case (`products-catalog.component.ts`)
- **Variables y métodos**: camelCase (`loadProducts()`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)
- **Interfaces**: PascalCase con sufijo `Interface` opcional



## 👨‍💻 Autor

**Jhoan Sebastian Wilches Jimenez**

- LinkedIn: [linkedin.com/in/swilches](https://www.linkedin.com/in/swilches/)
- GitHub: [github.com/SebastianWilches](https://github.com/SebastianWilches)
- Email: sebastianwilches2@gmail.com

---



<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ por Jhoan Sebastian Wilches Jimenez

</div>
