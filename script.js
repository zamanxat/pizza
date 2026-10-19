(() => {
  'use strict';
  const WHATSAPP_NUMBER = '77477919765';
  const COMBO_PRICE = 8990;
  const LANGUAGES = ['kk', 'ru', 'en'];
  const CATEGORIES = [
    { id: 'dogs', names: ['Суши-догтар', 'Суши-доги', 'Sushi dogs'] },
    { id: 'sushi', names: ['Суши', 'Суши', 'Sushi'] },
    { id: 'pizza', names: ['Пиццалар', 'Пицца', 'Pizza'] },
    { id: 'snacks', names: ['Тауық еті мен асшаян', 'Курица и креветки', 'Chicken & shrimp'] },
    { id: 'drinks', names: ['Сусындар', 'Напитки', 'Drinks'] },
    { id: 'sauces', names: ['Тұздықтар', 'Соусы', 'Sauces'] },
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
    { id: 'cola-1', category: 'drinks', names: ['Кола — 1 л', 'Кола — 1 л', 'Cola — 1 L'], price: 700, spice: 0, image: 'assets/cola.jpg' },
    { id: 'cola-05', category: 'drinks', names: ['Кола — 0,5 л', 'Кола — 0,5 л', 'Cola — 0.5 L'], price: 450, spice: 0, image: 'assets/cola-05.png' },
    { id: 'fanta-1', category: 'drinks', names: ['Фанта — 1 л', 'Фанта — 1 л', 'Fanta — 1 L'], price: 700, spice: 0, image: 'assets/fanta.jpg' },
    { id: 'fanta-05', category: 'drinks', names: ['Фанта — 0,5 л', 'Фанта — 0,5 л', 'Fanta — 0.5 L'], price: 450, spice: 0, image: 'assets/fanta-05.png' },
    { id: 'fuse-tea-1', category: 'drinks', names: ['Фьюзти — 1 л', 'Фьюз Ти — 1 л', 'Fuse Tea — 1 L'], price: 700, spice: 0, image: 'assets/fuse-tea.jpg' },
    { id: 'fuse-tea-05', category: 'drinks', names: ['Фьюзти — 0,5 л', 'Фьюз Ти — 0,5 л', 'Fuse Tea — 0.5 L'], price: 450, spice: 0, image: 'assets/fuse-tea-05.jpg' },
    { id: 'bonaqua-1', category: 'drinks', names: ['Бонаква — 1 л', 'Бонаква — 1 л', 'Bonaqua — 1 L'], price: 450, spice: 0, image: 'assets/bonaqua.jpg' },
    { id: 'bonaqua-05', category: 'drinks', names: ['Бонаква — 0,5 л', 'Бонаква — 0,5 л', 'Bonaqua — 0.5 L'], price: 300, spice: 0, image: 'assets/bonaqua-05.png' },
    { id: 'cheese-sauce', category: 'sauces', names: ['Ірімшік тұздығы', 'Сырный соус', 'Cheese sauce'], price: 200, spice: 0, image: 'assets/cheese-sauce.jpg' },
    { id: 'ketchup', category: 'sauces', names: ['Кетчуп', 'Кетчуп', 'Ketchup'], price: 200, spice: 0, image: 'assets/ketchup.png' },
  ];
  const I18N = {
    kk: {
      title: 'DONSAN — Суши мен пицца', metaDescription: 'DONSAN: суши, пицца және тіскебасарлар. Мәзірден таңдап, WhatsApp арқылы тапсырыс беріңіз.',
      skip: 'Мәзірге өту', homeLabel: 'DONSAN — басты бет', navigation: 'Навигация', menu: 'Мәзір', offers: 'Арнайы ұсыныс', contacts: 'Байланыс', language: 'Тіл таңдау', openCart: 'Себетті ашу',
      heroEyebrow: 'Сенің дәмді үзілісің', heroTitle: 'Дәмді сәттерді', heroAccent: 'бірге бөліс.',
      heroDescription: 'Қытырлақ пицца, сүйікті роллдар мен суши-догтар. Бүгінгі көңіл күйіңе сай дәмді таңда.',
      viewMenu: 'Мәзірді қарау', fresh: 'Тапсырыспен дайындалады', forSharing: 'Бірге жеуге дәмді', heroSticker: 'ДӘМІ БӨЛЕК', heroCaption: 'Пицца + суши = тамаша жұп',
      colaGift: '1 л кола сыйлыққа', specialOffer: 'Арнайы ұсыныс', comboName: '«Итальяно» жиынтығы',
      comboDescription: 'Төрт түрдің ішінен кез келген 3 пиццаны таңда. 1 литр кола — бізден!', buildCombo: 'Пиццаларды таңдау',
      menuEyebrow: 'DONSAN', menuTitle: 'Мәзір', spiceNote: 'Ащылық деңгейі. Өз талғамыңа сай таңда.', categories: 'Мәзір санаттары',
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
      colaGift: 'Кола 1 л в подарок', specialOffer: 'Специальное предложение', comboName: 'Комбо «Итальяно»',
      comboDescription: 'Выбери любые 3 пиццы из четырёх видов. Литр колы — за наш счёт!', buildCombo: 'Выбрать пиццы',
      menuEyebrow: 'DONSAN', menuTitle: 'Меню', spiceNote: 'Уровень остроты. Выбирай на свой вкус.', categories: 'Категории меню',
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
      colaGift: 'Free 1 L cola', specialOffer: 'Special offer', comboName: 'Italiano Combo',
      comboDescription: 'Pick any 3 pizzas from our four varieties. A litre of cola is on us!', buildCombo: 'Choose your pizzas',
      menuEyebrow: 'DONSAN', menuTitle: 'Menu', spiceNote: 'Spice level. Find your perfect heat.', categories: 'Menu categories',
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
  const EXTRA_TEXT = {
    kk: { darkMode: 'Түнгі режимді қосу', lightMode: 'Күндізгі режимді қосу', clearCart: 'Себетті тазалау', cartCleared: 'Себет тазаланды', undo: 'Қайтару', filters: 'Сүзгі', all: 'Барлығы', notSpicy: 'Ащы емес', spicy: 'Ащы', maxPrice: 'Баға шегі', anyPrice: 'Кез келген баға', upTo: 'дейін', sortLabel: 'Сұрыптау', sortDefault: 'Мәзір ретімен', sortAsc: 'Алдымен арзаны', sortDesc: 'Алдымен қымбаты', resetFilters: 'Сүзгілерді тазалау', showResults: 'Көрсету', drinkDescription: 'Сүйікті сусының', sauceDescription: 'Тағамға қосымша тұздық' },
    ru: { darkMode: 'Включить ночной режим', lightMode: 'Включить дневной режим', clearCart: 'Очистить корзину', cartCleared: 'Корзина очищена', undo: 'Вернуть', filters: 'Фильтры', all: 'Всё меню', notSpicy: 'Неострое', spicy: 'Острое', maxPrice: 'Максимальная цена', anyPrice: 'Любая цена', upTo: 'до', sortLabel: 'Сортировка', sortDefault: 'По порядку меню', sortAsc: 'Сначала дешевле', sortDesc: 'Сначала дороже', resetFilters: 'Сбросить фильтры', showResults: 'Показать', drinkDescription: 'Любимый напиток', sauceDescription: 'Соус к любимому блюду' },
    en: { darkMode: 'Switch to dark mode', lightMode: 'Switch to light mode', clearCart: 'Clear cart', cartCleared: 'Cart cleared', undo: 'Undo', filters: 'Filters', all: 'All dishes', notSpicy: 'Not spicy', spicy: 'Spicy', maxPrice: 'Maximum price', anyPrice: 'Any price', upTo: 'up to', sortLabel: 'Sort by', sortDefault: 'Menu order', sortAsc: 'Price: low to high', sortDesc: 'Price: high to low', resetFilters: 'Reset filters', showResults: 'Show results', drinkDescription: 'Your favourite drink', sauceDescription: 'A little extra flavour' },
  };
  Object.entries(EXTRA_TEXT).forEach(([lang, words]) => Object.assign(I18N[lang], words));
  const PRODUCT_MAP = new Map(PRODUCTS.map(product => [product.id, product]));
  const PIZZAS = PRODUCTS.filter(product => product.category === 'pizza');
  const photo = product => product.image || 'assets/' + (product.category === 'dogs' || product.category === 'sushi' ? product.id + '.png' : product.photo + '.jpg');
  const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₸';
  const linePrice = line => line.type === 'combo' ? COMBO_PRICE : (PRODUCT_MAP.get(line.id)?.price || 0);
  const total = lines => lines.reduce((sum, line) => sum + linePrice(line) * line.qty, 0);
  function selectProducts(products, filters = {}, query = '', language = 'kk') {
    filters = { category: 'all', spice: 'all', maxPrice: 0, sort: 'default', ...filters };
    const needle = query.trim().toLocaleLowerCase(language);
    const selected = products.filter(product =>
      (filters.category === 'all' || product.category === filters.category) &&
      (filters.spice === 'all' || (filters.spice === 'spicy' ? product.spice > 0 : product.spice === 0)) &&
      (!filters.maxPrice || product.price <= filters.maxPrice) &&
      (!needle || product.names.some(name => name.toLocaleLowerCase(language).includes(needle)))
    );
    if (filters.sort === 'asc') selected.sort((a, b) => a.price - b.price);
    if (filters.sort === 'desc') selected.sort((a, b) => b.price - a.price);
    return selected;
  }
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
  function digitSequence(from, to, direction, spin = true) {
    const distance = direction > 0 ? (to - from + 10) % 10 : (from - to + 10) % 10;
    const steps = distance + (spin && distance > 0 && distance < 4 ? 10 : 0);
    return Array.from({ length: steps + 1 }, (_, index) => (from + direction * index + 100) % 10);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { PRODUCTS, CATEGORIES, GROUPS, I18N, COMBO_PRICE, total, normalizeCart, buildOrderMessage, digitSequence, selectProducts, photo };
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
  const defaultFilters = () => ({ category: 'all', spice: 'all', maxPrice: 0, sort: 'default' });
  let filters = defaultFilters();
  let clearUndo = null;
  const t = key => I18N[locale][key];
  const translated = names => names[LANGUAGES.indexOf(locale)];
  const productName = product => translated(product.names);
  const categoryName = id => translated(CATEGORIES.find(category => category.id === id).names);
  const description = product => t(product.category === 'dogs' ? 'dogDescription' : product.group ? product.group + 'Description' : product.category === 'pizza' ? 'pizzaDescription' : product.category === 'drinks' ? 'drinkDescription' : product.category === 'sauces' ? 'sauceDescription' : 'snackDescription');
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const ICON_PATHS = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    bag: '<path d="M6 7h12l2 13H4L6 7Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    chef: '<path d="M7 14a4 4 0 1 1-1-7.9 6 6 0 0 1 12 0A4 4 0 1 1 17 14v6H7v-6ZM7 17h10"/>',
    phone: '<path d="m8 3-4 1c-2 7 9 18 16 16l1-4-5-2-2 2a15 15 0 0 1-6-6l2-2-2-5Z"/>',
    gift: '<path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13"/><path d="M12 8H7.5A2.5 2.5 0 1 1 10 5.5L12 8Zm0 0h4.5A2.5 2.5 0 1 0 14 5.5L12 8Z"/>',
    chili: '<path d="M16 7c3-1 4-3 3-5M15 6c-2-1-5 0-6 4-1 5-3 8-7 10 8 3 17-3 17-9 0-2-1-4-4-5Z"/><path d="m10 8 7 5"/>',
    moon: '<path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
    sliders: '<path d="M4 6h5M15 6h5M4 12h10M20 12h0M4 18h2M12 18h8"/><circle cx="12" cy="6" r="3"/><circle cx="17" cy="12" r="3"/><circle cx="9" cy="18" r="3"/>',
    sakura: '<path d="M12 12C4 8 9 1 12 5c3-4 8 3 0 7Zm0 0c1-9 10-6 7-2 5 2 0 9-7 2Zm0 0c9-1 9 8 4 7 0 5-8 2-4-7Zm0 0c4 8-4 11-5 6-5 1-5-8 5-6Zm0 0c-7 6-12-1-7-3C2 5 10 3 12 12Z"/><circle cx="12" cy="12" r="1.3"/>',
  };
  const icon = name => '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON_PATHS[name] + '</svg>';
  const spice = level => level ? '<span class="spice-level" aria-label="' + t('spiceLabel') + ': ' + level + '/5">' + icon('chili').repeat(level) + '</span>' : '';
  const lineName = line => line.type === 'combo' ? t('comboName') : productName(PRODUCT_MAP.get(line.id));
  const lineDescription = line => line.type === 'combo' ? line.choices.map(id => productName(PRODUCT_MAP.get(id))).join(' + ') + ' · ' + t('colaGift') : description(PRODUCT_MAP.get(line.id));
  const lineImage = line => line.type === 'combo' ? 'image.png' : photo(PRODUCT_MAP.get(line.id));
  const lineKey = line => line.type === 'combo' ? 'combo:' + line.choices.join('|') : line.id;

  function showToast(message, undo = false) {
    clearTimeout(toastTimer);
    const toast = $('#toast');
    toast.textContent = message;
    if (undo) {
      const action = document.createElement('button');
      action.type = 'button';
      action.className = 'toast-action';
      action.dataset.undoCart = '';
      action.textContent = t('undo');
      toast.append(action);
    }
    if (!document.querySelector('dialog[open]')) document.body.append(toast);
    else document.querySelector('dialog[open]').append(toast);
    toast.classList.add('show');
    const undoSnapshot = clearUndo;
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      if (undo && clearUndo === undoSnapshot) clearUndo = null;
    }, undo ? 6000 : 2200);
  }

  function updateThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const button = $('#themeToggle');
    button.innerHTML = icon(dark ? 'sun' : 'moon');
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', t(dark ? 'lightMode' : 'darkMode'));
    button.title = t(dark ? 'lightMode' : 'darkMode');
    $('meta[name="theme-color"]').content = dark ? '#171518' : '#fcf7f6';
  }

  // Each place value keeps its own reel. Unchanged digits remain still, and rapid
  // updates start from the currently visible digit instead of restarting a price.
  function rollNumber(element, value, { animate = false, currency = true } = {}) {
    const previous = element.dataset.numberValue;
    const label = currency ? money(value) : String(value);
    if (previous === String(value)) return;
    const moving = animate && previous !== undefined && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const direction = value >= Number(previous || 0) ? 1 : -1;
    element.classList.add('rolling-number');
    element.dataset.numberValue = String(value);
    element.setAttribute('aria-label', label);
    let visual = element.querySelector('.number-visual');
    if (!visual) {
      element.replaceChildren();
      const accessible = document.createElement('span');
      accessible.className = 'sr-only';
      accessible.dataset.numberLabel = '';
      visual = document.createElement('span');
      visual.className = 'number-visual';
      visual.setAttribute('aria-hidden', 'true');
      element.append(accessible, visual);
    }
    element.querySelector('[data-number-label]').textContent = label;
    const digits = String(value).split('');
    let wheels = [...visual.querySelectorAll('.digit-wheel')];
    if (wheels.length !== digits.length) {
      const oldWheels = new Map(wheels.map(wheel => [Number(wheel.dataset.place), wheel]));
      const children = [];
      digits.forEach((digit, index) => {
        const place = digits.length - index - 1;
        if (index && (digits.length - index) % 3 === 0) {
          const separator = document.createElement('span');
          separator.className = 'number-separator';
          separator.textContent = '\u00a0';
          children.push(separator);
        }
        const wheel = oldWheels.get(place) || document.createElement('span');
        wheel.className = 'digit-wheel';
        wheel.dataset.place = place;
        children.push(wheel);
      });
      if (currency) {
        const suffix = document.createElement('span');
        suffix.className = 'number-currency';
        suffix.textContent = '₸';
        children.push(suffix);
      }
      visual.replaceChildren(...children);
      wheels = [...visual.querySelectorAll('.digit-wheel')];
    }
    wheels.forEach((wheel, index) => {
      const target = Number(digits[index]);
      if (wheel.dataset.digit === String(target)) return;
      let from = Number(wheel.dataset.digit || 0);
      const oldStrip = wheel.querySelector('.digit-strip');
      if (wheel.reelAnimation && oldStrip && wheel.offsetHeight) {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(oldStrip).transform);
        const frame = Math.max(0, Math.min(oldStrip.children.length - 1, Math.round(-matrix.m42 / wheel.offsetHeight)));
        from = Number(oldStrip.children[frame]?.textContent || from);
        wheel.reelAnimation.cancel();
      }
      wheel.dataset.digit = String(target);
      const strip = document.createElement('span');
      strip.className = 'digit-strip';
      const sequence = moving && from !== target ? digitSequence(from, target, direction, currency) : [target];
      const displaySequence = direction < 0 ? [...sequence].reverse() : sequence;
      displaySequence.forEach(digit => {
        const cell = document.createElement('span');
        cell.className = 'digit-cell';
        cell.textContent = digit;
        strip.append(cell);
      });
      wheel.replaceChildren(strip);
      if (sequence.length === 1) return;
      const distance = (sequence.length - 1) * 1.15;
      const start = direction > 0 ? 0 : -distance;
      const end = direction > 0 ? -distance : 0;
      const animation = strip.animate([
        { transform: 'translateY(' + start + 'em)' },
        { transform: 'translateY(' + end + 'em)' },
      ], { duration: currency ? 600 + Number(wheel.dataset.place) * 45 : 300, delay: currency ? Number(wheel.dataset.place) * 18 : 0, easing: 'cubic-bezier(.2,.68,.2,1)', fill: 'both' });
      wheel.reelAnimation = animation;
      animation.onfinish = () => {
        if (wheel.reelAnimation !== animation) return;
        const cell = document.createElement('span');
        cell.className = 'digit-cell';
        cell.textContent = target;
        strip.replaceChildren(cell);
        animation.cancel();
        wheel.reelAnimation = null;
      };
    });
  }

  function updateAmount(animate) {
    const value = total(cart);
    $('#cartOpenBtn').setAttribute('aria-label', t('openCart') + ' · ' + money(value));
    rollNumber($('#cartAmount'), value, { animate });
  }

  function saveCart() {
    safeSet('donsan-cart-v2', JSON.stringify(cart));
  }

  function renderCart(animate = false) {
    const active = document.activeElement;
    const focusRoot = active?.closest('dialog') || document;
    const focusedKey = active?.dataset?.key;
    const focusedAction = active?.dataset?.cartAction;
    const root = $('#cartItems');
    if (!cart.length) {
      root.innerHTML = '<div class="cart-empty"><span aria-hidden="true">' + icon('bag') + '</span><h3>' + t('emptyTitle') + '</h3><p>' + t('emptyText') + '</p><button type="button" class="button button-red" data-close="cartDialog">' + t('viewMenu') + '</button></div>';
    } else {
      root.querySelector('.cart-empty')?.remove();
      const keys = new Set(cart.map(lineKey));
      root.querySelectorAll('.cart-item').forEach(row => { if (!keys.has(row.dataset.lineKey)) row.remove(); });
      cart.forEach((line, index) => {
        const key = lineKey(line);
        let row = [...root.children].find(element => element.dataset.lineKey === key);
        if (!row) {
          row = document.createElement('article');
          row.className = 'cart-item';
          row.dataset.lineKey = key;
          row.innerHTML = '<img class="cart-item-image" alt="" /><div><h3></h3><p class="cart-item-description"></p><div class="cart-item-bottom"><strong class="cart-line-price"></strong><div class="quantity-control"><button type="button" data-cart-action="decrease">' + icon('minus') + '</button><span class="quantity-value"></span><button type="button" data-cart-action="increase">' + icon('plus') + '</button></div></div><button class="remove-item" type="button" data-cart-action="remove"></button></div>';
          root.append(row);
        }
        row.querySelector('.cart-item-image').src = lineImage(line);
        row.querySelector('h3').textContent = lineName(line);
        row.querySelector('.cart-item-description').textContent = line.type === 'combo' ? lineDescription(line) : '';
        row.querySelector('.cart-item-description').hidden = line.type !== 'combo';
        row.querySelector('[data-cart-action="remove"]').textContent = t('remove');
        row.querySelectorAll('[data-cart-action]').forEach(button => {
          button.dataset.key = key;
          button.setAttribute('aria-label', t(button.dataset.cartAction) + ': ' + lineName(line));
          button.disabled = button.dataset.cartAction === 'increase' && line.qty >= 99;
        });
        rollNumber(row.querySelector('.cart-line-price'), linePrice(line) * line.qty, { animate });
        rollNumber(row.querySelector('.quantity-value'), line.qty, { animate, currency: false });
      });
    }
    rollNumber($('#cartTotal'), total(cart), { animate });
    $('#checkoutBtn').disabled = cart.length === 0;
    $('#clearCartBtn').hidden = cart.length === 0;
    $('.cart-tools').hidden = cart.length === 0;
    $('#orderNoteLabel').hidden = cart.length === 0;
    updateAmount(animate);
    syncProductControls(animate);
    if (focusedKey && focusedAction) {
      const replacement = [...focusRoot.querySelectorAll('[data-cart-action]')].find(el => el.dataset.key === focusedKey && el.dataset.cartAction === focusedAction);
      if (replacement) {
        if (document.activeElement !== replacement) replacement.focus({ preventScroll: true });
      } else if ($('#cartDialog').open) $('#cartDialog [data-close]').focus({ preventScroll: true });
    }
  }

  function addItem(item) {
    clearUndo = null;
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
  }

  function syncProductControls(animate = false) {
    document.querySelectorAll('[data-product-control]').forEach(root => {
      const id = root.dataset.productControl;
      const product = PRODUCT_MAP.get(id);
      const qty = cart.find(line => line.type === 'product' && line.id === id)?.qty || 0;
      const wasFocused = root.contains(document.activeElement);
      if (qty === 0) {
        if (root.dataset.state !== 'empty') {
          root.innerHTML = '<button class="add-button" type="button" data-add="' + id + '" aria-label="' + t('add') + ': ' + escapeHTML(productName(product)) + '"><span>' + t('add') + '</span>' + icon('plus') + '</button>';
          root.dataset.state = 'empty';
          if (wasFocused) root.querySelector('button').focus({ preventScroll: true });
        }
      } else {
        if (root.dataset.state !== 'quantity') {
          root.innerHTML = '<div class="quantity-control product-quantity"><button type="button" data-cart-action="decrease" data-key="' + id + '" aria-label="' + t('decrease') + ': ' + escapeHTML(productName(product)) + '">' + icon('minus') + '</button><span class="quantity-value"></span><button type="button" data-cart-action="increase" data-key="' + id + '" aria-label="' + t('increase') + ': ' + escapeHTML(productName(product)) + '">' + icon('plus') + '</button></div>';
          root.dataset.state = 'quantity';
          if (wasFocused) root.querySelector('[data-cart-action="increase"]').focus({ preventScroll: true });
          if (animate) rollNumber(root.querySelector('.quantity-value'), 0, { currency: false });
        }
        rollNumber(root.querySelector('.quantity-value'), qty, { animate, currency: false });
        root.querySelector('[data-cart-action="increase"]').disabled = qty >= 99;
      }
    });
  }

  function productCard(product) {
    const name = escapeHTML(productName(product));
    const heading = product.group ? 'h4' : 'h3';
    const pack = product.category === 'drinks' || product.category === 'sauces' ? ' is-pack' : '';
    return '<article class="product-card' + pack + '" data-product="' + product.id + '"><button type="button" class="product-photo" data-details="' + product.id + '" aria-label="' + t('details') + ': ' + name + '"><img src="' + photo(product) + '" alt="' + name + '" loading="lazy" decoding="async" /><span class="product-seal" aria-hidden="true">' + icon('sakura') + '</span>' + spice(product.spice) + '</button><div class="product-body"><' + heading + ' class="product-name"><button type="button" class="product-name" data-details="' + product.id + '">' + name + '</button></' + heading + '><div class="product-bottom"><strong class="product-price">' + money(product.price).replace(' ₸', ' <small>₸</small>') + '</strong><div class="product-control" data-product-control="' + product.id + '"></div></div></div></article>';
  }

  function renderMenu() {
    const focusedCategory = document.activeElement?.dataset?.categoryFilter;
    const items = selectProducts(PRODUCTS, filters, $('#menuSearch').value, locale);
    const navItems = [{ id: 'all', names: LANGUAGES.map(lang => I18N[lang].all) }, ...CATEGORIES];
    $('#categoryNav').innerHTML = navItems.map(category => '<button type="button" data-category-filter="' + category.id + '" aria-pressed="' + (filters.category === category.id) + '">' + translated(category.names) + '</button>').join('');
    $('#productGrid').innerHTML = CATEGORIES.map(category => {
      const categoryItems = items.filter(product => product.category === category.id);
      if (!categoryItems.length) return '';
      const content = category.id === 'sushi' ? Object.entries(GROUPS).map(([id, names]) => {
        const groupItems = categoryItems.filter(product => product.group === id);
        return groupItems.length ? '<div class="menu-subgroup"><h3>' + translated(names) + '</h3><div class="menu-products">' + groupItems.map(productCard).join('') + '</div></div>' : '';
      }).join('') : '<div class="menu-products">' + categoryItems.map(productCard).join('') + '</div>';
      return '<section class="menu-category" id="category-' + category.id + '" aria-labelledby="heading-' + category.id + '"><div class="category-heading"><span class="category-flower" aria-hidden="true">' + icon('sakura') + '</span><h2 id="heading-' + category.id + '">' + translated(category.names) + '</h2><span class="category-count">' + categoryItems.length + '</span></div>' + content + '</section>';
    }).join('');
    $('#noResults').hidden = items.length !== 0;
    const count = Number(filters.category !== 'all') + Number(filters.spice !== 'all') + Number(filters.maxPrice > 0) + Number(filters.sort !== 'default');
    $('#filterBadge').textContent = count;
    $('#filterBadge').hidden = count === 0;
    $('#filterOpenBtn').classList.toggle('has-filters', count > 0);
    syncProductControls();
    if (focusedCategory) document.querySelector('[data-category-filter="' + focusedCategory + '"]')?.focus({ preventScroll: true });
  }

  function renderFilterOptions() {
    $('#spiceFilterOptions').innerHTML = [['all', 'all'], ['mild', 'notSpicy'], ['spicy', 'spicy']].map(([value, key]) => '<label><input type="radio" name="spice" value="' + value + '"' + (filters.spice === value ? ' checked' : '') + ' /><span>' + t(key) + '</span></label>').join('');
    $('#maxPriceFilter').innerHTML = [0, 500, 1000, 1500, 3000, 5000].map(value => {
      const label = value === 0 ? t('anyPrice') : locale === 'kk' ? money(value) + ' ' + t('upTo') : t('upTo') + ' ' + money(value);
      return '<option value="' + value + '">' + label + '</option>';
    }).join('');
    $('#maxPriceFilter').value = String(filters.maxPrice);
    $('#sortFilter').innerHTML = [['default', 'sortDefault'], ['asc', 'sortAsc'], ['desc', 'sortDesc']].map(([value, key]) => '<option value="' + value + '">' + t(key) + '</option>').join('');
    $('#sortFilter').value = filters.sort;
  }

  function resetFilters() {
    filters = defaultFilters();
    $('#menuSearch').value = '';
    renderMenu();
    renderFilterOptions();
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
    if (!dialog.open || dialog.dataset.closing) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { dialog.close(); return; }
    dialog.dataset.closing = 'true';
    const closing = dialog.animate([
      { opacity: 1, transform: 'translate(0, 0)' },
      { opacity: 0, transform: id === 'cartDialog' ? 'translate(16px, 0)' : 'translate(0, 8px)' },
    ], { duration: 180, easing: 'cubic-bezier(.4,0,1,1)' });
    closing.onfinish = () => { dialog.close(); delete dialog.dataset.closing; };
  }

  function renderProductDetails() {
    const product = PRODUCT_MAP.get(selectedProductId);
    if (!product) return;
    $('#productDetails').innerHTML = '<img class="product-detail-image" src="' + photo(product) + '" alt="' + escapeHTML(productName(product)) + '" /><div class="product-detail-body"><p class="eyebrow">' + categoryName(product.category) + '</p><h2 id="productHeading">' + escapeHTML(productName(product)) + '</h2>' + spice(product.spice) + '<p>' + description(product) + '</p><p class="allergen-note">' + t('allergenNote') + '</p><div class="product-detail-action"><strong>' + money(product.price) + '</strong><div class="product-control" data-product-control="' + product.id + '"></div></div></div>';
    syncProductControls();
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
    renderFilterOptions();
    updateThemeButton();
    if ($('#productDialog').open) renderProductDetails();
  }

  document.addEventListener('click', event => {
    const lang = event.target.closest('[data-lang]');
    if (lang) setLanguage(lang.dataset.lang);
    const category = event.target.closest('[data-category-filter]');
    if (category) {
      filters.category = category.dataset.categoryFilter;
      renderMenu();
    }
    if (event.target.closest('[data-reset-filters]')) resetFilters();
    if (event.target.closest('[data-undo-cart]') && clearUndo) {
      cart = normalizeCart(clearUndo.items);
      $('#orderNote').value = clearUndo.note;
      clearUndo = null;
      saveCart();
      renderCart(true);
      $('#toast').classList.remove('show');
    }
    const closer = event.target.closest('[data-close]');
    if (closer) closeDialog(closer.dataset.close);
    const add = event.target.closest('[data-add]');
    if (add) {
      addProduct(add.dataset.add, add);
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
  $('#themeToggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    safeSet('donsan-theme', theme);
    updateThemeButton();
  });
  $('#clearCartBtn').addEventListener('click', () => {
    if (!cart.length) return;
    clearUndo = { items: cart.map(line => ({ ...line, ...(line.choices ? { choices: [...line.choices] } : {}) })), note: $('#orderNote').value };
    cart = [];
    $('#orderNote').value = '';
    saveCart();
    renderCart(true);
    $('#cartDialog [data-close]').focus({ preventScroll: true });
    showToast(t('cartCleared'), true);
  });
  $('#heroOrderBtn').addEventListener('click', () => { renderComboOptions(); showDialog('comboDialog'); });
  $('#filterOpenBtn').addEventListener('click', () => { renderFilterOptions(); showDialog('filterDialog'); });
  $('#filterForm').addEventListener('submit', event => {
    event.preventDefault();
    filters.spice = new FormData($('#filterForm')).get('spice') || 'all';
    filters.maxPrice = Number($('#maxPriceFilter').value);
    filters.sort = $('#sortFilter').value;
    renderMenu();
    closeDialog('filterDialog');
  });
  $('#menuSearch').addEventListener('input', renderMenu);
  $('#comboForm').addEventListener('submit', event => {
    event.preventDefault();
    const choices = [...document.querySelectorAll('#comboOptions select')].map(select => select.value);
    if (choices.length !== 3 || !choices.every(id => PIZZAS.some(pizza => pizza.id === id))) return;
    closeDialog('comboDialog');
    addItem({ type: 'combo', choices, qty: 1 });
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(dialog.id); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog.id);
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
  document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
  document.querySelectorAll('[data-combo-price]').forEach(element => { element.textContent = money(COMBO_PRICE); });
  $('#year').textContent = new Date().getFullYear();
  setLanguage(locale);
})();
