(() => {
  'use strict';
  const COOKIE = 'donsan_privacy';
  const FALLBACK = 'donsan-privacy-v1';
  const MAX_AGE = 180 * 24 * 60 * 60;
  const REQUIRED = ['donsan-cart-v2', 'donsan-location-prompt-v1'];
  const OPTIONAL = ['donsan-appearance-v2', 'donsan-delivery-v1'];
  const TEXT = {
    ru: {
      cookieTitle: 'Cookies и ваши настройки',
      cookieIntro: 'Корзина хранится в браузере. С вашего разрешения мы также запомним тему и адрес для следующего визита. Рекламных cookies нет.',
      cookieDetails: 'Как это работает', cookieRequired: 'Только необходимые', cookieAllow: 'Запоминать настройки',
      privacySettings: 'Cookies и данные', privacyIntro: 'Мы используем собственный cookie и localStorage — хранилище в вашем браузере. Выбор не влияет на возможность оформить заказ.',
      privacyEssentialTitle: 'Для работы сайта', privacyAlways: 'Всегда включено',
      privacyEssentialText: 'В localStorage сохраняются состав и количество товаров в корзине, а также отметка о показанном предложении выбрать адрес. Эти записи остаются до очистки данных браузера. Cookie donsan_privacy хранит только ваш выбор на 180 дней, без имени, адреса и рекламного идентификатора. Если cookies заблокированы, выбор на тот же срок сохраняется в localStorage.',
      privacyOptionalTitle: 'Помнить тему и адрес', privacyOptionalText: 'Только с вашего разрешения в localStorage сохраняются тема оформления и подтверждённый способ получения заказа, адрес, точка на карте и введённые детали доставки. Они доступны при следующем визите, пока вы не отключите запоминание или не очистите данные браузера. Без разрешения эти настройки действуют только на открытой странице.',
      privacyServicesTitle: 'Карта и оформление заказа', privacyServicesText: 'При открытии карты браузер обращается к OpenStreetMap: сервис получает IP-адрес и область просматриваемой карты. Поиск передаёт введённый адрес сервису Photon, а определение местоположения — координаты для поиска адреса. Квартира и комментарий этим сервисам не передаются. Геолокация запрашивается только по вашей кнопке и с разрешения браузера. При переходе к оформлению выбранные товары, адрес и комментарий входят в подготовленное сообщение WhatsApp; вы отправляете его сами. Эти сервисы обрабатывают данные по своим правилам, в том числе за пределами Казахстана. Хостинг Vercel получает технические данные запроса, включая IP-адрес. Шрифты загружаются с нашего сайта; рекламные и аналитические счётчики мы не подключаем.',
      privacyControlTitle: 'Ваш выбор', privacyControlText: 'Изменить выбор можно здесь в любое время через «Cookies и данные» внизу сайта. Отключение запоминания удаляет сохранённые тему и адрес из этого браузера. Текущий заказ остаётся доступным; очистить корзину можно отдельно. Запросы о данных отправленного заказа можно адресовать DONSAN в том же чате WhatsApp.',
      privacySave: 'Сохранить выбор', privacySaved: 'Настройки сохранены', privacySession: 'Браузер не сохранил выбор. Он действует на этой странице.',
    },
    kk: {
      cookieTitle: 'Cookies және баптауларыңыз',
      cookieIntro: 'Себет браузерде сақталады. Рұқсат берсеңіз, келесі кіргенде тақырып пен мекенжайды да есте сақтаймыз. Жарнамалық cookies жоқ.',
      cookieDetails: 'Бұл қалай жұмыс істейді', cookieRequired: 'Тек қажеттісі', cookieAllow: 'Баптауларды есте сақтау',
      privacySettings: 'Cookies және деректер', privacyIntro: 'Біз өз cookie файлымызды және браузеріңіздегі localStorage жадын қолданамыз. Қай нұсқаны таңдасаңыз да, тапсырыс бере аласыз.',
      privacyEssentialTitle: 'Сайттың жұмысы үшін', privacyAlways: 'Әрдайым қосулы',
      privacyEssentialText: 'localStorage жадында себеттегі тауарлар мен олардың саны, сондай-ақ мекенжай таңдау ұсынысының көрсетілгені сақталады. Бұл жазбалар браузер деректерін тазалағанша қалады. donsan_privacy cookie файлы 180 күн бойы тек таңдауыңызды сақтайды; онда аты-жөн, мекенжай немесе жарнамалық сәйкестендіргіш жоқ. Cookies бұғатталса, таңдау сол мерзімге localStorage жадында сақталады.',
      privacyOptionalTitle: 'Тақырып пен мекенжайды есте сақтау', privacyOptionalText: 'Тек рұқсатыңызбен localStorage жадында безендіру тақырыбы, расталған алу тәсілі, мекенжай, картадағы нүкте және енгізілген жеткізу мәліметтері сақталады. Олар есте сақтауды өшіргенше немесе браузер деректерін тазалағанша келесі кіргенде қолжетімді болады. Рұқсатсыз бұл баптаулар тек ашық бетте әрекет етеді.',
      privacyServicesTitle: 'Карта және тапсырысты рәсімдеу', privacyServicesText: 'Картаны ашқанда браузер OpenStreetMap сервисіне жүгінеді: сервис IP мекенжайын және көріп отырған карта аймағын алады. Іздеу кезінде енгізілген мекенжай Photon сервисіне, ал орналасқан жерді анықтағанда мекенжай іздеу үшін координаттар жіберіледі. Пәтер нөмірі мен түсініктеме бұл сервистерге берілмейді. Геолокация тек тиісті батырманы басқанда және браузер рұқсатымен сұралады. Рәсімдеуге өткенде таңдалған тауарлар, мекенжай мен түсініктеме WhatsApp-тағы дайын хабарламаға енгізіледі; оны өзіңіз жібересіз. Бұл сервистер деректерді өз ережелерімен, соның ішінде Қазақстаннан тыс жерлерде өңдейді. Vercel хостингі сұраудың техникалық деректерін, оның ішінде IP мекенжайын алады. Қаріптер өз сайтымыздан жүктеледі; жарнамалық және талдау есептегіштерін қоспаймыз.',
      privacyControlTitle: 'Таңдау өзіңізде', privacyControlText: 'Таңдауды кез келген уақытта сайттың төменгі жағындағы «Cookies және деректер» арқылы өзгерте аласыз. Есте сақтауды өшіргенде сақталған тақырып пен мекенжай осы браузерден жойылады. Ағымдағы тапсырыс қолжетімді қалады; себетті бөлек тазалауға болады. Жіберілген тапсырыс деректеріне қатысты сұрақтарды DONSAN-ға сол WhatsApp чатында жолдай аласыз.',
      privacySave: 'Таңдауды сақтау', privacySaved: 'Баптаулар сақталды', privacySession: 'Браузер таңдауды сақтамады. Ол осы бетте әрекет етеді.',
    },
    en: {
      cookieTitle: 'Cookies and your preferences',
      cookieIntro: 'Your cart stays in your browser. With your permission, we also remember your theme and address for your next visit. No advertising cookies.',
      cookieDetails: 'How it works', cookieRequired: 'Necessary only', cookieAllow: 'Remember preferences',
      privacySettings: 'Cookies and data', privacyIntro: 'We use our own cookie and localStorage, a store in your browser. You can place an order whichever option you choose.',
      privacyEssentialTitle: 'To run the site', privacyAlways: 'Always on',
      privacyEssentialText: 'localStorage keeps the items and quantities in your cart and whether the address prompt has appeared. These records remain until you clear your browser data. The donsan_privacy cookie stores only your choice for 180 days, with no name, address or advertising identifier. If cookies are blocked, localStorage keeps the choice for the same period.',
      privacyOptionalTitle: 'Remember theme and address', privacyOptionalText: 'Only with your permission, localStorage saves your theme, confirmed delivery or pickup choice, address, map point and any delivery details you enter. They are available on your next visit until you turn remembering off or clear your browser data. Without permission, these preferences last only on the open page.',
      privacyServicesTitle: 'Maps and checkout', privacyServicesText: 'Opening the map connects your browser to OpenStreetMap, which receives your IP address and the map area being viewed. Address search sends your query to Photon; location lookup sends coordinates to find an address. Your apartment and comment are not sent to these services. Geolocation is requested only when you press its button and your browser grants permission. Continuing to checkout includes your chosen items, address and comment in a prepared WhatsApp message, which you send yourself. These services process data under their own terms, including outside Kazakhstan. Vercel hosting receives technical request data, including your IP address. Fonts load from our site; we do not add advertising or analytics trackers.',
      privacyControlTitle: 'Your choice', privacyControlText: 'You can change your choice at any time using “Cookies and data” at the bottom of the site. Turning remembering off removes your saved theme and address from this browser. Your current order stays available; you can clear the cart separately. Contact DONSAN in the same WhatsApp chat for requests about data in an order you sent.',
      privacySave: 'Save choice', privacySaved: 'Preferences saved', privacySession: 'Your browser did not save the choice. It applies on this page.',
    },
  };

  // The adapter keeps browser storage failures and preference consent out of the ordering code.
  function createStore(env) {
    const memory = new Map();
    const read = key => { try { return env.storage.getItem(key); } catch { return null; } };
    const write = (key, value) => { try { env.storage.setItem(key, value); } catch { /* Keep this page working. */ } };
    const remove = key => { try { env.storage.removeItem(key); } catch { /* Storage may be disabled. */ } };
    const cookieChoice = () => {
      try {
        const value = env.getCookie().split(';').map(part => part.trim()).find(part => part.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
        return value === 'v1.preferences' ? true : value === 'v1.required' ? false : null;
      } catch { return null; }
    };
    function storedChoice() {
      const cookie = cookieChoice();
      if (cookie !== null) return cookie;
      try {
        const saved = JSON.parse(read(FALLBACK));
        if (typeof saved?.preferences === 'boolean' && Number.isFinite(saved.expires) && saved.expires > env.now() && saved.expires <= env.now() + MAX_AGE * 1000) return saved.preferences;
      } catch { /* An invalid value is not permission. */ }
      remove(FALLBACK);
      return null;
    }
    let choice = storedChoice();
    if (choice === false) OPTIONAL.forEach(remove);
    function syncChoice() {
      const saved = storedChoice();
      if (saved !== null && saved !== choice) {
        choice = saved;
        if (!choice) OPTIONAL.forEach(remove);
      }
    }
    return {
      getChoice() { syncChoice(); return choice; },
      get(key) {
        syncChoice();
        if (!REQUIRED.includes(key) && !OPTIONAL.includes(key)) return null;
        if (memory.has(key)) return memory.get(key);
        if (OPTIONAL.includes(key) && choice !== true) return null;
        const value = read(key);
        if (value !== null) memory.set(key, value);
        return value;
      },
      set(key, value) {
        syncChoice();
        if (!REQUIRED.includes(key) && !OPTIONAL.includes(key)) return;
        memory.set(key, String(value));
        if (REQUIRED.includes(key) || choice === true) write(key, String(value));
      },
      setChoice(preferences) {
        choice = preferences === true;
        const value = choice ? 'v1.preferences' : 'v1.required';
        try { env.setCookie(COOKIE + '=' + value + '; Max-Age=' + MAX_AGE + '; Path=/; SameSite=Lax' + (env.secure ? '; Secure' : '')); } catch { /* Fall back to localStorage. */ }
        if (cookieChoice() === choice) remove(FALLBACK);
        else write(FALLBACK, JSON.stringify({ preferences: choice, expires: env.now() + MAX_AGE * 1000 }));
        for (const key of OPTIONAL) {
          if (!choice) remove(key);
          else if (memory.has(key)) write(key, memory.get(key));
        }
        return storedChoice() === choice;
      },
    };
  }

  function mount({ showDialog, closeDialog, getLanguage, showToast }) {
    const banner = document.querySelector('#cookieBanner');
    const checkbox = document.querySelector('#rememberPreferences');
    const dialog = document.querySelector('#privacyDialog');
    banner.hidden = store.getChoice() !== null;
    function choose(allow) {
      const saved = store.setChoice(allow);
      banner.hidden = true;
      if (dialog.open) closeDialog('privacyDialog');
      showToast(TEXT[getLanguage()][saved ? 'privacySaved' : 'privacySession']);
    }
    document.querySelectorAll('[data-privacy-open]').forEach(button => button.addEventListener('click', () => {
      checkbox.checked = store.getChoice() === true;
      showDialog('privacyDialog');
      document.querySelector('#privacyHeading').focus({ preventScroll: true });
    }));
    document.querySelector('#cookieRequiredBtn').addEventListener('click', () => choose(false));
    document.querySelector('#cookieAllowBtn').addEventListener('click', () => choose(true));
    document.querySelector('#privacyForm').addEventListener('submit', event => { event.preventDefault(); choose(checkbox.checked); });
  }

  let store;
  const api = { COOKIE, MAX_AGE, REQUIRED, OPTIONAL, TEXT, createStore, mount };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document !== 'undefined') {
    store = createStore({
      storage: { getItem: key => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value), removeItem: key => localStorage.removeItem(key) },
      getCookie: () => document.cookie, setCookie: value => { document.cookie = value; }, now: Date.now, secure: location.protocol === 'https:',
    });
    window.DonsanPrivacy = { ...api, store };
  }
})();
