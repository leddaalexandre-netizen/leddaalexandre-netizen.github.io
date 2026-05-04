/* ── Données des projets ── */
const PROJECTS = [
{
id: 0,
tag: 'Jeu',
emoji: '🐍',
title: 'Snake',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Le classique Snake recréé en HTML5 Canvas. Design neon arcade rétro, vitesse progressive, gestion du record en local, contrôles clavier (flèches / ZQSD) et boutons tactiles sur mobile.',
stack: ['HTML', 'Canvas API', 'CSS', 'JavaScript'],
features: [
  'Moteur de jeu sur Canvas avec boucle requestAnimationFrame',
  'Vitesse qui augmente tous les 3 points mangés',
  'Record sauvegardé en localStorage',
  'Contrôles clavier : flèches + ZQSD + WASD',
  'Boutons directionnels pour mobile / tactile',
],
link: 'snake.html',
},
{
id: 1,
tag: 'Jeu',
emoji: '🧠',
title: 'Quiz Mix',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Quiz interactif mêlant trois thèmes : NSI, ski et culture générale. 10 questions à choix multiples avec retour immédiat sur les réponses, score en direct et écran de résultat personnalisé.',
stack: ['HTML', 'CSS', 'JavaScript'],
features: [
  '10 questions sur 3 thèmes : NSI, ski et culture générale',
  '4 réponses colorées par question (A, B, C, D)',
  'Feedback immédiat : bonne réponse mise en valeur, mauvaise grisée',
  'Score mis à jour en temps réel',
  'Écran de résultat avec message selon le score',
],
link: 'quiz.html',
},
{
id: 2,
tag: 'Outil',
emoji: '⏱️',
title: 'Chronomètre',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Chronomètre précis au centième de seconde avec gestion des tours. Interface inspirée des montres sportives : anneau de progression animé, affichage digital et historique des tours.',
stack: ['HTML', 'CSS', 'JavaScript'],
features: [
  'Précision au centième de seconde via requestAnimationFrame',
  'Anneau de progression animé (cycle de 60 secondes)',
  'Gestion des tours avec temps par tour et temps total',
  'Boutons Start / Pause / Reprise / Reset',
  'Historique des tours scrollable',
],
link: 'chrono.html',
},
{
id: 3,
tag: 'Outil',
emoji: '📐',
title: 'Convertisseur d\'unités',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Convertisseur d\'unités multi-catégories avec conversion instantanée. Six catégories disponibles : longueur, masse, température, vitesse, surface et volume. Clic sur un résultat pour le copier.',
stack: ['HTML', 'CSS', 'JavaScript'],
features: [
  '6 catégories : longueur, masse, température, vitesse, surface, volume',
  'Conversion instantanée à chaque frappe',
  'Sélection de l\'unité source par onglets',
  'Clic sur un résultat pour copier la valeur',
  'Gestion des grands et petits nombres en notation scientifique',
],
link: 'converter.html',
},
{
id: 4,
tag: 'Outil',
emoji: '🎨',
title: 'Générateur de palettes',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Outil web pour générer des palettes de couleurs harmonieuses à partir d\'une couleur de base. Cinq modes de génération disponibles, affichage HEX et RGB, et export direct en variables CSS.',
stack: ['HTML', 'CSS', 'JavaScript'],
features: [
'Sélecteur de couleur interactif (color picker + saisie hex manuelle)',
'5 modes : monochromatique, analogue, complémentaire, triadique, tétradique',
'Affichage HEX et RGB pour chaque couleur générée',
'Copie en un clic pour chaque couleur individuelle',
'Export de la palette complète en variables CSS',
],
link: 'palette-generator.html',
},
{
id: 5,
tag: 'Dashboard',
emoji: '🌤️',
title: 'Dashboard Météo',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Dashboard météo avec données réelles via l\'API Open-Meteo (sans clé API). Recherche de ville, géolocalisation, prévisions heure par heure et sur 7 jours. Le fond change selon la météo.',
stack: ['HTML', 'CSS', 'JavaScript', 'Open-Meteo API'],
features: [
  'Données réelles via Open-Meteo (gratuit, sans clé API)',
  'Recherche de n\'importe quelle ville dans le monde',
  'Bouton de géolocalisation automatique',
  'Prévisions heure par heure (24h) et sur 7 jours',
  'Fond dynamique qui change selon la météo et l\'heure',
],
link: 'meteo.html',
},
{
id: 6,
tag: 'Scolaire',
emoji: '🌐',
title: 'Projet Web NSI',
year: '2025',
status: 'Terminé',
role: 'Élève — Spécialité NSI',
description: 'Mon premier projet web réalisé en classe de terminale dans le cadre de la spécialité NSI. Il explore le fonctionnement d\'internet, du web, des réseaux sociaux, et contient des drapeaux dessinés en SVG.',
stack: ['HTML', 'CSS', 'SVG'],
features: [
'Page sur le fonctionnement d\'internet',
'Page sur le web et ses technologies',
'Drapeaux dessinés entièrement en SVG',
'Exposé sur les réseaux sociaux',
'Carnet de bord du projet',
],
link: 'projet-nsi/index.html',
},
{
id: 7,
tag: 'Python',
emoji: '💼',
title: 'Calculateur TJM',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Application web Flask pour calculer son Taux Journalier Moyen en freelance. Cinq statuts juridiques (AE BIC/BNC, SASU, EURL, Portage), sliders interactifs, graphique de répartition du CA et alertes automatiques.',
stack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
features: [
  'Calcul du TJM selon 5 statuts juridiques (AE BIC, AE BNC, SASU, EURL, Portage)',
  'Sliders pour congés, jours fériés, jours non facturables et marge commerciale',
  'Résultats en temps réel : TJM, taux horaire, demi-journée, CA annuel/mensuel',
  'Graphique de répartition du CA (salaire, charges, frais, marge)',
  'Alertes automatiques (plafond AE, TJM élevé, peu de jours facturables)',
  'Bouton copier le TJM',
],
link: 'tjm.html',
},
{
id: 8,
tag: 'JS',
emoji: '🤖',
title: 'Chatbot Portfolio',
year: '2026',
status: 'Terminé',
role: 'Créateur & Développeur',
description: 'Assistant conversationnel intégré au portfolio. Répond aux questions sur Alexandre, ses projets et ses compétences grâce à un moteur de correspondance par mots-clés.',
stack: ['HTML', 'CSS', 'JavaScript'],
features: [
  'Moteur de réponse par mots-clés avec score de pertinence',
  'Base de connaissances sur les projets, compétences et contact',
  'Interface chat style messagerie avec bulles animées',
  'Indicateur de frappe (typing indicator)',
  'Boutons de suggestions pour démarrer la conversation',
  'Normalisation des accents pour une meilleure détection',
],
link: 'chatbot.html',
},
];

/* ── Rendu ── */
const params  = new URLSearchParams(window.location.search);
const id      = parseInt(params.get('id'), 10);
const project = PROJECTS[id];
const main    = document.getElementById('main-content');
const BASE    = window.location.pathname.includes('/pages/') ? '../' : './';

if (!project) {
main.innerHTML = `
<div style="text-align:center;padding:4rem 0;">
<p style="font-size:4rem;font-weight:700;margin-bottom:0.5rem;">404</p>
<h1 style="font-size:2rem;margin-bottom:0.75rem;">Projet introuvable</h1>
<p style="opacity:0.6;margin-bottom:2rem;">Ce projet n'existe pas ou a été déplacé.</p>
<a href="${BASE}index.html#projects" class="btn">← Retour aux projets</a>
</div>`;
} else {
document.title = project.title + ' — Alexandre LEDDA';
const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) metaDesc.setAttribute('content', project.description.slice(0, 160));

const techHTML = project.stack.map(t => `<span class="tech-badge">${t}</span>`).join('');
const featHTML = project.features.map(f => `<li>${f}</li>`).join('');

main.innerHTML = `
<span class="project-tag">${project.tag}</span>
<h1>${project.title}</h1>

<div class="project-meta">
<div class="meta-item">
<span class="meta-label">Année</span>
<span class="meta-value">${project.year}</span>
</div>
<div class="meta-item">
<span class="meta-label">Statut</span>
<span class="meta-value">${project.status}</span>
</div>
<div class="meta-item">
<span class="meta-label">Rôle</span>
<span class="meta-value">${project.role}</span>
</div>
</div>

<div class="project-banner">${project.emoji}</div>

<div class="section-block">
<h2>À propos du projet</h2>
<p>${project.description}</p>
</div>

<div class="section-block">
<h2>Stack technique</h2>
<div class="tech-list">${techHTML}</div>
</div>

<div class="section-block">
<h2>Fonctionnalités clés</h2>
<ul class="feature-list">${featHTML}</ul>
</div>

<div class="project-footer">
<a href="${BASE}index.html#projects" class="btn btn-ghost">← Retour aux projets</a>
<div class="project-nav">
  ${id > 0 ? `<a href="project.html?id=${id - 1}" class="btn btn-ghost">← Précédent</a>` : ''}
  ${id < PROJECTS.length - 1 ? `<a href="project.html?id=${id + 1}" class="btn btn-ghost">Suivant →</a>` : ''}
</div>
${project.link ? `<a href="${project.link}" class="btn">Voir le site →</a>` : `<a href="${BASE}index.html#contact" class="btn">Me contacter</a>`}
</div>
`;
}

/* ── Particules ── */
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', () => { resize(); init(); });

function rand(a, b) { return Math.random() * (b - a) + a; }

function init() {
particles = [];
const n = Math.floor((W * H) / 14000);
for (let i = 0; i < n; i++)
particles.push({ x: rand(0,W), y: rand(0,H), r: rand(0.5,2), vx: rand(-0.15,0.15), vy: rand(-0.25,-0.05), a: rand(0.2,0.7) });
}
init();

let mouse = { x: -999, y: -999 };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

let rafId;
function draw() {
  ctx.clearRect(0,0,W,H);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    for (let j = i+1; j < particles.length; j++) {
      const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if (d < 110) { ctx.beginPath(); ctx.strokeStyle=`rgba(123,94,167,${0.12*(1-d/110)})`; ctx.lineWidth=0.5; ctx.moveTo(p.x,p.y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); }
    }
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(199,125,255,${p.a})`; ctx.fill();
    p.x+=p.vx; p.y+=p.vy;
    if (p.y<-5){p.y=H+5;p.x=rand(0,W);} if(p.x<-5)p.x=W+5; if(p.x>W+5)p.x=-5;
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

/* ── Halo souris ── */
const halo = document.getElementById('halo');
window.addEventListener('mousemove', e => { halo.style.left = e.clientX+'px'; halo.style.top = e.clientY+'px'; });

/* ── Thème clair / sombre ── */
const themeBtn2 = document.getElementById('theme-toggle');
const root2     = document.documentElement;
if (localStorage.getItem('theme') === 'light') {
  root2.setAttribute('data-theme', 'light');
  themeBtn2.textContent = '☀️';
}
themeBtn2.addEventListener('click', () => {
  const isLight = root2.getAttribute('data-theme') === 'light';
  root2.setAttribute('data-theme', isLight ? 'dark' : 'light');
  themeBtn2.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
});
