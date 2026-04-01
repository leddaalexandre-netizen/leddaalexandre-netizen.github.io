// ── Constantes ───────────────────────────────────────────────────────

const GRID      = 20;
const SPD_START = 140;
const SPD_MIN   = 65;

// ── État ─────────────────────────────────────────────────────────────

let canvas, ctx, SIZE, CELL;
let snake, dir, nextDir, food;
let score, hiscore;
let state = 'idle'; // 'idle' | 'playing' | 'over'
let tickTimer, rafId;

// ── DOM ──────────────────────────────────────────────────────────────

const scoreEl    = document.getElementById('score');
const hiscoreEl  = document.getElementById('hiscore');
const canvasWrap = document.getElementById('canvas-wrap');
const overlay    = document.getElementById('overlay');
const oTitle     = document.getElementById('overlay-title');
const oSub       = document.getElementById('overlay-sub');
const oInfo      = document.getElementById('overlay-info');
const oBtn       = document.getElementById('overlay-btn');

// ── Init ─────────────────────────────────────────────────────────────

function init() {
  canvas  = document.getElementById('canvas');
  ctx     = canvas.getContext('2d');
  hiscore = parseInt(localStorage.getItem('snake-hi') || '0');
  hiscoreEl.textContent = hiscore;
  scoreEl.textContent   = 0;

  resize();
  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', onKey);

  document.querySelectorAll('.arrow-btn').forEach(btn => {
    btn.addEventListener('click', () => handleDir(btn.dataset.dir));
    btn.addEventListener('touchstart', e => {
      e.preventDefault();
      handleDir(btn.dataset.dir);
    }, { passive: false });
  });

  oBtn.addEventListener('click', startGame);
  drawBg();
}

function onResize() {
  resize();
  if (state !== 'playing') drawBg();
}

function resize() {
  const s = Math.min(window.innerWidth - 40, window.innerHeight - 220, 480);
  CELL    = Math.floor(s / GRID);
  SIZE    = CELL * GRID;
  canvas.width  = SIZE;
  canvas.height = SIZE;
}

// ── Game start ───────────────────────────────────────────────────────

function startGame() {
  snake   = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  dir     = { dx: 1, dy: 0 };
  nextDir = { dx: 1, dy: 0 };
  score   = 0;
  state   = 'playing';

  placeFood();
  scoreEl.textContent = 0;
  overlay.style.display = 'none';
  canvasWrap.classList.add('running');

  clearInterval(tickTimer);
  tickTimer = setInterval(tick, getSpeed());

  cancelAnimationFrame(rafId);
  loop();
}

function getSpeed() {
  return Math.max(SPD_MIN, SPD_START - Math.floor(score / 3) * 6);
}

// ── Game tick ────────────────────────────────────────────────────────

function tick() {
  dir = { ...nextDir };
  const head = { x: snake[0].x + dir.dx, y: snake[0].y + dir.dy };

  // Collision mur
  if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) return gameOver();
  // Collision corps
  if (snake.some(s => s.x === head.x && s.y === head.y)) return gameOver();

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    if (score > hiscore) {
      hiscore = score;
      localStorage.setItem('snake-hi', hiscore);
      hiscoreEl.textContent = hiscore;
    }
    scoreEl.textContent = score;
    placeFood();
    clearInterval(tickTimer);
    tickTimer = setInterval(tick, getSpeed());
  } else {
    snake.pop();
  }
}

function gameOver() {
  clearInterval(tickTimer);
  state = 'over';
  canvasWrap.classList.remove('running');
  // Flash rouge
  ctx.fillStyle = 'rgba(255,0,40,0.18)';
  ctx.fillRect(0, 0, SIZE, SIZE);
  setTimeout(showGameOver, 420);
}

function showGameOver() {
  oTitle.textContent        = 'GAME OVER';
  oSub.textContent          = `Score : ${score}`;
  oInfo.textContent         = `Record : ${hiscore}`;
  oInfo.style.display       = hiscore > 0 ? 'block' : 'none';
  oBtn.textContent          = '↺  REJOUER';
  overlay.style.display     = 'flex';
}

// ── Render loop ──────────────────────────────────────────────────────

function loop() {
  draw();
  if (state === 'playing') rafId = requestAnimationFrame(loop);
}

function drawBg() {
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, SIZE, SIZE);
  drawGrid();
}

function draw() {
  const t = Date.now();

  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, SIZE, SIZE);
  drawGrid();
  drawFood(t);
  drawSnake();
}

function drawGrid() {
  ctx.strokeStyle = 'rgba(57,255,20,0.04)';
  ctx.lineWidth   = 0.5;
  for (let i = 1; i < GRID; i++) {
    ctx.beginPath(); ctx.moveTo(i * CELL, 0);    ctx.lineTo(i * CELL, SIZE); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i * CELL);    ctx.lineTo(SIZE, i * CELL); ctx.stroke();
  }
}

function drawFood(t) {
  const pulse = 0.82 + 0.18 * Math.sin(t / 180);
  const fx    = food.x * CELL + CELL / 2;
  const fy    = food.y * CELL + CELL / 2;
  const r     = CELL * 0.30 * pulse;

  ctx.save();
  ctx.shadowBlur  = 20;
  ctx.shadowColor = '#ff0044';
  ctx.fillStyle   = '#ff0044';
  ctx.beginPath();
  ctx.arc(fx, fy, r, 0, Math.PI * 2);
  ctx.fill();
  // Inner highlight
  ctx.shadowBlur  = 0;
  ctx.fillStyle   = 'rgba(255,150,170,0.6)';
  ctx.beginPath();
  ctx.arc(fx - r * 0.25, fy - r * 0.25, r * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSnake() {
  const pad = 1.5;
  const w   = CELL - pad * 2;
  const r   = Math.max(2, Math.floor(CELL * 0.18));

  snake.forEach((seg, i) => {
    const x = seg.x * CELL + pad;
    const y = seg.y * CELL + pad;

    ctx.save();
    if (i === 0) {
      ctx.shadowBlur  = 20;
      ctx.shadowColor = '#39ff14';
      ctx.fillStyle   = '#39ff14';
    } else {
      const fade      = Math.max(0.25, 1 - i * 0.025);
      ctx.shadowBlur  = 7;
      ctx.shadowColor = '#39ff14';
      const g         = Math.round(160 * fade + 60);
      ctx.fillStyle   = `rgb(8, ${g}, 8)`;
    }
    roundRect(x, y, w, w, r);
    ctx.fill();
    ctx.restore();
  });
}

// ── Utilitaires ──────────────────────────────────────────────────────

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function placeFood() {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  food = pos;
}

// ── Contrôles ────────────────────────────────────────────────────────

const KEY_MAP = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  z: 'up',  Z: 'up',
  s: 'down',S: 'down',
  q: 'left',Q: 'left',
  d: 'right',D: 'right',
  w: 'up',  W: 'up',
  a: 'left',A: 'left',
};

const DIR_MAP = {
  up:    { dx: 0,  dy: -1 },
  down:  { dx: 0,  dy:  1 },
  left:  { dx: -1, dy:  0 },
  right: { dx: 1,  dy:  0 },
};

function onKey(e) {
  const d = KEY_MAP[e.key];
  if (d) {
    e.preventDefault();
    if (state !== 'playing') { startGame(); return; }
    handleDir(d);
  }
  if ((e.key === ' ' || e.key === 'Enter') && state !== 'playing') {
    e.preventDefault();
    startGame();
  }
}

function handleDir(d) {
  const nd = DIR_MAP[d];
  if (!nd) return;
  if (nd.dx !== -dir.dx || nd.dy !== -dir.dy) nextDir = nd;
}

// ── Démarrage ────────────────────────────────────────────────────────

window.addEventListener('load', init);
