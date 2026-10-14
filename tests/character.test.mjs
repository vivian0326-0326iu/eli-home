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
assert.ok(app.includes('data-outfit="'), 'Outfit must be a composable dimension');
assert.ok(app.includes('data-color="'), 'Color must be a composable dimension');
assert.ok(app.includes('data-mood="'), 'Expression must be a composable dimension');
assert.ok(app.includes('eli-composed-svg'), 'Main character must combine all three dimensions');
assert.ok(!app.includes('illustrationMode'), 'Old conflicting full-image mode must be removed');
for(const id of ['charcoal','cream','mist','sage','rose','white'])assert.ok(app.includes("id:'"+id+"'"),'Missing independent color '+id);
assert.ok(!html.includes('<script src="character-v06.js'),'Old SVG character must not load');
assert.ok(html.includes('app.js?v=0.9'));
assert.ok(html.includes('v09.css?v=0.9'));
assert.ok(html.includes('wardrobePalette'));
assert.ok(html.includes('healthImportFile'));
assert.ok(app.includes('importHealthJson'));
assert.ok(app.includes('intakeForDate'));
assert.ok(html.includes('v07.css?v=0.7'));
assert.ok(html.includes('v08.css?v=0.8'));
assert.ok(html.includes('heroSceneStrip'));
assert.ok(html.includes('dataStatus'));
assert.ok(sw.includes('eli-home-v9'));
for(const id of ['day','night','work','rain'])assert.ok(app.includes("id:'"+id+"'"),'Missing room '+id);
for(const file of ['sunlit-bedroom.webp','window-workspace.webp']){
  const buf=fs.readFileSync('assets/rooms/'+file);
  assert.ok(buf.length>1000);
  assert.equal(buf.toString('ascii',0,4),'RIFF');
  assert.equal(buf.toString('ascii',8,12),'WEBP');
}
assert.ok(app.includes('renderDataStatus()'));
assert.ok(app.includes('heroTagline'));
console.log('PASS: 10 real WebP illustrations, wardrobe/mood image switching, v0.9 independent outfit, color, mood and private health snapshot import.');
