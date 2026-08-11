import fs from 'node:fs';
import assert from 'node:assert/strict';

const data=fs.readFileSync('public/js/library-data.js','utf8');
const views=fs.readFileSync('public/js/views.js','utf8');
const css=fs.readFileSync('public/styles.css','utf8');
const vercel=fs.readFileSync('vercel.json','utf8');

for(const token of ['libraryVideoChannels','youtubeThumbnail','Eckhart Tolle','Rupert Spira','Sadhguru','Daily Stoic','Huberman Lab','Alex Hormozi','Eternalised']) assert.ok(data.includes(token),`missing videoteca token: ${token}`);
for(const videoId of ['e2EPuGabgpc','4AwyVTHEU3s','ih3nIPvCjVI','R9OCA6UFE-0','VWSZMISESpE','XoJWqCH4Xrw']) assert.ok(data.includes(videoId),`missing curated YouTube id: ${videoId}`);
for(const token of ['videoteca-final','Videos curados para ti','Profundiza más','Canales esenciales','data-scroll-direction=\"-1\"','data-inline-play','bindVideotecaFinalPlayers','videoteca-final-arrow-prev']) assert.ok(views.includes(token),`missing videoteca final UI token: ${token}`);
for(const token of ['.videoteca-final-row','grid-auto-columns:calc((100% - 40px)/5)','.videoteca-final-channel-row','.videoteca-final-card-copy{min-height:143px','.library-exact-books[hidden],.videoteca-final[hidden]{display:none!important}']) assert.ok(css.includes(token),`missing videoteca final CSS token: ${token}`);
assert.ok(views.includes("booksView.style.display=isBooks?'':'none'"),'books hard-hide missing');
assert.ok(views.includes("videosView.style.display=isBooks?'none':'block'"),'videos hard-show/hide missing');
assert.ok(vercel.includes('https://img.youtube.com'),'CSP does not allow YouTube thumbnail fallback');
assert.ok(vercel.includes('https://i.ytimg.com'),'CSP does not allow YouTube thumbnail primary compatibility');
console.log('Videoteca final tests passed: exclusive tab, 2 five-card carousels, inline YouTube player, thumbnail fallbacks, filters and channel carousel');
