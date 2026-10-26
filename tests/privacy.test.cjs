const test = require('node:test');
const assert = require('node:assert/strict');
const privacy = require('../privacy.js');

function browser({ blockedCookies = false, blockedStorage = false } = {}) {
  const data = new Map();
  let cookie = '', lastCookie = '', time = 1000000000;
  const env = {
    storage: {
      getItem(key) { if (blockedStorage) throw Error('blocked'); return data.get(key) ?? null; },
      setItem(key, value) { if (blockedStorage) throw Error('blocked'); data.set(key, value); },
      removeItem(key) { if (blockedStorage) throw Error('blocked'); data.delete(key); },
    },
    getCookie: () => cookie,
    setCookie(value) { lastCookie = value; if (!blockedCookies) cookie = value.split(';')[0]; },
    now: () => time, secure: true,
  };
  return { env, data, cookie: () => lastCookie, advance: ms => { time += ms; } };
}

test('before a choice, carts persist while addresses and themes stay on the open page', () => {
  const page = browser();
  const store = privacy.createStore(page.env);
  assert.equal(store.getChoice(), null);
  store.set('donsan-cart-v2', '[{"id":"cezar-dog","qty":1}]');
  store.set('donsan-delivery-v1', 'private address');
  store.set('donsan-appearance-v2', 'dark');
  assert.equal(store.get('donsan-delivery-v1'), 'private address');
  assert.equal(page.data.has('donsan-delivery-v1'), false);
  assert.equal(page.data.has('donsan-appearance-v2'), false);
  const nextPage = privacy.createStore(page.env);
  assert.ok(nextPage.get('donsan-cart-v2').includes('cezar-dog'));
  assert.equal(nextPage.get('donsan-delivery-v1'), null);
  assert.equal(page.cookie(), '');
});

test('explicit opt-in saves pending preferences; revoking deletes them without deleting the cart', () => {
  const page = browser();
  const store = privacy.createStore(page.env);
  store.set('donsan-cart-v2', 'cart');
  store.set('donsan-delivery-v1', 'address');
  store.set('donsan-appearance-v2', 'dark');
  assert.equal(store.setChoice(true), true);
  assert.match(page.cookie(), /donsan_privacy=v1.preferences; Max-Age=15552000; Path=\/; SameSite=Lax; Secure/);
  assert.ok(!page.cookie().includes('address'));
  const nextPage = privacy.createStore(page.env);
  assert.equal(nextPage.getChoice(), true);
  assert.equal(nextPage.get('donsan-delivery-v1'), 'address');
  assert.equal(nextPage.setChoice(false), true);
  assert.equal(page.data.has('donsan-delivery-v1'), false);
  assert.equal(page.data.has('donsan-appearance-v2'), false);
  assert.equal(nextPage.get('donsan-delivery-v1'), 'address');
  assert.equal(privacy.createStore(page.env).get('donsan-delivery-v1'), null);
  assert.equal(page.data.get('donsan-cart-v2'), 'cart');
});

test('necessary-only never writes preferences, even when they change afterwards', () => {
  const page = browser();
  const store = privacy.createStore(page.env);
  store.setChoice(false);
  store.set('donsan-appearance-v2', 'dark');
  store.set('donsan-delivery-v1', 'address');
  store.set('donsan-location-prompt-v1', 'seen');
  assert.deepEqual([...page.data.keys()], ['donsan-location-prompt-v1']);
  assert.equal(privacy.createStore(page.env).getChoice(), false);
});

test('revoking permission in another tab prevents an already-open tab from saving preferences', () => {
  const page = browser();
  const firstTab = privacy.createStore(page.env);
  firstTab.setChoice(true);
  const secondTab = privacy.createStore(page.env);
  secondTab.setChoice(false);
  firstTab.set('donsan-appearance-v2', 'dark');
  assert.equal(firstTab.getChoice(), false);
  assert.equal(page.data.has('donsan-appearance-v2'), false);
});

test('blocked cookies use an expiring fallback; malformed or expired choices cannot grant permission', () => {
  const page = browser({ blockedCookies: true });
  const store = privacy.createStore(page.env);
  assert.equal(store.setChoice(true), true);
  assert.equal(privacy.createStore(page.env).getChoice(), true);
  page.advance((privacy.MAX_AGE + 1) * 1000);
  assert.equal(privacy.createStore(page.env).getChoice(), null);
  for (const value of ['invalid', '{"preferences":"yes","expires":9999999999999}', '{"preferences":true,"expires":9999999999999}']) {
    page.data.set('donsan-privacy-v1', value);
    assert.equal(privacy.createStore(page.env).getChoice(), null);
  }
});

test('ordering still works in memory when the browser blocks all storage', () => {
  const page = browser({ blockedCookies: true, blockedStorage: true });
  const store = privacy.createStore(page.env);
  assert.equal(store.setChoice(false), false);
  store.set('donsan-cart-v2', 'cart');
  store.set('donsan-delivery-v1', 'address');
  assert.equal(store.get('donsan-cart-v2'), 'cart');
  assert.equal(store.get('donsan-delivery-v1'), 'address');
  assert.equal(privacy.createStore(page.env).getChoice(), null);
});
