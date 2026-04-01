// ── Données ──────────────────────────────────────────────────────────

const CATEGORIES = {
  length: {
    label: 'Longueur', emoji: '📏',
    units: [
      { id: 'mm',  label: 'Millimètre', symbol: 'mm',  to: v => v / 1000,      from: v => v * 1000 },
      { id: 'cm',  label: 'Centimètre', symbol: 'cm',  to: v => v / 100,       from: v => v * 100 },
      { id: 'm',   label: 'Mètre',      symbol: 'm',   to: v => v,              from: v => v },
      { id: 'km',  label: 'Kilomètre',  symbol: 'km',  to: v => v * 1000,      from: v => v / 1000 },
      { id: 'in',  label: 'Pouce',      symbol: 'in',  to: v => v * 0.0254,    from: v => v / 0.0254 },
      { id: 'ft',  label: 'Pied',       symbol: 'ft',  to: v => v * 0.3048,    from: v => v / 0.3048 },
      { id: 'mi',  label: 'Mile',       symbol: 'mi',  to: v => v * 1609.344,  from: v => v / 1609.344 },
    ],
  },
  mass: {
    label: 'Masse', emoji: '⚖️',
    units: [
      { id: 'mg',  label: 'Milligramme', symbol: 'mg', to: v => v / 1e6,        from: v => v * 1e6 },
      { id: 'g',   label: 'Gramme',      symbol: 'g',  to: v => v / 1000,       from: v => v * 1000 },
      { id: 'kg',  label: 'Kilogramme',  symbol: 'kg', to: v => v,               from: v => v },
      { id: 't',   label: 'Tonne',       symbol: 't',  to: v => v * 1000,       from: v => v / 1000 },
      { id: 'oz',  label: 'Once',        symbol: 'oz', to: v => v * 0.0283495,  from: v => v / 0.0283495 },
      { id: 'lb',  label: 'Livre',       symbol: 'lb', to: v => v * 0.453592,   from: v => v / 0.453592 },
    ],
  },
  temp: {
    label: 'Température', emoji: '🌡️',
    units: [
      { id: 'c', label: 'Celsius',    symbol: '°C', to: v => v,            from: v => v },
      { id: 'f', label: 'Fahrenheit', symbol: '°F', to: v => (v-32)*5/9,  from: v => v*9/5+32 },
      { id: 'k', label: 'Kelvin',     symbol: 'K',  to: v => v - 273.15,  from: v => v + 273.15 },
    ],
  },
  speed: {
    label: 'Vitesse', emoji: '💨',
    units: [
      { id: 'ms',  label: 'm/s',  symbol: 'm/s',  to: v => v,             from: v => v },
      { id: 'kmh', label: 'km/h', symbol: 'km/h', to: v => v / 3.6,      from: v => v * 3.6 },
      { id: 'mph', label: 'mph',  symbol: 'mph',  to: v => v * 0.44704,  from: v => v / 0.44704 },
      { id: 'kn',  label: 'Nœud', symbol: 'kn',   to: v => v * 0.514444, from: v => v / 0.514444 },
    ],
  },
  area: {
    label: 'Surface', emoji: '📐',
    units: [
      { id: 'cm2', label: 'Centimètre²', symbol: 'cm²', to: v => v / 10000,    from: v => v * 10000 },
      { id: 'm2',  label: 'Mètre²',      symbol: 'm²',  to: v => v,             from: v => v },
      { id: 'km2', label: 'Kilomètre²',  symbol: 'km²', to: v => v * 1e6,      from: v => v / 1e6 },
      { id: 'ha',  label: 'Hectare',     symbol: 'ha',  to: v => v * 10000,    from: v => v / 10000 },
      { id: 'ac',  label: 'Acre',        symbol: 'ac',  to: v => v * 4046.856, from: v => v / 4046.856 },
    ],
  },
  volume: {
    label: 'Volume', emoji: '🧪',
    units: [
      { id: 'ml',   label: 'Millilitre', symbol: 'mL',    to: v => v / 1000,     from: v => v * 1000 },
      { id: 'cl',   label: 'Centilitre', symbol: 'cL',    to: v => v / 100,      from: v => v * 100 },
      { id: 'l',    label: 'Litre',      symbol: 'L',     to: v => v,             from: v => v },
      { id: 'm3',   label: 'Mètre cube', symbol: 'm³',    to: v => v * 1000,     from: v => v / 1000 },
      { id: 'floz', label: 'Fluid oz',   symbol: 'fl oz', to: v => v * 0.029574, from: v => v / 0.029574 },
      { id: 'gal',  label: 'Gallon',     symbol: 'gal',   to: v => v * 3.78541,  from: v => v / 3.78541 },
    ],
  },
};

// ── État ─────────────────────────────────────────────────────────────

let currentCat  = 'length';
let currentUnit = 'cm';

// ── DOM ──────────────────────────────────────────────────────────────

const catsEl     = document.getElementById('categories');
const valueInput = document.getElementById('value-input');
const unitTabsEl = document.getElementById('unit-tabs');
const resultsEl  = document.getElementById('results');
const toastEl    = document.getElementById('toast');
let toastTimer;

// ── Formatage ────────────────────────────────────────────────────────

function fmtVal(v) {
  if (!isFinite(v) || isNaN(v)) return '—';
  if (v === 0) return '0';
  const abs = Math.abs(v);
  if (abs >= 1e9 || (abs < 0.00001 && abs > 0)) return v.toExponential(3);
  return parseFloat(v.toPrecision(7)).toString();
}

// ── Toast ────────────────────────────────────────────────────────────

function showToast() {
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

// ── Rendu catégories ─────────────────────────────────────────────────

function renderCategories() {
  catsEl.innerHTML = Object.entries(CATEGORIES).map(([key, cat]) => `
    <button class="cat-btn ${key === currentCat ? 'active' : ''}" data-cat="${key}">
      ${cat.emoji} ${cat.label}
    </button>
  `).join('');
}

// ── Rendu onglets unités ─────────────────────────────────────────────

function renderUnitTabs() {
  const units = CATEGORIES[currentCat].units;
  unitTabsEl.innerHTML = units.map(u => `
    <button class="unit-tab ${u.id === currentUnit ? 'active' : ''}" data-uid="${u.id}">
      ${u.symbol}
    </button>
  `).join('');
}

// ── Conversion ───────────────────────────────────────────────────────

function convert() {
  const raw = parseFloat(valueInput.value);
  const units = CATEGORIES[currentCat].units;
  const from = units.find(u => u.id === currentUnit);

  if (isNaN(raw) || !from) {
    resultsEl.innerHTML = `
      <div class="empty-state">
        <span>🔢</span>Entrez une valeur pour voir les conversions
      </div>`;
    return;
  }

  const base = from.to(raw);

  resultsEl.innerHTML = units
    .filter(u => u.id !== currentUnit)
    .map(u => {
      const val = fmtVal(u.from(base));
      return `
        <div class="result-item" data-copy="${val} ${u.symbol}">
          <div class="result-left">
            <span class="result-label">${u.label}</span>
            <span class="result-symbol">${u.symbol}</span>
          </div>
          <span class="result-value">${val}</span>
        </div>`;
    }).join('');
}

// ── Événements ───────────────────────────────────────────────────────

catsEl.addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  currentCat  = btn.dataset.cat;
  currentUnit = CATEGORIES[currentCat].units[0].id;
  valueInput.value = '';
  renderCategories();
  renderUnitTabs();
  resultsEl.innerHTML = `
    <div class="empty-state">
      <span>🔢</span>Entrez une valeur pour voir les conversions
    </div>`;
});

unitTabsEl.addEventListener('click', e => {
  const tab = e.target.closest('.unit-tab');
  if (!tab) return;
  currentUnit = tab.dataset.uid;
  renderUnitTabs();
  convert();
});

valueInput.addEventListener('input', convert);

resultsEl.addEventListener('click', e => {
  const item = e.target.closest('.result-item');
  if (!item || !item.dataset.copy) return;
  navigator.clipboard.writeText(item.dataset.copy);
  item.classList.add('flashed');
  setTimeout(() => item.classList.remove('flashed'), 600);
  showToast();
});

// ── Init ─────────────────────────────────────────────────────────────

renderCategories();
renderUnitTabs();
resultsEl.innerHTML = `
  <div class="empty-state">
    <span>🔢</span>Entrez une valeur pour voir les conversions
  </div>`;
