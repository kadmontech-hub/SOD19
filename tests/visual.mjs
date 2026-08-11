import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
const manifest=JSON.parse(await readFile(new URL('../public/assets/remote-visuals.json',import.meta.url),'utf8'));
assert.equal(manifest.images.length,24,'The curated remote set must contain 24 unique images');
assert.equal(new Set(manifest.images).size,24,'Remote visual URLs must be unique');
const legacyRoles=Object.entries(manifest.roles).filter(([key])=>!key.startsWith('hub')&&key!=='hub').map(([,url])=>url);
assert.deepEqual(new Set(legacyRoles),new Set(manifest.images),'Every supplied legacy image must remain assigned to at least one product role');
assert.equal(Object.keys(manifest.hubIcons).length,4,'The Hub must expose four floating portal images');
for(const url of [manifest.hub,...Object.values(manifest.hubIcons),...manifest.images]) assert.match(url,/^https:\/\/i\.imgur\.com\/[A-Za-z0-9]+\.png$/);
const files=await readdir(new URL('../public/assets/',import.meta.url),{recursive:true});
let total=0;for(const file of files){const info=await stat(new URL(`../public/assets/${file}`,import.meta.url));if(info.isFile())total+=info.size}
assert.ok(total<1024*1024,'Local visual payload should stay below 1 MB');
console.log(`Visual tests passed: 24 curated images + clean Hub + 4 floating portal images, ${(total/1024).toFixed(1)} KB local asset payload`);
