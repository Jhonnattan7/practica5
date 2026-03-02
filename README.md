# 📝 Task Manager Pro

**Práctica 5 - Desarrollo Web II**

Aplicación web de gestión de tareas desarrollada con **Vite** como herramienta de construcción y desarrollo rápido.

## 🚀 Tecnologías

- **Vite** - Build tool y dev server ultra-rápido
- **React 19** - UI Library
- **Firebase** - Backend (Authentication + Firestore)
- **Tailwind CSS 4** - Estilos utility-first
- **Zustand** - Manejo de estado global
- **React Router** - Navegación
- **React Hook Form** - Validación de formularios
- **React Hot Toast** - Notificaciones

## ✨ Características

- ✅ Autenticación de usuarios (Login/Register)
- ✅ CRUD completo de tareas
- ✅ Filtros por estado y categoría
- ✅ Búsqueda en tiempo real
- ✅ Estadísticas de tareas
- ✅ Tema oscuro/claro
- ✅ Notificaciones toast
- ✅ Sincronización en tiempo real (Firestore)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
# Crear archivo .env en la raíz con las credenciales de Firebase
```

## 🔧 Desarrollo

```bash
# Servidor de desarrollo (Vite HMR)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 🌐 Despliegue

Ver **[DEPLOYMENT.md](DEPLOYMENT.md)** para instrucciones completas de despliegue en Netlify.

---

**Desarrollo Web II** - Universidad 2026


# 🚀 Guía de Despliegue - Task Manager Pro

## 📦 Preparación Antes de Desplegar

### ✅ **Archivos Creados Automáticamente**
- `public/_redirects` - Para routing de React Router
- `netlify.toml` - Configuración de build de Netlify
- `.gitignore` actualizado - Para proteger variables de entorno

---

## 🔐 **1. Variables de Entorno en Netlify**

⚠️ **MUY IMPORTANTE**: NO subas el archivo `.env` a GitHub

### En Netlify Dashboard:
1. Ve a tu sitio → **Site settings** → **Environment variables**
2. Agrega estas 6 variables (copia de tu archivo `.env`):

```
VITE_FIREBASE_API_KEY=AIzaSyDPu0m1WS8iSd-x9ga7hj5HyrYMTkfDXbY
VITE_FIREBASE_AUTH_DOMAIN=task-manager-pro-c123c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=task-manager-pro-c123c
VITE_FIREBASE_STORAGE_BUCKET=task-manager-pro-c123c.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=189331552306
VITE_FIREBASE_APP_ID=1:189331552306:web:58bc7a4d7d20c3f157e42b
```

---

## 🌐 **2. Configuración de Firebase**

### Dominios Autorizados:
1. Ve a **Firebase Console** → Tu Proyecto → **Authentication**
2. Pestaña **Settings** → **Authorized domains**
3. Agrega estos dominios:
   - `localhost` (ya debe estar)
   - `tu-app.netlify.app` (después de desplegar)
   - Tu dominio personalizado (si tienes)

### Reglas de Firestore:
Verifica que tus reglas permitan acceso autenticado:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

---

## 🚀 **3. Despliegue en Netlify**

### Opción A: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Task Manager Pro"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/task-manager-pro.git
   git push -u origin main
   ```

2. **Conecta con Netlify**:
   - Ve a [Netlify](https://app.netlify.com/)
   - Click en **"Add new site"** → **"Import an existing project"**
   - Selecciona **GitHub** y autoriza
   - Elige tu repositorio `task-manager-pro`

3. **Configuración de Build** (debería autodetectarse):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

4. **Agrega Variables de Entorno**:
   - En la sección de build settings, click en **"Show advanced"**
   - Copia todas las variables `VITE_FIREBASE_*` de tu `.env`

5. **Deploy**: Click en **"Deploy site"**

### Opción B: Despliegue Manual (Drag & Drop)

1. **Genera el build localmente**:
   ```bash
   npm run build
   ```

2. **Sube a Netlify**:
   - Ve a [Netlify](https://app.netlify.com/)
   - Arrastra la carpeta `dist` al área de deploy
   - ⚠️ **Importante**: Luego agrega las variables de entorno manualmente

---

## ✅ **4. Verificaciones Post-Despliegue**

### Checklist de Pruebas:
- [ ] La página principal carga correctamente
- [ ] El login funciona (Firebase Auth)
- [ ] El registro de usuarios funciona
- [ ] Las tareas se crean y guardan (Firestore)
- [ ] El tema oscuro/claro funciona
- [ ] Las notificaciones toast aparecen
- [ ] El routing funciona (Dashboard, TaskDetails)
- [ ] No hay errores de CORS en la consola

### Si hay errores:
1. **Revisa la consola del navegador** (F12)
2. **Verifica los logs de Netlify**: Site → Deploys → Click en el deploy → Deploy log
3. **Comprueba las variables de entorno**: Site settings → Environment variables

---

## 🔧 **5. Comandos Útiles**

```bash
# Desarrollo local
npm run dev

# Build de producción (prueba local)
npm run build
npm run preview

# Ver el build antes de subir
npm run build && npm run preview
```

---

## 🐛 **6. Solución de Problemas Comunes**

### Error: "Firebase not initialized"
- ✅ Verifica que todas las variables `VITE_FIREBASE_*` estén en Netlify
- ✅ El nombre debe empezar con `VITE_` exactamente

### Error: "redirect_uri_mismatch" en Firebase Auth
- ✅ Agrega el dominio de Netlify a dominios autorizados en Firebase

### Error 404 en rutas
- ✅ Verifica que `public/_redirects` existe
- ✅ Verifica que `netlify.toml` está en la raíz

### Las tareas no se guardan
- ✅ Revisa las reglas de Firestore
- ✅ Verifica que el usuario esté autenticado

---

## 📱 **7. Mejoras Opcionales**

### Dominio Personalizado:
1. En Netlify: **Domain settings** → **Add custom domain**
2. Sigue las instrucciones para configurar DNS
3. ⚠️ No olvides agregar el nuevo dominio a Firebase

### HTTPS:
- Netlify provee HTTPS automáticamente ✅

### Performance:
- El build de Vite ya está optimizado ✅
- Tailwind CSS se purga automáticamente ✅

---

## 📊 **8. Ejemplo de URL Final**

Tu app estará disponible en:
- `https://tu-app-random123.netlify.app` (generado automáticamente)
- O tu dominio personalizado

---

## 🎯 **Resumen Rápido**

1. ✅ Archivo `_redirects` creado
2. ✅ Archivo `netlify.toml` creado
3. ✅ `.gitignore` actualizado
4. 🔴 **Agrega las 6 variables de entorno en Netlify**
5. 🔴 **Autoriza el dominio de Netlify en Firebase**
6. 🚀 **Deploy y prueba**

---

**¿Listo para desplegar?** Sigue los pasos de la Opción A o B en la sección 3. 🚀





