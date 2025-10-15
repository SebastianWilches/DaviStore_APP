# 📸 Instrucciones para Agregar la Imagen de Producto

## 📍 Ubicación de la Imagen

Para que la imagen de producto se muestre correctamente, necesitas copiar tu archivo `productImage.jpg` a la siguiente ubicación:

```
Frontend/davistore-app/src/assets/images/productImage.jpg
```

---

## 🔧 Pasos para Agregar la Imagen

### **Opción 1: Copiar Manualmente**

1. Abre el explorador de archivos de Windows
2. Navega a: `C:\Proyectos\Sebas\DaviStore\Frontend\davistore-app\src\assets\images\`
3. Copia tu archivo `productImage.jpg` en esa carpeta

### **Opción 2: Usar PowerShell**

```powershell
# Desde el directorio raíz del proyecto
Copy-Item "ruta\de\tu\productImage.jpg" -Destination "Frontend\davistore-app\src\assets\images\productImage.jpg"
```

---

## ✅ Verificación

Una vez copiada la imagen, verifica que existe en:
```
Frontend/davistore-app/src/assets/images/productImage.jpg
```

---

## 🎨 Donde se Usa la Imagen

La imagen `productImage.jpg` ahora se renderiza en:

### **1. Vista de Catálogo de Productos (Usuario)**
- Ruta: `/products`
- Archivo: `products-catalog.component.html`
- Muestra la imagen en cada tarjeta de producto

### **2. Vista de Administración de Productos (Admin)**
- Ruta: `/admin/products`
- Archivo: `admin/products/products.component.html`
- Muestra la imagen en la columna "Imagen" de la tabla

---

## 📏 Especificaciones Recomendadas

Para mejores resultados, la imagen debe tener:

- **Formato:** JPG / JPEG
- **Dimensiones recomendadas:** 500x500 px (cuadrada)
- **Relación de aspecto:** 1:1 (cuadrada)
- **Tamaño de archivo:** Máximo 500 KB
- **Resolución:** 72-150 DPI

---

## 🔄 Cambios Realizados en el Código

### **Catálogo de Productos (Usuario):**
```html
<!-- ANTES -->
<img [src]="product.image_url || 'assets/images/product-placeholder.png'" />

<!-- DESPUÉS -->
<img [src]="'assets/images/productImage.jpg'" />
```

### **Panel de Administración:**
```html
<!-- ANTES -->
<img [src]="product.image_url || 'assets/images/no-image.png'" />

<!-- DESPUÉS -->
<img [src]="'assets/images/productImage.jpg'" />
```

---

## 🎯 Resultado

**TODOS los productos ahora mostrarán la misma imagen:**
- ✅ Vista de catálogo público
- ✅ Vista de administración
- ✅ Sin importar si tienen `image_url` en la base de datos

---

## ⚠️ Importante

- El archivo **DEBE** llamarse exactamente `productImage.jpg`
- El archivo **DEBE** estar en `src/assets/images/`
- Si cambias el nombre, debes actualizar el código en ambos componentes

---

## 🚀 Siguiente Paso

1. ✅ Copiar `productImage.jpg` a la carpeta `assets/images/`
2. ✅ Refrescar la aplicación en el navegador
3. ✅ Verificar que la imagen se muestra correctamente

---

**¡La imagen se mostrará automáticamente para todos los productos!** 🎁✨

---

**Elaborado por:** Jhoan Sebastian Wilches Jimenez  
**Fecha:** Octubre 2025

