import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [views, styles, content, store, ui, pkg] = await Promise.all([
  readFile(new URL('../public/js/views.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/content.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/store.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/ui.js', import.meta.url), 'utf8'),
  readFile(new URL('../package.json', import.meta.url), 'utf8'),
]);

assert.match(pkg, /"version": "3\.1\.2"/);
assert.match(views, /function conversationExperienceView/);
assert.match(views, /if\(route==='\/experiencia'\)return conversationExperienceView\(\)/);
assert.doesNotMatch(views, /collection\.seeds\.push/);
assert.match(views, /sod-oracle-overlay/);
assert.doesNotMatch(views, /function transformationView/);
assert.match(views, /class="elements-sanctuary"/);
assert.match(views, /PLACEHOLDER VISUAL/);
assert.match(views, /class="hub-need-dock"/);
assert.match(styles, /SØD VISUAL MVP V3/);
assert.match(styles, /\.force-gates/);
assert.match(styles, /SØD Conversation Experience/);
assert.match(content, /visual\('048'\)/);
assert.match(content, /placeholder:true/);
assert.match(store, /seedStates:\{\}/);
assert.match(ui, /world-nav-v3/);
console.log('V3 product mockup tests passed: spatial Hub, monumental Elements 33, continuous SØD conversation and preserved domain architecture');
