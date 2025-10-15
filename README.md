# DaviStore Frontend

Aplicación web de e-commerce desarrollada con Angular 18 y Angular Material.

## 🚀 Tecnologías

- **Angular 18** - Framework principal
- **Angular Material** - Librería de componentes UI
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **RxJS** - Programación reactiva

## 📋 Requisitos Previos

- Node.js v20.13.0 o superior
- npm v10.5.2 o superior
- Angular CLI v18

## 🛠️ Instalación

1. **Clonar el repositorio** (si aún no lo has hecho)
```bash
git clone <url-del-repositorio>
cd DaviStore/Frontend/davistore-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Edita el archivo `src/environments/environment.ts` con la URL de tu backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

## 🏃 Ejecutar la Aplicación

### Modo Desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

### Build para Producción

```bash
npm run build
# o
ng build --configuration production
```

Los archivos compilados estarán en el directorio `dist/`.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/         # Componentes reutilizables
│   │   └── navbar/        # Barra de navegación
│   ├── pages/             # Páginas de la aplicación
│   │   └── landing/       # Página de inicio
│   ├── app.component.*    # Componente raíz
│   ├── app.config.ts      # Configuración de la app
│   └── app.routes.ts      # Configuración de rutas
├── environments/          # Variables de entorno
│   ├── environment.ts     # Desarrollo
│   └── environment.prod.ts # Producción
├── index.html            # HTML principal
├── main.ts              # Punto de entrada
└── styles.scss          # Estilos globales
```

## 🎨 Características Implementadas

### ✅ Landing Page
- Hero section con call-to-action
- Sección de características
- Exploración por categorías
- Diseño responsive
- Animaciones y transiciones suaves

### ✅ Navbar
- Logo y navegación
- Carrito de compras con badge
- Menú de usuario (autenticado/no autenticado)
- Diseño responsive
- Fixed en la parte superior

## 🔄 Próximos Pasos

### Módulos a Implementar

1. **Autenticación**
   - Login
   - Registro
   - Recuperación de contraseña
   - Guards para rutas protegidas

2. **Productos**
   - Listado de productos con filtros
   - Detalle de producto
   - Búsqueda
   - Paginación

3. **Categorías**
   - Listado de categorías
   - Productos por categoría

4. **Carrito de Compras**
   - Agregar/eliminar productos
   - Actualizar cantidades
   - Resumen del carrito

5. **Checkout**
   - Proceso de pago
   - Confirmación de orden
   - Integración con backend

6. **Perfil de Usuario**
   - Datos personales
   - Historial de órdenes
   - Dirección de envío

7. **Admin Panel** (para usuarios admin)
   - Gestión de productos
   - Gestión de categorías
   - Gestión de órdenes
   - Gestión de usuarios

## 🔗 Integración con Backend

El backend está disponible en `http://localhost:3000/api/v1`

### Endpoints Principales

- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `GET /products` - Listar productos
- `GET /categories` - Listar categorías
- `GET /cart` - Ver carrito
- `POST /orders` - Crear orden

Para más detalles, consulta `Backend/API_ENDPOINTS.md`

## 🎯 Buenas Prácticas Implementadas

- **Componentes Standalone** - Nueva arquitectura de Angular
- **Lazy Loading** - Carga bajo demanda (a implementar)
- **TypeScript Estricto** - Tipado fuerte
- **SCSS Modular** - Estilos organizados por componente
- **Responsive Design** - Mobile-first approach
- **Accesibilidad** - ARIA labels y semántica HTML

## 📦 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Build de producción
npm run build

# Ejecutar tests
npm test

# Build en modo watch
npm run watch

# Ejecutar Angular CLI
npm run ng
```

## 🎨 Personalización del Tema

Angular Material está configurado con el tema `indigo-pink`. Para cambiar el tema:

1. Edita `angular.json` en la sección de estilos
2. Cambia el tema importado en `src/styles.scss`

Temas disponibles:
- indigo-pink.css
- deeppurple-amber.css
- pink-bluegrey.css
- purple-green.css

## 🐛 Debugging

Para debugging en VSCode, usa la configuración en `.vscode/launch.json`:

1. Inicia el servidor con `npm start`
2. Presiona F5 en VSCode
3. Selecciona "Chrome" como navegador

## 📝 Notas

- El proyecto usa **standalone components** (nueva arquitectura de Angular)
- No se requiere NgModules
- Las rutas están configuradas en `app.routes.ts`
- Los componentes importan sus dependencias directamente

## 🤝 Contribución

1. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del curso de FullStack Development.

## 👥 Autor

Desarrollado como parte del proyecto E-commerce Simplificado con Checkout

---

**¡Feliz Codificación! 🚀**
