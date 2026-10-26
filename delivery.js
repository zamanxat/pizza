(() => {
  'use strict';
  const CONFIG = {
    address: 'Алматы, мкр. Таугуль, 34/1',
    origin: { lat: 43.209372, lng: 76.873193 },
    radiusKm: 5,
    source: 'https://2gis.kz/almaty/firm/70000001024854330',
    tiles: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    geocoder: 'https://photon.komoot.io',
  };
  const TEXT = {
    ru: {
      delivery: 'Доставка', pickup: 'Самовывоз', chooseAddress: 'Куда привезти заказ?', editAddress: 'Изменить адрес',
      addressLabel: 'Улица и дом', addressPlaceholder: 'Например, Жандосова, 140', searchAddress: 'Найти',
      locate: 'Определить местоположение', locating: 'Определяем…', manualAddress: 'Или введите адрес вручную',
      apartment: 'Квартира', entrance: 'Подъезд', floor: 'Этаж', addressComment: 'Ориентир для курьера',
      saveAddress: 'Сохранить адрес', continueOrder: 'Перейти в WhatsApp', checkout: 'Оформить заказ',
      freeZone: 'Бесплатно в радиусе 5 км', freeDelivery: 'Бесплатно', outsideZone: 'Вне зоны 5 км · стоимость уточнит оператор',
      unknownZone: 'Укажите точку на карте, чтобы проверить бесплатную доставку', deliveryQuote: 'Уточнит оператор',
      deliveryNotIncluded: 'В радиусе 5 км от Таугуль, 34/1 — бесплатно.', deliveryCity: 'Доставка по Алматы',
      mapHint: 'Нажмите на карту или передвиньте метку к вашему дому', mapZone: 'Показать зону 5 км',
      mapUnavailable: 'Карта недоступна. Адрес можно указать вручную — оператор проверит доставку.',
      geocoderUnavailable: 'Адрес не найден. Уточните его или поставьте метку на карте. Можно продолжить с введённым адресом.',
      permissionDenied: 'Местоположение недоступно. Введите адрес вручную или выберите самовывоз.',
      coarseLocation: 'Местоположение приблизительное. Уточните дом и положение метки.',
      addressRequired: 'Введите улицу и номер дома.', addressSaved: 'Адрес сохранён',
      locationIntro: 'Разрешите определить адрес или укажите его сами. Без разрешения местоположение не запрашивается.',
      mapPrivacy: 'При поиске адрес или координаты передаются сервису Photon. Карта — OpenStreetMap. Квартира и комментарий не передаются этим сервисам.',
      pickupAt: 'Забрать заказ', pickupHint: 'Алматы, мкр. Таугуль, 34/1', pickupReady: 'Время готовности подтвердит оператор.',
      manualDelivery: 'Адрес без точки · условия доставки подтвердит оператор', searching: 'Ищем адрес…',
      mapTitle: 'Карта доставки и бесплатная зона', destination: 'Ваш адрес', restaurant: 'DONSAN · Таугуль, 34/1',
      shippingLine: 'Доставка', orderAddress: 'Адрес', orderPoint: 'Точка на карте', withinRadius: 'В радиусе 5 км — бесплатно',
      deliveryTotalNote: 'Доставка 0 ₸ · в пределах 5 км', quoteTotalNote: 'Сумма блюд без доставки. Стоимость доставки подтвердит оператор.',
      pickupTotalNote: 'Самовывоз · Таугуль, 34/1', detailsOptional: 'Дополнительно · необязательно',
    },
    kk: {
      delivery: 'Жеткізу', pickup: 'Өзім алып кетемін', chooseAddress: 'Тапсырысты қайда жеткіземіз?', editAddress: 'Мекенжайды өзгерту',
      addressLabel: 'Көше және үй', addressPlaceholder: 'Мысалы, Жандосов, 140', searchAddress: 'Табу',
      locate: 'Орналасқан жерімді анықтау', locating: 'Анықтап жатырмыз…', manualAddress: 'Немесе мекенжайды өзіңіз енгізіңіз',
      apartment: 'Пәтер', entrance: 'Кіреберіс', floor: 'Қабат', addressComment: 'Курьерге бағдар',
      saveAddress: 'Мекенжайды сақтау', continueOrder: 'WhatsApp-қа өту', checkout: 'Тапсырысты рәсімдеу',
      freeZone: '5 км радиуста тегін', freeDelivery: 'Тегін', outsideZone: '5 км аймақтан тыс · бағасын оператор нақтылайды',
      unknownZone: 'Тегін жеткізуді тексеру үшін картадан нүкте таңдаңыз', deliveryQuote: 'Оператор нақтылайды',
      deliveryNotIncluded: 'Таугүл, 34/1 мекенжайынан 5 км радиуста — тегін.', deliveryCity: 'Алматы бойынша жеткізу',
      mapHint: 'Картадан үйіңізді басыңыз немесе белгіні жылжытыңыз', mapZone: '5 км аймақты көрсету',
      mapUnavailable: 'Карта ашылмады. Мекенжайды өзіңіз енгізіңіз — жеткізуді оператор нақтылайды.',
      geocoderUnavailable: 'Мекенжай табылмады. Нақтылап жазыңыз немесе картадан нүкте таңдаңыз. Енгізілген мекенжаймен жалғастыруға болады.',
      permissionDenied: 'Орналасқан жеріңіз анықталмады. Мекенжайды өзіңіз енгізіңіз немесе алып кетуді таңдаңыз.',
      coarseLocation: 'Орналасқан жеріңіз шамамен анықталды. Үйді және картадағы белгіні нақтылаңыз.',
      addressRequired: 'Көше мен үй нөмірін енгізіңіз.', addressSaved: 'Мекенжай сақталды',
      locationIntro: 'Мекенжайды анықтауға рұқсат беріңіз немесе өзіңіз енгізіңіз. Рұқсатсыз орналасқан жеріңіз сұралмайды.',
      mapPrivacy: 'Іздеу кезінде мекенжай не координаттар Photon қызметіне беріледі. Карта — OpenStreetMap. Пәтер мен ескерту бұл қызметтерге берілмейді.',
      pickupAt: 'Тапсырысты алып кету', pickupHint: 'Алматы, Таугүл ш/а, 34/1', pickupReady: 'Дайын болатын уақытты оператор растайды.',
      manualDelivery: 'Картада нүкте жоқ · жеткізу шарттарын оператор растайды', searching: 'Мекенжай ізделіп жатыр…',
      mapTitle: 'Жеткізу картасы және тегін аймақ', destination: 'Сіздің мекенжайыңыз', restaurant: 'DONSAN · Таугүл, 34/1',
      shippingLine: 'Жеткізу', orderAddress: 'Мекенжай', orderPoint: 'Картадағы нүкте', withinRadius: '5 км радиуста — тегін',
      deliveryTotalNote: 'Жеткізу 0 ₸ · 5 км радиуста', quoteTotalNote: 'Бұл — тағамдар сомасы. Жеткізу құнын оператор нақтылайды.',
      pickupTotalNote: 'Өзіңіз алып кету · Таугүл, 34/1', detailsOptional: 'Қосымша · міндетті емес',
    },
    en: {
      delivery: 'Delivery', pickup: 'Pickup', chooseAddress: 'Where should we bring your order?', editAddress: 'Edit address',
      addressLabel: 'Street and building', addressPlaceholder: 'For example, Zhandosov, 140', searchAddress: 'Find',
      locate: 'Use my location', locating: 'Locating…', manualAddress: 'Or enter your address manually',
      apartment: 'Apartment', entrance: 'Entrance', floor: 'Floor', addressComment: 'Directions for the courier',
      saveAddress: 'Save address', continueOrder: 'Continue in WhatsApp', checkout: 'Checkout',
      freeZone: 'Free within a 5 km radius', freeDelivery: 'Free', outsideZone: 'Outside 5 km · our team will confirm the delivery fee',
      unknownZone: 'Select a map point to check free delivery', deliveryQuote: 'To be confirmed',
      deliveryNotIncluded: 'Free within 5 km of Taugul, 34/1.', deliveryCity: 'Delivery in Almaty',
      mapHint: 'Tap your building on the map or drag the pin', mapZone: 'Show the 5 km zone',
      mapUnavailable: 'The map is unavailable. Enter your address manually; our team will confirm delivery.',
      geocoderUnavailable: 'Address not found. Refine your search or select a map point. You can continue with the address you entered.',
      permissionDenied: 'Location is unavailable. Enter an address manually or choose pickup.',
      coarseLocation: 'Your location is approximate. Please check the building and pin.',
      addressRequired: 'Enter a street and building number.', addressSaved: 'Address saved',
      locationIntro: 'Allow location access or enter your address yourself. We never request your location without permission.',
      mapPrivacy: 'Address searches or coordinates are sent to Photon. Maps are provided by OpenStreetMap. Apartment details and notes are not sent to these services.',
      pickupAt: 'Pick up your order', pickupHint: 'Almaty, Taugul microdistrict, 34/1', pickupReady: 'Our team will confirm when your order is ready.',
      manualDelivery: 'No map point · our team will confirm delivery terms', searching: 'Searching…',
      mapTitle: 'Delivery map and free delivery zone', destination: 'Your address', restaurant: 'DONSAN · Taugul, 34/1',
      shippingLine: 'Delivery', orderAddress: 'Address', orderPoint: 'Map location', withinRadius: 'Within 5 km — free',
      deliveryTotalNote: 'Delivery 0 ₸ · within 5 km', quoteTotalNote: 'Food subtotal only. Our team will confirm the delivery fee.',
      pickupTotalNote: 'Pickup · Taugul, 34/1', detailsOptional: 'Extra details · optional',
    },
  };
  const trim = (value, max = 200) => typeof value === 'string' ? value.trim().slice(0, max) : '';
  function normalize(value) {
    const input = value && typeof value === 'object' ? value : {};
    const point = input.point;
    return {
      mode: input.mode === 'pickup' ? 'pickup' : 'delivery',
      address: trim(input.address), apartment: trim(input.apartment, 30), entrance: trim(input.entrance, 30),
      floor: trim(input.floor, 20), comment: trim(input.comment, 300), confirmed: input.confirmed === true,
      point: point && Number.isFinite(point.lat) && Math.abs(point.lat) <= 90 && Number.isFinite(point.lng) && Math.abs(point.lng) <= 180 ? { lat: point.lat, lng: point.lng } : null,
    };
  }
  function distanceKm(a, b) {
    const rad = value => value * Math.PI / 180;
    const dlat = rad(b.lat - a.lat), dlng = rad(b.lng - a.lng);
    const h = Math.sin(dlat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dlng / 2) ** 2;
    return 6371.0088 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
  }
  function state(value) {
    const selection = normalize(value);
    if (selection.mode === 'pickup') return 'pickup';
    if (!selection.point) return 'unknown';
    return distanceKm(CONFIG.origin, selection.point) <= CONFIG.radiusKm ? 'free' : 'quote';
  }
  function orderLines(value, lang = 'ru') {
    const selection = normalize(value), t = TEXT[lang] || TEXT.ru;
    if (selection.mode === 'pickup') return [t.pickup + ': ' + t.pickupHint, t.pickupReady];
    const status = state(selection);
    const lines = [t.orderAddress + ': ' + selection.address];
    for (const key of ['apartment', 'entrance', 'floor']) if (selection[key]) lines.push(t[key] + ': ' + selection[key]);
    if (selection.comment) lines.push(t.addressComment + ': ' + selection.comment);
    if (selection.point) lines.push(t.orderPoint + ': https://www.openstreetmap.org/?mlat=' + selection.point.lat.toFixed(6) + '&mlon=' + selection.point.lng.toFixed(6) + '#map=17/' + selection.point.lat.toFixed(6) + '/' + selection.point.lng.toFixed(6));
    lines.push(t.shippingLine + ': ' + (status === 'free' ? t.withinRadius : status === 'quote' ? t.outsideZone : t.manualDelivery));
    return lines;
  }

  function createController(options) {
    const { getLanguage, icon, showDialog, closeDialog, onChange, onCheckout } = options;
    const $ = selector => document.querySelector(selector);
    const t = key => TEXT[getLanguage()][key];
    const get = key => { try { return localStorage.getItem(key); } catch { return null; } };
    const put = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Session still works. */ } };
    let selection;
    try { selection = normalize(JSON.parse(get('donsan-delivery-v1'))); } catch { selection = normalize(); }
    let draft = normalize(selection), checkout = false, returnToCart = false;
    let map, circle, customer, shop, searchAbort, requestSequence = 0, lastSearch = 0;
    let results = [], prompted = get('donsan-location-prompt-v1') === 'seen', lookupBusy = false, pointSource = 'saved';
    const cache = new Map();
    const dialog = $('#deliveryDialog');

    function save() { put('donsan-delivery-v1', JSON.stringify(selection)); onChange(); }
    function renderSummary() {
      const root = $('#cartFulfillment');
      root.hidden = $('#cartDialog').classList.contains('is-empty');
      const status = state(selection);
      root.querySelectorAll('[data-cart-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cartMode === selection.mode)));
      $('#cartAddressText').textContent = selection.mode === 'pickup' ? t('pickupHint') : selection.address || t('chooseAddress');
      $('#cartDeliveryStatus').textContent = selection.mode === 'pickup' ? t('pickupReady') : selection.confirmed ? (status === 'free' ? t('freeZone') : status === 'quote' ? t('outsideZone') : t('manualDelivery')) : t('unknownZone');
      $('#cartDeliveryFee').textContent = status === 'pickup' || status === 'free' ? '0 ₸' : t('deliveryQuote');
      $('#cartDeliveryNote').textContent = status === 'pickup' ? t('pickupTotalNote') : status === 'free' ? t('deliveryTotalNote') : selection.confirmed ? t('quoteTotalNote') : t('deliveryNotIncluded');
    }
    function setMessage(text, error = false) {
      $('#addressMessage').textContent = text;
      $('#addressMessage').classList.toggle('is-error', error);
    }
    function renderDraft() {
      const pickup = draft.mode === 'pickup';
      dialog.querySelectorAll('[data-delivery-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.deliveryMode === draft.mode)));
      $('#deliveryFields').hidden = pickup;
      $('#pickupDetails').hidden = !pickup;
      const status = state(draft);
      const zone = $('#deliveryZoneStatus');
      zone.dataset.status = status;
      zone.textContent = status === 'pickup' ? t('pickupReady') : status === 'free' ? t('freeZone') : status === 'quote' ? t('outsideZone') : t('unknownZone');
      $('#addressSubmitText').textContent = checkout ? t('continueOrder') : t('saveAddress');
      $('#deliveryMap').setAttribute('aria-label', t('mapTitle'));
      if (shop) shop.setTooltipContent(t('restaurant'));
      if (customer) customer.setTooltipContent(t('destination'));
    }
    function clearResults() { results = []; $('#addressResults').replaceChildren(); }
    function pin(point, zoom = false, source = 'map') {
      draft.point = point;
      pointSource = source;
      if (map && window.L) {
        if (customer) customer.setLatLng(point);
        else {
          customer = L.marker(point, { draggable: true, icon: L.divIcon({ className: 'customer-map-pin', html: '<span></span>', iconSize: [30, 38], iconAnchor: [15, 36] }) }).addTo(map).bindTooltip(t('destination'));
          customer.on('dragend', () => { ++requestSequence; const p = customer.getLatLng(); pin({ lat: p.lat, lng: p.lng }); });
        }
        if (zoom) map.fitBounds(circle.getBounds().extend(point), { padding: [24, 24], maxZoom: 14 });
      }
      renderDraft();
    }
    function showZone() { if (map && circle) map.fitBounds(circle.getBounds(), { padding: [25, 25] }); }
    function ensureMap() {
      if (!window.L) { setMessage(t('mapUnavailable'), true); return; }
      if (!map) {
        map = L.map('deliveryMap', { zoomControl: false, scrollWheelZoom: false }).setView(CONFIG.origin, 13);
        L.tileLayer(CONFIG.tiles, { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' }).on('tileerror', () => setMessage(t('mapUnavailable'), true)).addTo(map);
        L.control.zoom({ position: 'topright' }).addTo(map);
        circle = L.circle(CONFIG.origin, { radius: CONFIG.radiusKm * 1000, color: '#347d62', weight: 2, fillColor: '#5ba885', fillOpacity: .14 }).addTo(map);
        shop = L.marker(CONFIG.origin, { icon: L.divIcon({ className: 'shop-map-pin', html: '<span>D</span>', iconSize: [32, 32], iconAnchor: [16, 16] }) }).addTo(map).bindTooltip(t('restaurant'));
        map.on('click', event => { if (draft.mode === 'delivery') { ++requestSequence; pin({ lat: event.latlng.lat, lng: event.latlng.lng }); setMessage(t('mapHint')); } });
        new ResizeObserver(() => map.invalidateSize()).observe($('#deliveryMap'));
      }
      map.invalidateSize();
      if (draft.mode === 'pickup') map.setView(CONFIG.origin, 16);
      else if (draft.point) pin(draft.point, true, pointSource);
      else { if (customer) { customer.remove(); customer = null; } showZone(); }
    }
    function open({ forCheckout = false, onboarding = false, mode: preferredMode } = {}) {
      checkout = forCheckout;
      returnToCart = $('#cartDialog').open || forCheckout;
      draft = normalize(selection);
      if (preferredMode === 'delivery' || preferredMode === 'pickup') draft.mode = preferredMode;
      pointSource = 'saved';
      clearResults();
      $('#deliveryAddress').value = draft.address;
      for (const key of ['apartment', 'entrance', 'floor', 'comment']) $('#address-' + key).value = draft[key];
      $('#locationIntro').hidden = !onboarding;
      $('#deliveryHeading').textContent = t('chooseAddress');
      setMessage('');
      renderDraft();
      const other = document.querySelector('dialog[open]');
      if (other && other !== dialog) closeDialog(other.id);
      const display = () => { showDialog('deliveryDialog'); $('#deliveryHeading').focus({ preventScroll: true }); requestAnimationFrame(ensureMap); };
      if (other && other !== dialog) setTimeout(display, 210);
      else display();
    }
    function cancel() {
      ++requestSequence;
      searchAbort?.abort();
      closeDialog('deliveryDialog');
      if (returnToCart) setTimeout(() => showDialog('cartDialog'), 210);
    }
    function mode(value) {
      ++requestSequence;
      searchAbort?.abort();
      draft.mode = value === 'pickup' ? 'pickup' : 'delivery';
      clearResults(); setMessage(''); renderDraft(); ensureMap();
    }
    function featureAddress(feature) {
      const p = feature.properties || {};
      const street = [p.street || p.name, p.housenumber].filter(Boolean).join(', ');
      return [street, p.locality, p.city].filter((value, index, array) => value && array.indexOf(value) === index).join(', ');
    }
    async function search() {
      const query = $('#deliveryAddress').value.trim();
      if (query.length < 3) { setMessage(t('addressRequired'), true); return; }
      if (lookupBusy || Date.now() - lastSearch < 900) return;
      lastSearch = Date.now(); lookupBusy = true;
      const seq = ++requestSequence;
      searchAbort?.abort(); searchAbort = new AbortController();
      const timeout = setTimeout(() => searchAbort.abort(), 8000);
      $('#addressSearchBtn').disabled = true; setMessage(t('searching'));
      try {
        let features = cache.get(query.toLocaleLowerCase());
        if (!features) {
          const url = new URL(CONFIG.geocoder + '/api/');
          url.search = new URLSearchParams({ q: /алматы|almaty/i.test(query) ? query : 'Алматы ' + query, limit: '5', lat: String(CONFIG.origin.lat), lon: String(CONFIG.origin.lng), bbox: '76.65,43.05,77.15,43.45' });
          const response = await fetch(url, { signal: searchAbort.signal });
          if (!response.ok) throw new Error('Search unavailable');
          const payload = await response.json();
          features = (payload.features || []).filter(feature => feature.geometry?.type === 'Point' && normalize({ point: { lat: feature.geometry.coordinates?.[1], lng: feature.geometry.coordinates?.[0] } }).point);
          if (cache.size > 40) cache.clear();
          cache.set(query.toLocaleLowerCase(), features);
        }
        if (seq !== requestSequence || !dialog.open) return;
        results = features;
        $('#addressResults').replaceChildren();
        results.forEach((feature, index) => {
          const button = document.createElement('button'); button.type = 'button'; button.dataset.addressResult = index;
          button.textContent = featureAddress(feature); $('#addressResults').append(button);
        });
        setMessage(results.length ? t('mapHint') : t('geocoderUnavailable'), !results.length);
      } catch { if (seq === requestSequence) setMessage(t('geocoderUnavailable'), true); }
      finally { clearTimeout(timeout); lookupBusy = false; $('#addressSearchBtn').disabled = false; }
    }
    function locate() {
      if (!navigator.geolocation) { setMessage(t('permissionDenied'), true); return; }
      const seq = ++requestSequence;
      $('#locateBtn').disabled = true; $('#locateText').textContent = t('locating');
      navigator.geolocation.getCurrentPosition(async position => {
        $('#locateBtn').disabled = false; $('#locateText').textContent = t('locate');
        if (seq !== requestSequence || !dialog.open) return;
        const point = { lat: position.coords.latitude, lng: position.coords.longitude };
        pin(point, true, 'gps');
        setMessage(position.coords.accuracy > 250 ? t('coarseLocation') : t('mapHint'));
        try {
          const url = new URL(CONFIG.geocoder + '/reverse');
          url.search = new URLSearchParams({ lat: String(point.lat), lon: String(point.lng), limit: '1', radius: '.2' });
          const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
          if (!response.ok) return;
          const payload = await response.json();
          if (seq !== requestSequence || !dialog.open || draft.mode !== 'delivery') return;
          const feature = payload.features?.[0];
          if (feature) { draft.address = featureAddress(feature); $('#deliveryAddress').value = draft.address; }
        } catch { /* The selected map point and manual address still work. */ }
      }, () => {
        $('#locateBtn').disabled = false; $('#locateText').textContent = t('locate');
        if (seq === requestSequence) { setMessage(t('permissionDenied'), true); $('#deliveryAddress').focus(); }
      }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
    }
    function submit(event) {
      event.preventDefault();
      draft.address = $('#deliveryAddress').value.trim();
      for (const key of ['apartment', 'entrance', 'floor', 'comment']) draft[key] = $('#address-' + key).value;
      if (draft.mode === 'delivery' && draft.address.length < 5) { setMessage(t('addressRequired'), true); $('#deliveryAddress').focus(); return; }
      draft.confirmed = true;
      selection = normalize(draft);
      save();
      ++requestSequence; searchAbort?.abort(); closeDialog('deliveryDialog');
      if (checkout) onCheckout(selection);
      else if (returnToCart) setTimeout(() => showDialog('cartDialog'), 210);
    }
    document.addEventListener('click', event => {
      if (event.target.closest('[data-address-open]')) open();
      const cartMode = event.target.closest('[data-cart-mode]');
      if (cartMode) {
        if (cartMode.dataset.cartMode === 'pickup') { selection.mode = 'pickup'; selection.confirmed = true; save(); }
        else open({ mode: 'delivery' });
      }
      const choice = event.target.closest('[data-delivery-mode]');
      if (choice) mode(choice.dataset.deliveryMode);
      const result = event.target.closest('[data-address-result]');
      if (result) {
        const feature = results[Number(result.dataset.addressResult)];
        if (!feature) return;
        ++requestSequence;
        draft.address = featureAddress(feature); $('#deliveryAddress').value = draft.address;
        pin({ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }, true, 'search');
        clearResults(); setMessage(t('mapHint'));
      }
    });
    $('#deliveryAddress').addEventListener('input', () => {
      ++requestSequence; searchAbort?.abort(); clearResults(); draft.address = $('#deliveryAddress').value;
      if (pointSource !== 'map') {
        draft.point = null;
        if (customer) { customer.remove(); customer = null; }
      }
      renderDraft();
    });
    $('#deliveryAddress').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); search(); } });
    $('#addressSearchBtn').addEventListener('click', search);
    $('#locateBtn').addEventListener('click', locate);
    $('#showZoneBtn').addEventListener('click', showZone);
    $('#deliveryCloseBtn').addEventListener('click', cancel);
    $('#deliveryForm').addEventListener('submit', submit);
    dialog.addEventListener('cancel', event => { event.preventDefault(); cancel(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) cancel();
    });
    dialog.addEventListener('close', () => { ++requestSequence; searchAbort?.abort(); });
    return {
      open, renderSummary, translate: () => { renderSummary(); if (dialog.open) renderDraft(); },
      getSelection: () => normalize(selection),
      promptAfterAdd() {
        if (prompted || selection.confirmed) return;
        prompted = true; put('donsan-location-prompt-v1', 'seen');
        open({ onboarding: true });
      },
    };
  }
  const api = { CONFIG, TEXT, normalize, distanceKm, state, orderLines, createController };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.DonsanDelivery = api;
})();
