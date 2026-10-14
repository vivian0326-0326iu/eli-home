import fs from 'node:fs';
import assert from 'node:assert/strict';
const outfits=['charcoal','cream','mist','sage','rose','white'];
const moods=['sleepy','happy','calm','cheer'];
const ids=[...outfits.map(id=>'outfit-'+id),...moods.map(id=>'mood-'+id)];
for(const id of ids){
  const file='assets/illustrations/'+id+'.webp';
  const buf=fs.readFileSync(file);
  assert.ok(buf.length>1000,'Empty illustration: '+file);
  assert.equal(buf.toString('ascii',0,4),'RIFF','Not a RIFF image: '+file);
  assert.equal(buf.toString('ascii',8,12),'WEBP','Not a WebP image: '+file);
}
const app=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
for(const id of outfits)assert.ok(app.includes('outfit-'+id),'Missing outfit mapping: '+id);
for(const id of moods)assert.ok(app.includes('mood-'+id),'Missing mood mapping: '+id);
assert.ok(app.includes("illustrationMode='outfit'"),'Outfit click must show outfit');
assert.ok(app.includes("illustrationMode='mood'"),'Mood click must show expression');
assert.ok(app.includes('eli-illustration-small'),'Other dimension must remain visible');
assert.ok(!html.includes('<script src="character-v06.js'),'Old SVG character must not load');
assert.ok(html.includes('app.js?v=0.7'));
assert.ok(html.includes('v07.css?v=0.7'));
assert.ok(sw.includes('eli-home-v7'));
console.log('PASS: 10 real WebP illustrations, wardrobe/mood image switching, v0.7 cache and layout.');
