
/* ════════════════════════════════════════
PARTICULES
════════════════════════════════════════ */
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function rand(min, max) { return Math.random() * (max - min) + min; }

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:     rand(0, W),
      y:     rand(0, H),
      r:     rand(0.5, 2),
      vx:    rand(-0.2, 0.2),
      vy:    rand(-0.3, -0.05),
      alpha: rand(0.2, 0.8),
    });
  }
}
initParticles();

let mouse = { x: -1000, y: -1000 };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

let rafId;
function draw() {
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(123,94,167,${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    const mx = particles[i].x - mouse.x;
    const my = particles[i].y - mouse.y;
    const md = Math.sqrt(mx * mx + my * my);
    if (md < 160) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(199,125,255,${0.3 * (1 - md / 160)})`;
      ctx.lineWidth = 0.8;
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }

    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(199,125,255,${p.alpha})`;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -5)  { p.y = H + 5; p.x = rand(0, W); }
    if (p.x < -5)  p.x = W + 5;
    if (p.x > W+5) p.x = -5;
  }

  rafId = requestAnimationFrame(draw);
}
draw();

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(rafId);
  } else {
    draw();
  }
});

/* ════════════════════════════════════════
REVEAL AU SCROLL
════════════════════════════════════════ */
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ════════════════════════════════════════
NAVBAR — FOND AU SCROLL
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

function updateNavBg() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    navbar.style.background = window.scrollY > 40
      ? 'rgba(244,243,255,0.98)'
      : 'rgba(244,243,255,0.85)';
  } else {
    navbar.style.background = window.scrollY > 40
      ? 'rgba(10,10,15,0.95)'
      : 'rgba(10,10,15,0.7)';
  }
}

window.addEventListener('scroll', updateNavBg);

/* ════════════════════════════════════════
HAMBURGER MENU MOBILE
════════════════════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const navUl     = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navUl.classList.toggle('open');
});

navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navUl.classList.remove('open');
  });
});

/* ════════════════════════════════════════
TILT SUR LES CARTES PROJET
════════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ════════════════════════════════════════
ENVOI FORMULAIRE (EmailJS)
════════════════════════════════════════ */
emailjs.init('scqTvt5tKjyeV3aAv');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendMsg() {
  const btn     = document.querySelector('#contact .btn');
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !message) {
    alert('Merci de remplir tous les champs.');
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    alert('Merci d\'entrer une adresse e-mail valide.');
    return;
  }

  const lastSent = localStorage.getItem('lastMsgSent');
  if (lastSent && Date.now() - parseInt(lastSent) < 450000) {
    alert('Merci de patienter 7 minutes 30 avant d\'envoyer un autre message.');
    return;
  }

  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  emailjs.send('service_lgydhnv', 'template_8mkxchi', {
    from_name:  name,
    name:       name,
    from_email: email,
    message:    message,
  }).then(() => {
    localStorage.setItem('lastMsgSent', Date.now());
    btn.textContent = '✓ Message envoyé !';
    btn.style.background = 'linear-gradient(135deg,#2d7a4f,#40c98a)';
    btn.style.boxShadow = '0 0 40px rgba(64,201,138,0.35)';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-message').value = '';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      btn.style.boxShadow  = '';
      btn.disabled = false;
    }, 3000);
  }).catch((err) => {
    console.error('EmailJS error:', err);
    btn.textContent = '✗ Erreur, réessaie.';
    btn.style.background = 'linear-gradient(135deg,#7a2d2d,#c94040)';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

/* ════════════════════════════════════════
MODE CLAIR / SOMBRE
════════════════════════════════════════ */
const themeBtn = document.getElementById('theme-toggle');
const root     = document.documentElement;

if (localStorage.getItem('theme') === 'light') {
  root.setAttribute('data-theme', 'light');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  root.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
  updateNavBg();
});

/* ════════════════════════════════════════
BOUTON RETOUR EN HAUT
════════════════════════════════════════ */
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

/* ════════════════════════════════════════
HALO CURSEUR
════════════════════════════════════════ */
const halo = document.createElement('div');
Object.assign(halo.style, {
  position:     'fixed',
  width:        '350px',
  height:       '350px',
  borderRadius: '50%',
  background:   'radial-gradient(circle, rgba(123,94,167,0.12) 0%, transparent 70%)',
  pointerEvents:'none',
  zIndex:       '0',
  transform:    'translate(-50%,-50%)',
  transition:   'left 0.08s, top 0.08s',
});
document.body.appendChild(halo);
window.addEventListener('mousemove', e => {
  halo.style.left = e.clientX + 'px';
  halo.style.top  = e.clientY + 'px';
});
