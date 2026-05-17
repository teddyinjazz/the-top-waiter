

  // =============================================
  // LANGUAGE TOGGLE
  // =============================================
  let lang = localStorage.getItem('lang') || 'ru';

  function updateCurrentTableBadge() {
    document.getElementById('orderTableBadge').textContent =
      currentTable === '🛑'
        ? (lang === 'ru' ? '🛑 СТОП-ЛИСТ' : '🛑 STOP LIST')
        : (lang === 'ru' ? 'Стол ' : 'Table ') + currentTable;
  }

  function applyLang() {
    const isEn = lang === 'en';
    document.getElementById('langBtn').textContent = isEn ? 'RU' : 'EN';

    // data-ru / data-en elements
    document.querySelectorAll('[data-ru]').forEach(el => {
      el.textContent = isEn ? el.dataset.en : el.dataset.ru;
    });
    // stop badges
    document.querySelectorAll('.stop-badge').forEach(b => {
      b.textContent = isEn ? 'STOP' : 'СТОП';
    });
    updateCurrentTableBadge();

    // Кнопки действий
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.textContent = isEn ? 'TO KEEPER' : 'В KEEPER';

    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) clearBtn.textContent = isEn ? 'CHECKOUT' : 'Расчёт';
    const clearStopBtn = document.getElementById('clearStopBtn');
    if (clearStopBtn) clearStopBtn.textContent = isEn ? '🗑 CLEAR STOP LIST' : '🗑 ОЧИСТИТЬ ВЕСЬ СТОП-ЛИСТ';

    // table label
    document.querySelector('.table-label').textContent = isEn ? 'TABLE:' : 'СТОЛ:';
  }

  function toggleLang() {
    lang = lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', lang);
    applyLang();
    renderOrder();
    renderWines(cachedWines);
    EDITABLE_SECTION_KEYS.forEach(key => renderEditableSection(key));
  }


  // =============================================
  // ITEM NAME TRANSLATION MAP
  // =============================================
  const ITEM_EN = {
    'Брускетта с креветками': 'Bruschetta (shrimps)',
    'Брускетта томаты': 'Bruschetta (tomatoes)',
    'Блин с лососем': 'Crepe (salmon)',
    'Блин с говядиной': 'Crepe (beef)',
    'Икра красная 50г': 'Red caviar 50g',
    'Икра красная 100г': 'Red caviar 100g',
    'Камамбер запечённый': 'Baked camembert',
    'Сырная тарелка': 'Cheese plate',
    'Морепродукты плато': 'Seafood platter',
    'Креветки в песто': 'Shrimps pesto',
    'Мидии': 'Mussels',
    'Хлебная корзина': 'Bread bowl',
    'Чесночный хлеб': 'Garlic bread',
    'Куриный суп чашка': 'Chicken soup (cup)',
    'Куриный суп тарелка': 'Chicken soup (bowl)',
    'Грибной крем чашка': 'Mushroom cream (cup)',
    'Грибной крем тарелка': 'Mushroom cream (bowl)',
    'Борщ': 'Borscht',
    'Цезарь': 'Caesar',
    'Цезарь с курицей': 'Caesar + chicken',
    'Цезарь с креветками': 'Caesar + shrimps',
    'Салат с тунцом': 'Sesame tuna salad',
    'The TOP салат': 'The TOP salad',
    'Ростбиф с горчицей': 'Roast beef salad',
    'Классический бургер': 'Classic burger',
    'Двойной бургер': 'Double burger',
    'Чизбургер': 'Cheeseburger',
    'Двойной чизбургер': 'Double cheeseburger',
    'Блю-чиз бургер': 'Blue cheese burger',
    'Двойной блю-чиз': 'Double blue cheese',
    'Куриный бургер': 'Chicken burger',
    'Вегги-бургер': 'Veggie burger',
    'Паста с морепродуктами': 'Seafood pasta',
    'Карбонара': 'Carbonara',
    'Ризотто с грибами': 'Mushroom risotto',
    'Ризотто с креветками': 'Shrimp risotto',
    'Бефстроганов': 'Beef Stroganoff',
    'Эспада': 'Espada',
    'Лосось в сливках': 'Salmon in cream sauce',
    'Стейк тунца': 'Tuna steak',
    'Утиная грудка': 'Duck breast',
    'Осьминог малиновый': 'Octopus (raspberry balsamic)',
    'Котлета по-киевски': 'Chicken Kyiv',
    'Рибай 350г': 'Ribeye 350g',
    'Рис': 'Rice',
    'Овощи': 'Vegetables',
    'Спагетти': 'Spaghetti',
    'Салат гарнир': 'Salad',
    'Спаржа': 'Asparagus',
    'Пюре': 'Mashed potato',
    'Жареный картофель': 'Roast potato',
    'Картофель фри': 'French fries',
    'Рис (вкл.)': 'Rice (incl.)',
    'Овощи (вкл.)': 'Vegetables (incl.)',
    'Спагетти (вкл.)': 'Spaghetti (incl.)',
    'Салат (вкл.)': 'Salad (incl.)',
    'Спаржа (вкл.)': 'Asparagus (incl.)',
    'Пюре (вкл.)': 'Mashed potato (incl.)',
    'Жареный картофель (вкл.)': 'Roast potato (incl.)',
    'Картофель фри (вкл.)': 'French fries (incl.)',
    'Рис (гарнир)': 'Rice (extra)',
    'Овощи (гарнир)': 'Vegetables (extra)',
    'Спагетти (гарнир)': 'Spaghetti (extra)',
    'Салат (гарнир)': 'Salad (extra)',
    'Спаржа (гарнир)': 'Asparagus (extra)',
    'Пюре (гарнир)': 'Mashed potato (extra)',
    'Жареный картофель (гарнир)': 'Roast potato (extra)',
    'Картофель фри (гарнир)': 'French fries (extra)',
    'The TOP десерт': 'The TOP dessert',
    'Наполеон': 'Napoleon',
    'Медовик': 'Honey Cake (Medovik)',
    'Блины с мороженым': 'Crepes + ice cream',
    'Яблочный штрудель': 'Apple strudel',
    'Сырники 4шт': 'Syrniki × 4',
    'Сырники 2шт': 'Syrniki × 2',
    'Мороженое': 'Ice cream',
    'Coral Light 200мл': 'Coral Light 200ml',
    'Coral Light 300мл': 'Coral Light 300ml',
    'Coral Light 500мл': 'Coral Light 500ml',
    'Coral Dark 200мл': 'Coral Dark 200ml',
    'Coral Dark 300мл': 'Coral Dark 300ml',
    'Coral Dark 500мл': 'Coral Dark 500ml',
    'Shandy': 'Shandy',
    'Coral Non Alco': 'Coral Non Alco',
    'Coral Puro Malta': 'Coral Puro Malta',
    'Coral Sidra': 'Coral Sidra',
    'Белое вино': 'White wine',
    'Розовое вино': 'Rosé wine',
    'Зелёное вино': 'Green wine',
    'Красное вино': 'Red wine',
    'Platino Brut': 'Platino Brut',
    'Prosecco': 'Prosecco',
    'Апельсиновый сок свежий': 'Fresh orange juice',
    'Смузи киви-банан': 'Smoothie kiwi-banana',
    'Смузи манго-банан': 'Smoothie mango-banana',
    'Смузи мультифрукт': 'Smoothie mix fruits',
    'Милкшейк ваниль': 'Milkshake vanilla',
    'Милкшейк клубника': 'Milkshake strawberry',
    'Милкшейк шоколад': 'Milkshake chocolate',
    'Лимонад классик': 'Lemonade classic',
    'Лимонад маракуйя': 'Lemonade maracuja',
    'Pepsi / Black': 'Pepsi / Black',
    '7UP': '7UP',
    'Lipton Ice Tea': 'Lipton Ice Tea',
    'Сок Compal': 'Compal juice',
    'Вода 500мл': 'Water 500ml',
    'Вода 750мл': 'Water 750ml',
    'Вода без газа 500мл': 'Still water 500ml',
    'Вода без газа 750мл': 'Still water 750ml',
    'Вода с газом 500мл': 'Sparkling water 500ml',
    'Вода с газом 750мл': 'Sparkling water 750ml',
    'Комбуча черный чай 150мл': 'Kombucha Black Tea (glass 150ml)',
    'Комбуча черный чай 500мл': 'Kombucha Black Tea (bottle 500ml)',
    'Комбуча черный чай 1000мл': 'Kombucha Black Tea (bottle 1000ml)',
    'Комбуча черный кофе 75мл': 'Kombucha Black Coffee (glass 75ml)',
    'Комбуча черный кофе 250мл': 'Kombucha Black Coffee (bottle 250ml)',
    'Комбуча черный кофе 500мл': 'Kombucha Black Coffee (bottle 500ml)',
    'Комбуча Beetroot Ginger Mint 150мл': 'Kombucha Beetroot·Ginger·Mint (glass 150ml)',
    'Комбуча Beetroot Ginger Mint 500мл': 'Kombucha Beetroot·Ginger·Mint (bottle 500ml)',
    'Комбуча Beetroot Ginger Mint 1000мл': 'Kombucha Beetroot·Ginger·Mint (bottle 1000ml)',
    'Комбуча Green Tea Grapefruit 150мл': 'Kombucha Green Tea·Grapefruit (glass 150ml)',
    'Комбуча Green Tea Grapefruit 500мл': 'Kombucha Green Tea·Grapefruit (bottle 500ml)',
    'Комбуча Green Tea Grapefruit 1000мл': 'Kombucha Green Tea·Grapefruit (bottle 1000ml)',
    'Комбуча Red Fruits Hibiscus 150мл': 'Kombucha Red Fruits·Hibiscus (glass 150ml)',
    'Комбуча Red Fruits Hibiscus 500мл': 'Kombucha Red Fruits·Hibiscus (bottle 500ml)',
    'Комбуча Red Fruits Hibiscus 1000мл': 'Kombucha Red Fruits·Hibiscus (bottle 1000ml)',
    'Эспрессо': 'Espresso',
    'Макиато': 'Macchiato',
    'Двойной эспрессо': 'Double espresso',
    'Американо': 'Americano',
    'Капучино': 'Cappuccino',
    'Латте': 'Latte',
    'Eristoff': 'Eristoff (vodka)',
    'Absolut': 'Absolut (vodka)',
    'Tanqueray': 'Tanqueray (gin)',
    'Bacardi': 'Bacardi (rum)',
    'Jose Cuervo': 'Jose Cuervo (tequila)',
    'Jameson': 'Jameson (whiskey)',
    'Jack Daniels': 'Jack Daniels (whiskey)',
    'Dewars': 'Dewars (whiskey)',
    'Chivas Royal Salute': 'Chivas Royal Salute (whiskey)',
    'Blue Label': 'Blue Label (whiskey)',
    'Hennessy': 'Hennessy (cognac)',
    'Jagermeister': 'Jagermeister',
    'Fernet': 'Fernet',
    'Campari': 'Campari',
    'Baileys': 'Baileys',
    'Kahlua': 'Kahlua',
    'Aperol': 'Aperol',
    'Disaronno': 'Disaronno',
    'Aperol Spritz': 'Aperol Spritz',
    'Hugo Spritz': 'Hugo Spritz',
    'French 75': 'French 75',
    'Old Fashioned': 'Old Fashioned',
    'Caipirinha': 'Caipirinha',
    'Penicillin': 'Penicillin',
    'Passion Long': 'Passion Long',
    'Amaretto Sour': 'Amaretto Sour',
    'Espresso Martini': 'Espresso Martini',
    'Basil Smash': 'Basil Smash',
    'Ginger Mule': 'Ginger Mule',
    'Melon Fizz': 'Melon Fizz',
    'Lynchburg Lemonade': 'Lynchburg Lemonade',
    'Cream Gin Fizz': 'Cream Gin Fizz',
    'Strawberry Margarita': 'Strawberry Margarita',
    'Singapur Sling': 'Singapore Sling',
    'Mango Caipirinha': 'Mango Caipirinha',
    'Porn Star': 'Porn Star',
    'Сангрия 0.5л': 'Sangria 0.5l',
    'Сангрия 1л': 'Sangria 1l',
  };

  function displayName(name) {
    if (lang === 'ru') return name;
    return ITEM_EN[name] || name;
  }

  // =============================================
  // STATE
  // =============================================
  let orders = {};
  let notes = {};
  let sentQty = {};
  let currentTable = '1';
  let pendingSide = null;

  const STOPLIST_KEY = 'stoplist';

  const SIDES = [
    { name: 'Рис', price: 3 }, { name: 'Овощи', price: 3 },
    { name: 'Спагетти', price: 3 }, { name: 'Салат', price: 3 },
    { name: 'Спаржа', price: 4 }, { name: 'Пюре', price: 4 },
    { name: 'Жареный картофель', price: 4 }, { name: 'Картофель фри', price: 3 },
  ];

  const MAIN_COURSE_ITEMS = [
    'Бефстроганов','Эспада','Лосось в сливках','Стейк тунца',
    'Утиная грудка','Осьминог малиновый','Котлета по-киевски','Рибай 350г'
  ];

  // =============================================
  // FIREBASE
  // =============================================
  function getFirebaseKey(tableId) {
    if (tableId === '🛑') return STOPLIST_KEY;
    return tableId.replace(/\s/g, '_');
  }

  function saveOrderToFirebase(tableId) {
    const data = orders[tableId] || {};
    const key = getFirebaseKey(tableId);
    if (Object.keys(data).length) {
      db.ref('orders/' + key).set({ json: JSON.stringify(data) });
    } else {
      db.ref('orders/' + key).remove();
    }
  }

  function saveNotesToFirebase(tableId) {
    const key = getFirebaseKey(tableId);
    const val = notes[tableId] || '';
    if (val) {
      db.ref('notes/' + key).set(val);
    } else {
      db.ref('notes/' + key).remove();
    }
  }

  function saveSentQtyToFirebase(tableId) {
    const data = sentQty[tableId] || {};
    const key = getFirebaseKey(tableId);
    if (Object.keys(data).length) {
      db.ref('sent/' + key).set({ json: JSON.stringify(data) });
    } else {
      db.ref('sent/' + key).remove();
    }
  }

  // =============================================
  // СТОП-ЛИСТ
  // Источник данных — orders['🛑'], хранится как обычный стол
  // Мьют при qty <= 1 (последняя порция уже в стопе)
  // =============================================
  function isInStoplist(name) {
    return !!(orders['🛑'] && orders['🛑'][name] && orders['🛑'][name].qty <= 1);
  }

  // =============================================
  // VISUAL
  // =============================================
  function restoreMenuVisual() {
    const tableOrder = orders[currentTable] || {};
    const nameCounts = {};
    Object.values(tableOrder).forEach(item => {
      const name = item.displayName || item.itemName;
      if (name) nameCounts[name] = (nameCounts[name] || 0) + item.qty;
    });
    document.querySelectorAll('.item-btn').forEach(btn => {
      const match = (btn.getAttribute('onclick') || '').match(/addItem\(this,'([^']+)'/);
      const itemName = match ? match[1] : null;
      const total = itemName ? (nameCounts[itemName] || 0) : 0;
      const c = btn.querySelector('.item-count');
      if (total > 0) { btn.classList.add('has-count'); if (c) c.textContent = total; }
      else { btn.classList.remove('has-count'); if (c) c.textContent = '0'; }
    });
    restoreGroupBtns();
  }

  function applyStopList() {
    document.querySelectorAll('.item-btn').forEach(btn => {
      const match = (btn.getAttribute('onclick') || '').match(/addItem\(this,'([^']+)'/);
      if (!match) return;
      const name = match[1];
      const isStopped = isInStoplist(name);
      btn.classList.toggle('stopped', isStopped);
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      const badge = btn.querySelector('.stop-badge');
      if (isStopped && !badge) {
        const b = document.createElement('div');
        b.className = 'stop-badge';
        b.style.cssText = 'font-size:9px;color:#ff6b6b;letter-spacing:1px;margin-top:1px';
        b.textContent = lang === 'ru' ? 'СТОП' : 'STOP';
        btn.appendChild(b);
      } else if (!isStopped && badge) {
        badge.remove();
      }
    });
  }

  function syncTable13Visual() {
    document.querySelectorAll('.item-btn').forEach(btn => {
      btn.classList.remove('stopped');
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      const badge = btn.querySelector('.stop-badge');
      if (badge) badge.remove();
    });
  }

  function clearMenuVisual() {
    document.querySelectorAll('.item-btn').forEach(btn => {
      btn.classList.remove('has-count');
      const c = btn.querySelector('.item-count');
      if (c) c.textContent = '0';
    });
  }

  // =============================================
  // VARIANT GROUPS — popup выбора варианта
  // =============================================
  const VARIANT_GROUPS = {
    'Coral Light': {
      ru: 'Coral Light', en: 'Coral Light',
      variants: [
        { ru: '200 мл', en: '200 ml', name: 'Coral Light 200мл', price: 2 },
        { ru: '300 мл', en: '300 ml', name: 'Coral Light 300мл', price: 3 },
        { ru: '500 мл', en: '500 ml', name: 'Coral Light 500мл', price: 4 },
      ]
    },
    'Coral Dark': {
      ru: 'Coral Dark', en: 'Coral Dark',
      variants: [
        { ru: '200 мл', en: '200 ml', name: 'Coral Dark 200мл', price: 2.5 },
        { ru: '300 мл', en: '300 ml', name: 'Coral Dark 300мл', price: 3.5 },
        { ru: '500 мл', en: '500 ml', name: 'Coral Dark 500мл', price: 4.5 },
      ]
    },
    'Вода': {
      ru: 'Вода', en: 'Water',
      variants: [
        { ru: 'Без газа 500 мл', en: 'Still 500ml', name: 'Вода без газа 500мл', price: 2 },
        { ru: 'Без газа 750 мл', en: 'Still 750ml', name: 'Вода без газа 750мл', price: 3.5 },
        { ru: 'С газом 500 мл',  en: 'Sparkling 500ml', name: 'Вода с газом 500мл', price: 2 },
        { ru: 'С газом 750 мл',  en: 'Sparkling 750ml', name: 'Вода с газом 750мл', price: 3.5 },
      ]
    },
    'Комбуча черный чай': {
      ru: 'Комбуча чёрный чай', en: 'Kombucha Black Tea',
      variants: [
        { ru: 'Бокал 150 мл', en: 'Glass 150ml', name: 'Комбуча черный чай 150мл', price: 3 },
        { ru: 'Бутылка 500 мл', en: 'Bottle 500ml', name: 'Комбуча черный чай 500мл', price: 9 },
        { ru: 'Бутылка 1000 мл', en: 'Bottle 1000ml', name: 'Комбуча черный чай 1000мл', price: 16 },
      ]
    },
    'Комбуча черный кофе': {
      ru: 'Комбуча чёрный кофе', en: 'Kombucha Black Coffee',
      variants: [
        { ru: 'Бокал 75 мл', en: 'Glass 75ml', name: 'Комбуча черный кофе 75мл', price: 3 },
        { ru: 'Бутылка 250 мл', en: 'Bottle 250ml', name: 'Комбуча черный кофе 250мл', price: 9 },
        { ru: 'Бутылка 500 мл', en: 'Bottle 500ml', name: 'Комбуча черный кофе 500мл', price: 16 },
      ]
    },
    'Сырники': {
      ru: 'Сырники', en: 'Syrniki',
      variants: [
        { ru: '2 шт', en: '2 pcs', name: 'Сырники 2шт', price: 5 },
        { ru: '4 шт', en: '4 pcs', name: 'Сырники 4шт', price: 8 },
      ]
    },
    'Сангрия': {
      ru: 'Сангрия', en: 'Sangria',
      variants: [
        { ru: '0.5 л', en: '0.5l', name: 'Сангрия 0.5л', price: 8 },
        { ru: '1 л', en: '1l', name: 'Сангрия 1л', price: 15 },
      ]
    },
    'Икра красная': {
      ru: 'Икра красная', en: 'Red caviar',
      variants: [
        { ru: '50 г', en: '50g', name: 'Икра красная 50г', price: 18 },
        { ru: '100 г', en: '100g', name: 'Икра красная 100г', price: 25 },
      ]
    },
    'Комбуча Beetroot Ginger Mint': {
      ru: 'Комбуча Beetroot · Ginger · Mint', en: 'Kombucha Beetroot · Ginger · Mint',
      variants: [
        { ru: 'Бокал 150 мл', en: 'Glass 150ml', name: 'Комбуча Beetroot Ginger Mint 150мл', price: 3 },
        { ru: 'Бутылка 500 мл', en: 'Bottle 500ml', name: 'Комбуча Beetroot Ginger Mint 500мл', price: 9 },
        { ru: 'Бутылка 1000 мл', en: 'Bottle 1000ml', name: 'Комбуча Beetroot Ginger Mint 1000мл', price: 16 },
      ]
    },
    'Комбуча Green Tea Grapefruit': {
      ru: 'Комбуча Green Tea · Grapefruit', en: 'Kombucha Green Tea · Grapefruit',
      variants: [
        { ru: 'Бокал 150 мл', en: 'Glass 150ml', name: 'Комбуча Green Tea Grapefruit 150мл', price: 3 },
        { ru: 'Бутылка 500 мл', en: 'Bottle 500ml', name: 'Комбуча Green Tea Grapefruit 500мл', price: 9 },
        { ru: 'Бутылка 1000 мл', en: 'Bottle 1000ml', name: 'Комбуча Green Tea Grapefruit 1000мл', price: 16 },
      ]
    },
    'Комбуча Red Fruits Hibiscus': {
      ru: 'Комбуча Red Fruits · Hibiscus', en: 'Kombucha Red Fruits · Hibiscus',
      variants: [
        { ru: 'Бокал 150 мл', en: 'Glass 150ml', name: 'Комбуча Red Fruits Hibiscus 150мл', price: 3 },
        { ru: 'Бутылка 500 мл', en: 'Bottle 500ml', name: 'Комбуча Red Fruits Hibiscus 500мл', price: 9 },
        { ru: 'Бутылка 1000 мл', en: 'Bottle 1000ml', name: 'Комбуча Red Fruits Hibiscus 1000мл', price: 16 },
      ]
    },
    'Куриный суп': {
      ru: 'Куриный суп', en: 'Chicken soup',
      variants: [
        { ru: 'Чашка', en: 'Cup', name: 'Куриный суп чашка', price: 5 },
        { ru: 'Тарелка', en: 'Bowl', name: 'Куриный суп тарелка', price: 7 },
      ]
    },
    'Грибной крем': {
      ru: 'Грибной крем 🌿', en: 'Mushroom cream 🌿',
      variants: [
        { ru: 'Чашка', en: 'Cup', name: 'Грибной крем чашка', price: 6 },
        { ru: 'Тарелка', en: 'Bowl', name: 'Грибной крем тарелка', price: 8 },
      ]
    },
  };

  // =============================================
  // MENU ORDER INDEX
  // =============================================
  function buildMenuOrderIndex() {
    const orderIndex = {};
    let idx = 0;
    document.querySelectorAll('.menu-items-area .item-btn').forEach(btn => {
      const onclick = btn.getAttribute('onclick') || '';
      const addMatch = onclick.match(/addItem\(this,'([^']+)'/);
      if (addMatch) {
        orderIndex[addMatch[1]] = idx++;
        return;
      }
      const groupKey = btn.dataset.group;
      if (groupKey && VARIANT_GROUPS[groupKey]) {
        VARIANT_GROUPS[groupKey].variants.forEach((v, vi) => {
          orderIndex[v.name] = idx + vi / 1000;
        });
        idx++;
      }
    });
    // Wine buttons are in #winesList, outside .menu-items-area; index them after all static items
    // so they sort to the end in their DOM-generated order within the Wines section.
    document.querySelectorAll('#winesList .item-btn').forEach(btn => {
      const onclick = btn.getAttribute('onclick') || '';
      const addMatch = onclick.match(/addItem\(this,'([^']+)'/);
      if (addMatch) orderIndex[addMatch[1]] = idx++;
    });
    return orderIndex;
  }

  function getOrderSortValue(item, key, orderIndex) {
    const name = item.displayName || item.itemName || key;
    return orderIndex[name] !== undefined ? orderIndex[name] : 999999;
  }

  let currentVarGroup = null;
  let currentVarBtn = null;

  function openVarPopup(groupKey, btn) {
    const group = VARIANT_GROUPS[groupKey];
    if (!group) return;
    currentVarGroup = groupKey;
    currentVarBtn = btn;

    document.getElementById('varTitle').textContent = lang === 'ru' ? group.ru : group.en;
    document.getElementById('varSubtitle').textContent = lang === 'ru' ? 'Выберите вариант' : 'Choose variant';

    const opts = document.getElementById('varOptions');
    opts.innerHTML = '';
    const tableOrder = orders[currentTable] || {};

    group.variants.forEach(v => {
      const isStopped = currentTable !== '🛑' && isInStoplist(v.name);
      const qty = tableOrder[v.name] ? tableOrder[v.name].qty : 0;
      const label = lang === 'ru' ? v.ru : v.en;

      const btn = document.createElement('button');
      btn.className = 'var-btn' + (isStopped ? ' stopped' : '');
      btn.innerHTML = `
        <span class="var-btn-name">${label}</span>
        <span style="display:flex;align-items:center;gap:6px">
          <span class="var-btn-price">€${v.price}</span>
          ${isStopped ? `<span style="color:#ff6b6b;font-size:10px;letter-spacing:1px">${lang === 'ru' ? 'СТОП' : 'STOP'}</span>` : ''}
          ${qty > 0 ? `<span class="var-btn-count">${qty}</span>` : ''}
        </span>`;
      btn.onclick = () => {
        addItemByVariant(v.name, v.price);
        // Обновляем счётчик в popup
        const newQty = (orders[currentTable] && orders[currentTable][v.name])
          ? orders[currentTable][v.name].qty : 0;
        const countEl = btn.querySelector('.var-btn-count');
        if (newQty > 0) {
          if (countEl) countEl.textContent = newQty;
          else btn.querySelector('[style]').insertAdjacentHTML('afterbegin',
            `<span class="var-btn-count">${newQty}</span>`);
        }
        updateGroupBtn(groupKey, currentVarBtn);
      };
      opts.appendChild(btn);
    });

    document.getElementById('varOverlay').classList.add('show');
  }

  function closeVarPopup() {
    document.getElementById('varOverlay').classList.remove('show');
    currentVarGroup = null;
    currentVarBtn = null;
  }

  function varOverlayClick(e) {
    if (e.target === document.getElementById('varOverlay')) closeVarPopup();
  }

  function addItemByVariant(name, price) {
    // Создаём фиктивный btn-объект для совместимости с addItem
    const fakeBtn = {
      classList: { add: () => {}, contains: () => false },
      querySelector: () => ({ textContent: '' }),
    };
    addItem(fakeBtn, name, price);
  }

  function updateGroupBtn(groupKey, btn) {
    if (!btn) return;
    const group = VARIANT_GROUPS[groupKey];
    if (!group) return;
    const tableOrder = orders[currentTable] || {};
    const total = group.variants.reduce((s, v) => {
      return s + (tableOrder[v.name] ? tableOrder[v.name].qty : 0);
    }, 0);
    const countEl = btn.querySelector('.item-count');
    if (total > 0) {
      btn.classList.add('has-count');
      if (countEl) countEl.textContent = total;
    } else {
      btn.classList.remove('has-count');
      if (countEl) countEl.textContent = '0';
    }
  }

  function restoreGroupBtns() {
    document.querySelectorAll('.item-btn[data-group]').forEach(btn => {
      const groupKey = btn.dataset.group;
      updateGroupBtn(groupKey, btn);
    });
  }

  // =============================================
  // ACCORDION
  // =============================================
  function toggleAcc(header) {
    header.classList.toggle('open');
    const body = header.nextElementSibling;
    body.classList.toggle('open');
  }

  function openAccByCat(cat) {
    const section = document.querySelector('.section[data-cat="' + cat + '"]');
    if (!section) return;
    const header = section.querySelector('.acc-header');
    const body = section.querySelector('.acc-body');
    if (header && body && !body.classList.contains('open')) {
      header.classList.add('open');
      body.classList.add('open');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // =============================================
  // TABLE
  // =============================================
  function setTable(btn) {
    document.querySelectorAll('.table-btn, #table13btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    clearMenuVisual();
    currentTable = btn.id === 'table13btn' ? '🛑' : btn.textContent.trim();
    updateCurrentTableBadge();
    updateNotesVisual();
    const nf = document.getElementById('notesField');
    if (nf) nf.placeholder = currentTable === '🛑'
      ? 'Components needed to remove from stop list...'
      : 'Notes for kitchen: steak doneness, allergies, sauce, timing...';
    if (currentTable === '🛑') syncTable13Visual();
    else applyStopList();
    restoreMenuVisual();
    renderOrder();
  }

  // =============================================
  // ADD ITEM
  // =============================================
  function addItem(btn, name, price) {
    if (!orders[currentTable]) orders[currentTable] = {};

    // Программная защита стоп-листа (дублирует CSS-мьют)
    if (currentTable !== '🛑' && isInStoplist(name)) {
      alert(lang === 'ru' ? 'Позиция в стоп-листе' : 'Item is in the stop list');
      applyStopList();
      return;
    }

    // Стоп-лист — та же логика что обычный стол
    if (currentTable === '🛑') {
      if (!orders[currentTable][name]) {
        orders[currentTable][name] = { price, qty: 0, itemName: name };
      }
      orders[currentTable][name].qty++;
      btn.classList.add('has-count');
      btn.querySelector('.item-count').textContent = orders[currentTable][name].qty;
      saveOrderToFirebase('🛑');
      renderOrder();
      return;
    }

    // Обычная позиция
    if (!MAIN_COURSE_ITEMS.includes(name)) {
      if (!orders[currentTable][name]) {
        orders[currentTable][name] = { price, qty: 0, itemName: name };
      }
      orders[currentTable][name].qty++;
      // Декремент стоп-листа при заказе
      if (orders['🛑'] && orders['🛑'][name] && orders['🛑'][name].qty > 1) {
        orders['🛑'][name].qty--;
        saveOrderToFirebase('🛑');
        applyStopList();
      }
      btn.classList.add('has-count');
      btn.querySelector('.item-count').textContent = orders[currentTable][name].qty;
      renderOrder();
      saveOrderToFirebase(currentTable);
      return;
    }

    // Основное блюдо
    if (orders['🛑'] && orders['🛑'][name] && orders['🛑'][name].qty > 1) {
      orders['🛑'][name].qty--;
      saveOrderToFirebase('🛑');
      applyStopList();
    }
    const pairId = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    const mainKey = name + '__' + pairId;
    orders[currentTable][mainKey] = { price, qty: 1, itemName: name, pairId, displayName: name };
    const total = Object.values(orders[currentTable]).filter(i => i.displayName === name).reduce((s, i) => s + i.qty, 0);
    btn.classList.add('has-count');
    btn.querySelector('.item-count').textContent = total;
    pendingSide = { mainName: name, pairId, mainKey };
    try { openSidePicker(name); } catch(e) { alert('Ошибка: ' + e.message); }
    renderOrder();
    saveOrderToFirebase(currentTable);
  }

  function addItemByName(name, price) {
    if (!orders[currentTable]) orders[currentTable] = {};

    if (currentTable === '🛑') {
      if (!orders[currentTable][name]) {
        orders[currentTable][name] = { price, qty: 0, itemName: name };
      }
      orders[currentTable][name].qty++;
      renderOrder();
      restoreMenuVisual();
      saveOrderToFirebase('🛑');
      return;
    }

    if (!MAIN_COURSE_ITEMS.includes(name)) {
      if (!orders[currentTable][name]) {
        orders[currentTable][name] = { price, qty: 0, itemName: name };
      }
      orders[currentTable][name].qty++;
      // Декремент стоп-листа при заказе
      if (orders['🛑'] && orders['🛑'][name] && orders['🛑'][name].qty > 1) {
        orders['🛑'][name].qty--;
        saveOrderToFirebase('🛑');
        applyStopList();
      }
      renderOrder();
      restoreMenuVisual();
      saveOrderToFirebase(currentTable);
      return;
    }

    // Основное блюдо — декремент стоп-листа + пикер гарнира
    if (orders['🛑'] && orders['🛑'][name] && orders['🛑'][name].qty > 1) {
      orders['🛑'][name].qty--;
      saveOrderToFirebase('🛑');
      applyStopList();
    }

    const pairId = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    const mainKey = name + '__' + pairId;
    orders[currentTable][mainKey] = {
      price,
      qty: 1,
      itemName: name,
      pairId,
      displayName: name
    };
    pendingSide = { mainName: name, pairId, mainKey };
    try {
      openSidePicker(name);
    } catch(e) {
      alert('Ошибка: ' + e.message);
    }
    renderOrder();
    restoreMenuVisual();
    saveOrderToFirebase(currentTable);
  }

  // =============================================
  // SIDE PICKER
  // =============================================
  function openSidePicker(mainName) {
    const tableOrder = orders[currentTable] || {};
    const thisPairId = pendingSide ? pendingSide.pairId : null;
    const alreadyHasFreeSide = thisPairId
      ? Object.values(tableOrder).some(item => item.pairId === thisPairId && item.isSide && item.price === 0)
      : false;
    const isFree = !alreadyHasFreeSide;

    document.getElementById('sideMainName').textContent = '→ ' + displayName(mainName);
    document.getElementById('sideFreeNote').textContent = isFree
      ? (lang==='ru'?'✓ Первый гарнир входит в цену блюда':'✓ First side dish is included')
      : (lang==='ru'?'Гарнир — дополнительная стоимость':'Side dish — additional cost');

    const list = document.getElementById('sideList');
    list.innerHTML = '';
    SIDES.forEach(side => {
      const displayPrice = isFree ? (lang === 'ru' ? 'Бесплатно' : 'Included') : '€' + side.price;
      const btn = document.createElement('button');
      btn.style.cssText = "background:#1e302d;border:1px solid #2a9d8f;border-radius:5px;padding:12px 14px;color:#e8f4f2;font-family:'DM Mono',monospace;font-size:13px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;width:100%;font-weight:500";
      const enNames={Рис:'Rice',Овощи:'Vegetables',Спагетти:'Spaghetti',Салат:'Salad',Спаржа:'Asparagus',Пюре:'Mashed potato','Жареный картофель':'Roast potato','Картофель фри':'French fries'};
      btn.innerHTML = `<span style="color:#ffffff;font-size:14px">${lang==='ru'?side.name:enNames[side.name]||side.name}</span><span style="color:${isFree?'#3dbfaf':'#e9c46a'};font-size:13px;font-weight:bold">${displayPrice}</span>`;
      btn.onclick = () => selectSide(side.name, isFree ? 0 : side.price);
      list.appendChild(btn);
    });

    const overlay = document.getElementById('sideOverlay');
    overlay.style.cssText = 'display:flex !important;position:fixed;inset:0;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(0,0,0,0.92);z-index:9999;align-items:center;justify-content:center;';
  }

  function selectSide(sideName, price) {
    document.getElementById('sideOverlay').style.cssText = 'display:none';
    if (!orders[currentTable]) orders[currentTable] = {};
    const baseKey = price === 0 ? sideName + ' (вкл.)' : sideName + ' (гарнир)';
    const key = pendingSide ? baseKey + '__' + pendingSide.pairId : baseKey;
    if (!orders[currentTable][key]) orders[currentTable][key] = { price, qty: 0, displayName: baseKey };
    orders[currentTable][key].qty++;
    if (pendingSide) { orders[currentTable][key].pairId = pendingSide.pairId; orders[currentTable][key].isSide = true; }
    renderOrder();
    saveOrderToFirebase(currentTable);
    pendingSide = null;
  }

  function closeSidePicker() {
    document.getElementById('sideOverlay').style.cssText = 'display:none';
    pendingSide = null;
  }

  // =============================================
  // ROLLBACK ONE UNIT TO STOPLIST
  // =============================================
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function onNotesInput() {
    const val = document.getElementById('notesField').value;
    notes[currentTable] = val;
    saveNotesToFirebase(currentTable);
    updateNotesVisual();
    updateTableBadges();
  }

  function updateNotesVisual() {
    const field = document.getElementById('notesField');
    const label = document.getElementById('notesLabel');
    if (!field || !label) return;
    const val = notes[currentTable] || '';
    field.value = val;
    const hasNotes = val.trim().length > 0;
    field.classList.toggle('has-notes', hasNotes);
    label.classList.toggle('active', hasNotes);
  }

  function rollbackOneToStoplist(key, item) {
    if (currentTable === '🛑') return;
    if (!orders['🛑']) return;
    if (item.isSide) return;
    const baseName = item.displayName || item.itemName || key;
    if (!orders['🛑'][baseName]) return;
    const prev = sentQty[currentTable] || {};
    const alreadySent = prev[key] || 0;
    // Возвращаем только если удаляем неотправленную единицу
    if (item.qty > alreadySent) {
      orders['🛑'][baseName].qty += 1;
      saveOrderToFirebase('🛑');
      applyStopList();
    }
  }

  // =============================================
  // CHANGE QTY
  // =============================================
  function changeQty(name, delta) {
    const tableOrder = orders[currentTable];
    if (!tableOrder || !tableOrder[name]) return;

    const item = tableOrder[name];

    if (delta > 0) {
      const baseName = item.displayName || item.itemName || name;

      if (currentTable !== '🛑' && !item.isSide && isInStoplist(baseName)) {
        alert(lang === 'ru' ? 'Позиция в стоп-листе' : 'Item is in the stop list');
        return;
      }

      if (!item.isSide && MAIN_COURSE_ITEMS.includes(baseName)) {
        addItemByName(baseName, item.price);
        return;
      }

      // Декремент стоп-листа при + (симметрично addItem)
      if (currentTable !== '🛑' && !item.isSide && orders['🛑'] && orders['🛑'][baseName] && orders['🛑'][baseName].qty > 1) {
        orders['🛑'][baseName].qty--;
        saveOrderToFirebase('🛑');
        applyStopList();
      }
      item.qty += delta;
      renderOrder();
      restoreMenuVisual();
      saveOrderToFirebase(currentTable);
      return;
    }

    // Защита от уменьшения ниже уже отправленного + rollback в стоп-лист
    if (delta < 0) {
      const prev = sentQty[currentTable] || {};
      const alreadySent = prev[name] || 0;
      if (item.qty <= alreadySent) {
        alert(lang === 'ru' ? 'Эта позиция уже отправлена в KEEPER' : 'This item has already been sent to KEEPER');
        return;
      }
      rollbackOneToStoplist(name, item);
    }

    item.qty += delta;

    if (item.qty <= 0) {
      if (item.pairId && !item.isSide) {
        const sk = Object.keys(tableOrder).find(k => tableOrder[k].pairId === item.pairId && tableOrder[k].isSide);
        if (sk) delete tableOrder[sk];
      }
      if (item.pairId && item.isSide) {
        const mk = Object.keys(tableOrder).find(k => tableOrder[k].pairId === item.pairId && !tableOrder[k].isSide);
        if (mk) delete tableOrder[mk];
      }
      delete tableOrder[name];
    }

    renderOrder();
    restoreMenuVisual();
    saveOrderToFirebase(currentTable);
  }

  // =============================================
  // RENDER ORDER
  // =============================================
  function renderOrder() {
    const list = document.getElementById('orderList');
    const tableOrder = orders[currentTable] || {};
    const keys = Object.keys(tableOrder);

    const clearStopBtn = document.getElementById('clearStopBtn');
    if (clearStopBtn) clearStopBtn.style.display = currentTable === '🛑' ? 'block' : 'none';
    updateTableBadges();

    if (keys.length === 0) {
      list.innerHTML = lang === 'ru'
        ? '<div class="empty-order"><div class="empty-order-icon">🍽</div>Нажмите на позицию<br>из меню слева</div>'
        : '<div class="empty-order"><div class="empty-order-icon">🍽</div>Tap an item<br>from the menu</div>';
      document.getElementById('totalNum').textContent = '0.00';
      document.getElementById('orderCountBadge').textContent = lang === 'ru' ? '0 поз.' : '0 items';
      document.getElementById('sendBtn').disabled = true;
      return;
    }

        const pairs = {}, standalone = [];
    keys.forEach(name => {
      const item = tableOrder[name];
      if (item.pairId && !item.isSide) { if (!pairs[item.pairId]) pairs[item.pairId] = {}; pairs[item.pairId].mainKey = name; }
      else if (item.pairId && item.isSide) { if (!pairs[item.pairId]) pairs[item.pairId] = {}; pairs[item.pairId].sideKey = name; }
      else standalone.push(name);
    });

    const menuIndex = buildMenuOrderIndex();

    const pairEntries = Object.entries(pairs).sort((a, b) => {
      const mA = a[1].mainKey ? tableOrder[a[1].mainKey] : {};
      const mB = b[1].mainKey ? tableOrder[b[1].mainKey] : {};
      return getOrderSortValue(mA || {}, a[1].mainKey || '', menuIndex)
           - getOrderSortValue(mB || {}, b[1].mainKey || '', menuIndex);
    });

    standalone.sort((a, b) =>
      getOrderSortValue(tableOrder[a], a, menuIndex) -
      getOrderSortValue(tableOrder[b], b, menuIndex)
    );

    let total = 0, count = 0, html = '';

    pairEntries.forEach(([pid, pair]) => {

      const { mainKey, sideKey } = pair;
      if (!mainKey || !tableOrder[mainKey]) return;
      const main = tableOrder[mainKey];
      const mainLine = main.price * main.qty;
      total += mainLine; count += main.qty;
      const safeMain = mainKey.replace(/'/g, "\\'");
      if (sideKey && tableOrder[sideKey]) {
        const side = tableOrder[sideKey];
        const sideLine = side.price * side.qty;
        total += sideLine; count += side.qty;
        const safeSide = sideKey.replace(/'/g, "\\'");
        html += `<div class="order-pair"><div class="order-pair-main"><div class="oi-name">${displayName(main.displayName||mainKey)}</div><div class="oi-controls"><button class="oi-ctrl-btn" onclick="changeQty('${safeMain}',-1)">−</button><span class="oi-qty">${main.qty}</span><button class="oi-ctrl-btn" onclick="changeQty('${safeMain}',1)">+</button></div><div class="oi-price">€${mainLine.toFixed(2)}</div></div><div class="order-pair-side"><div class="oi-name">↳ ${displayName(side.displayName||sideKey)}</div><div class="oi-controls"><button class="oi-ctrl-btn" onclick="changeQty('${safeSide}',-1)">−</button><span class="oi-qty">${side.qty}</span><button class="oi-ctrl-btn" onclick="changeQty('${safeSide}',1)">+</button></div><div class="oi-price" style="color:${side.price===0?'#3dbfaf':'#e9c46a'}">${side.price===0 ? (lang === 'ru' ? 'вкл.' : 'incl.') : '€' + sideLine.toFixed(2)}</div></div></div>`;
      } else {
        html += `<div class="order-item"><div class="oi-name">${displayName(main.displayName||mainKey)}</div><div class="oi-controls"><button class="oi-ctrl-btn" onclick="changeQty('${safeMain}',-1)">−</button><span class="oi-qty">${main.qty}</span><button class="oi-ctrl-btn" onclick="changeQty('${safeMain}',1)">+</button></div><div class="oi-price">€${mainLine.toFixed(2)}</div></div>`;
      }
    });

    standalone.forEach(name => {
      const item = tableOrder[name];
      const line = item.price * item.qty;
      total += line; count += item.qty;
      const safeName = name.replace(/'/g, "\\'");
      html += `<div class="order-item"><div class="oi-name">${displayName(item.displayName||name)}</div><div class="oi-controls"><button class="oi-ctrl-btn" onclick="changeQty('${safeName}',-1)">−</button><span class="oi-qty">${item.qty}</span><button class="oi-ctrl-btn" onclick="changeQty('${safeName}',1)">+</button></div><div class="oi-price">€${line.toFixed(2)}</div></div>`;
    });

    list.innerHTML = html;
    document.getElementById('totalNum').textContent = total.toFixed(2);
    document.getElementById('orderCountBadge').textContent = lang === 'ru' ? count + ' поз.' : count + ' items';
    document.getElementById('sendBtn').disabled = false;
  }

  // =============================================
  // HELPERS
  // =============================================
  function updateTableBadges() {
    document.querySelectorAll('.table-btn, #table13btn').forEach(btn => {
      const t = btn.id === 'table13btn' ? '🛑' : btn.textContent.trim();
      const tableOrder = orders[t] || {};
      const count = Object.values(tableOrder).reduce((s, i) => s + (i.qty || 0), 0);
      const hasNotes = !!(notes[t] && notes[t].trim().length > 0);
      if (hasNotes) {
        btn.style.outline = '2px solid #e76f51';
        btn.title = '⚠️ Notes' + (count > 0 ? ' + ' + count + (lang === 'ru' ? ' позиций' : ' items') : '');
      } else if (count > 0) {
        btn.style.outline = '2px solid #e9c46a';
        btn.title = count + (lang === 'ru' ? ' позиций' : ' items');
      } else {
        btn.style.outline = '';
        btn.title = '';
      }
    });
  }

  function clearOrder() {
    const message = currentTable === '🛑'
      ? (lang === 'ru' ? 'Очистить стоп-лист?' : 'Clear the stop list?')
      : (lang === 'ru' ? 'Стол ' + currentTable + ' рассчитан? Заказ будет очищен.' : 'Table ' + currentTable + ' checked out? Order will be cleared.');
    if (!confirm(message)) return;
    clearMenuVisual();
    orders[currentTable] = {};
    sentQty[currentTable] = {};
    notes[currentTable] = '';
    saveOrderToFirebase(currentTable);
    saveSentQtyToFirebase(currentTable);
    saveNotesToFirebase(currentTable);
    if (currentTable === '🛑') applyStopList();
    updateNotesVisual();
    renderOrder();
  }

  // =============================================
  // SEND ORDER
  // =============================================
  let sentOverlayOpen = false;

  function sendOrder() {
    const tableOrder = orders[currentTable] || {};
    const keys = Object.keys(tableOrder);
    if (!keys.length) return;
    if (!sentQty[currentTable]) sentQty[currentTable] = {};
    const prev = sentQty[currentTable];
    let lines = '', total = 0, hasNew = false;
    // Воспроизводим порядок как в renderOrder(): сначала пары, потом standalone
    const sendPairs = {}, sendStandalone = [];
    keys.forEach(name => {
      const item = tableOrder[name];
      if (item.pairId && !item.isSide) {
        if (!sendPairs[item.pairId]) sendPairs[item.pairId] = {};
        sendPairs[item.pairId].mainKey = name;
      } else if (item.pairId && item.isSide) {
        if (!sendPairs[item.pairId]) sendPairs[item.pairId] = {};
        sendPairs[item.pairId].sideKey = name;
      } else {
        sendStandalone.push(name);
      }
    });

    const sendMenuIndex = buildMenuOrderIndex();

    const sendPairEntries = Object.entries(sendPairs).sort((a, b) => {
      const mA = a[1].mainKey ? tableOrder[a[1].mainKey] : {};
      const mB = b[1].mainKey ? tableOrder[b[1].mainKey] : {};
      return getOrderSortValue(mA || {}, a[1].mainKey || '', sendMenuIndex)
           - getOrderSortValue(mB || {}, b[1].mainKey || '', sendMenuIndex);
    });

    sendStandalone.sort((a, b) =>
      getOrderSortValue(tableOrder[a], a, sendMenuIndex) -
      getOrderSortValue(tableOrder[b], b, sendMenuIndex)
    );

    // Пары
    sendPairEntries.forEach(([pid, pair]) => {

      const { mainKey, sideKey } = pair;
      if (mainKey) {
        const item = tableOrder[mainKey];
        const newQty = item.qty - (prev[mainKey] || 0);
        if (newQty > 0) {
          hasNew = true;
          const line = item.price * newQty;
          total += line;
          lines += `<div>× ${newQty} &nbsp; ${displayName(item.displayName||mainKey)} &nbsp; <span style="color:#e9c46a">€${line.toFixed(2)}</span></div>`;
        }
      }
      if (sideKey && tableOrder[sideKey]) {
        const item = tableOrder[sideKey];
        const newQty = item.qty - (prev[sideKey] || 0);
        if (newQty > 0) {
          hasNew = true;
          const line = item.price * newQty;
          total += line;
          lines += `<div style="padding-left:12px;color:#7ab3ac">↳ × ${newQty} &nbsp; ${displayName(item.displayName||sideKey)} &nbsp; <span style="color:${item.price===0?'#3dbfaf':'#e9c46a'}">${item.price===0?(lang==='ru'?'вкл.':'incl.'):'€'+line.toFixed(2)}</span></div>`;
        }
      }
    });

    // Standalone
    sendStandalone.forEach(name => {
      const item = tableOrder[name];
      const newQty = item.qty - (prev[name] || 0);
      if (newQty > 0) {
        hasNew = true;
        const line = item.price * newQty;
        total += line;
        lines += `<div>× ${newQty} &nbsp; ${displayName(item.displayName||name)} &nbsp; <span style="color:#e9c46a">€${line.toFixed(2)}</span></div>`;
      }
    });
    if (!hasNew) { alert(lang === 'ru' ? 'Нет новых позиций для отправки' : 'No new items to send'); return; }
    keys.forEach(name => { prev[name] = tableOrder[name].qty; });
    saveSentQtyToFirebase(currentTable);
    document.getElementById('sentTable').textContent = (lang==='ru'?'СТОЛ ':'TABLE ') + currentTable;
    const noteText = (notes[currentTable] || '').trim();
    if (noteText) {
      lines += `<div style="margin-top:8px;color:#e76f51;border-top:1px solid rgba(231,111,81,0.4);padding-top:6px">⚠️ NOTES:<br>${escapeHtml(noteText)}</div>`;
    }
    document.getElementById('sentItemsList').innerHTML = lines;
    document.getElementById('sentTotal').textContent = (lang === 'ru' ? 'К переносу: €' : 'To KEEPER: €') + total.toFixed(2);
    sentOverlayOpen = true;
    document.getElementById('sentOverlay').classList.add('show');
  }

  function closeSent() {
    sentOverlayOpen = false;
    document.getElementById('sentOverlay').classList.remove('show');
  }

  // =============================================
  // STOPLIST
  // =============================================
  function clearStopList() {
    if (!confirm(lang === 'ru' ? 'Очистить весь стоп-лист?' : 'Clear the entire stop list?')) return;
    orders['🛑'] = {};
    saveOrderToFirebase('🛑');
    applyStopList();
    renderOrder();
  }

  // =============================================
  // WINES — Firebase Realtime Database
  // =============================================

  const WINE_GROUPS_RU = {
    sparkling: '🥂 Игристое', white: '⚪ Белое', green: '🟢 Зелёное',
    rose: '🌸 Розовое', red: '🔴 Красное', orange: '🟠 Оранжевое',
    fortified: '🍷 Креплёное', dessert: '🍯 Десертное', other: '🍷 Другое',
  };
  const WINE_GROUPS_EN = {
    sparkling: '🥂 Sparkling', white: '⚪ White', green: '🟢 Green',
    rose: '🌸 Rosé', red: '🔴 Red', orange: '🟠 Orange',
    fortified: '🍷 Fortified', dessert: '🍯 Dessert', other: '🍷 Other',
  };
  const WINE_GROUP_ORDER = ['sparkling','white','green','rose','red','orange','fortified','dessert','other'];

  let cachedWines = [];
  let allWines = {};

  function getWineGroup(wine) {
    if (wine.style === 'sparkling') return 'sparkling';
    if (wine.style === 'fortified') return 'fortified';
    if (wine.style === 'dessert') return 'dessert';
    const c = wine.color || 'other';
    return ['white','green','red','rose','orange'].includes(c) ? c : 'other';
  }

  function renderWines(wines) {
    const container = document.getElementById('winesList');
    if (!container) return;
    if (!wines || wines.length === 0) {
      container.innerHTML = lang === 'ru'
        ? '<div style="color:#7ab3ac;font-size:10px;text-align:center;padding:10px">Нет вин</div>'
        : '<div style="color:#7ab3ac;font-size:10px;text-align:center;padding:10px">No wines</div>';
      return;
    }
    const titles = lang === 'ru' ? WINE_GROUPS_RU : WINE_GROUPS_EN;
    const groups = {};
    wines.forEach(w => {
      const g = getWineGroup(w);
      if (!groups[g]) groups[g] = [];
      groups[g].push(w);
    });
    Object.values(groups).forEach(arr => arr.sort((a, b) => (a.name || '').localeCompare(b.name || '')));
    let html = '';
    WINE_GROUP_ORDER.forEach(g => {
      if (!groups[g] || !groups[g].length) return;
      html += `<div class="section-title" style="margin-top:6px">${escapeHtml(titles[g])}</div>`;
      groups[g].forEach(w => {
        const safeName = (w.name || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const price = w.price || 0;
        const meta = [w.year, w.country, w.grape].filter(Boolean).join(' · ');
        const descHtml = meta ? `<div class="item-desc">${escapeHtml(String(meta))}</div>` : '';
        html += `<button class="item-btn" onclick="addItem(this,'${safeName}',${price})"><div class="item-name">${escapeHtml(w.name || '')}</div>${descHtml}<div class="item-footer"><span class="item-price">€${price}</span><span class="item-count">0</span></div></button>`;
      });
    });
    container.innerHTML = html || (lang === 'ru'
      ? '<div style="color:#7ab3ac;font-size:10px;text-align:center;padding:10px">Нет вин</div>'
      : '<div style="color:#7ab3ac;font-size:10px;text-align:center;padding:10px">No wines</div>');
  }

  function loadWines() {
    db.ref('wines').on('value', snapshot => {
      const data = snapshot.val() || {};
      allWines = data;
      cachedWines = Object.entries(data)
        .map(([id, wine]) => ({ id, ...wine }))
        .filter(wine => wine.isActive !== false);
      renderWines(cachedWines);
      const adminOverlay = document.getElementById('wineAdminOverlay');
      if (adminOverlay && adminOverlay.classList.contains('show')) renderWineAdminList();
      restoreMenuVisual();
    });
  }

  // =============================================
  // WINE ADMIN
  // =============================================

  let currentWineId = null;
  let wineAdminColor = 'other';
  let wineAdminStyle = 'still';

  function initWineAdminYear() {
    const sel = document.getElementById('wineAdminYear');
    if (!sel) return;
    const yr = new Date().getFullYear();
    let opts = '<option value="">— / no year</option>';
    for (let y = yr + 1; y >= 1980; y--) opts += `<option value="${y}">${y}</option>`;
    sel.innerHTML = opts;
  }

  function openWineAdmin() {
    renderWineAdminList();
    wineAdminNew();
    document.getElementById('wineAdminOverlay').classList.add('show');
  }

  function closeWineAdmin() {
    document.getElementById('wineAdminOverlay').classList.remove('show');
  }

  function renderWineAdminList() {
    const listEl = document.getElementById('wineAdminList');
    if (!listEl) return;
    const wines = Object.entries(allWines)
      .map(([id, w]) => ({ id, ...w }))
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (!wines.length) {
      listEl.innerHTML = '<div style="color:#7ab3ac;font-size:10px;padding:10px 12px">No wines yet — create one below</div>';
      return;
    }
    listEl.innerHTML = wines.map(w =>
      `<div class="wine-admin-row${w.isActive === false ? ' wine-admin-row-inactive' : ''}" data-id="${w.id}" onclick="wineAdminSelect('${w.id}')">` +
      `<span class="wine-admin-row-name">${escapeHtml(w.name || '(no name)')}</span>` +
      `<span class="wine-admin-row-price">€${w.price || 0}</span>` +
      (w.isActive === false ? '<span class="wine-admin-row-badge">OFF</span>' : '') +
      '</div>'
    ).join('');
  }

  function wineAdminSelect(id) {
    const wine = allWines[id];
    if (!wine) return;
    currentWineId = id;
    document.getElementById('wineAdminName').value = wine.name || '';
    document.getElementById('wineAdminPrice').value = wine.price !== undefined ? wine.price : '';
    document.getElementById('wineAdminCountry').value = wine.country || '';
    document.getElementById('wineAdminRegion').value = wine.region || '';
    document.getElementById('wineAdminGrape').value = wine.grape || '';
    document.getElementById('wineAdminActive').checked = wine.isActive !== false;
    const yearSel = document.getElementById('wineAdminYear');
    if (yearSel) yearSel.value = wine.year ? String(wine.year) : '';
    selectWineAdminColor(wine.color || 'other');
    selectWineAdminStyle(wine.style || 'still');
    document.querySelectorAll('.wine-admin-row').forEach(r =>
      r.classList.toggle('selected', r.dataset.id === id));
  }

  function wineAdminNew() {
    currentWineId = null;
    document.getElementById('wineAdminName').value = '';
    document.getElementById('wineAdminPrice').value = '';
    document.getElementById('wineAdminCountry').value = '';
    document.getElementById('wineAdminRegion').value = '';
    document.getElementById('wineAdminGrape').value = '';
    document.getElementById('wineAdminActive').checked = true;
    const yearSel = document.getElementById('wineAdminYear');
    if (yearSel) yearSel.value = '';
    selectWineAdminColor('other');
    selectWineAdminStyle('still');
    document.querySelectorAll('.wine-admin-row').forEach(r => r.classList.remove('selected'));
  }

  function selectWineAdminColor(color) {
    wineAdminColor = color;
    document.querySelectorAll('#wineAdminColorGroup .wine-admin-choice').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.val === color));
  }

  function selectWineAdminStyle(style) {
    wineAdminStyle = style;
    document.querySelectorAll('#wineAdminStyleGroup .wine-admin-choice').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.val === style));
  }

  function wineAdminSave() {
    const name = (document.getElementById('wineAdminName').value || '').trim();
    const price = parseFloat(document.getElementById('wineAdminPrice').value);
    if (!name) {
      alert(lang === 'ru' ? 'Укажите название' : 'Name is required');
      return;
    }
    if (isNaN(price) || price < 0) {
      alert(lang === 'ru' ? 'Укажите корректную цену' : 'Enter a valid price');
      return;
    }
    const yearVal = document.getElementById('wineAdminYear').value;
    const country = document.getElementById('wineAdminCountry').value.trim();
    const region = document.getElementById('wineAdminRegion').value.trim();
    const grape = document.getElementById('wineAdminGrape').value.trim();
    const isActive = document.getElementById('wineAdminActive').checked;
    const now = Date.now();
    const wineData = { name, price, color: wineAdminColor, style: wineAdminStyle, isActive, updatedAt: now };
    if (yearVal) wineData.year = parseInt(yearVal, 10);
    if (country) wineData.country = country;
    if (region) wineData.region = region;
    if (grape) wineData.grape = grape;
    if (currentWineId) {
      const existing = allWines[currentWineId];
      if (existing && existing.createdAt) wineData.createdAt = existing.createdAt;
      db.ref('wines/' + currentWineId).update(wineData);
    } else {
      wineData.createdAt = now;
      const newRef = db.ref('wines').push();
      currentWineId = newRef.key;
      newRef.set(wineData);
    }
  }

  function wineAdminDisable() {
    if (!currentWineId) return;
    if (!confirm(lang === 'ru' ? 'Отключить вино?' : 'Disable this wine?')) return;
    db.ref('wines/' + currentWineId).update({ isActive: false, updatedAt: Date.now() });
    document.getElementById('wineAdminActive').checked = false;
  }

  function initWinesLongPress() {
    const header = document.getElementById('winesAccHeader');
    if (!header) return;
    let timer = null;
    let fired = false;
    header.addEventListener('pointerdown', () => {
      fired = false;
      timer = setTimeout(() => { fired = true; openWineAdmin(); }, 1200);
    });
    header.addEventListener('pointerup', () => {
      clearTimeout(timer); timer = null;
      if (!fired) toggleAcc(header);
    });
    const cancel = () => { clearTimeout(timer); timer = null; };
    header.addEventListener('pointerleave', cancel);
    header.addEventListener('pointercancel', cancel);
    header.addEventListener('contextmenu', e => e.preventDefault());
  }

  // =============================================
  // EDITABLE MENU SECTIONS
  // =============================================
  const EDITABLE_SECTION_KEYS = [
    'water',
    'starters', 'soups', 'salads', 'burgers', 'pasta', 'mains', 'desserts',
    'wineglass', 'soft', 'coffee',
    'kombucha', 'spirits', 'cocktails',
  ];

  const EDITABLE_SECTION_TITLES_RU = {
    water: 'ВОДА · ПИВО — ADMIN',
    starters: 'ЗАКУСКИ — ADMIN', soups: 'СУПЫ — ADMIN', salads: 'САЛАТЫ — ADMIN',
    burgers: 'БУРГЕРЫ — ADMIN', pasta: 'ПАСТА — ADMIN', mains: 'ОСНОВНОЕ — ADMIN',
    desserts: 'ДЕСЕРТЫ — ADMIN',
    beer: 'ПИВО — ADMIN', wineglass: 'ВИНО БОКАЛ — ADMIN',
    soft: 'БЕЗАЛКОГОЛЬНЫЕ — ADMIN', coffee: 'КОФЕ — ADMIN',
    kombucha: 'КОМБУЧА — ADMIN', spirits: 'АЛКОГОЛЬ — ADMIN', cocktails: 'КОКТЕЙЛИ — ADMIN',
  };
  const EDITABLE_SECTION_TITLES_EN = {
    water: 'WATER · BEER — ADMIN',
    starters: 'STARTERS — ADMIN', soups: 'SOUPS — ADMIN', salads: 'SALADS — ADMIN',
    burgers: 'BURGERS — ADMIN', pasta: 'PASTA — ADMIN', mains: 'MAINS — ADMIN',
    desserts: 'DESSERTS — ADMIN',
    beer: 'BEER — ADMIN', wineglass: 'WINE BY GLASS — ADMIN',
    soft: 'SOFT DRINKS — ADMIN', coffee: 'COFFEE — ADMIN',
    kombucha: 'KOMBUCHA — ADMIN', spirits: 'SPIRITS — ADMIN', cocktails: 'COCKTAILS — ADMIN',
  };

  const SECTION_SEEDS = {
    water: {
      water: { name: 'Вода', nameRu: 'Вода', nameEn: 'Water', priceLabelRu: 'с газом / без газа', priceLabelEn: 'still / sparkling', isGroup: true, groupKey: 'Вода', isActive: true, sortOrder: 10 },
    },
    starters: {
      bruschetta_shrimp: { name: 'Брускетта с креветками', nameRu: 'Брускетта',        nameEn: 'Bruschetta',        descRu: 'cream cheese & креветки',       descEn: 'cream cheese & shrimps',         price: 7,  isGroup: false, isActive: true, sortOrder: 10  },
      bruschetta_tomato: { name: 'Брускетта томаты',       nameRu: 'Брускетта 🌿',      nameEn: 'Bruschetta 🌿',      descRu: 'вяленые томаты',                descEn: 'sun dried tomatoes',              price: 6,  isGroup: false, isActive: true, sortOrder: 20  },
      crepe_salmon:      { name: 'Блин с лососем',         nameRu: 'Блин лосось',       nameEn: 'Crepe salmon',      descRu: 'лосось, cream cheese',          descEn: 'salmon, cream cheese',            price: 7,  isGroup: false, isActive: true, sortOrder: 30  },
      crepe_beef:        { name: 'Блин с говядиной',       nameRu: 'Блин говядина',     nameEn: 'Crepe beef',        descRu: 'говядина, грибы',               descEn: 'beef & mushrooms',                price: 7,  isGroup: false, isActive: true, sortOrder: 40  },
      red_caviar:        { name: 'Икра красная',           nameRu: 'Икра красная',      nameEn: 'Red caviar',        priceLabelRu: '50 / 100 г',              priceLabelEn: '50 / 100 g',                isGroup: true, groupKey: 'Икра красная',  isActive: true, sortOrder: 50  },
      camembert:         { name: 'Камамбер запечённый',    nameRu: 'Камамбер 🌿',       nameEn: 'Baked camembert 🌿', price: 14, isGroup: false, isActive: true, sortOrder: 60  },
      cheese_plate:      { name: 'Сырная тарелка',         nameRu: 'Сырная тарелка 🌿', nameEn: 'Cheese plate 🌿',    descRu: 'бри, пармезан, горгонзола',     descEn: 'brie, parmesan, gorgonzola',      price: 14, isGroup: false, isActive: true, sortOrder: 70  },
      seafood_platter:   { name: 'Морепродукты плато',     nameRu: 'Плато море',        nameEn: 'Seafood platter',   descRu: 'креветки, осьминог, кальмар',   descEn: 'shrimps, octopus, calamari',      price: 32, isGroup: false, isActive: true, sortOrder: 80  },
      shrimp_pesto:      { name: 'Креветки в песто',       nameRu: 'Креветки песто',    nameEn: 'Shrimps pesto',     descRu: 'вино, соус песто',              descEn: 'wine, pesto sauce',               price: 13, isGroup: false, isActive: true, sortOrder: 90  },
      mussels:           { name: 'Мидии',                  nameRu: 'Мидии',             nameEn: 'Mussels',           price: 13, isGroup: false, isActive: true, sortOrder: 100 },
      bread_bowl:        { name: 'Хлебная корзина',        nameRu: 'Хлебная корзина',   nameEn: 'Bread bowl',        descRu: 'боло, ржаной, чиабатта',        descEn: 'bolo do caco, rye, ciabatta',     price: 5,  isGroup: false, isActive: true, sortOrder: 110 },
      garlic_bread:      { name: 'Чесночный хлеб',         nameRu: 'Чесночный хлеб',   nameEn: 'Garlic bread',      price: 5,  isGroup: false, isActive: true, sortOrder: 120 },
    },
    soups: {
      chicken_soup:   { name: 'Куриный суп',  nameRu: 'Куриный суп',       nameEn: 'Chicken soup',        priceLabelRu: 'чашка / тарелка', priceLabelEn: 'cup / bowl', isGroup: true, groupKey: 'Куриный суп',  isActive: true, sortOrder: 10 },
      mushroom_cream: { name: 'Грибной крем', nameRu: 'Грибной крем 🌿',   nameEn: 'Mushroom cream 🌿',   descRu: 'трюфель', descEn: 'truffle', priceLabelRu: 'чашка / тарелка', priceLabelEn: 'cup / bowl', isGroup: true, groupKey: 'Грибной крем', isActive: true, sortOrder: 20 },
      borscht:        { name: 'Борщ',         nameRu: 'Борщ',              nameEn: 'Borscht',             descRu: 'говядина, свёкла, ржаной', descEn: 'beef, beetroot, rye bread', price: 11, isGroup: false, isActive: true, sortOrder: 30 },
    },
    salads: {
      caesar:        { name: 'Цезарь',              nameRu: 'Цезарь 🌿',        nameEn: 'Caesar 🌿',        price: 10, isGroup: false, isActive: true, sortOrder: 10 },
      caesar_chicken: { name: 'Цезарь с курицей',   nameRu: 'Цезарь + курица',  nameEn: 'Caesar + chicken', price: 12, isGroup: false, isActive: true, sortOrder: 20 },
      caesar_shrimp:  { name: 'Цезарь с креветками', nameRu: 'Цезарь + креветки', nameEn: 'Caesar + shrimps', price: 14, isGroup: false, isActive: true, sortOrder: 30 },
      tuna_salad:    { name: 'Салат с тунцом',       nameRu: 'Тунец кунжут',     nameEn: 'Sesame tuna',      descRu: 'томаты, кисло-сладкий', descEn: 'tomatoes, sweet & sour', price: 16, isGroup: false, isActive: true, sortOrder: 40 },
      top_salad:     { name: 'The TOP салат',         nameRu: 'The TOP',          nameEn: 'The TOP',          descRu: 'креветки, манго, бри',  descEn: 'shrimps, mango, brie',   price: 16, isGroup: false, isActive: true, sortOrder: 50 },
      roast_beef:    { name: 'Ростбиф с горчицей',   nameRu: 'Ростбиф',          nameEn: 'Roast beef salad', descRu: 'горчичный дрессинг',    descEn: 'honey mustard dressing', price: 17, isGroup: false, isActive: true, sortOrder: 60 },
    },
    burgers: {
      classic_burger:     { name: 'Классический бургер', nameRu: 'Классический',   nameEn: 'Classic',            price: 14, isGroup: false, isActive: true, sortOrder: 10 },
      double_burger:      { name: 'Двойной бургер',      nameRu: 'Двойной',        nameEn: 'Double',             price: 18, isGroup: false, isActive: true, sortOrder: 20 },
      cheese_burger:      { name: 'Чизбургер',           nameRu: 'Чизбургер',      nameEn: 'Cheeseburger',       price: 15, isGroup: false, isActive: true, sortOrder: 30 },
      double_cheese:      { name: 'Двойной чизбургер',   nameRu: 'Двойной чиз',   nameEn: 'Double cheese',      price: 19, isGroup: false, isActive: true, sortOrder: 40 },
      blue_cheese:        { name: 'Блю-чиз бургер',      nameRu: 'Блю-чиз',       nameEn: 'Blue cheese',        price: 16, isGroup: false, isActive: true, sortOrder: 50 },
      double_blue_cheese: { name: 'Двойной блю-чиз',     nameRu: 'Двойной блю-чиз', nameEn: 'Double blue cheese', price: 20, isGroup: false, isActive: true, sortOrder: 60 },
      chicken_burger:     { name: 'Куриный бургер',      nameRu: 'Куриный',        nameEn: 'Chicken burger',     price: 13, isGroup: false, isActive: true, sortOrder: 70 },
      veggie_burger:      { name: 'Вегги-бургер',        nameRu: 'Вегги 🌿',       nameEn: 'Veggie 🌿',          price: 14, isGroup: false, isActive: true, sortOrder: 80 },
    },
    pasta: {
      seafood_pasta:    { name: 'Паста с морепродуктами', nameRu: 'Морепродукты',     nameEn: 'Seafood pasta',     descRu: 'креветки, кальмар, мидии', descEn: 'shrimps, calamari, mussels', price: 18, isGroup: false, isActive: true, sortOrder: 10 },
      carbonara:        { name: 'Карбонара',              nameRu: 'Карбонара',        nameEn: 'Carbonara',         descRu: 'панчетта, бекон',          descEn: 'pancetta, bacon',            price: 18, isGroup: false, isActive: true, sortOrder: 20 },
      mushroom_risotto: { name: 'Ризотто с грибами',      nameRu: 'Ризотто грибы 🌿', nameEn: 'Mushroom risotto 🌿', price: 15, isGroup: false, isActive: true, sortOrder: 30 },
      shrimp_risotto:   { name: 'Ризотто с креветками',   nameRu: 'Ризотто креветки', nameEn: 'Shrimp risotto',    price: 18, isGroup: false, isActive: true, sortOrder: 40 },
    },
    mains: {
      befstroganov:  { name: 'Бефстроганов',     nameRu: 'Бефстроганов',  nameEn: 'Beef Stroganoff',           descRu: 'Black Angus, грибы',            descEn: 'Black Angus, mushrooms',         price: 18, needsSide: true, isGroup: false, isActive: true, sortOrder: 10  },
      espada:        { name: 'Эспада',           nameRu: 'Эспада',        nameEn: 'Espada',                    descRu: 'маракуйя, банан',               descEn: 'maracuja sauce & banana',        price: 18, needsSide: true, isGroup: false, isActive: true, sortOrder: 20  },
      salmon:        { name: 'Лосось в сливках', nameRu: 'Лосось',        nameEn: 'Salmon',                    descRu: 'белое вино, сливки',            descEn: 'white wine cream sauce',         price: 25, needsSide: true, isGroup: false, isActive: true, sortOrder: 30  },
      tuna_steak:    { name: 'Стейк тунца',      nameRu: 'Тунец стейк',   nameEn: 'Tuna steak',                descRu: 'кунжут, терияки',               descEn: 'sesame, teriyaki',               price: 0,  priceLabelRu: 'цена дня', priceLabelEn: 'day price', needsSide: true, isGroup: false, isActive: true, sortOrder: 40  },
      duck:          { name: 'Утиная грудка',    nameRu: 'Утка',          nameEn: 'Duck breast',               descRu: 'портвейно-ягодный соус',        descEn: 'porto berries sauce',            price: 25, needsSide: true, isGroup: false, isActive: true, sortOrder: 50  },
      octopus:       { name: 'Осьминог малиновый', nameRu: 'Осьминог',    nameEn: 'Octopus',                   descRu: 'малиново-бальзамический',       descEn: 'raspberry balsamic glaze',       price: 26, needsSide: true, isGroup: false, isActive: true, sortOrder: 60  },
      chicken_kyiv:  { name: 'Котлета по-киевски', nameRu: 'Котлета Киев', nameEn: 'Chicken Kyiv',             descRu: 'зелень, чесночное масло',       descEn: 'herbs, garlic butter',           price: 24, needsSide: true, isGroup: false, isActive: true, sortOrder: 70  },
      ribeye:        { name: 'Рибай 350г',        nameRu: 'Рибай 350г',   nameEn: 'Ribeye 350g',               descRu: 'перечный соус',                 descEn: 'pepper cream sauce',             price: 28, needsSide: true, isGroup: false, isActive: true, sortOrder: 80  },
      rice_side:     { name: 'Рис',               nameRu: 'Рис',           nameEn: 'Rice',           price: 3, isGroup: false, isActive: true, sortOrder: 90  },
      vegetables_side: { name: 'Овощи',           nameRu: 'Овощи',         nameEn: 'Vegetables',     price: 3, isGroup: false, isActive: true, sortOrder: 100 },
      spaghetti_side: { name: 'Спагетти',         nameRu: 'Спагетти',      nameEn: 'Spaghetti',      price: 3, isGroup: false, isActive: true, sortOrder: 110 },
      salad_side:    { name: 'Салат гарнир',       nameRu: 'Салат',         nameEn: 'Salad',          price: 3, isGroup: false, isActive: true, sortOrder: 120 },
      asparagus_side: { name: 'Спаржа',           nameRu: 'Спаржа',        nameEn: 'Asparagus',      price: 4, isGroup: false, isActive: true, sortOrder: 130 },
      mashed_potato: { name: 'Пюре',              nameRu: 'Пюре',          nameEn: 'Mashed potato',  price: 4, isGroup: false, isActive: true, sortOrder: 140 },
      roast_potato:  { name: 'Жареный картофель',  nameRu: 'Жар. картофель', nameEn: 'Roast potato', price: 4, isGroup: false, isActive: true, sortOrder: 150 },
      fries:         { name: 'Картофель фри',      nameRu: 'Картофель фри', nameEn: 'French fries',   price: 3, isGroup: false, isActive: true, sortOrder: 160 },
    },
    desserts: {
      the_top_dessert: { name: 'The TOP десерт',   nameRu: 'The TOP',           nameEn: 'The TOP',                   descRu: 'меренговый рулет',         descEn: 'raspberry & pistachio meringue roll', price: 8,  isGroup: false, isActive: true, sortOrder: 10 },
      napoleon:        { name: 'Наполеон',          nameRu: 'Наполеон',          nameEn: 'Napoleon',                  descRu: 'слоёный, ванильный крем',  descEn: 'layered pastry, vanilla custard cream', price: 10, isGroup: false, isActive: true, sortOrder: 20 },
      medovik:         { name: 'Медовик',           nameRu: 'Медовик',           nameEn: 'Honey Cake (Medovik)',       price: 8,  isGroup: false, isActive: true, sortOrder: 30 },
      crepes_ice:      { name: 'Блины с мороженым', nameRu: 'Блины + мороженое', nameEn: 'Crepes + ice cream',         price: 6,  isGroup: false, isActive: true, sortOrder: 40 },
      strudel:         { name: 'Яблочный штрудель', nameRu: 'Штрудель',          nameEn: 'Apple strudel',             price: 7,  isGroup: false, isActive: true, sortOrder: 50 },
      syrniki:         { name: 'Сырники',           nameRu: 'Сырники',           nameEn: 'Syrniki',                   descRu: 'творожные', descEn: 'cottage cheese', priceLabelRu: '2 / 4 шт', priceLabelEn: '2 / 4 pcs', isGroup: true, groupKey: 'Сырники', isActive: true, sortOrder: 60 },
      ice_cream:       { name: 'Мороженое',         nameRu: 'Мороженое',         nameEn: 'Ice cream',                 descRu: 'ваниль, шоколад, клубника', descEn: 'vanilla, chocolate, strawberry', price: 5, isGroup: false, isActive: true, sortOrder: 70 },
    },
    beer: {
      coral_light:      { name: 'Coral Light',      nameRu: 'Coral Light',      nameEn: 'Coral Light',      priceLabelRu: '200 / 300 / 500 мл', priceLabelEn: '200 / 300 / 500 ml', isGroup: true,  groupKey: 'Coral Light', isActive: true, sortOrder: 10 },
      coral_dark:       { name: 'Coral Dark',        nameRu: 'Coral Dark',       nameEn: 'Coral Dark',       priceLabelRu: '200 / 300 / 500 мл', priceLabelEn: '200 / 300 / 500 ml', isGroup: true,  groupKey: 'Coral Dark',  isActive: true, sortOrder: 20 },
      shandy:           { name: 'Shandy',            nameRu: 'Shandy',           nameEn: 'Shandy',           descRu: 'пиво + лимонад', descEn: 'beer + lemonade', price: 3,   isGroup: false, isActive: true, sortOrder: 30 },
      coral_non_alco:   { name: 'Coral Non Alco',    nameRu: 'Coral Non Alco',   nameEn: 'Coral Non Alco',   price: 2.5, isGroup: false, isActive: true, sortOrder: 40 },
      coral_puro_malta: { name: 'Coral Puro Malta',  nameRu: 'Coral Puro Malta', nameEn: 'Coral Puro Malta', price: 2.5, isGroup: false, isActive: true, sortOrder: 50 },
      coral_sidra:      { name: 'Coral Sidra',       nameRu: 'Coral Sidra',      nameEn: 'Coral Sidra',      price: 3,   isGroup: false, isActive: true, sortOrder: 60 },
    },
    wineglass: {
      white_wine:   { name: 'Белое вино',   nameRu: 'Белое',        nameEn: 'White',        price: 4, isGroup: false, isActive: true, sortOrder: 10 },
      rose_wine:    { name: 'Розовое вино', nameRu: 'Розовое',      nameEn: 'Rosé',         price: 4, isGroup: false, isActive: true, sortOrder: 20 },
      green_wine:   { name: 'Зелёное вино', nameRu: 'Зелёное',      nameEn: 'Green',        price: 4, isGroup: false, isActive: true, sortOrder: 30 },
      red_wine:     { name: 'Красное вино', nameRu: 'Красное',      nameEn: 'Red',          price: 4, isGroup: false, isActive: true, sortOrder: 40 },
      platino_brut: { name: 'Platino Brut', nameRu: 'Platino Brut', nameEn: 'Platino Brut', price: 5, isGroup: false, isActive: true, sortOrder: 50 },
      prosecco:     { name: 'Prosecco',     nameRu: 'Prosecco',     nameEn: 'Prosecco',     price: 7, isGroup: false, isActive: true, sortOrder: 60 },
    },
    soft: {
      fresh_orange:          { name: 'Апельсиновый сок свежий', nameRu: 'Апельс. сок',       nameEn: 'Fresh orange juice',    price: 6,   isGroup: false, isActive: true, sortOrder: 10  },
      smoothie_kiwi_banana:  { name: 'Смузи киви-банан',        nameRu: 'Смузи киви-банан',  nameEn: 'Smoothie kiwi-banana',  price: 6,   isGroup: false, isActive: true, sortOrder: 20  },
      smoothie_mango_banana: { name: 'Смузи манго-банан',       nameRu: 'Смузи манго-банан', nameEn: 'Smoothie mango-banana', price: 6,   isGroup: false, isActive: true, sortOrder: 30  },
      smoothie_mix:          { name: 'Смузи мультифрукт',       nameRu: 'Смузи мультифрукт', nameEn: 'Smoothie mix fruits',   price: 6,   isGroup: false, isActive: true, sortOrder: 40  },
      milkshake_vanilla:     { name: 'Милкшейк ваниль',         nameRu: 'Милкшейк ваниль',   nameEn: 'Milkshake vanilla',     price: 5,   isGroup: false, isActive: true, sortOrder: 50  },
      milkshake_strawberry:  { name: 'Милкшейк клубника',       nameRu: 'Милкшейк клубника', nameEn: 'Milkshake strawberry',  price: 5,   isGroup: false, isActive: true, sortOrder: 60  },
      milkshake_chocolate:   { name: 'Милкшейк шоколад',        nameRu: 'Милкшейк шоколад',  nameEn: 'Milkshake chocolate',   price: 5,   isGroup: false, isActive: true, sortOrder: 70  },
      lemonade_classic:      { name: 'Лимонад классик',         nameRu: 'Лимонад классик',   nameEn: 'Lemonade classic',      price: 6,   isGroup: false, isActive: true, sortOrder: 80  },
      lemonade_maracuja:     { name: 'Лимонад маракуйя',        nameRu: 'Лимонад маракуйя',  nameEn: 'Lemonade maracuja',     price: 6,   isGroup: false, isActive: true, sortOrder: 90  },
      pepsi:                 { name: 'Pepsi / Black',           nameRu: 'Pepsi / Black',     nameEn: 'Pepsi / Black',         price: 2.5, isGroup: false, isActive: true, sortOrder: 100 },
      seven_up:              { name: '7UP',                     nameRu: '7UP',               nameEn: '7UP',                   price: 2.5, isGroup: false, isActive: true, sortOrder: 110 },
      lipton:                { name: 'Lipton Ice Tea',          nameRu: 'Lipton Ice Tea',    nameEn: 'Lipton Ice Tea',        descRu: 'манго / лимон / персик', descEn: 'mango / lemon / peach', price: 2.5, isGroup: false, isActive: true, sortOrder: 120 },
      compal:                { name: 'Сок Compal',              nameRu: 'Сок Compal',        nameEn: 'Compal juice',          price: 2.5, isGroup: false, isActive: true, sortOrder: 130 },
      water:                 { name: 'Вода',                    nameRu: 'Вода',              nameEn: 'Water',                 priceLabelRu: 'с газом / без газа', priceLabelEn: 'still / sparkling', isGroup: true, groupKey: 'Вода', isActive: true, sortOrder: 140 },
    },
    coffee: {
      espresso:        { name: 'Эспрессо',         nameRu: 'Эспрессо',         nameEn: 'Espresso',        price: 1.4, isGroup: false, isActive: true, sortOrder: 10 },
      macchiato:       { name: 'Макиато',          nameRu: 'Макиато',          nameEn: 'Macchiato',       price: 1.4, isGroup: false, isActive: true, sortOrder: 20 },
      double_espresso: { name: 'Двойной эспрессо', nameRu: 'Двойной эспрессо', nameEn: 'Double espresso', price: 2.5, isGroup: false, isActive: true, sortOrder: 30 },
      americano:       { name: 'Американо',        nameRu: 'Американо',        nameEn: 'Americano',       price: 2,   isGroup: false, isActive: true, sortOrder: 40 },
      cappuccino:      { name: 'Капучино',         nameRu: 'Капучино',         nameEn: 'Cappuccino',      price: 4,   isGroup: false, isActive: true, sortOrder: 50 },
      latte:           { name: 'Латте',            nameRu: 'Латте',            nameEn: 'Latte',           price: 4,   isGroup: false, isActive: true, sortOrder: 60 },
    },
    kombucha: {
      black_tea:  { name: 'Комбуча черный чай',           nameRu: 'Комбуча чёрный чай',          nameEn: 'Kombucha Black Tea',             priceLabelRu: '150 / 500 / 1000 мл', priceLabelEn: '150 / 500 / 1000 ml', isGroup: true, groupKey: 'Комбуча черный чай',           isActive: true, sortOrder: 10 },
      black_coffee: { name: 'Комбуча черный кофе',        nameRu: 'Комбуча чёрный кофе',         nameEn: 'Kombucha Black Coffee',          priceLabelRu: '75 / 250 / 500 мл',   priceLabelEn: '75 / 250 / 500 ml',   isGroup: true, groupKey: 'Комбуча черный кофе',           isActive: true, sortOrder: 20 },
      beetroot:   { name: 'Комбуча Beetroot Ginger Mint', nameRu: 'Комбуча Beetroot·Ginger·Mint', nameEn: 'Kombucha Beetroot·Ginger·Mint',  priceLabelRu: '150 / 500 / 1000 мл', priceLabelEn: '150 / 500 / 1000 ml', isGroup: true, groupKey: 'Комбуча Beetroot Ginger Mint',  isActive: true, sortOrder: 30 },
      green_tea:  { name: 'Комбуча Green Tea Grapefruit', nameRu: 'Комбуча Green Tea·Grapefruit', nameEn: 'Kombucha Green Tea·Grapefruit',  priceLabelRu: '150 / 500 / 1000 мл', priceLabelEn: '150 / 500 / 1000 ml', isGroup: true, groupKey: 'Комбуча Green Tea Grapefruit',  isActive: true, sortOrder: 40 },
      red_fruits: { name: 'Комбуча Red Fruits Hibiscus',  nameRu: 'Комбуча Red Fruits·Hibiscus',  nameEn: 'Kombucha Red Fruits·Hibiscus',   priceLabelRu: '150 / 500 / 1000 мл', priceLabelEn: '150 / 500 / 1000 ml', isGroup: true, groupKey: 'Комбуча Red Fruits Hibiscus',   isActive: true, sortOrder: 50 },
    },
    spirits: {
      eristoff:     { name: 'Eristoff',           nameRu: 'Eristoff',      nameEn: 'Eristoff',      descRu: 'водка',   descEn: 'vodka',    price: 5,  isGroup: false, isActive: true, sortOrder: 10  },
      absolut:      { name: 'Absolut',            nameRu: 'Absolut',       nameEn: 'Absolut',       descRu: 'водка',   descEn: 'vodka',    price: 6,  isGroup: false, isActive: true, sortOrder: 20  },
      tanqueray:    { name: 'Tanqueray',          nameRu: 'Tanqueray',     nameEn: 'Tanqueray',     descRu: 'джин',    descEn: 'gin',      price: 6,  isGroup: false, isActive: true, sortOrder: 30  },
      bacardi:      { name: 'Bacardi',            nameRu: 'Bacardi',       nameEn: 'Bacardi',       descRu: 'ром',     descEn: 'rum',      price: 6,  isGroup: false, isActive: true, sortOrder: 40  },
      jose_cuervo:  { name: 'Jose Cuervo',        nameRu: 'Jose Cuervo',   nameEn: 'Jose Cuervo',   descRu: 'текила',  descEn: 'tequila',  price: 6,  isGroup: false, isActive: true, sortOrder: 50  },
      jameson:      { name: 'Jameson',            nameRu: 'Jameson',       nameEn: 'Jameson',       descRu: 'виски',   descEn: 'whiskey',  price: 7,  isGroup: false, isActive: true, sortOrder: 60  },
      jack_daniels: { name: 'Jack Daniels',       nameRu: 'Jack Daniels',  nameEn: 'Jack Daniels',  descRu: 'виски',   descEn: 'whiskey',  price: 7,  isGroup: false, isActive: true, sortOrder: 70  },
      dewars:       { name: 'Dewars',             nameRu: 'Dewars',        nameEn: 'Dewars',        descRu: 'виски',   descEn: 'whiskey',  price: 6,  isGroup: false, isActive: true, sortOrder: 80  },
      chivas_royal: { name: 'Chivas Royal Salute', nameRu: 'Chivas Royal', nameEn: 'Chivas Royal',  descRu: 'виски',   descEn: 'whiskey',  price: 30, isGroup: false, isActive: true, sortOrder: 90  },
      blue_label:   { name: 'Blue Label',         nameRu: 'Blue Label',    nameEn: 'Blue Label',    descRu: 'виски',   descEn: 'whiskey',  price: 60, isGroup: false, isActive: true, sortOrder: 100 },
      hennessy:     { name: 'Hennessy',           nameRu: 'Hennessy',      nameEn: 'Hennessy',      descRu: 'коньяк',  descEn: 'cognac',   price: 10, isGroup: false, isActive: true, sortOrder: 110 },
      jagermeister: { name: 'Jagermeister',       nameRu: 'Jagermeister',  nameEn: 'Jagermeister',  price: 5,  isGroup: false, isActive: true, sortOrder: 120 },
      fernet:       { name: 'Fernet',             nameRu: 'Fernet',        nameEn: 'Fernet',        price: 4,  isGroup: false, isActive: true, sortOrder: 130 },
      campari:      { name: 'Campari',            nameRu: 'Campari',       nameEn: 'Campari',       price: 4,  isGroup: false, isActive: true, sortOrder: 140 },
      baileys:      { name: 'Baileys',            nameRu: 'Baileys',       nameEn: 'Baileys',       price: 4,  isGroup: false, isActive: true, sortOrder: 150 },
      kahlua:       { name: 'Kahlua',             nameRu: 'Kahlua',        nameEn: 'Kahlua',        price: 4,  isGroup: false, isActive: true, sortOrder: 160 },
      aperol:       { name: 'Aperol',             nameRu: 'Aperol',        nameEn: 'Aperol',        price: 4,  isGroup: false, isActive: true, sortOrder: 170 },
      disaronno:    { name: 'Disaronno',          nameRu: 'Disaronno',     nameEn: 'Disaronno',     price: 4,  isGroup: false, isActive: true, sortOrder: 180 },
    },
    cocktails: {
      aperol_spritz:        { name: 'Aperol Spritz',        nameRu: 'Aperol Spritz',        nameEn: 'Aperol Spritz',        descRu: 'Aperol, Sparkling Wine, Soda',                      descEn: 'Aperol, Sparkling Wine, Soda',                      price: 8,  isGroup: false, isActive: true, sortOrder: 10  },
      hugo_spritz:          { name: 'Hugo Spritz',          nameRu: 'Hugo Spritz',          nameEn: 'Hugo Spritz',          descRu: 'St.Germain, Prosecco, Soda Water',                  descEn: 'St.Germain, Prosecco, Soda Water',                  price: 8,  isGroup: false, isActive: true, sortOrder: 20  },
      french_75:            { name: 'French 75',            nameRu: 'French 75',            nameEn: 'French 75',            descRu: 'Gin, Lemon, Simple Syrup, Prosecco',                descEn: 'Gin, Lemon, Simple Syrup, Prosecco',                price: 8,  isGroup: false, isActive: true, sortOrder: 30  },
      old_fashioned:        { name: 'Old Fashioned',        nameRu: 'Old Fashioned',        nameEn: 'Old Fashioned',        descRu: 'Jack Daniels, Angostura, Simple Syrup',             descEn: 'Jack Daniels, Angostura, Simple Syrup',             price: 8,  isGroup: false, isActive: true, sortOrder: 40  },
      caipirinha:           { name: 'Caipirinha',           nameRu: 'Caipirinha',           nameEn: 'Caipirinha',           descRu: 'Cachaca, Brown Sugar, Lime',                        descEn: 'Cachaca, Brown Sugar, Lime',                        price: 8,  isGroup: false, isActive: true, sortOrder: 50  },
      penicillin:           { name: 'Penicillin',           nameRu: 'Penicillin',           nameEn: 'Penicillin',           descRu: 'Scotch Whiskey, Honey, Ginger, Lemon',              descEn: 'Scotch Whiskey, Honey, Ginger, Lemon',              price: 9,  isGroup: false, isActive: true, sortOrder: 60  },
      passion_long:         { name: 'Passion Long',         nameRu: 'Passion Long',         nameEn: 'Passion Long',         descRu: 'Vodka, Passion Syrup, Passion Puree, Peach Juice',  descEn: 'Vodka, Passion Syrup, Passion Puree, Peach Juice',  price: 9,  isGroup: false, isActive: true, sortOrder: 70  },
      amaretto_sour:        { name: 'Amaretto Sour',        nameRu: 'Amaretto Sour',        nameEn: 'Amaretto Sour',        descRu: 'Jack Daniels, Amaretto, Lemon, Egg White',          descEn: 'Jack Daniels, Amaretto, Lemon, Egg White',          price: 9,  isGroup: false, isActive: true, sortOrder: 80  },
      espresso_martini:     { name: 'Espresso Martini',     nameRu: 'Espresso Martini',     nameEn: 'Espresso Martini',     descRu: 'Vanilla Vodka, Kahlua, Double Espresso',            descEn: 'Vanilla Vodka, Kahlua, Double Espresso',            price: 9,  isGroup: false, isActive: true, sortOrder: 90  },
      basil_smash:          { name: 'Basil Smash',          nameRu: 'Basil Smash',          nameEn: 'Basil Smash',          descRu: 'Gin, Lemon, Brown Sugar, St.Germain, Soda',         descEn: 'Gin, Lemon, Brown Sugar, St.Germain, Soda',         price: 9,  isGroup: false, isActive: true, sortOrder: 100 },
      ginger_mule:          { name: 'Ginger Mule',          nameRu: 'Ginger Mule',          nameEn: 'Ginger Mule',          descRu: 'Vodka, Ginger Syrup, Ginger Ale, Lemon',            descEn: 'Vodka, Ginger Syrup, Ginger Ale, Lemon',            price: 9,  isGroup: false, isActive: true, sortOrder: 110 },
      melon_fizz:           { name: 'Melon Fizz',           nameRu: 'Melon Fizz',           nameEn: 'Melon Fizz',           descRu: 'Rum, Midori, Lemon Juice, Pineapple Juice',         descEn: 'Rum, Midori, Lemon Juice, Pineapple Juice',         price: 9,  isGroup: false, isActive: true, sortOrder: 120 },
      lynchburg:            { name: 'Lynchburg Lemonade',   nameRu: 'Lynchburg Lemonade',   nameEn: 'Lynchburg Lemonade',   descRu: 'Jack Daniels, Triple Sec, Peach Liqueur, Soda',     descEn: 'Jack Daniels, Triple Sec, Peach Liqueur, Soda',     price: 9,  isGroup: false, isActive: true, sortOrder: 130 },
      cream_gin_fizz:       { name: 'Cream Gin Fizz',       nameRu: 'Cream Gin Fizz',       nameEn: 'Cream Gin Fizz',       descRu: 'Gin, Cream, Vanilla Syrup, Lemon',                  descEn: 'Gin, Cream, Vanilla Syrup, Lemon',                  price: 9,  isGroup: false, isActive: true, sortOrder: 140 },
      strawberry_margarita: { name: 'Strawberry Margarita', nameRu: 'Strawberry Margarita', nameEn: 'Strawberry Margarita', descRu: 'Tequila, Triple Sec, Strawberry, Lime',             descEn: 'Tequila, Triple Sec, Strawberry, Lime',             price: 10, isGroup: false, isActive: true, sortOrder: 150 },
      singapore_sling:      { name: 'Singapur Sling',       nameRu: 'Singapur Sling',       nameEn: 'Singapore Sling',      descRu: 'Gin, Triple Sec, Lemon, Pineapple, Cherry Brandy',  descEn: 'Gin, Triple Sec, Lemon, Pineapple, Cherry Brandy',  price: 10, isGroup: false, isActive: true, sortOrder: 160 },
      mango_caipirinha:     { name: 'Mango Caipirinha',     nameRu: 'Mango Caipirinha',     nameEn: 'Mango Caipirinha',     descRu: 'Fresh Mango, Cachaca, Brown Sugar, Lime',           descEn: 'Fresh Mango, Cachaca, Brown Sugar, Lime',           price: 10, isGroup: false, isActive: true, sortOrder: 170 },
      porn_star:            { name: 'Porn Star',            nameRu: 'Porn Star',            nameEn: 'Porn Star',            price: 10, isGroup: false, isActive: true, sortOrder: 180 },
      sangria:              { name: 'Сангрия',              nameRu: 'Сангрия',              nameEn: 'Sangria',              priceLabelRu: '0.5 / 1 л', priceLabelEn: '0.5 / 1 l', isGroup: true, groupKey: 'Сангрия', isActive: true, sortOrder: 190 },
    },
  };

  let editableSections = {
    water: {},
    starters: {}, soups: {}, salads: {}, burgers: {}, pasta: {}, mains: {}, desserts: {},
    wineglass: {}, soft: {}, coffee: {},
    kombucha: {}, spirits: {}, cocktails: {},
  };
  let currentMenuItemAdminSection = null;
  let currentMenuItemAdminId = null;

  function renderEditableSection(sectionKey) {
    const container = document.getElementById(sectionKey + 'List');
    if (!container) return;
    const items = editableSections[sectionKey] || {};
    const activeItems = Object.entries(items)
      .filter(([, item]) => item.isActive !== false)
      .filter(([, item]) => !(sectionKey === 'soft' && item.groupKey === 'Вода'))
      .sort(([, a], [, b]) => (a.sortOrder || 0) - (b.sortOrder || 0));
    if (!activeItems.length) {
      container.innerHTML = '<div style="color:#7ab3ac;font-size:10px;text-align:center;padding:10px">' +
        (lang === 'ru' ? 'Нет позиций' : 'No items') + '</div>';
      restoreMenuVisual();
      restoreGroupBtns();
      if (currentTable !== '🛑') applyStopList();
      return;
    }
    container.innerHTML = activeItems.map(([id, item]) => renderEditableMenuItem(sectionKey, id, item)).join('');
    restoreMenuVisual();
    restoreGroupBtns();
    if (currentTable !== '🛑') applyStopList();
  }

  function renderEditableMenuItem(sectionKey, id, item) {
    const dispName = lang === 'ru' ? (item.nameRu || item.name || '') : (item.nameEn || item.name || '');
    const descStr  = lang === 'ru' ? (item.descRu || '') : (item.descEn || '');
    const descHtml = descStr ? `<div class="item-desc">${escapeHtml(descStr)}</div>` : '';
    const safeId   = escapeHtml(id);
    if (item.isGroup) {
      const priceLabel = (lang === 'ru' ? item.priceLabelRu : item.priceLabelEn) || '';
      const safeGK = (item.groupKey || '').replace(/'/g, "\\'");
      return `<button class="item-btn is-group" data-group="${escapeHtml(item.groupKey || '')}" data-item-id="${safeId}" onclick="openVarPopup('${safeGK}',this)">` +
        `<div class="item-name">${escapeHtml(dispName)}</div>${descHtml}` +
        `<div class="item-footer"><span class="item-price">${escapeHtml(priceLabel)}</span><span class="item-count">0</span></div></button>`;
    } else {
      const price = item.price || 0;
      const safeName = (item.name || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const priceLabel = (lang === 'ru' ? item.priceLabelRu : item.priceLabelEn) || ('€' + price);
      return `<button class="item-btn" data-item-id="${safeId}" onclick="addItem(this,'${safeName}',${price})">` +
        `<div class="item-name">${escapeHtml(dispName)}</div>${descHtml}` +
        `<div class="item-footer"><span class="item-price">${escapeHtml(priceLabel)}</span><span class="item-count">0</span></div></button>`;
    }
  }

  function loadEditableMenuSections() {
    EDITABLE_SECTION_KEYS.forEach(sectionKey => {
      db.ref('menuSections/' + sectionKey + '/items').on('value', snapshot => {
        editableSections[sectionKey] = snapshot.val() || {};
        renderEditableSection(sectionKey);
        const adminOverlay = document.getElementById('menuItemAdminOverlay');
        if (adminOverlay && adminOverlay.classList.contains('show') && currentMenuItemAdminSection === sectionKey) {
          renderMenuItemAdminList();
        }
      });
    });
  }

  function seedEditableMenuSectionsIfEmpty() {
    const now = Date.now();
    EDITABLE_SECTION_KEYS.forEach(sectionKey => {
      db.ref('menuSections/' + sectionKey + '/items').once('value', snapshot => {
        const existing = snapshot.val();
        if (!existing || Object.keys(existing).length === 0) {
          const seeds = SECTION_SEEDS[sectionKey];
          if (!seeds) return;
          const data = {};
          Object.entries(seeds).forEach(([id, item]) => {
            data[id] = Object.assign({}, item, { createdAt: now, updatedAt: now });
          });
          db.ref('menuSections/' + sectionKey + '/items').set(data);
        }
      });
    });
  }

  function initEditableSectionLongPress(sectionKey) {
    const header = document.getElementById(sectionKey + 'AccHeader');
    if (!header) return;
    let timer = null, fired = false;
    header.addEventListener('pointerdown', () => {
      fired = false;
      timer = setTimeout(() => { fired = true; openMenuItemAdminForSection(sectionKey); }, 1200);
    });
    header.addEventListener('pointerup', () => {
      clearTimeout(timer); timer = null;
      if (!fired) toggleAcc(header);
    });
    const cancel = () => { clearTimeout(timer); timer = null; };
    header.addEventListener('pointerleave', cancel);
    header.addEventListener('pointercancel', cancel);
    header.addEventListener('contextmenu', e => e.preventDefault());
  }

  function initEditableSectionItemLongPress(sectionKey) {
    const container = document.getElementById(sectionKey + 'List');
    if (!container) return;
    let lpTimer = null, lpFired = false;
    container.addEventListener('pointerdown', e => {
      const btn = e.target.closest('.item-btn');
      if (!btn) return;
      lpFired = false;
      lpTimer = setTimeout(() => {
        lpFired = true;
        const itemId = btn.dataset.itemId;
        if (itemId) openMenuItemAdmin(sectionKey, itemId);
      }, 1200);
    });
    container.addEventListener('pointerup', () => { clearTimeout(lpTimer); lpTimer = null; });
    const lpCancel = () => { clearTimeout(lpTimer); lpTimer = null; };
    container.addEventListener('pointerleave', lpCancel);
    container.addEventListener('pointercancel', lpCancel);
    container.addEventListener('contextmenu', e => { if (e.target.closest('.item-btn')) e.preventDefault(); });
    container.addEventListener('click', e => {
      if (lpFired) { lpFired = false; e.stopPropagation(); e.preventDefault(); }
    }, true);
  }

  // =============================================
  // MENU ITEM ADMIN
  // =============================================
  function openMenuItemAdminForSection(sectionKey) {
    currentMenuItemAdminSection = sectionKey;
    const titles = lang === 'ru' ? EDITABLE_SECTION_TITLES_RU : EDITABLE_SECTION_TITLES_EN;
    const titleEl = document.getElementById('menuItemAdminTitle');
    if (titleEl) titleEl.textContent = titles[sectionKey] || sectionKey.toUpperCase() + ' — ADMIN';
    renderMenuItemAdminList();
    menuItemAdminNew();
    document.getElementById('menuItemAdminOverlay').classList.add('show');
  }

  function openMenuItemAdmin(sectionKey, itemId) {
    currentMenuItemAdminSection = sectionKey;
    const titles = lang === 'ru' ? EDITABLE_SECTION_TITLES_RU : EDITABLE_SECTION_TITLES_EN;
    const titleEl = document.getElementById('menuItemAdminTitle');
    if (titleEl) titleEl.textContent = titles[sectionKey] || sectionKey.toUpperCase() + ' — ADMIN';
    renderMenuItemAdminList();
    menuItemAdminSelect(itemId);
    document.getElementById('menuItemAdminOverlay').classList.add('show');
  }

  function closeMenuItemAdmin() {
    document.getElementById('menuItemAdminOverlay').classList.remove('show');
  }

  function renderMenuItemAdminList() {
    const listEl = document.getElementById('menuItemAdminList');
    if (!listEl || !currentMenuItemAdminSection) return;
    const items = editableSections[currentMenuItemAdminSection] || {};
    const sorted = Object.entries(items).sort(([, a], [, b]) => (a.sortOrder || 0) - (b.sortOrder || 0));
    if (!sorted.length) {
      listEl.innerHTML = '<div style="color:#7ab3ac;font-size:10px;padding:10px 12px">No items yet — create one below</div>';
      return;
    }
    listEl.innerHTML = sorted.map(([id, item]) => {
      const safeId = id.replace(/'/g, "\\'");
      return `<div class="wine-admin-row${item.isActive === false ? ' wine-admin-row-inactive' : ''}" data-id="${escapeHtml(id)}" onclick="menuItemAdminSelect('${safeId}')">` +
        `<span class="wine-admin-row-name">${escapeHtml(item.name || '(no name)')}</span>` +
        `<span class="wine-admin-row-price">${item.isGroup ? '(group)' : '€' + (item.price || 0)}</span>` +
        (item.isActive === false ? '<span class="wine-admin-row-badge">OFF</span>' : '') +
        '</div>';
    }).join('');
  }

  function menuItemAdminSelect(id) {
    if (!currentMenuItemAdminSection) return;
    const item = (editableSections[currentMenuItemAdminSection] || {})[id];
    if (!item) return;
    currentMenuItemAdminId = id;
    document.getElementById('miaName').value         = item.name || '';
    document.getElementById('miaNameRu').value       = item.nameRu || '';
    document.getElementById('miaNameEn').value       = item.nameEn || '';
    document.getElementById('miaDescRu').value       = item.descRu || '';
    document.getElementById('miaDescEn').value       = item.descEn || '';
    document.getElementById('miaPrice').value        = item.price !== undefined ? item.price : '';
    document.getElementById('miaPriceLabelRu').value = item.priceLabelRu || '';
    document.getElementById('miaPriceLabelEn').value = item.priceLabelEn || '';
    document.getElementById('miaNeedsSide').checked  = !!item.needsSide;
    document.getElementById('miaSideType').value     = item.sideType || '';
    document.getElementById('miaIsGroup').checked    = !!item.isGroup;
    document.getElementById('miaGroupKey').value     = item.groupKey || '';
    document.getElementById('miaSortOrder').value    = item.sortOrder !== undefined ? item.sortOrder : '';
    document.getElementById('miaActive').checked     = item.isActive !== false;
    document.querySelectorAll('#menuItemAdminList .wine-admin-row').forEach(r =>
      r.classList.toggle('selected', r.dataset.id === id));
  }

  function menuItemAdminNew() {
    currentMenuItemAdminId = null;
    ['miaName','miaNameRu','miaNameEn','miaDescRu','miaDescEn','miaPrice',
     'miaPriceLabelRu','miaPriceLabelEn','miaSideType','miaGroupKey','miaSortOrder'].forEach(elId => {
      const el = document.getElementById(elId);
      if (el) el.value = '';
    });
    document.getElementById('miaNeedsSide').checked = false;
    document.getElementById('miaIsGroup').checked = false;
    document.getElementById('miaActive').checked  = true;
    document.querySelectorAll('#menuItemAdminList .wine-admin-row').forEach(r => r.classList.remove('selected'));
  }

  function saveMenuItemAdmin() {
    if (!currentMenuItemAdminSection) return;
    const name = (document.getElementById('miaName').value || '').trim();
    if (!name) { alert(lang === 'ru' ? 'Укажите внутреннее название' : 'Internal order name is required'); return; }
    const isGroup  = document.getElementById('miaIsGroup').checked;
    const groupKey = (document.getElementById('miaGroupKey').value || '').trim();
    if (isGroup && !groupKey) { alert(lang === 'ru' ? 'Укажите ключ группы' : 'Group key is required'); return; }
    const priceVal = document.getElementById('miaPrice').value;
    const price    = parseFloat(priceVal);
    if (!isGroup && (isNaN(price) || price < 0)) { alert(lang === 'ru' ? 'Укажите корректную цену' : 'Enter a valid price >= 0'); return; }
    const sortStr = (document.getElementById('miaSortOrder').value || '').trim();
    let sortOrder;
    if (!sortStr) {
      const existing = editableSections[currentMenuItemAdminSection] || {};
      sortOrder = Object.values(existing).reduce((m, i) => Math.max(m, i.sortOrder || 0), 0) + 10;
    } else {
      sortOrder = parseInt(sortStr, 10) || 0;
    }
    const now = Date.now();
    const needsSide = document.getElementById('miaNeedsSide').checked;
    const sideType  = (document.getElementById('miaSideType').value || '').trim();
    const data = {
      name,
      nameRu:       (document.getElementById('miaNameRu').value       || '').trim() || name,
      nameEn:       (document.getElementById('miaNameEn').value       || '').trim() || name,
      descRu:       (document.getElementById('miaDescRu').value       || '').trim(),
      descEn:       (document.getElementById('miaDescEn').value       || '').trim(),
      priceLabelRu: (document.getElementById('miaPriceLabelRu').value || '').trim(),
      priceLabelEn: (document.getElementById('miaPriceLabelEn').value || '').trim(),
      needsSide,
      sideType,
      isGroup,
      groupKey: isGroup ? groupKey : '',
      isActive: document.getElementById('miaActive').checked,
      sortOrder,
      updatedAt: now,
    };
    if (!isGroup) data.price = price;
    if (currentMenuItemAdminId) {
      const prev = (editableSections[currentMenuItemAdminSection] || {})[currentMenuItemAdminId];
      if (prev && prev.createdAt) data.createdAt = prev.createdAt;
      db.ref('menuSections/' + currentMenuItemAdminSection + '/items/' + currentMenuItemAdminId).update(data);
    } else {
      data.createdAt = now;
      const ref = db.ref('menuSections/' + currentMenuItemAdminSection + '/items').push();
      currentMenuItemAdminId = ref.key;
      ref.set(data);
    }
  }

  function disableMenuItemAdmin() {
    if (!currentMenuItemAdminId || !currentMenuItemAdminSection) return;
    if (!confirm(lang === 'ru' ? 'Отключить позицию?' : 'Disable this item?')) return;
    db.ref('menuSections/' + currentMenuItemAdminSection + '/items/' + currentMenuItemAdminId)
      .update({ isActive: false, updatedAt: Date.now() });
    document.getElementById('miaActive').checked = false;
  }

  function syncBeerItemsIntoWaterSectionOnce() {
    db.ref('menuSections/beer/items').once('value', beerSnap => {
      const beerItems = beerSnap.val();
      if (!beerItems) return;
      db.ref('menuSections/water/items').once('value', waterSnap => {
        const waterItems = waterSnap.val() || {};
        const now = Date.now();
        const updates = {};
        Object.entries(beerItems).forEach(([beerId, beerItem]) => {
          const targetId = 'beer_' + beerId;
          if (waterItems[targetId]) return;
          const alreadyExists = Object.values(waterItems).some(w =>
            w.name === beerItem.name && (w.groupKey || null) === (beerItem.groupKey || null)
          );
          if (alreadyExists) return;
          updates[targetId] = Object.assign({}, beerItem, {
            sortOrder: (beerItem.sortOrder || 0) + 100,
            movedFromSection: 'beer',
            originalId: beerId,
            updatedAt: now,
          });
        });
        if (Object.keys(updates).length > 0) {
          db.ref('menuSections/water/items').update(updates);
        }
      });
    });
  }

  // =============================================
  // INIT
  // =============================================
  window.addEventListener('DOMContentLoaded', () => {
    const firstBtn = document.querySelector('.table-btn');
    if (firstBtn) currentTable = firstBtn.textContent.trim();

    document.querySelectorAll('.item-btn').forEach(btn => {
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
    });

    // Сначала загружаем sentQty, только потом запускаем listener на orders
    function startOrdersListener() {
      let ordersLoaded = false;
      db.ref('orders').on('value', snapshot => {
        const raw = snapshot.val() || {};
        const data = {};
        Object.entries(raw).forEach(([key, val]) => {
          try {
            const tableId = key === STOPLIST_KEY ? '🛑' : key;
            data[tableId] = typeof val === 'object' && val.json ? JSON.parse(val.json) : val;
          } catch(e) {}
        });

        if (!ordersLoaded) {
          orders = data;
          ordersLoaded = true;
          renderOrder();
          restoreMenuVisual();
          if (currentTable !== '🛑') applyStopList();
        } else {
          Object.entries(data).forEach(([key, val]) => {
            if (key !== currentTable) orders[key] = val;
          });
          Object.keys(orders).forEach(key => {
            if (key !== currentTable && !data[key]) delete orders[key];
          });
          if (currentTable !== '🛑') applyStopList();
          if (!pendingSide && !sentOverlayOpen) renderOrder();
        }
        updateTableBadges();
      });
    }

    // Загружаем notes из Firebase
    db.ref('notes').once('value', snapshot => {
      const raw = snapshot.val() || {};
      Object.entries(raw).forEach(([key, val]) => {
        const tableId = key === STOPLIST_KEY ? '🛑' : key;
        notes[tableId] = val || '';
      });
      updateNotesVisual();
      updateTableBadges();
    });

    db.ref('notes').on('value', snapshot => {
      const raw = snapshot.val() || {};
      const field = document.getElementById('notesField');
      const notesFocused = document.activeElement === field;
      Object.entries(raw).forEach(([key, val]) => {
        const tableId = key === STOPLIST_KEY ? '🛑' : key;
        if (tableId !== currentTable || !notesFocused) {
          notes[tableId] = val || '';
        }
      });
      Object.keys(notes).forEach(key => {
        const missing = !raw[getFirebaseKey(key)];
        if (missing && (key !== currentTable || !notesFocused)) {
          notes[key] = '';
        }
      });
      if (!notesFocused) updateNotesVisual();
      updateTableBadges();
    });

    db.ref('sent').once('value')
      .then(snapshot => {
        const raw = snapshot.val() || {};
        Object.entries(raw).forEach(([key, val]) => {
          try {
            const tableId = key === STOPLIST_KEY ? '🛑' : key;
            sentQty[tableId] = typeof val === 'object' && val.json ? JSON.parse(val.json) : {};
          } catch(e) {}
        });
      })
      .catch(e => {
        console.warn('sentQty load failed, starting with empty sentQty', e);
        sentQty = {};
      })
      .finally(() => {
        startOrdersListener();
      });

    applyLang();
    initWinesLongPress();
    initWineAdminYear();
    loadWines();
    EDITABLE_SECTION_KEYS.forEach(key => {
      initEditableSectionLongPress(key);
      initEditableSectionItemLongPress(key);
    });
    seedEditableMenuSectionsIfEmpty();
    syncBeerItemsIntoWaterSectionOnce();
    loadEditableMenuSections();
  });
