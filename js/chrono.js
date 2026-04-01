// ── Constantes ───────────────────────────────────────────────────────

const CIRCUMFERENCE = 2 * Math.PI * 130; // 816.81

// ── État ─────────────────────────────────────────────────────────────

let startTime = 0;
let elapsed   = 0;
let lapStart  = 0;
let laps      = [];
let running   = false;
let rafId     = null;

// ── DOM ──────────────────────────────────────────────────────────────

const minutesEl  = document.getElementById('minutes');
const secondsEl  = document.getElementById('seconds');
const csEl       = document.getElementById('cs');
const ringFill   = document.getElementById('ring-fill');
const watchWrap  = document.getElementById('watch-wrap');
const startBtn   = document.getElementById('start-btn');
const lapBtn     = document.getElementById('lap-btn');
const resetBtn   = document.getElementById('reset-btn');
const lapsEl     = document.getElementById('laps');
const lapsWrap   = document.getElementById('laps-wrap');

// ── Formatage ────────────────────────────────────────────────────────

function fmt(ms) {
  const totalCs = Math.floor(ms / 10);
  const cs      = totalCs % 100;
  const totalS  = Math.floor(totalCs / 100);
  const s       = totalS % 60;
  const m       = Math.floor(totalS / 60);
  return {
    m:  String(m).padStart(2, '0'),
    s:  String(s).padStart(2, '0'),
    cs: String(cs).padStart(2, '0'),
  };
}

function fmtStr(ms) {
  const { m, s, cs } = fmt(ms);
  return `${m}:${s}.${cs}`;
}

// ── Affichage ────────────────────────────────────────────────────────

function updateDisplay(ms) {
  const { m, s, cs } = fmt(ms);
  minutesEl.textContent = m;
  secondsEl.textContent = s;
  csEl.textContent      = '.' + cs;

  // Anneau : 0→100% sur 60 secondes
  const totalSec = ms / 1000;
  const progress = (totalSec % 60) / 60;
  ringFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
}

// ── Boucle d'animation ───────────────────────────────────────────────

function tick() {
  elapsed = Date.now() - startTime;
  updateDisplay(elapsed);
  rafId = requestAnimationFrame(tick);
}

// ── Start / Pause ────────────────────────────────────────────────────

startBtn.addEventListener('click', () => {
  if (running) {
    cancelAnimationFrame(rafId);
    running = false;
    startBtn.textContent = 'Reprise';
    startBtn.classList.remove('running');
    watchWrap.classList.remove('running');
  } else {
    startTime = Date.now() - elapsed;
    running   = true;
    startBtn.textContent = 'Pause';
    startBtn.classList.add('running');
    watchWrap.classList.add('running');
    lapBtn.disabled   = false;
    resetBtn.disabled = false;
    rafId = requestAnimationFrame(tick);
  }
});

// ── Tour ─────────────────────────────────────────────────────────────

lapBtn.addEventListener('click', () => {
  if (!running) return;
  const lapTime = elapsed - lapStart;
  lapStart = elapsed;
  laps.unshift({ num: laps.length + 1, lapTime, total: elapsed });
  renderLaps();
});

// ── Reset ────────────────────────────────────────────────────────────

resetBtn.addEventListener('click', () => {
  cancelAnimationFrame(rafId);
  running  = false;
  elapsed  = 0;
  lapStart = 0;
  laps     = [];
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  watchWrap.classList.remove('running');
  lapBtn.disabled   = true;
  resetBtn.disabled = true;
  updateDisplay(0);
  renderLaps();
});

// ── Rendu des tours ──────────────────────────────────────────────────

function renderLaps() {
  if (laps.length === 0) {
    lapsWrap.style.display = 'none';
    lapsEl.innerHTML = '';
    return;
  }
  lapsWrap.style.display = 'block';
  lapsEl.innerHTML = laps.map(lap => `
    <div class="lap-item">
      <span class="lap-num">Tour ${lap.num}</span>
      <span class="lap-time">${fmtStr(lap.lapTime)}</span>
      <span class="lap-total">${fmtStr(lap.total)}</span>
    </div>
  `).join('');
}

// ── Init ─────────────────────────────────────────────────────────────

lapBtn.disabled   = true;
resetBtn.disabled = true;
updateDisplay(0);
