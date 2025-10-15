# 🎨 Despliegue del Frontend - DaviStore

## 🚀 Opción 1: Vercel (Recomendada)

### **Pre-requisitos:**
1. Backend ya desplegado en Railway con URL pública
2. Cuenta en [Vercel](https://vercel.com)
3. Repositorio en GitHub

---

### **Paso 1: Actualizar URL de API**

Edita `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.railway.app/api/v1'  // ⚠️ Reemplaza con tu URL
};
```

**Commit los cambios:**
```bash
git add .
git commit -m "Update production API URL"
git push origin main
```

---

### **Paso 2: Conectar con Vercel**

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Clic en **"Add New Project"**
3. Selecciona tu repositorio **DaviStore_APP**
4. Clic en **"Import"**

---

### **Paso 3: Configurar Proyecto**

**Build & Development Settings:**

- **Framework Preset:** `Angular`
- **Root Directory:** `Frontend/davistore-app`
- **Build Command:** `npm run build -- --configuration production`
- **Output Directory:** `dist/davistore-app/browser`
- **Install Command:** `npm install`

**Variables de Entorno** (opcional):
- No necesitas agregar nada si tu API URL está en `environment.prod.ts`

---

### **Paso 4: Desplegar**

1. Clic en **"Deploy"**
2. Espera 3-5 minutos mientras Vercel:
   - Instala dependencias
   - Compila la app
   - Optimiza assets
   - Genera el dominio

---

### **Paso 5: Obtener URL**

Vercel te dará una URL como:
```
https://davistore-app.vercel.app
```

O puedes configurar un dominio personalizado.

---

### **Paso 6: Actualizar CORS en Backend**

⚠️ **IMPORTANTE:** Actualiza el backend para permitir tu dominio de Vercel.

En Railway, ve a tu backend → **Variables** → Edita `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://davistore-app.vercel.app
```

**Redeploy** el backend en Railway.

---

### **Paso 7: Verificar**

1. Abre tu app: `https://tu-app.vercel.app`
2. Prueba el login:
   - Email: `admin@davistore.com`
   - Password: `Admin123!`
3. Navega por la app

---

## 🚀 Opción 2: Netlify

### **Paso 1: Actualizar API URL**

Igual que en Vercel, edita `environment.prod.ts`.

### **Paso 2: Conectar con Netlify**

1. Ve a [netlify.com](https://netlify.com)
2. Clic en **"Add new site"** → **"Import an existing project"**
3. Conecta GitHub y selecciona tu repo

### **Paso 3: Configurar Build**

- **Base directory:** `Frontend/davistore-app`
- **Build command:** `npm run build -- --configuration production`
- **Publish directory:** `dist/davistore-app/browser`

### **Paso 4: Crear `netlify.toml`**

En `Frontend/davistore-app/netlify.toml`:

```toml
[build]
  base = "Frontend/davistore-app"
  command = "npm run build -- --configuration production"
  publish = "dist/davistore-app/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### **Paso 5: Desplegar**

Clic en **"Deploy site"** y espera.

---

## 🚀 Opción 3: Firebase Hosting

### **Paso 1: Instalar Firebase CLI**

```bash
npm install -g firebase-tools
firebase login
```

### **Paso 2: Inicializar Firebase**

En `Frontend/davistore-app/`:

```bash
firebase init hosting
```

Configuración:
- **Public directory:** `dist/davistore-app/browser`
- **Single-page app:** Yes
- **Overwrite index.html:** No

### **Paso 3: Actualizar `firebase.json`**

```json
{
  "hosting": {
    "public": "dist/davistore-app/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### **Paso 4: Build y Deploy**

```bash
npm run build -- --configuration production
firebase deploy --only hosting
```

---

## 🔄 Actualizaciones Automáticas

### **Vercel y Netlify:**

Cada `git push` a `main` despliega automáticamente:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

### **Firebase:**

Deploy manual:
```bash
npm run build -- --configuration production
firebase deploy
```

---

## 🎨 Dominios Personalizados

### **Vercel:**
1. Ve a tu proyecto → **Settings** → **Domains**
2. Agrega tu dominio: `www.davistore.com`
3. Configura DNS según instrucciones

### **Netlify:**
1. Ve a **Domain settings**
2. Clic en **Add custom domain**
3. Sigue las instrucciones de DNS

### **Firebase:**
```bash
firebase hosting:channel:deploy live --only hosting
```

---

## ✅ Checklist Final

- [ ] Backend desplegado y funcionando
- [ ] `environment.prod.ts` actualizado con URL correcta
- [ ] Frontend desplegado
- [ ] CORS configurado en backend
- [ ] Login funciona
- [ ] Todas las rutas funcionan
- [ ] Imágenes cargan correctamente
- [ ] API calls exitosas (revisar DevTools → Network)

---

## 🐛 Solución de Problemas

### **Error: API calls failing (CORS)**

**Síntoma:** Errores en consola sobre CORS

**Solución:**
1. Verifica `ALLOWED_ORIGINS` en Railway
2. Debe incluir tu URL de Vercel/Netlify
3. Redeploy backend

### **Error: 404 en rutas**

**Síntoma:** Al recargar `/products` da 404

**Solución:**
- **Vercel:** Verifica que `vercel.json` tenga rewrites
- **Netlify:** Verifica `netlify.toml` con redirects
- **Firebase:** Verifica rewrites en `firebase.json`

### **Error: Imágenes no cargan**

**Síntoma:** Imágenes rotas

**Solución:**
1. Verifica que `productImage.png` esté en `public/`
2. Rebuild y redeploy
3. Verifica rutas en componentes

### **Error: Environment variables**

**Síntoma:** API URL incorrecta

**Solución:**
1. Verifica `environment.prod.ts`
2. Asegúrate de usar build con `--configuration production`
3. Redeploy

---

## 📊 Monitoreo

### **Vercel Analytics**

Activa analytics gratuito:
1. Vercel → Tu proyecto → **Analytics**
2. Activa **Web Analytics**

### **Google Analytics** (Opcional)

Agrega en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 Performance

### **Lighthouse Score**

Ejecuta audit en Chrome DevTools → Lighthouse:

- **Performance:** >90
- **Accessibility:** >90
- **Best Practices:** >90
- **SEO:** >80

### **Optimizaciones Aplicadas:**

✅ Lazy loading de módulos  
✅ Compresión de assets  
✅ Cache headers  
✅ Image optimization  
✅ Tree shaking  
✅ AOT compilation  

---

## 💰 Costos

### **Vercel (Hobby - Free)**
- Builds ilimitados
- 100 GB bandwidth/mes
- SSL automático
- Dominio personalizado

### **Netlify (Free)**
- 100 GB bandwidth/mes
- 300 build minutes/mes
- SSL automático

### **Firebase (Spark - Free)**
- 10 GB storage
- 360 MB/día de transferencia
- SSL automático

**Total:** $0/mes 🎉

---

<div align="center">

**🚀 Frontend en producción con éxito!**

*Desarrollado por Jhoan Sebastian Wilches Jimenez*

</div>

