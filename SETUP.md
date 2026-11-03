# Configuración del proyecto

## Requisitos

- Node.js `v26.13.0`
- npm incluido con Node.js
- PostgreSQL
- Git
- PowerShell o una terminal compatible

Verificar las versiones:

```powershell
node --version
npm --version
git --version
```

La versión esperada de Node.js es:

```text
v26.13.0
```

Si se utiliza NVM for Windows:

```powershell
nvm install 26.13.0
nvm use 26.13.0
```

## Obtener o actualizar los repositorios

Si todavía no se descargaron:

```powershell
git clone <URL_DEL_BACKEND> backend
git clone <URL_DEL_FRONTEND> frontend
```

Si ya están clonados:

```powershell
cd backend
git pull --ff-only

cd ..\frontend
git pull --ff-only
```

## Configurar PostgreSQL

Crear una base de datos llamada:

```text
tpfinal
```

El backend necesita un archivo `.env` dentro de su propia carpeta. Cada integrante debe crear su archivo local sin subirlo al repositorio:

```env
DB_NAME=tpfinal
DB_USER=postgres
DB_PASSWORD=TU_CONTRASEÑA_LOCAL
DB_HOST=localhost
PORT=3000
```

## Ejecutar el backend

```powershell
cd backend
npm ci
npm run dev
```

El backend debería quedar disponible en:

```text
http://localhost:3000
```

La documentación Swagger puede consultarse en:

```text
http://localhost:3000/api/docs
```

## Ejecutar el frontend

Abrir otra terminal:

```powershell
cd frontend
npm ci
npm start
```

El frontend debería quedar disponible en:

```text
http://localhost:4200
```

El frontend utiliza el backend ubicado en:

```text
http://localhost:3000
```

Por ese motivo, ambos servicios deben estar activos al mismo tiempo.

## Verificación

Comprobar:

- que el backend se conecte correctamente a PostgreSQL;
- que el servidor se inicie en el puerto 3000;
- que Angular se inicie en el puerto 4200;
- que la pantalla de inicio cargue correctamente;
- que el inicio de sesión funcione;
- que el frontend pueda consultar datos del backend.

## Auditoría de dependencias

Para consultar el estado actual:

```powershell
npm audit
```

La actualización realizada fue controlada y no se utilizó:

```powershell
npm audit fix --force
```

Las vulnerabilidades restantes se mantienen documentadas como tareas pendientes y deberán analizarse antes de aplicar actualizaciones mayores.