# Ejercicio Tech Academy - Node JS - API Curso

Las consignas de este ejercicio son las siguientes:

1. Crear endpoints de Lectura, Creación, actualización y eliminación (CRUD) de maestros.
2. Deberán crear un modelo de datos y la lógica de validación de estos servicios.
3. Crearan un controlador con un método diferente para cada unos de los servicios.
4. La actividad me debe permitir crear maestros en la base, listar, actualizarlos y eliminarlos.
5. Considerar lógica de protección de url (Middleware de protección)

## Configuración
1.  Clonar el repositorio de acuerdo a la organización previamente sugerida.;
2.  Correr el comando `npm i` en la raíz del proyecto.;
3.  Para probar los endpoints puede ingresar al siguiente workspace de Postman: [Endpoints API](https://www.postman.com/red-eclipse-229019/workspace/techacademy-titamedia-juanrassa/collection/17910418-f1426f65-64cd-4e49-ae71-d4f9551565f9?action=share&creator=17910418)
  - Primero debe acceder por el endpoint de /crearUsuario en la carpeta de Usuarios para generar un token. Dicho token luego debera copiarse en el header de "access-token" en el resto de peticiones. También puede copiarse como variable de entorno del workspace "CursoAPI-TechAcademy" para mayor comodidad.