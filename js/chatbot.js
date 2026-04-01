// ── Base de connaissances ─────────────────────────────────────────────

const KB = [
  {
    tags: ['bonjour', 'salut', 'coucou', 'hello', 'hey', 'bonsoir', 'yo'],
    responses: [
      'Salut ! 👋 Je suis l\'assistant d\'Alexandre. Pose-moi n\'importe quelle question sur lui, ses projets ou ses compétences !',
      'Coucou ! Qu\'est-ce que je peux te dire sur Alexandre ? 😊',
      'Hey ! Je suis là pour te parler d\'Alexandre. Par quoi tu veux commencer ?',
    ],
  },
  {
    tags: ['qui', 'présente', 'toi', 'alexandre', 'about', 'propos', 'prénom', 'ledda'],
    responses: [
      'Je suis Alexandre LEDDA 👋 — moniteur de ski le jour, développeur la nuit.\n\nJ\'ai un bac général avec les spécialités Maths, NSI et AMC. Ce portfolio, c\'est mon terrain d\'entraînement où j\'expérimente et j\'apprends.',
      'Alexandre LEDDA, passionné de ski et de code 🎿💻 — j\'apprends à construire des interfaces aussi fluides que les pistes.',
    ],
  },
  {
    tags: ['projet', 'projets', 'réalisations', 'travaux', 'portfolio', 'fait', 'créé', 'développé'],
    responses: [
      'Voici mes projets actuels 🚀\n\n🐍 <b>Snake</b> — le classique en HTML5 Canvas\n🧠 <b>Quiz Mix</b> — quiz NSI, ski et culture générale\n⏱️ <b>Chronomètre</b> — précis au centième de seconde\n📐 <b>Convertisseur d\'unités</b> — 6 catégories\n🎨 <b>Générateur de palettes</b> — 5 modes harmoniques\n🌤️ <b>Dashboard Météo</b> — données réelles Open-Meteo\n💼 <b>Calculateur TJM</b> — pour freelances\n\nDis-moi lequel t\'intéresse !',
    ],
  },
  {
    tags: ['snake', 'serpent', 'jeu', 'canvas'],
    responses: [
      '🐍 <b>Snake</b> est un jeu arcade recréé en HTML5 Canvas.\n\nDesign neon rétro, vitesse progressive, record en localStorage, contrôles clavier (flèches / ZQSD / WASD) et boutons tactiles pour mobile.',
    ],
  },
  {
    tags: ['quiz', 'qcm', 'questions', 'culture', 'nsi'],
    responses: [
      '🧠 <b>Quiz Mix</b> mêle trois thèmes : NSI, ski et culture générale.\n\n10 questions à choix multiples, feedback immédiat, score en direct et écran de résultat personnalisé selon tes points.',
    ],
  },
  {
    tags: ['chrono', 'chronomètre', 'temps', 'tour', 'secondes'],
    responses: [
      '⏱️ <b>Chronomètre</b> précis au centième de seconde.\n\nAnneau de progression animé (style montre sportive), gestion des tours avec temps par tour et total, historique scrollable.',
    ],
  },
  {
    tags: ['convertisseur', 'unité', 'unités', 'conversion', 'longueur', 'masse', 'température'],
    responses: [
      '📐 <b>Convertisseur d\'unités</b> avec 6 catégories.\n\nLongueur, masse, température, vitesse, surface et volume. Conversion instantanée à chaque frappe, clic pour copier le résultat.',
    ],
  },
  {
    tags: ['palette', 'couleur', 'couleurs', 'générateur', 'design'],
    responses: [
      '🎨 <b>Générateur de palettes</b> avec 5 modes harmoniques.\n\nMonochromatique, analogue, complémentaire, triadique, tétradique. Affichage HEX/RGB et export en variables CSS.',
    ],
  },
  {
    tags: ['météo', 'meteo', 'weather', 'temps', 'dashboard', 'open-meteo', 'prévisions'],
    responses: [
      '🌤️ <b>Dashboard Météo</b> avec données réelles via Open-Meteo.\n\nRecherche de ville, géolocalisation, prévisions heure par heure (24h) et sur 7 jours. Le fond change selon la météo et l\'heure.',
    ],
  },
  {
    tags: ['tjm', 'freelance', 'calculateur', 'taux journalier', 'tarif'],
    responses: [
      '💼 <b>Calculateur TJM</b> pour freelances.\n\n5 statuts juridiques (AE BIC/BNC, SASU, EURL, Portage), sliders pour les jours non travaillés et la marge, graphique de répartition du CA, alertes automatiques.',
    ],
  },
  {
    tags: ['compétence', 'compétences', 'skill', 'skills', 'technologie', 'langages', 'maîtrise', 'sait'],
    responses: [
      'Mes compétences actuelles 💡\n\n🌐 HTML / CSS\n⚡ JavaScript\n⚛️ React\n🟢 Node.js\n🐍 Python\n🗄️ SQL\n🎨 UI Design\n🐙 Git\n\nEncore beaucoup à apprendre, mais je progresse vite !',
    ],
  },
  {
    tags: ['html', 'css', 'javascript', 'js'],
    responses: [
      'HTML, CSS et JavaScript sont mes langages principaux 🌐 — ce portfolio et tous mes projets sont construits avec eux.',
    ],
  },
  {
    tags: ['python', 'flask'],
    responses: [
      'J\'apprends Python 🐍 — j\'ai notamment construit le calculateur TJM avec Flask. C\'est un langage que j\'aime beaucoup pour sa simplicité.',
    ],
  },
  {
    tags: ['react'],
    responses: [
      'Je découvre React ⚛️ — je n\'ai pas encore de projet public avec, mais c\'est clairement la prochaine étape !',
    ],
  },
  {
    tags: ['ski', 'moniteur', 'montagne', 'neige', 'piste'],
    responses: [
      'Moniteur de ski 🎿 — c\'est mon autre passion ! J\'enseigne le ski et ça m\'apprend la pédagogie, la patience et à expliquer des choses complexes simplement. Utile aussi pour le dev 😄',
    ],
  },
  {
    tags: ['contact', 'contacter', 'email', 'mail', 'écrire', 'message', 'joindre'],
    responses: [
      'Tu peux me contacter par email 📬\n\n✉️ <a href="mailto:leddaalexandre@gmail.com">leddaalexandre@gmail.com</a>\n\nOu via le formulaire de contact sur la page d\'accueil du portfolio !',
    ],
  },
  {
    tags: ['github', 'git', 'code source', 'repo', 'dépôt'],
    responses: [
      'Je versionne mes projets avec Git 🐙 — demande-moi mon GitHub si tu veux voir le code source de mes projets !',
    ],
  },
  {
    tags: ['bac', 'lycée', 'études', 'formation', 'diplôme', 'scolaire'],
    responses: [
      'J\'ai un bac général 🎓 avec les spécialités :\n\n📐 Mathématiques\n💻 NSI (Numérique et Sciences Informatiques)\n🎭 AMC (Arts, Musique, Cinéma)\n\nLa NSI m\'a vraiment lancé dans le développement web !',
    ],
  },
  {
    tags: ['age', 'âge', 'ans', 'vieux'],
    responses: [
      'Je préfère garder ça pour moi 😄 — mais je suis lycéen/jeune développeur en train de construire ses premiers vrais projets !',
    ],
  },
  {
    tags: ['merci', 'super', 'cool', 'top', 'génial', 'parfait', 'nickel'],
    responses: [
      'Avec plaisir ! 😊 N\'hésite pas si tu as d\'autres questions.',
      'Merci ! 🙌 C\'est toujours sympa d\'avoir des retours.',
      'Super ! Autre chose que je peux faire pour toi ? 😄',
    ],
  },
  {
    tags: ['au revoir', 'bye', 'ciao', 'à bientôt', 'bonne journée', 'bonne soirée'],
    responses: [
      'À bientôt ! 👋 N\'hésite pas à revenir.',
      'Bonne journée ! 🙂',
      'Ciao ! Merci de ta visite 😊',
    ],
  },
];

// ── Logique du bot ────────────────────────────────────────────────────

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // retire les accents
    .replace(/[^a-z0-9\s]/g, ' ');
}

function findResponse(input) {
  const norm  = normalize(input);
  const words = norm.split(/\s+/);

  let best = null;
  let bestScore = 0;

  for (const entry of KB) {
    let score = 0;
    for (const tag of entry.tags) {
      if (norm.includes(normalize(tag))) score += 2;
      else if (words.some(w => normalize(tag).includes(w) && w.length > 2)) score += 1;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }

  if (best && bestScore > 0) {
    const r = best.responses;
    return r[Math.floor(Math.random() * r.length)];
  }

  // Fallback
  const fallbacks = [
    'Hmm, je ne suis pas sûr de comprendre 🤔 Essaie de me demander quelque chose sur mes projets, mes compétences ou comment me contacter !',
    'Je n\'ai pas la réponse à ça 😅 Pose-moi une question sur Alexandre, ses projets ou ses compétences !',
    'Cette question me dépasse un peu 😄 — demande-moi plutôt des infos sur les projets ou comment contacter Alexandre !',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ── DOM ───────────────────────────────────────────────────────────────

const messagesEl = document.getElementById('messages');
const inputEl    = document.getElementById('user-input');
const sendBtn    = document.getElementById('send-btn');
const suggsEl    = document.getElementById('suggestions');

function scrollBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function addMessage(text, from) {
  const row = document.createElement('div');
  row.className = `msg-row ${from}`;

  if (from === 'bot') {
    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = 'A';
    row.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  // Messages utilisateur : échapper le HTML pour éviter toute injection
  // Messages bot : le contenu vient de la KB hardcodée, l'HTML est intentionnel
  if (from === 'user') {
    bubble.innerHTML = escapeHTML(text).replace(/\n/g, '<br>');
  } else {
    bubble.innerHTML = text.replace(/\n/g, '<br>');
  }
  row.appendChild(bubble);

  messagesEl.appendChild(row);
  scrollBottom();
}

function showTyping() {
  const row = document.createElement('div');
  row.className = 'msg-row bot typing';
  row.id = 'typing-indicator';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = 'A';
  row.appendChild(avatar);

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  row.appendChild(bubble);

  messagesEl.appendChild(row);
  scrollBottom();
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function sendMessage(text) {
  const msg = text.trim();
  if (!msg) return;

  addMessage(msg, 'user');
  inputEl.value = '';
  suggsEl.style.display = 'none';

  showTyping();
  const delay = 600 + Math.random() * 600;
  setTimeout(() => {
    hideTyping();
    addMessage(findResponse(msg), 'bot');
  }, delay);
}

// ── Événements ────────────────────────────────────────────────────────

sendBtn.addEventListener('click', () => sendMessage(inputEl.value));

inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage(inputEl.value);
});

suggsEl.querySelectorAll('.suggestion-btn').forEach(btn => {
  btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
});

// ── Message d'accueil ─────────────────────────────────────────────────

setTimeout(() => {
  addMessage('Salut ! 👋 Je suis l\'assistant d\'Alexandre.\nPose-moi une question sur lui, ses projets, ses compétences ou comment le contacter !', 'bot');
}, 400);
