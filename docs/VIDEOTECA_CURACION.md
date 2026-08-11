# Videoteca SØD — Curación y mantenimiento

La Videoteca se administra desde `public/js/library-data.js`.

## Estructuras

### `libraryVideos`
Cada pieza puede contener:
- `id`
- `section`
- `category`
- `title`
- `creator`
- `description`
- `duration`
- `youtubeUrl`
- `channelUrl`
- `recommended`

Cuando `youtubeUrl` es una URL `youtube.com/watch?v=...`, SØD obtiene automáticamente el thumbnail y permite reproducir el video en un modal embebido.

Si `youtubeUrl` apunta a un canal o una búsqueda sin video ID, la tarjeta conserva la fuente pero abre YouTube en una nueva pestaña en vez de fingir un embed inexistente.

### `libraryVideoChannels`
Catálogo de las fuentes de curaduría. Puede crecer independientemente de los videos seleccionados.

### `libraryVideoSections`
Define el orden editorial de los carruseles.

## Iterar la curaduría
Para agregar o reemplazar un video solo hay que editar los datos; no hay que modificar vistas ni estilos.

Ejemplo:
```js
{
  id:'video-xx',
  section:'Conciencia y despertar',
  category:'Conciencia',
  title:'Título visible',
  creator:'Canal',
  description:'Descripción breve',
  duration:'18:20',
  youtubeUrl:'https://www.youtube.com/watch?v=VIDEO_ID',
  channelUrl:'https://www.youtube.com/@canal',
  recommended:false
}
```

## Carruseles
Todos los carruseles de Biblioteca/Videoteca incluyen controles `‹` y `›`, además de scroll horizontal natural.
