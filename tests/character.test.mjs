import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync('character-v06.js','utf8'),ctx);
const outfits=['charcoal','cream','mist','sage','rose','white'];
const moods=['sleepy','happy','calm','cheer'];
const all=outfits.flatMap(o=>moods.map(m=>ctx.window.eliCharacterSVG(o,m)));
assert.equal(all.length,24);
assert.equal(new Set(all).size,24,'Each outfit and emotion must produce different markup');
assert.ok(all.every(s=>s.startsWith('<svg')&&s.endsWith('</svg>')));
assert.ok(all.every(s=>s.includes('eli-character-svg')));
for(const mood of moods) {
  const set=new Set(outfits.map(o=>ctx.window.eliCharacterSVG(o,mood)));
  assert.equal(set.size,6);
}
for(const outfit of outfits) {
  const set=new Set(moods.map(m=>ctx.window.eliCharacterSVG(outfit,m)));
  assert.equal(set.size,4);
}
const app=fs.readFileSync('app.js','utf8');
assert.ok(app.includes("renderAvatar();renderOutfits()"),'Mood change should refresh all preview cards');
assert.ok(app.includes("window.eliCharacterSVG"),'App must use new character generator');
const html=fs.readFileSync('index.html','utf8');
assert.ok(html.indexOf('character-v06.js')<html.indexOf('app.js?v=0.6'));
console.log('PASS: 6 outfits × 4 expressions, 24 unique SVGs; UI hooks connected.');
fs.writeFileSync('character-fixtures.json',JSON.stringify(all));
