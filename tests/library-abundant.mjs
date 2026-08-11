import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const [data,views,styles,visuals]=await Promise.all([
 readFile(new URL('../public/js/library-data.js',import.meta.url),'utf8'),
 readFile(new URL('../public/js/views.js',import.meta.url),'utf8'),
 readFile(new URL('../public/styles.css',import.meta.url),'utf8'),
 readFile(new URL('../public/js/visual-assets.js',import.meta.url),'utf8')
]);
for(const title of ['Inteligencia emocional','Una nueva tierra','Tú eres el placebo','Despertando al gigante interior','La maestría del amor','La ley del éxito']) assert.match(data,new RegExp(title));
assert.match(data,/book-50/);
assert.match(visuals,/https:\/\/i\.imgur\.com\/tE35c4C\.png/);
assert.doesNotMatch(views,/library-exact-chips-wrap/);
assert.doesNotMatch(views,/data-library-category/);
assert.match(views,/libraryExactCoverMarkup/);
assert.match(views,/topicKey/);
assert.match(styles,/library-exact-placeholder-cover/);
assert.match(styles,/library-exact-topic\.active/);
console.log('Library abundant tests passed: 50 books, placeholder covers, lower topic filtering, new background, no duplicate top categories');
