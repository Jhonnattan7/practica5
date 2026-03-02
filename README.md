# Task Manager Pro

**Práctica 5 - Desarrollo Web II**

Aplicación web de gestión de tareas desarrollada con **Vite** como herramienta de construcción y desarrollo rápido, combinada con React y Firebase para una experiencia moderna y eficiente.

## Tecnologías Utilizadas

- **Vite 6** - Build tool y dev server ultra-rápido con HMR
- **React 19** - Librería de interfaz de usuario
- **Firebase** - Backend as a Service (Authentication + Firestore)
- **Tailwind CSS 4** - Framework CSS utility-first
- **Zustand** - Librería de manejo de estado global
- **React Router v7** - Enrutamiento declarativo
- **React Hook Form** - Validación de formularios
- **React Hot Toast** - Sistema de notificaciones
- **date-fns** - Librería de manejo de fechas

## Características Implementadas

- Autenticación de usuarios (Login/Register con Firebase Auth)
- CRUD completo de tareas con Firestore
- Filtros por estado (Todas, Pendientes, Completadas)
- Filtros por categoría (Trabajo, Personal, Hogar, Salud, Otros)
- Búsqueda en tiempo real por título o descripción
- Estadísticas de tareas (Total, Completadas, Pendientes, Vencidas, Porcentaje)
- Tema oscuro/claro con persistencia en localStorage
- Notificaciones toast para acciones CRUD
- Sincronización en tiempo real con Firestore
- Sistema de prioridades (Baja, Media, Alta)
- Gestión de fechas de vencimiento

## Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   ├── layout/          # Layout y navegación
│   └── tasks/           # Componentes de tareas
├── hooks/               # Custom hooks
├── pages/
│   ├── auth/            # Login y Register
│   └── dashboard/       # Dashboard y TaskDetails
├── routes/              # Configuración de rutas
├── services/            # Servicios de Firebase
├── store/               # Stores de Zustand
└── utils/               # Utilidades y constantes
```

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/task-manager-pro.git
cd task-manager-pro

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env en la raíz del proyecto con:
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo con Vite HMR
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción localmente
npm run preview
```

## Configuración de Firebase

### 1. Crear proyecto en Firebase Console
- Ir a https://console.firebase.google.com/
- Crear nuevo proyecto
- Habilitar Authentication (Email/Password)
- Crear base de datos Firestore

### 2. Reglas de Firestore
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

### 3. Índice Compuesto Requerido
Firestore requiere un índice compuesto para las consultas. El sistema te proporcionará un enlace directo cuando sea necesario, o puedes crearlo manualmente:

- Colección: `tasks`
- Campos indexados:
  - `userId` (Ascending)
  - `createdAt` (Descending)


## Dependencias Principales

```json
{
  "react": "^19.0.0",
  "react-router": "^7.1.3",
  "firebase": "^11.2.0",
  "zustand": "^5.0.3",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.4.1",
  "date-fns": "^4.1.0",
  "tailwindcss": "^4.0.0"
}
```

## Autor

Jhonnatan Peñate - Desarrollo Web II - 2026

## Licencia

Proyecto académico - Práctica 5