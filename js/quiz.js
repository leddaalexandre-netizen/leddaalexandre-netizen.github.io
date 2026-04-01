// ── Questions ────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    category: 'NSI',
    question: "Que signifie l'acronyme HTML ?",
    answers: ['HighText Machine Language', 'HyperText Markup Language', 'Hyper Transfer Markup Language', 'HyperText Machine Link'],
    correct: 1,
  },
  {
    category: 'Culture',
    question: "En quelle année l'Homme a-t-il marché sur la Lune pour la première fois ?",
    answers: ['1972', '1961', '1965', '1969'],
    correct: 3,
  },
  {
    category: 'Ski',
    question: "Quelle discipline de ski alpin est la plus rapide ?",
    answers: ['Descente', 'Slalom', 'Super-G', 'Slalom géant'],
    correct: 0,
  },
  {
    category: 'NSI',
    question: "En Python, quelle fonction permet d'afficher du texte dans la console ?",
    answers: ['echo()', 'display()', 'print()', 'write()'],
    correct: 2,
  },
  {
    category: 'Culture',
    question: "Combien de continents y a-t-il sur Terre ?",
    answers: ['5', '8', '6', '7'],
    correct: 3,
  },
  {
    category: 'NSI',
    question: "Combien de bits contient un octet ?",
    answers: ['4', '8', '16', '2'],
    correct: 1,
  },
  {
    category: 'Ski',
    question: "En ski alpin, quelle couleur correspond aux pistes les plus difficiles ?",
    answers: ['Rouge', 'Verte', 'Noire', 'Bleue'],
    correct: 2,
  },
  {
    category: 'Culture',
    question: "Quel est le pays le plus grand du monde en superficie ?",
    answers: ['Canada', 'Russie', 'États-Unis', 'Chine'],
    correct: 1,
  },
  {
    category: 'NSI',
    question: "Quel protocole est utilisé pour envoyer des e-mails ?",
    answers: ['SMTP', 'HTTP', 'FTP', 'SSH'],
    correct: 0,
  },
  {
    category: 'Culture',
    question: "Combien de joueurs composent une équipe de football sur le terrain ?",
    answers: ['10', '9', '11', '12'],
    correct: 2,
  },
];

// ── État ─────────────────────────────────────────────────────────────

let current  = 0;
let score    = 0;
let answered = false;

// ── DOM ──────────────────────────────────────────────────────────────

const progressFill  = document.getElementById('progress-fill');
const badgeEl       = document.getElementById('badge');
const counterEl     = document.getElementById('counter');
const scoreEl       = document.getElementById('score-display');
const questionEl    = document.getElementById('question');
const answersEl     = document.getElementById('answers');
const nextBtn       = document.getElementById('next-btn');

// ── Navigation entre écrans ──────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Rendu d'une question ─────────────────────────────────────────────

const BADGE_CLASS = { NSI: 'badge-nsi', Ski: 'badge-ski', Culture: 'badge-culture' };
const LETTERS = ['A', 'B', 'C', 'D'];

function renderQuestion() {
  answered = false;
  nextBtn.classList.add('hidden');
  nextBtn.textContent = 'Question suivante →';

  const q = QUESTIONS[current];

  progressFill.style.width = (current / QUESTIONS.length * 100) + '%';
  counterEl.textContent = `${current + 1} / ${QUESTIONS.length}`;
  scoreEl.textContent = score + ' pt' + (score > 1 ? 's' : '');

  badgeEl.className = 'badge ' + BADGE_CLASS[q.category];
  badgeEl.textContent = q.category;
  questionEl.textContent = q.question;

  answersEl.innerHTML = q.answers.map((ans, i) => `
    <button class="answer-btn" data-index="${i}">
      <span class="answer-letter">${LETTERS[i]}</span>${ans}
    </button>
  `).join('');

  // Animation d'entrée
  [questionEl, answersEl].forEach(el => {
    el.classList.remove('slide-in');
    void el.offsetWidth;
    el.classList.add('slide-in');
  });

  answersEl.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => onAnswer(parseInt(btn.dataset.index)));
  });
}

// ── Réponse ──────────────────────────────────────────────────────────

function onAnswer(index) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[current];
  const buttons = answersEl.querySelectorAll('.answer-btn');
  buttons.forEach(b => b.disabled = true);

  if (index === q.correct) {
    score++;
    buttons[index].classList.add('correct');
  } else {
    buttons[index].classList.add('wrong', 'shake');
    buttons[q.correct].classList.add('reveal');
  }

  scoreEl.textContent = score + ' pt' + (score > 1 ? 's' : '');

  if (current === QUESTIONS.length - 1) {
    nextBtn.textContent = 'Voir mes résultats →';
  }
  nextBtn.classList.remove('hidden');
}

// ── Suivant ──────────────────────────────────────────────────────────

nextBtn.addEventListener('click', () => {
  current++;
  if (current < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResults();
  }
});

// ── Résultats ────────────────────────────────────────────────────────

function showResults() {
  progressFill.style.width = '100%';
  showScreen('result-screen');

  const pct = score / QUESTIONS.length;
  let emoji, msg;

  if (pct === 1)      { emoji = '🏆'; msg = 'Score parfait ! Tu maîtrises les trois thèmes à la perfection.'; }
  else if (pct >= 0.7){ emoji = '🎉'; msg = 'Très bon résultat ! Encore un petit effort pour le perfect.'; }
  else if (pct >= 0.5){ emoji = '😊'; msg = 'Pas mal du tout ! Tu peux encore progresser.'; }
  else                { emoji = '💪'; msg = "Il y a de la marge ! Tente à nouveau pour t'améliorer."; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-score').textContent = score + ' / ' + QUESTIONS.length;
  document.getElementById('result-msg').textContent = msg;
}

// ── Démarrer / Rejouer ───────────────────────────────────────────────

document.getElementById('start-btn').addEventListener('click', () => {
  showScreen('question-screen');
  renderQuestion();
});

document.getElementById('replay-btn').addEventListener('click', () => {
  current = 0;
  score   = 0;
  showScreen('question-screen');
  renderQuestion();
});
