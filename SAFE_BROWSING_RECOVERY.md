# Recuperación de Google Safe Browsing — SØD MVP

## Cambio aplicado

La versión anterior incluía una interfaz de autenticación simulada que pedía email y contraseña, aunque el MVP no tenía un proveedor real de autenticación. Esa pantalla fue eliminada.

La versión actual:

- no solicita contraseñas;
- no solicita email;
- no solicita teléfono ni tarjetas;
- usa solamente una identidad local opcional;
- guarda el recorrido en el navegador;
- conserva Hub, Semillas, Códigos, Observatorio, Elementos 33 y demás funciones;
- identifica visiblemente que es un prototipo oficial de SØD Ecosystem;
- mantiene una política CSP restrictiva y encabezados de seguridad.

## Después de desplegar

1. Reemplazar por completo el contenido del repositorio con esta versión.
2. Hacer un deployment nuevo en Vercel sin reutilizar el build cache.
3. Confirmar en el código desplegado que `/entrar` y `/registro` ya no muestran campos de email ni contraseña.
4. Enviar un reporte de clasificación incorrecta a Google Safe Browsing:
   https://www.google.com/safebrowsing/report_error/
5. Añadir la propiedad URL de `https://sod-7.vercel.app/` en Google Search Console.
6. Revisar `Problemas de seguridad` y solicitar revisión una vez desplegada la corrección.
7. No pedir a usuarios reales que ignoren la advertencia mientras la revisión está pendiente.

## Recomendación para producción

Cuando exista autenticación real, usar un proveedor estándar de OAuth o autenticación administrada y un dominio propio de SØD. No volver a implementar formularios simulados de contraseñas.
