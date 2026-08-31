(() => {
  const WHATSAPP_NUMBER = '77477919765'; // +7 747 791 9765

  const money = (n) => n.toLocaleString('ru-RU') + '〒';
  const truncate = (str, max) => (str.length > max ? str.slice(0, max).trim() + '...' : str);

  // ---------- State ----------
  let cart = []; // [{ name, price, qty, image, description }]
  let pendingRemoveName = null;
  let activeStoryIndex = 0;
  let storyTimer = null;

  // ---------- Elements ----------
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyMsg = document.getElementById('cartEmptyMsg');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const toastEl = document.getElementById('toast');
  const productGrid = document.getElementById('productGrid');
  const emptyCategoryEl = document.getElementById('emptyCategory');
  const categoryScroll = document.getElementById('categoryScroll');

  // Product modal
  const productOverlay = document.getElementById('productOverlay');
  const productModal = document.getElementById('productModal');
  const productModalImg = document.getElementById('productModalImg');
  const productModalName = document.getElementById('productModalName');
  const productModalDesc = document.getElementById('productModalDesc');
  const productModalPrice = document.getElementById('productModalPrice');
  const productModalAddBtn = document.getElementById('productModalAddBtn');
  const productCloseBtn = document.getElementById('productCloseBtn');

  // Story modal
  const storyModal = document.getElementById('storyModal');
  const storyModalImg = document.getElementById('storyModalImg');
  const storyModalCaption = document.getElementById('storyModalCaption');
  const storyProgress = document.getElementById('storyProgress');
  const storyCloseBtn = document.getElementById('storyCloseBtn');
  const storyPrevBtn = document.getElementById('storyPrevBtn');
  const storyNextBtn = document.getElementById('storyNextBtn');
  const scrollStory = document.getElementById('scrollStory');
  const storyCards = Array.from(scrollStory.querySelectorAll('.card-story'));

  // Confirm popup
  const confirmOverlay = document.getElementById('confirmOverlay');
  const confirmModal = document.getElementById('confirmModal');
  const confirmYesBtn = document.getElementById('confirmYesBtn');
  const confirmNoBtn = document.getElementById('confirmNoBtn');

  // ---------- Toast ----------
  let toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // ---------- Cart logic ----------
  function addToCart(name, price, image, description) {
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1, image, description });
    }
    renderCart();
    showToast(`${name} себетке қосылды`);
  }

  function changeQty(name, delta) {
    const item = cart.find((i) => i.name === name);
    if (!item) return;
    if (delta < 0 && item.qty <= 1) {
      // last unit being removed -> ask for confirmation instead of silently deleting
      askRemoveConfirmation(name);
      return;
    }
    item.qty += delta;
    renderCart();
  }

  function askRemoveConfirmation(name) {
    pendingRemoveName = name;
    document.getElementById('confirmText').textContent = 'Тауарды себеттен өшіресіз бе?';
    confirmOverlay.classList.add('open');
    confirmModal.classList.add('open');
  }

  function closeConfirm() {
    pendingRemoveName = null;
    confirmOverlay.classList.remove('open');
    confirmModal.classList.remove('open');
  }

  confirmYesBtn.addEventListener('click', () => {
    if (pendingRemoveName) {
      cart = cart.filter((i) => i.name !== pendingRemoveName);
      renderCart();
      showToast('Тауар себеттен өшірілді');
    }
    closeConfirm();
  });
  confirmNoBtn.addEventListener('click', closeConfirm);
  confirmOverlay.addEventListener('click', closeConfirm);

  function renderCart() {
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    cartCountEl.textContent = totalQty;
    cartCountEl.classList.remove('bump');
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add('bump');

    cartTotalEl.textContent = money(totalPrice);
    checkoutBtn.disabled = cart.length === 0;

    cartItemsEl.querySelectorAll('.cart-item').forEach((el) => el.remove());

    if (cart.length === 0) {
      cartEmptyMsg.hidden = false;
      return;
    }
    cartEmptyMsg.hidden = true;

    cart.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div class="cart-item-photo"><img src="${item.image}" alt="${item.name}" /></div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${truncate(item.description, 40)}</p>
          <span>${money(item.price)}</span>
        </div>
        <div class="cart-item-actions">
          <div class="cart-item-qty">
            <button type="button" data-action="dec" aria-label="Азайту">−</button>
            <span>${item.qty}</span>
            <button type="button" data-action="inc" aria-label="Көбейту">+</button>
          </div>
          <button type="button" class="cart-item-remove" data-action="remove">Өшіру</button>
        </div>
      `;
      row.querySelector('[data-action="dec"]').addEventListener('click', () => changeQty(item.name, -1));
      row.querySelector('[data-action="inc"]').addEventListener('click', () => changeQty(item.name, 1));
      row.querySelector('[data-action="remove"]').addEventListener('click', () => askRemoveConfirmation(item.name));
      cartItemsEl.appendChild(row);
    });
  }

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  document.getElementById('cartOpenBtn').addEventListener('click', openCart);
  document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // ---------- WhatsApp checkout ----------
  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  function buildWhatsAppMessage() {
    const now = new Date();
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const date = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
    const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    const lines = cart.map((item, idx) => {
      const qtyLabel = item.qty > 1 ? ` x${item.qty}` : '';
      return `${idx + 1}) ${item.name}${qtyLabel} - ${item.description}`;
    });

    return [
      '*Сәлеметсіз бе!*',
      '',
      '*Себет:*',
      ...lines,
      '',
      `*Тапсырыс уақыты: ${time}, ${date}*`,
      `*Жалпы бағасы: ${money(totalPrice)}*`,
      '',
      '*Тапсырыс бергім келеді!*',
    ].join('\n');
  }

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });

  // ---------- Add to cart buttons (grid) ----------
  productGrid.addEventListener('click', (event) => {
    const btn = event.target.closest('.add-to-cart-btn');
    if (btn) {
      const card = btn.closest('.product-card');
      addFromCard(card);
      btn.classList.add('added');
      const originalText = btn.textContent;
      btn.textContent = 'Қосылды ✓';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = originalText;
      }, 900);
      return;
    }

    // Clicking the image or the title opens the product detail modal
    const opener = event.target.closest('.img-card, .product-topline h3');
    if (opener) {
      const card = opener.closest('.product-card');
      openProductModal(card);
    }
  });

  function addFromCard(card) {
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price, 10);
    const image = card.dataset.image;
    const description = card.dataset.description;
    addToCart(name, price, image, description);
  }

  // ---------- Product detail modal ----------
  let activeProductCard = null;

  function openProductModal(card) {
    activeProductCard = card;
    productModalImg.src = card.dataset.image;
    productModalImg.alt = card.dataset.name;
    productModalName.textContent = card.dataset.name;
    productModalDesc.textContent = card.dataset.description;
    productModalPrice.textContent = money(parseInt(card.dataset.price, 10));
    productOverlay.classList.add('open');
    productModal.classList.add('open');
  }

  function closeProductModal() {
    productOverlay.classList.remove('open');
    productModal.classList.remove('open');
    activeProductCard = null;
  }

  productCloseBtn.addEventListener('click', closeProductModal);
  productOverlay.addEventListener('click', closeProductModal);

  productModalAddBtn.addEventListener('click', () => {
    if (!activeProductCard) return;
    addFromCard(activeProductCard);
    closeProductModal();
  });

  // ---------- Category filtering ----------
  const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

  categoryScroll.addEventListener('click', (event) => {
    const btn = event.target.closest('.category-card');
    if (!btn) return;

    categoryScroll.querySelectorAll('.category-card').forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.category;
    const visible = productCards.filter((card) => card.dataset.category === category);

    productCards.forEach((card) => {
      card.style.display = card.dataset.category === category ? '' : 'none';
    });

    productGrid.hidden = visible.length === 0;
    emptyCategoryEl.hidden = visible.length !== 0;
  });

  // ---------- Story viewer ----------
  const STORY_DURATION = 4000;

  function buildStoryProgressBars() {
    storyProgress.innerHTML = '';
    storyCards.forEach(() => {
      const span = document.createElement('span');
      storyProgress.appendChild(span);
    });
  }
  buildStoryProgressBars();

  function updateStoryProgress() {
    const bars = Array.from(storyProgress.children);
    bars.forEach((bar, i) => {
      bar.classList.toggle('filled', i <= activeStoryIndex);
    });
  }

  function showStory(index) {
    activeStoryIndex = (index + storyCards.length) % storyCards.length;
    const card = storyCards[activeStoryIndex];
    storyModalImg.src = card.dataset.image;
    storyModalCaption.textContent = card.dataset.caption;
    updateStoryProgress();
    restartStoryTimer();
  }

  function restartStoryTimer() {
    clearTimeout(storyTimer);
    storyTimer = setTimeout(() => showStory(activeStoryIndex + 1), STORY_DURATION);
  }

  function openStoryModal(index) {
    storyModal.classList.add('open');
    showStory(index);
  }

  function closeStoryModal() {
    storyModal.classList.remove('open');
    clearTimeout(storyTimer);
  }

  scrollStory.addEventListener('click', (event) => {
    const card = event.target.closest('.card-story');
    if (!card) return;
    openStoryModal(storyCards.indexOf(card));
  });

  storyCloseBtn.addEventListener('click', closeStoryModal);
  storyPrevBtn.addEventListener('click', () => showStory(activeStoryIndex - 1));
  storyNextBtn.addEventListener('click', () => showStory(activeStoryIndex + 1));

  // ---------- Hero CTA ----------
  document.getElementById('heroOrderBtn').addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  });

  // ---------- Init ----------
  renderCart();
})();