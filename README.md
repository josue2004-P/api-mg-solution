# BUENAS PRACTICAS DE NODE CON EXPRESS

PROYECTO ELABORADO PARA BASE DE NUEVOS PROYECTOS CON BUENAS PRATICAS

- CONEXIÓN DE BASE DE DATOS CON PRISMA Y MYSQL
- CREACION DE CONTENEDOR PARA LA BASE DE DATOS

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/josue2004-P/BUENAS_PRACTICAS_NODE_EXPRESS.git

   ```

2. Ya clonada la carpeta instalar dependencias npm:
   ```bash
    npm install
   ```
3. Construir contenedor docker para la base de datos o cambia la ruta del .env:

   ```bash
    docker-compse up -d

   ```

4. CAMBIAR EL .env.example a .env:

5. GENERAR CONEXION

npx prisma generate

5. Ya con el contenedor iniciado y las dependencias instalada
   arrancar el servidor:

   ```bash
    npm run dev

   ```

6. INSERTAR ADMINISTRADOR EN LA BASE DE DATOS

   ```bash
   INSERT INTO `BP_01_USUARIO`
   (nId01Usuario,sNombre,sApellidoPaterno,sApellidoMaterno,sUsuario,sEmail,sPassword,bInactivo,dFechaCreacion,dFechaActualizacion,sUsuarioImg)
   VALUES (1,'Josue','Perez','Eulogio','JOSUE','josue@hotmail.com','$2a$10$z7b3aYdX7hcvBIKzbVP5uuGgI4M7UFEgbBL3hNK6HfAKiK7LEGN4y',0,'2025-04-15 22:28:17.804',NULL,NULL);
   ```

7. INSERTAR PERFIL

   ```bash
   INSERT INTO `BP_02_PERFIL`
   (nId02Perfil,sNombre,sDescripcion,dFechaCreacion,dFechaActualizacion)
   VALUES (1,'ADMINISTRADOR','ADMINISTRADOR DEL SISTEMA','2025-04-15 22:33:35.491',NULL);
   ```

8. INSERTAR RELACION PERFIN USUARIO

   ```bash
   INSERT INTO
   `BP_04_PERFIL_USUARIO`
   (nId04PerfilUsuario,nId01Usuario,nId02Perfil,dFechaCreacion,dFechaActualizacion)
   VALUES (1,1,2,'2025-04-15 22:37:57.164',NULL);
   ```
