(() => {
  'use strict';
  const WHATSAPP_NUMBER = '77477919765';
  const COMBO_PRICE = 12890;
  const LANGUAGES = ['kk', 'ru', 'en'];
  const CATEGORIES = [
    { id: 'dogs', names: ['Суши-догтар', 'Суши-доги', 'Sushi dogs'] },
    { id: 'sushi', names: ['Суши', 'Суши', 'Sushi'] },
    { id: 'pizza', names: ['Пиццалар', 'Пицца', 'Pizza'] },
    { id: 'snacks', names: ['Тауық еті мен асшаян', 'Курица и креветки', 'Chicken & shrimp'] },
  ];
  const GROUPS = {
    tempura: ['Темпура роллдары', 'Роллы темпура', 'Tempura rolls'],
    cold: ['Салқын роллдар', 'Холодные роллы', 'Cold rolls'],
    baked: ['Пеште пісірілген роллдар', 'Запечённые роллы', 'Baked rolls'],
  };
  // Product prices are authoritative here, including when restoring a saved cart.
  const PRODUCTS = [
    { id: 'cezar-dog', category: 'dogs', names: ['Цезарь суши-догы', 'Цезарь дог', 'Cezar Dog'], price: 1490, spice: 0, photo: 'sushi-dog' },
    { id: 'salmon-dog', category: 'dogs', names: ['Албырт қосылған суши-дог', 'Суши-дог с лососем', 'Salmon Dog'], price: 2090, spice: 0, photo: 'sushi-dog' },
    { id: 'sausage-dog', category: 'dogs', names: ['Шұжық қосылған суши-дог', 'Суши-дог с сосиской', 'Sausage Dog'], price: 1590, spice: 0, photo: 'sushi-dog' },
    { id: 'shrimp-dog', category: 'dogs', names: ['Асшаян қосылған суши-дог', 'Суши-дог с креветкой', 'Shrimp Dog'], price: 2290, spice: 3, photo: 'sushi-dog' },
    { id: 'cheese-dog', category: 'dogs', names: ['Ірімшік қосылған суши-дог', 'Сырный суши-дог', 'Cheese Dog'], price: 1890, spice: 0, photo: 'sushi-dog' },
    { id: 'americano-tempura', category: 'sushi', group: 'tempura', names: ['Американо темпура', 'Американо темпура', 'Americano Tempura'], price: 1390, spice: 0, photo: 'sushi-tempura' },
    { id: 'cezar-tempura', category: 'sushi', group: 'tempura', names: ['Цезарь темпура', 'Цезарь темпура', 'Caesar Tempura'], price: 1390, spice: 0, photo: 'sushi-tempura' },
    { id: 'salmon-tempura', category: 'sushi', group: 'tempura', names: ['Албырт темпура', 'Лосось темпура', 'Salmon Tempura'], price: 1690, spice: 0, photo: 'sushi-tempura' },
    { id: 'olivier-tempura', category: 'sushi', group: 'tempura', names: ['Оливье темпура', 'Оливье темпура', 'Olivier Tempura'], price: 1390, spice: 5, photo: 'sushi-tempura' },
    { id: 'alaska', category: 'sushi', group: 'cold', names: ['Аляска', 'Аляска', 'Alaska'], price: 1390, spice: 0, photo: 'sushi-classic' },
    { id: 'phila', category: 'sushi', group: 'cold', names: ['Фила', 'Фила', 'Phila'], price: 1390, spice: 0, photo: 'sushi-classic' },
    { id: 'dragon', category: 'sushi', group: 'cold', names: ['Айдаһар', 'Дракон', 'Dragon'], price: 1390, spice: 0, photo: 'sushi-classic' },
    { id: 'shrimp-roll', category: 'sushi', group: 'cold', names: ['Асшаян', 'Креветка', 'Shrimp'], price: 1390, spice: 0, photo: 'sushi-classic' },
    { id: 'killer', category: 'sushi', group: 'cold', names: ['Киллер', 'Киллер', 'Killer'], price: 1390, spice: 3, photo: 'sushi-classic' },
    { id: 'kazuto', category: 'sushi', group: 'baked', names: ['Казуто', 'Казуто', 'Kazuto'], price: 1590, spice: 0, photo: 'sushi-baked' },
    { id: 'unagi-rice', category: 'sushi', group: 'baked', names: ['Унаги райс', 'Унаги райс', 'Unagi Rice'], price: 1590, spice: 0, photo: 'sushi-baked' },
    { id: 'spicy-salmon', category: 'sushi', group: 'baked', names: ['Ащы албырт', 'Острый с лососем', 'Spicy Salmon'], price: 1590, spice: 4, photo: 'sushi-baked' },
    { id: 'mexican-pizza', category: 'pizza', names: ['Мексикалық пицца', 'Мексиканская пицца', 'Mexican Pizza'], price: 2900, spice: 3, photo: 'pizza-spicy' },
    { id: 'margherita', category: 'pizza', names: ['Маргарита', 'Маргарита', 'Margherita'], price: 1790, spice: 0, photo: 'pizza-margherita' },
    { id: 'pepperoni', category: 'pizza', names: ['Пепперони', 'Пепперони', 'Pepperoni'], price: 2490, spice: 0, photo: 'pizza-pepperoni' },
    { id: 'spicy-chicken-pizza', category: 'pizza', names: ['Ащы тауық еті қосылған пицца', 'Острый с курицей', 'Spicy Chicken Pizza'], price: 2990, spice: 5, photo: 'pizza-spicy' },
    { id: 'chicken-mini', category: 'snacks', names: ['Тауық еті — 8 дана', 'Курица мини — 8 шт.', 'Chicken Mini — 8 pcs'], price: 2490, spice: 3, photo: 'chicken' },
    { id: 'chicken-big', category: 'snacks', names: ['Тауық еті — 16 дана', 'Курица большая — 16 шт.', 'Chicken Big — 16 pcs'], price: 4590, spice: 3, photo: 'chicken' },
    { id: 'fried-shrimp', category: 'snacks', names: ['Қуырылған асшаян — 5 дана', 'Жареные креветки — 5 шт.', 'Fried Shrimps — 5 pcs'], price: 3590, spice: 0, photo: 'shrimp' },
  ];
  const I18N = {
    kk: {
      title: 'DONSAN — Суши мен пицца', metaDescription: 'DONSAN: суши, пицца және тіскебасарлар. Мәзірден таңдап, WhatsApp арқылы тапсырыс беріңіз.',
      skip: 'Мәзірге өту', homeLabel: 'DONSAN — басты бет', navigation: 'Навигация', menu: 'Мәзір', offers: 'Арнайы ұсыныс', contacts: 'Байланыс', language: 'Тіл таңдау', openCart: 'Себетті ашу',
      heroEyebrow: 'Сенің дәмді үзілісің', heroTitle: 'Дәмді сәттерді', heroAccent: 'бірге бөліс.',
      heroDescription: 'Қытырлақ пицца, сүйікті роллдар мен суши-догтар. Бүгінгі көңіл күйіңе сай дәмді таңда.',
      viewMenu: 'Мәзірді қарау', fresh: 'Тапсырыспен дайындалады', forSharing: 'Бірге жеуге дәмді', heroSticker: 'ДӘМІ БӨЛЕК', heroCaption: 'Пицца + суши = тамаша жұп',
      colaGift: '1 л кола сыйлыққа', specialOffer: 'Бір дастарқанға жиналайық', comboName: '«Armani» жиынтығы',
      comboDescription: 'Төрт түрдің ішінен кез келген 3 пиццаны таңда. 1 литр кола — бізден!', buildCombo: 'Пиццаларды таңдау',
      menuEyebrow: 'DONSAN мәзірі', menuTitle: 'Бүгін не жейміз?', spiceNote: 'Ащылық деңгейі. Өз талғамыңа сай таңда.', categories: 'Мәзір санаттары',
      search: 'Мәзірден іздеу', noResults: 'Ештеңе табылмады. Басқа атаумен іздеп көріңіз.',
      photoNote: 'Фотосуреттер үлгі ретінде берілген. Тағамның нақты көрінісі өзгеше болуы мүмкін.',
      howEyebrow: 'Бәрі оңай', howTitle: 'Таңда. Тапсырыс бер. Дәмін тат.',
      step1Title: 'Сүйіктіңді таңда', step1Text: 'Мәзірден тағамдарды себетке қос.', step2Title: 'Бізге жаз', step2Text: 'Себеттегі тапсырысты WhatsApp арқылы жібер.',
      step3Title: 'Толық мәліметін келіс', step3Text: 'Жеткізу аймағын, уақытын және төлемді оператор нақтылайды.',
      footerDescription: 'Күнделікті сәттерге ерекше дәм. Суши, пицца және жақындарыңмен бөлісетін көңіл күй.',
      ordering: 'Қалай тапсырыс беремін?', deliveryNote: 'Жеткізу құны мен аймағын оператордан нақтылаңыз.', rights: 'Барлық құқықтар қорғалған.',
      yourCart: 'Сенің себетің', close: 'Жабу', orderNote: 'Тапсырысқа ескерту', orderNotePlaceholder: 'Мысалы, жеткізу туралы немесе аллергия жөнінде',
      total: 'Жалпы сома', deliveryNotIncluded: 'Жеткізу құны бөлек нақтыланады.', checkout: 'WhatsApp арқылы тапсырыс беру',
      checkoutNote: 'WhatsApp-та дайын хабарламаны жіберіп, тапсырысты растаңыз.',
      comboChooseHint: 'Әр пиццаны өзің таңда. Бір түрін бірнеше рет алуға болады.', giftIncluded: 'Жиынтыққа тегін кіреді', addCombo: 'Жиынтықты себетке қосу',
      add: 'Қосу', added: 'Қосылды', addedToast: 'себетке қосылды', remove: 'Өшіру', decrease: 'Санын азайту', increase: 'Санын көбейту',
      emptyTitle: 'Әзірге себет бос', emptyText: 'Ұнаған тағамды таңда. Дәмді тапсырыс осы жерден басталады.', pizzaSlot: 'пицца',
      spiceLabel: 'Ащылық деңгейі', details: 'Толығырақ', allergenNote: 'Құрамы мен аллергендер туралы мәліметті тапсырыс бергенде оператордан сұраңыз.',
      dogDescription: 'Сушидің ерекше пішімі', tempuraDescription: 'Қытырлақ темпура роллы', coldDescription: 'Салқын суши роллы', bakedDescription: 'Пеште пісірілген ролл', pizzaDescription: 'Сүйікті пиццаң', snackDescription: 'Бөлісіп жеуге арналған тіскебасар',
      messageHello: 'Сәлеметсіз бе! DONSAN-нан тапсырыс бергім келеді.', messageItems: 'Тапсырысым', messageNote: 'Ескерту', messageConfirm: 'Қолжетімділігін, жеткізу уақытын және төлем тәсілін нақтылап беріңізші.',
      unavailable: 'WhatsApp ашылмады. Қайтадан басып көріңіз.', cartRestored: 'Себет сақталды', quantityLimit: 'Бір тауардан ең көбі 99 дана таңдауға болады.',
    },
    ru: {
      title: 'DONSAN — Суши и пицца', metaDescription: 'DONSAN: суши, пицца и закуски. Выбирайте блюда и оформляйте заказ через WhatsApp.',
      skip: 'Перейти к меню', homeLabel: 'DONSAN — главная', navigation: 'Навигация', menu: 'Меню', offers: 'Специальное предложение', contacts: 'Контакты', language: 'Выбрать язык', openCart: 'Открыть корзину',
      heroEyebrow: 'Твой вкусный перерыв', heroTitle: 'Вкусные моменты', heroAccent: 'лучше вместе.',
      heroDescription: 'Хрустящая пицца, любимые роллы и суши-доги. Выбирай вкус под сегодняшнее настроение.',
      viewMenu: 'Смотреть меню', fresh: 'Готовим на заказ', forSharing: 'Вкуснее делиться', heroSticker: 'СО ВКУСОМ', heroCaption: 'Пицца + суши = отличная пара',
      colaGift: 'Кола 1 л в подарок', specialOffer: 'Собираемся за одним столом', comboName: 'Комбо «Armani»',
      comboDescription: 'Выбери любые 3 пиццы из четырёх видов. Литр колы — за наш счёт!', buildCombo: 'Выбрать пиццы',
      menuEyebrow: 'Меню DONSAN', menuTitle: 'Что едим сегодня?', spiceNote: 'Уровень остроты. Выбирай на свой вкус.', categories: 'Категории меню',
      search: 'Поиск по меню', noResults: 'Ничего не найдено. Попробуйте другое название.',
      photoNote: 'Фотографии приведены для примера. Внешний вид блюда может отличаться.',
      howEyebrow: 'Всё просто', howTitle: 'Выбирай. Заказывай. Наслаждайся.',
      step1Title: 'Выбери любимое', step1Text: 'Добавь блюда из меню в корзину.', step2Title: 'Напиши нам', step2Text: 'Отправь заказ из корзины через WhatsApp.',
      step3Title: 'Уточни детали', step3Text: 'Оператор уточнит зону доставки, время и способ оплаты.',
      footerDescription: 'Особенный вкус повседневных моментов. Суши, пицца и настроение, которым хочется делиться.',
      ordering: 'Как заказать?', deliveryNote: 'Стоимость и зону доставки уточняйте у оператора.', rights: 'Все права защищены.',
      yourCart: 'Твоя корзина', close: 'Закрыть', orderNote: 'Комментарий к заказу', orderNotePlaceholder: 'Например, пожелания по доставке или информация об аллергии',
      total: 'Общая сумма', deliveryNotIncluded: 'Стоимость доставки уточняется отдельно.', checkout: 'Заказать через WhatsApp',
      checkoutNote: 'Отправьте готовое сообщение в WhatsApp, чтобы подтвердить заказ.',
      comboChooseHint: 'Выбери каждую пиццу. Один вид можно выбрать несколько раз.', giftIncluded: 'Бесплатно в составе комбо', addCombo: 'Добавить комбо в корзину',
      add: 'Добавить', added: 'Добавлено', addedToast: 'добавлено в корзину', remove: 'Удалить', decrease: 'Уменьшить количество', increase: 'Увеличить количество',
      emptyTitle: 'Корзина пока пуста', emptyText: 'Выбери блюдо по душе. Вкусный заказ начинается здесь.', pizzaSlot: 'пицца',
      spiceLabel: 'Уровень остроты', details: 'Подробнее', allergenNote: 'Состав и информацию об аллергенах уточняйте у оператора при заказе.',
      dogDescription: 'Новый взгляд на суши', tempuraDescription: 'Хрустящий ролл темпура', coldDescription: 'Холодный суши-ролл', bakedDescription: 'Запечённый ролл', pizzaDescription: 'Твоя любимая пицца', snackDescription: 'Закуска, которой хочется делиться',
      messageHello: 'Здравствуйте! Хочу сделать заказ в DONSAN.', messageItems: 'Мой заказ', messageNote: 'Комментарий', messageConfirm: 'Уточните, пожалуйста, наличие, время доставки и способ оплаты.',
      unavailable: 'Не удалось открыть WhatsApp. Попробуйте ещё раз.', cartRestored: 'Корзина сохранена', quantityLimit: 'Можно выбрать не более 99 порций одного блюда.',
    },
    en: {
      title: 'DONSAN — Sushi & Pizza', metaDescription: 'DONSAN: sushi, pizza and snacks. Browse the menu and place your order via WhatsApp.',
      skip: 'Skip to menu', homeLabel: 'DONSAN — home', navigation: 'Explore', menu: 'Menu', offers: 'Special offer', contacts: 'Contact', language: 'Choose language', openCart: 'Open cart',
      heroEyebrow: 'Your delicious little break', heroTitle: 'Good food tastes', heroAccent: 'better together.',
      heroDescription: 'Crispy pizza, your favourite rolls and sushi dogs. Find the perfect flavour for your mood.',
      viewMenu: 'Explore the menu', fresh: 'Made to order', forSharing: 'Made for sharing', heroSticker: 'FULL OF FLAVOUR', heroCaption: 'Pizza + sushi = the perfect match',
      colaGift: 'Free 1 L cola', specialOffer: 'Bring everyone to the table', comboName: 'Armani Combo',
      comboDescription: 'Pick any 3 pizzas from our four varieties. A litre of cola is on us!', buildCombo: 'Choose your pizzas',
      menuEyebrow: 'The DONSAN menu', menuTitle: 'What are we having?', spiceNote: 'Spice level. Find your perfect heat.', categories: 'Menu categories',
      search: 'Search the menu', noResults: 'No dishes found. Try a different name.',
      photoNote: 'Photos are illustrative. The actual appearance of dishes may vary.',
      howEyebrow: 'Nice and easy', howTitle: 'Choose. Order. Enjoy.',
      step1Title: 'Find your favourite', step1Text: 'Add dishes from the menu to your cart.', step2Title: 'Drop us a message', step2Text: 'Send your cart as an order via WhatsApp.',
      step3Title: 'Confirm the details', step3Text: 'Our team will confirm the delivery area, timing and payment method.',
      footerDescription: 'A special flavour for everyday moments. Sushi, pizza and a little happiness worth sharing.',
      ordering: 'How to order', deliveryNote: 'Please ask our team about delivery fees and coverage.', rights: 'All rights reserved.',
      yourCart: 'Your cart', close: 'Close', orderNote: 'Order note', orderNotePlaceholder: 'For example, delivery instructions or allergy information',
      total: 'Total', deliveryNotIncluded: 'Delivery fees are confirmed separately.', checkout: 'Order via WhatsApp',
      checkoutNote: 'Send the prepared message in WhatsApp to confirm your order.',
      comboChooseHint: 'Choose each pizza. You can select the same variety more than once.', giftIncluded: 'Included in your combo for free', addCombo: 'Add combo to cart',
      add: 'Add', added: 'Added', addedToast: 'added to your cart', remove: 'Remove', decrease: 'Decrease quantity', increase: 'Increase quantity',
      emptyTitle: 'Your cart is empty', emptyText: 'Find something you love. A delicious order starts here.', pizzaSlot: 'Pizza',
      spiceLabel: 'Spice level', details: 'View details', allergenNote: 'Ask our team about ingredients and allergens when placing your order.',
      dogDescription: 'A fresh take on sushi', tempuraDescription: 'Crispy tempura roll', coldDescription: 'Cold sushi roll', bakedDescription: 'Oven-baked roll', pizzaDescription: 'Your favourite pizza', snackDescription: 'A snack made for sharing',
      messageHello: 'Hello! I would like to place an order with DONSAN.', messageItems: 'My order', messageNote: 'Note', messageConfirm: 'Please confirm availability, delivery time and payment options.',
      unavailable: 'WhatsApp could not be opened. Please try again.', cartRestored: 'Cart saved', quantityLimit: 'You can select up to 99 portions of each dish.',
    },
  };
  const PRODUCT_MAP = new Map(PRODUCTS.map(product => [product.id, product]));
  const PIZZAS = PRODUCTS.filter(product => product.category === 'pizza');
  const photo = product => 'assets/' + (product.category === 'dogs' ? product.id + '.png' : product.photo + '.jpg');
  const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₸';
  const linePrice = line => line.type === 'combo' ? COMBO_PRICE : (PRODUCT_MAP.get(line.id)?.price || 0);
  const total = lines => lines.reduce((sum, line) => sum + linePrice(line) * line.qty, 0);
  function normalizeCart(value) {
    if (!Array.isArray(value)) return [];
    const combined = new Map();
    for (const line of value.slice(0, 100)) {
      if (!line || !Number.isInteger(line.qty) || line.qty < 1 || line.qty > 99) continue;
      let item;
      if (line.type === 'combo' && Array.isArray(line.choices) && line.choices.length === 3 && line.choices.every(id => PIZZAS.some(pizza => pizza.id === id))) {
        item = { type: 'combo', choices: [...line.choices], qty: line.qty };
      } else if (line.type === 'product' && PRODUCT_MAP.has(line.id)) {
        item = { type: 'product', id: line.id, qty: line.qty };
      } else continue;
      const key = item.type === 'combo' ? 'combo:' + item.choices.join('|') : item.id;
      const existing = combined.get(key);
      if (existing) existing.qty = Math.min(99, existing.qty + item.qty);
      else combined.set(key, item);
    }
    return [...combined.values()];
  }
  function buildOrderMessage(order, language, note = '') {
    const lang = LANGUAGES.includes(language) ? language : 'kk';
    const words = I18N[lang];
    const name = id => PRODUCT_MAP.get(id).names[LANGUAGES.indexOf(lang)];
    const lines = [words.messageHello, '', '*' + words.messageItems + ':*'];
    order.forEach((line, index) => {
      lines.push((index + 1) + '. ' + (line.type === 'combo' ? words.comboName : name(line.id)) + ' ×' + line.qty + ' — ' + money(linePrice(line) * line.qty));
      if (line.type === 'combo') {
        line.choices.forEach((id, pizzaIndex) => lines.push('   ' + (pizzaIndex + 1) + ') ' + name(id)));
        lines.push('   🎁 ' + words.colaGift);
      }
    });
    lines.push('', '*' + words.total + ': ' + money(total(order)) + '*', words.deliveryNotIncluded);
    if (note.trim()) lines.push('', words.messageNote + ': ' + note.trim());
    lines.push('', words.messageConfirm);
    return lines.join('\n');
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { PRODUCTS, CATEGORIES, GROUPS, I18N, COMBO_PRICE, total, normalizeCart, buildOrderMessage };
  if (typeof document === 'undefined') return;

  const $ = selector => document.querySelector(selector);
  const safeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); } catch { /* The cart still works without storage. */ } };
  let locale = new URLSearchParams(location.search).get('lang') || safeGet('donsan-language') || 'kk';
  if (!LANGUAGES.includes(locale)) locale = 'kk';
  let cart;
  try { cart = normalizeCart(JSON.parse(safeGet('donsan-cart-v2') || '[]')); } catch { cart = []; }
  let selectedProductId = null;
  let toastTimer;
  let amountTimer;
  let activeCategory = 'dogs';
  let menuObserver;
  const t = key => I18N[locale][key];
  const translated = names => names[LANGUAGES.indexOf(locale)];
  const productName = product => translated(product.names);
  const categoryName = id => translated(CATEGORIES.find(category => category.id === id).names);
  const description = product => t(product.category === 'dogs' ? 'dogDescription' : product.group ? product.group + 'Description' : product.category === 'pizza' ? 'pizzaDescription' : 'snackDescription');
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const spice = level => level ? '<span class="spice-level" aria-label="' + t('spiceLabel') + ': ' + level + '/5">' + '🌶️'.repeat(level) + '</span>' : '';
  const lineName = line => line.type === 'combo' ? t('comboName') : productName(PRODUCT_MAP.get(line.id));
  const lineDescription = line => line.type === 'combo' ? line.choices.map(id => productName(PRODUCT_MAP.get(id))).join(' + ') + ' · ' + t('colaGift') : description(PRODUCT_MAP.get(line.id));
  const lineImage = line => line.type === 'combo' ? 'image.png' : photo(PRODUCT_MAP.get(line.id));
  const lineKey = line => line.type === 'combo' ? 'combo:' + line.choices.join('|') : line.id;

  function showToast(message) {
    clearTimeout(toastTimer);
    const toast = $('#toast');
    toast.textContent = message;
    if (!document.querySelector('dialog[open]')) document.body.append(toast);
    else document.querySelector('dialog[open]').append(toast);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function updateAmount(animate) {
    const amount = $('#cartAmount');
    const text = money(total(cart));
    const previous = amount.dataset.value;
    $('#cartOpenBtn').setAttribute('aria-label', t('openCart') + ' · ' + text);
    if (previous === text) return;
    clearTimeout(amountTimer);
    amount.replaceChildren();
    amount.dataset.value = text;
    const next = document.createElement('span');
    next.textContent = text;
    if (animate && previous && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const old = document.createElement('span');
      old.textContent = previous;
      old.className = 'amount-leave';
      old.setAttribute('aria-hidden', 'true');
      amount.append(old);
      next.className = 'amount-enter';
      amountTimer = setTimeout(() => old.remove(), 380);
    }
    amount.append(next);
  }

  function saveCart() {
    safeSet('donsan-cart-v2', JSON.stringify(cart));
  }

  function renderCart(animate = false) {
    const active = document.activeElement;
    const focusedKey = active?.dataset?.key;
    const focusedAction = active?.dataset?.cartAction;
    $('#cartItems').innerHTML = cart.length ? cart.map(line => {
      const key = escapeHTML(lineKey(line));
      return '<article class="cart-item"><img class="cart-item-image" src="' + lineImage(line) + '" alt="" /><div><h3>' + escapeHTML(lineName(line)) + '</h3><p class="cart-item-description">' + escapeHTML(lineDescription(line)) + '</p><div class="cart-item-bottom"><strong>' + money(linePrice(line) * line.qty) + '</strong><div class="quantity-control"><button type="button" data-cart-action="decrease" data-key="' + key + '" aria-label="' + t('decrease') + '">−</button><span>' + line.qty + '</span><button type="button" data-cart-action="increase" data-key="' + key + '" aria-label="' + t('increase') + '">+</button></div></div><button class="remove-item" type="button" data-cart-action="remove" data-key="' + key + '">' + t('remove') + '</button></div></article>';
    }).join('') : '<div class="cart-empty"><span aria-hidden="true">♡</span><h3>' + t('emptyTitle') + '</h3><p>' + t('emptyText') + '</p><button type="button" class="button button-red" data-close="cartDialog">' + t('viewMenu') + '</button></div>';
    $('#cartTotal').textContent = money(total(cart));
    $('#checkoutBtn').disabled = cart.length === 0;
    $('#orderNoteLabel').hidden = cart.length === 0;
    updateAmount(animate);
    if (focusedKey && focusedAction) {
      const replacement = [...document.querySelectorAll('[data-cart-action]')].find(el => el.dataset.key === focusedKey && el.dataset.cartAction === focusedAction);
      if (replacement) replacement.focus({ preventScroll: true });
      else if ($('#cartDialog').open) $('#cartDialog [data-close]').focus({ preventScroll: true });
    }
  }

  function addItem(item) {
    const existing = cart.find(line => lineKey(line) === lineKey(item));
    if (existing?.qty === 99) { showToast(t('quantityLimit')); return false; }
    if (existing) existing.qty += 1;
    else cart.push(item);
    saveCart();
    renderCart(true);
    showToast(lineName(item) + ' — ' + t('addedToast'));
    return true;
  }

  function addProduct(id, button) {
    if (!PRODUCT_MAP.has(id)) return;
    if (!addItem({ type: 'product', id, qty: 1 })) return;
    if (button) {
      button.classList.add('added');
      setTimeout(() => button.classList.remove('added'), 650);
    }
  }

  function productCard(product) {
    const name = escapeHTML(productName(product));
    return '<article class="product-card" data-product="' + product.id + '"><button type="button" class="product-photo" data-details="' + product.id + '" aria-label="' + t('details') + ': ' + name + '"><img src="' + photo(product) + '" alt="' + name + '" loading="lazy" decoding="async" />' + spice(product.spice) + '</button><div class="product-body"><h5 class="product-name"><button type="button" class="product-name" data-details="' + product.id + '">' + name + '</button></h5><p class="product-description">' + description(product) + '</p><div class="product-bottom"><strong class="product-price">' + money(product.price).replace(' ₸', ' <small>₸</small>') + '</strong><button class="add-button" type="button" data-add="' + product.id + '" aria-label="' + t('add') + ': ' + name + '"><span>' + t('add') + '</span><span aria-hidden="true">+</span></button></div></div></article>';
  }

  function renderMenu() {
    const query = $('#menuSearch').value.trim().toLocaleLowerCase(locale);
    const matches = product => !query || product.names.some(name => name.toLocaleLowerCase(locale).includes(query));
    let visibleCount = 0;
    $('#categoryNav').innerHTML = CATEGORIES.map(category => '<a href="#category-' + category.id + '" data-category-link="' + category.id + '" class="' + (activeCategory === category.id ? 'active' : '') + '">' + translated(category.names) + '</a>').join('');
    $('#productGrid').innerHTML = CATEGORIES.map(category => {
      const items = PRODUCTS.filter(product => product.category === category.id && matches(product));
      visibleCount += items.length;
      if (!items.length) return '';
      const content = category.id === 'sushi' ? Object.entries(GROUPS).map(([id, names]) => {
        const groupItems = items.filter(product => product.group === id);
        return groupItems.length ? '<div class="menu-subgroup"><h4>' + translated(names) + '</h4><div class="menu-products">' + groupItems.map(productCard).join('') + '</div></div>' : '';
      }).join('') : '<div class="menu-products">' + items.map(productCard).join('') + '</div>';
      return '<section class="menu-category" id="category-' + category.id + '" aria-labelledby="heading-' + category.id + '"><div class="category-heading"><h3 id="heading-' + category.id + '">' + translated(category.names) + '</h3><span>' + items.length + '</span></div>' + content + '</section>';
    }).join('');
    $('#noResults').hidden = visibleCount !== 0;
    document.querySelectorAll('[data-category-link]').forEach(link => {
      const present = !!$('#category-' + link.dataset.categoryLink);
      link.hidden = !present;
    });
    observeCategories();
  }

  function observeCategories() {
    menuObserver?.disconnect();
    menuObserver = new IntersectionObserver(entries => {
      const entry = entries.filter(item => item.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!entry) return;
      activeCategory = entry.target.id.replace('category-', '');
      document.querySelectorAll('[data-category-link]').forEach(link => {
        const isActive = link.dataset.categoryLink === activeCategory;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-215px 0px -45% 0px', threshold: 0 });
    document.querySelectorAll('.menu-category').forEach(section => menuObserver.observe(section));
  }

  function renderComboOptions(preserve = true) {
    const selected = preserve ? [...document.querySelectorAll('#comboOptions select')].map(select => select.value) : [];
    $('#comboOptions').innerHTML = [0, 1, 2].map(index => {
      const label = locale === 'kk' ? (index + 1) + '-' + t('pizzaSlot') : t('pizzaSlot') + ' ' + (index + 1);
      return '<label class="combo-option"><span>' + label + '</span><select name="pizza-' + index + '" required>' + PIZZAS.map((pizza, pizzaIndex) => '<option value="' + pizza.id + '"' + ((selected[index] || PIZZAS[index].id) === pizza.id ? ' selected' : '') + '>' + escapeHTML(productName(pizza)) + (pizza.spice ? ' ' + '🌶️'.repeat(pizza.spice) : '') + '</option>').join('') + '</select></label>';
    }).join('');
  }

  function showDialog(id) {
    const dialog = $('#' + id);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
  }
  function closeDialog(id) {
    const dialog = $('#' + id);
    dialog.close();
  }

  function renderProductDetails() {
    const product = PRODUCT_MAP.get(selectedProductId);
    if (!product) return;
    $('#productDetails').innerHTML = '<img class="product-detail-image" src="' + photo(product) + '" alt="' + escapeHTML(productName(product)) + '" /><div class="product-detail-body"><p class="eyebrow">' + categoryName(product.category) + '</p><h2 id="productHeading">' + escapeHTML(productName(product)) + '</h2>' + spice(product.spice) + '<p>' + description(product) + '</p><p class="allergen-note">' + t('allergenNote') + '</p><div class="product-detail-action"><strong>' + money(product.price) + '</strong><button type="button" class="button button-red" data-add="' + product.id + '">' + t('add') + ' +</button></div></div>';
  }

  function setLanguage(lang) {
    if (!LANGUAGES.includes(lang)) return;
    clearTimeout(toastTimer);
    $('#toast').classList.remove('show');
    locale = lang;
    document.documentElement.lang = locale;
    document.title = t('title');
    $('meta[name="description"]').content = t('metaDescription');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === locale)));
    safeSet('donsan-language', locale);
    const url = new URL(location.href);
    url.searchParams.set('lang', locale);
    history.replaceState(null, '', url);
    renderMenu();
    renderCart();
    renderComboOptions();
    if ($('#productDialog').open) renderProductDetails();
  }

  document.addEventListener('click', event => {
    const lang = event.target.closest('[data-lang]');
    if (lang) setLanguage(lang.dataset.lang);
    const closer = event.target.closest('[data-close]');
    if (closer) closeDialog(closer.dataset.close);
    const add = event.target.closest('[data-add]');
    if (add) {
      addProduct(add.dataset.add, add);
      if ($('#productDialog').open) closeDialog('productDialog');
    }
    const details = event.target.closest('[data-details]');
    if (details) {
      selectedProductId = details.dataset.details;
      renderProductDetails();
      showDialog('productDialog');
    }
    const action = event.target.closest('[data-cart-action]');
    if (action) {
      const line = cart.find(item => lineKey(item) === action.dataset.key);
      if (!line) return;
      if (action.dataset.cartAction === 'increase') {
        if (line.qty === 99) { showToast(t('quantityLimit')); return; }
        line.qty += 1;
      } else if (action.dataset.cartAction === 'decrease') line.qty -= 1;
      else if (action.dataset.cartAction === 'remove') line.qty = 0;
      cart = cart.filter(item => item.qty > 0);
      saveCart();
      renderCart(true);
    }
  });

  $('#cartOpenBtn').addEventListener('click', () => showDialog('cartDialog'));
  $('#heroOrderBtn').addEventListener('click', () => { renderComboOptions(); showDialog('comboDialog'); });
  $('#menuSearch').addEventListener('input', renderMenu);
  $('#comboForm').addEventListener('submit', event => {
    event.preventDefault();
    const choices = [...document.querySelectorAll('#comboOptions select')].map(select => select.value);
    if (choices.length !== 3 || !choices.every(id => PIZZAS.some(pizza => pizza.id === id))) return;
    closeDialog('comboDialog');
    addItem({ type: 'combo', choices, qty: 1 });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
      document.body.append($('#toast'));
    });
  });
  $('#checkoutBtn').addEventListener('click', () => {
    if (!cart.length) return;
    const message = buildOrderMessage(cart, locale, $('#orderNote').value);
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
  $('#year').textContent = new Date().getFullYear();
  setLanguage(locale);
})();
