import fs from 'node:fs';
const data=fs.readFileSync('public/js/library-data.js','utf8');
const views=fs.readFileSync('public/js/views.js','utf8');
const css=fs.readFileSync('public/styles.css','utf8');
const required=[
  'Cómo ganar amigos e influir sobre las personas','Burlar al diablo','El monje que vendió su Ferrari','Piense y hágase rico',
  'Los secretos de la mente millonaria','Poder sin límites','El secreto','El club de las 5 de la mañana','Si lo crees, lo creas',
  'Deja de ser tú','El Kybalión','La magia de pensar en grande','Las siete leyes espirituales del éxito','Metafísica 4 en 1',
  'Los cuatro acuerdos','El poder del ahora','Padre rico, padre pobre','Las 48 leyes del poder'
];
for(const title of required)if(!data.includes(title))throw new Error(`Missing library title: ${title}`);
if(data.includes('seedId'))throw new Error('Library must not link books to Seeds');
for(const token of ['data-library-mode="books"','data-library-mode="videos"','openPdfChoice','openPdfViewer','openYouTubeMedia','libraryExactBookCard','libraryExactAuthors','libraryExactTopics'])if(!views.includes(token))throw new Error(`Missing Library behavior: ${token}`);
for(const token of ['library-exact-book','library-exact-author','library-exact-topic','library-exact-modebar','library-v5-reader','library-video-v5-carousel'])if(!css.includes(token))throw new Error(`Missing Library style: ${token}`);
for(const path of ['public/assets/library/authors/author-01.jpg','public/assets/library/authors/author-09.jpg','public/assets/library/topics/topic-01.jpg','public/assets/library/topics/topic-06.jpg'])if(!fs.existsSync(path))throw new Error(`Missing reference-derived asset: ${path}`);
console.log('Library exact-reference tests passed: compact books, author row, topic row, PDF reader/download choice, YouTube embeds, no Seed linkage');
