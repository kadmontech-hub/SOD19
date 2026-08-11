# SØD Library — guía de curaduría

La Biblioteca está desacoplada del resto del producto. Todos los libros y videos viven en:

`public/js/library-data.js`

## Libro

Cada libro tiene estos campos:

- `id`: identificador estable.
- `priority`: orden dentro de “Más recomendados”.
- `title`
- `author`
- `category`
- `shortDescription`
- `longDescription`
- `year`
- `language`
- `tags`
- `cover`: URL de portada.
- `pdfFileName`: nombre del PDF si ya existe pero aún no tiene link público.
- `pdfUrl`: link directo al PDF.
- `summaryUrl`: link de YouTube al resumen.
- `audioUrl`: link de YouTube al audiolibro.
- `recommended`: aparece en “Más recomendados”.
- `featured`: reservado para futuras selecciones editoriales.

## Comportamiento multimedia

### PDF
Si `pdfUrl` está vacío, el botón informa que el enlace todavía no está asignado.

Cuando `pdfUrl` existe, SØD pregunta:

1. **Leer acá** → visor PDF interno.
2. **Descargar PDF** → abre/descarga el archivo desde el link curado.

### Resumen
`summaryUrl` debe ser un link de YouTube. El video se abre en un modal embebido dentro de SØD.

### Audiolibro
`audioUrl` debe ser un link de YouTube. El audiolibro se abre en un modal embebido dentro de SØD.

## Videos

La solapa Videos utiliza `libraryVideos` en el mismo archivo.

Para activar un video basta con llenar:

`youtubeUrl:'https://www.youtube.com/watch?v=...'`

Sin URL, el ítem queda visible como **Próximamente**, sin simular que está disponible.

## Regla editorial

La Biblioteca no se vincula con Semillas, Códigos ni el motor cognitivo. Es un espacio de conocimiento curado.
