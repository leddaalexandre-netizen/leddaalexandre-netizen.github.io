// ── Conversion couleurs ──────────────────────────────────────────────

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// ── Générateurs de palettes ──────────────────────────────────────────

const PALETTES = {
  monochromatic(h, s, l) {
    return [
      hslToHex(h, clamp(s * 0.35, 5, 100), clamp(l + 38, 5, 95)),
      hslToHex(h, clamp(s * 0.65, 5, 100), clamp(l + 20, 5, 95)),
      hslToHex(h, s, l),
      hslToHex(h, clamp(s * 1.1,  0, 100), clamp(l - 18, 5, 95)),
      hslToHex(h, clamp(s * 1.2,  0, 100), clamp(l - 35, 5, 90)),
    ];
  },
  analogous(h, s, l) {
    return [
      hslToHex((h - 60 + 360) % 360, s, l),
      hslToHex((h - 30 + 360) % 360, s, l),
      hslToHex(h, s, l),
      hslToHex((h + 30) % 360, s, l),
      hslToHex((h + 60) % 360, s, l),
    ];
  },
  complementary(h, s, l) {
    const c = (h + 180) % 360;
    return [
      hslToHex(h, s, clamp(l + 22, 5, 95)),
      hslToHex(h, s, l),
      hslToHex(h, clamp(s * 0.3, 5, 100), clamp(l + 32, 5, 95)),
      hslToHex(c, s, l),
      hslToHex(c, s, clamp(l + 22, 5, 95)),
    ];
  },
  triadic(h, s, l) {
    return [
      hslToHex(h, s, clamp(l + 15, 5, 95)),
      hslToHex(h, s, l),
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l),
      hslToHex((h + 240) % 360, s, clamp(l + 15, 5, 95)),
    ];
  },
  tetradic(h, s, l) {
    return [
      hslToHex(h, s, l),
      hslToHex((h +  90) % 360, s, l),
      hslToHex((h + 180) % 360, s, l),
      hslToHex((h + 270) % 360, s, l),
      hslToHex(h, clamp(s * 0.3, 5, 100), clamp(l + 28, 5, 95)),
    ];
  },
};

// ── État ─────────────────────────────────────────────────────────────

let currentHex  = '#6366f1';
let currentType = 'monochromatic';

// ── DOM ──────────────────────────────────────────────────────────────

const colorInput   = document.getElementById('color-input');
const hexInput     = document.getElementById('hex-input');
const colorPreview = document.getElementById('color-preview');
const paletteEl    = document.getElementById('palette');
const exportBtn    = document.getElementById('export-btn');
const toastEl      = document.getElementById('toast');
let toastTimer;

// ── Utilitaires ──────────────────────────────────────────────────────

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast(`${text} copié !`));
}

// ── Rendu ────────────────────────────────────────────────────────────

function render() {
  const [h, s, l] = hexToHsl(currentHex);
  const colors = PALETTES[currentType](h, s, l);

  colorPreview.style.background = currentHex;

  paletteEl.innerHTML = colors.map(hex => {
    const [r, g, b] = hexToRgb(hex);
    return `
      <div class="swatch" onclick="copyText('${hex}')">
        <div class="swatch-color" style="background:${hex}">
          <div class="swatch-copy-hint">COPIER</div>
        </div>
        <div class="swatch-info">
          <span class="swatch-hex">${hex}</span>
          <span class="swatch-rgb">rgb(${r}, ${g}, ${b})</span>
        </div>
      </div>`;
  }).join('');
}

// ── Événements ───────────────────────────────────────────────────────

colorInput.addEventListener('input', e => {
  currentHex = e.target.value;
  hexInput.value = currentHex.toUpperCase();
  render();
});

hexInput.addEventListener('input', e => {
  let val = e.target.value.trim();
  if (!val.startsWith('#')) val = '#' + val;
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    currentHex = val.toLowerCase();
    colorInput.value = currentHex;
    render();
  }
});

hexInput.addEventListener('blur', () => {
  hexInput.value = currentHex.toUpperCase();
});

document.getElementById('tabs').addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  currentType = tab.dataset.type;
  render();
});

exportBtn.addEventListener('click', () => {
  const [h, s, l] = hexToHsl(currentHex);
  const colors = PALETTES[currentType](h, s, l);
  const css = ':root {\n' + colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n') + '\n}';
  navigator.clipboard.writeText(css).then(() => showToast('Variables CSS copiées !'));
});

// ── Init ─────────────────────────────────────────────────────────────
render();
