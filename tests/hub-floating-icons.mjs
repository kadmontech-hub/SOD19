import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const [scene,visuals,manifest]=await Promise.all([
  readFile(new URL('../public/js/hub-scene.js',import.meta.url),'utf8'),
  readFile(new URL('../public/js/visual-assets.js',import.meta.url),'utf8'),
  readFile(new URL('../public/assets/remote-visuals.json',import.meta.url),'utf8').then(JSON.parse),
]);
assert.equal(manifest.hub,'https://i.imgur.com/nQ65b36.png');
assert.deepEqual(manifest.hubIcons,{
  sod:'https://i.imgur.com/XhtZkJ9.png',
  library:'https://i.imgur.com/Jtjxq8n.png',
  seeds:'https://i.imgur.com/lLfULi5.png',
  observatory:'https://i.imgur.com/0FL3xpF.png',
});
for(const [slug,key] of [['sod','hubTalkIcon'],['library','hubLibraryIcon'],['seeds','hubSeedsIcon'],['observatory','hubObservatoryIcon']]){
  assert.match(scene,new RegExp(`slug:'${slug}'.*visualKey:'${key}'`));
  assert.match(visuals,new RegExp(`${key}`));
}
assert.match(scene,/context\.drawImage\(image/);
assert.match(scene,/const label=hotspot\.title/);
console.log('Hub floating icon tests passed: clean background and four labeled image portals');
