const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const delivery = require('../delivery.js');
const app = require('../script.js');

test('five kilometre zone uses the verified restaurant point and radial distance', () => {
  const origin = delivery.CONFIG.origin;
  assert.deepEqual(origin, { lat: 43.209372, lng: 76.873193 });
  assert.equal(delivery.distanceKm(origin, origin), 0);
  assert.equal(delivery.state({ point: origin }), 'free');
  assert.equal(delivery.state({ point: { lat: origin.lat + .04, lng: origin.lng } }), 'free');
  assert.equal(delivery.state({ point: { lat: origin.lat + .05, lng: origin.lng } }), 'quote');
  assert.equal(delivery.state({ address: 'Адрес без метки' }), 'unknown');
  assert.equal(delivery.state({ mode: 'pickup' }), 'pickup');
});

test('untrusted saved delivery data is bounded and cannot invent a free zone', () => {
  const normalized = delivery.normalize({ point: { lat: 400, lng: 20 }, address: 'a'.repeat(600), confirmed: 'yes' });
  assert.equal(normalized.point, null);
  assert.equal(normalized.address.length, 200);
  assert.equal(normalized.confirmed, false);
  assert.equal(delivery.state(normalized), 'unknown');
});

test('order text contains the chosen method, delivery terms and only relevant details', () => {
  const choice = { mode: 'delivery', address: 'Алматы, Таугуль, 34/1', apartment: '2', point: delivery.CONFIG.origin };
  const lines = delivery.orderLines(choice, 'ru').join('\n');
  assert.match(lines, /5 км — бесплатно/);
  assert.match(lines, /Квартира: 2/);
  assert.match(lines, /openstreetmap.org/);
  const outside = delivery.orderLines({ ...choice, point: { lat: 43.3, lng: 76.9 } }, 'ru').join('\n');
  assert.match(outside, /стоимость уточнит оператор/);
  const pickup = delivery.orderLines({ ...choice, mode: 'pickup' }, 'ru').join('\n');
  assert.match(pickup, /Самовывоз/);
  assert.ok(!pickup.includes('Квартира'));
  const message = app.buildOrderMessage([{ type: 'product', id: 'cezar-dog', qty: 1 }], 'ru', '', choice);
  assert.match(message, /Cezar Dog/);
  assert.match(message, /Таугуль/);
  assert.match(message, /1.690/);
});

test('new checkout UI has no footer links or numbered headings, and uses card combo choices', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const footer = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)[0];
  assert.ok(!/<a\b|data-icon/.test(footer));
  assert.match(footer, /Powered by/);
  assert.ok(!html.includes('menuEyebrow'));
  const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
  assert.ok(!source.includes('section-number'));
  assert.ok(!source.includes('category-count'));
  assert.ok(source.includes('combo-pizza-card'));
  assert.ok(!source.includes('#comboOptions select'));
  assert.ok(source.includes("if (line.qty <= 1) return;"));
});
