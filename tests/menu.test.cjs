const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../script.js');

const expected = [
  ['cezar-dog', 'Cezar Dog', 1690],
  ['salmon-dog', 'Salmon Dog', 2090],
  ['sausage-dog', 'Sausage Dog', 1590],
  ['shrimp-dog', 'Shrimp Dog', 2290],
  ['cheese-dog', 'Cheese Dog', 1890],
  ['americano-tempura', 'Американо Темпура', 2390],
  ['cezar-tempura', 'Цезарь Темпура', 2090],
  ['salmon-tempura', 'Лосось Темпура', 2690],
  ['olivier-tempura', 'Оливье Темпура', 2390],
  ['alaska', 'Аляска', 1890],
  ['phila', 'Фила', 2390],
  ['dragon', 'Дракон', 1990],
  ['shrimp-roll', 'Креветка', 2390],
  ['killer', 'Killer', 1890],
  ['kazuto', 'Kazuto', 1990],
  ['unagi-rice', 'Unagi Rice', 1990],
  ['spicy-salmon', 'Острый с лососем', 2590],
  ['mexican-pizza', 'Мексиканская пицца', 2900],
  ['margherita', 'Маргарита', 1790],
  ['pepperoni', 'Пепперони', 2490],
  ['spicy-chicken-pizza', 'Острый с курицей', 2990],
  ['chicken-mini', 'Chicken Mini — 8 шт.', 2590],
  ['chicken-big', 'Chicken Big — 16 шт.', 4790],
  ['fried-shrimp', 'Fried Shrimps — 5 шт.', 3590],
];

test('approved food names stay identical in all three languages, at the latest prices', () => {
  for (const [id, name, price] of expected) {
    const product = app.PRODUCTS.find(product => product.id === id);
    assert.equal(product.price, price, id);
    for (const lang of ['kk', 'ru', 'en']) assert.equal(app.productLabel(product, lang), name);
  }
});

test('roll portions, pizza diameter and binary spicy markers', () => {
  const rolls = app.PRODUCTS.filter(product => product.category === 'sushi');
  const pizzas = app.PRODUCTS.filter(product => product.category === 'pizza');
  assert.equal(rolls.length, 12);
  for (const roll of rolls) assert.equal(roll.pieces, 8);
  for (const pizza of pizzas) assert.equal(pizza.diameter, 30);
  for (const product of app.PRODUCTS) assert.ok([0, 1].includes(product.spice));
});

test('sorting never mixes categories or sushi subgroups', () => {
  const groupKey = product => product.category + ':' + (product.group || '');
  const originalGroups = [...new Set(app.PRODUCTS.map(groupKey))];
  for (const order of ['asc', 'desc']) {
    const sorted = app.selectProducts(app.PRODUCTS, { sort: order });
    assert.deepEqual([...new Set(sorted.map(groupKey))], originalGroups);
    for (const group of originalGroups) {
      const prices = sorted.filter(product => groupKey(product) === group).map(product => product.price);
      assert.deepEqual(prices, [...prices].sort((a, b) => order === 'asc' ? a - b : b - a));
    }
  }
  assert.deepEqual(app.selectProducts(app.PRODUCTS), app.PRODUCTS);
  assert.equal(app.selectProducts(app.PRODUCTS, {}, 'Killer').length, 1);
});

test('saved carts reprice from the current menu and order messages preserve the names', () => {
  const cart = app.normalizeCart([
    { type: 'product', id: 'cezar-dog', qty: 2, price: 1490 },
    { type: 'product', id: 'salmon-tempura', qty: 1, price: 1690 },
    { type: 'combo', choices: ['margherita', 'pepperoni', 'mexican-pizza'], qty: 1 },
  ]);
  assert.equal(app.total(cart), 15060);
  for (const lang of ['kk', 'ru', 'en']) {
    const message = app.buildOrderMessage(cart, lang);
    assert.ok(message.includes('Cezar Dog'));
    assert.ok(message.includes('Лосось Темпура'));
  }
});

test('all 34 photos and all HTML translation keys exist, with Russian/light defaults', () => {
  assert.equal(app.PRODUCTS.length, 34);
  for (const product of app.PRODUCTS) assert.ok(fs.existsSync(path.join(__dirname, '..', app.photo(product))));
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  for (const match of html.matchAll(/data-i18n(?:-aria|-placeholder)?="([^"]+)"/g)) {
    for (const lang of ['kk', 'ru', 'en']) assert.ok(app.I18N[lang][match[1]], lang + ':' + match[1]);
  }
  assert.equal(app.resolveLocale(''), 'ru');
  assert.equal(app.resolveLocale('?lang=kk'), 'kk');
  assert.ok(!html.includes('prefers-color-scheme'));
  assert.ok(!html.includes('filterDialog'));
  assert.ok(!html.includes('photo-note'));
});
