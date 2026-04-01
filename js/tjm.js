// ── Données statuts ──────────────────────────────────────────────────

const STATUTS = {
  ae_bic:  { label: 'Auto-entrepreneur — BIC (Services)', taux: 0.226, seuil: 77700 },
  ae_bnc:  { label: 'Auto-entrepreneur — BNC (Libéral)',  taux: 0.222, seuil: 77700 },
  sasu:    { label: 'SASU',                               taux: 0.47,  seuil: null  },
  eurl:    { label: 'EURL / SARL',                       taux: 0.42,  seuil: null  },
  portage: { label: 'Portage salarial',                   taux: 0.52,  seuil: null  },
};

// ── DOM ──────────────────────────────────────────────────────────────

const salaireInput  = document.getElementById('salaire');
const statutSelect  = document.getElementById('statut');
const fraisInput    = document.getElementById('frais');
const congesRange   = document.getElementById('conges');
const feriesRange   = document.getElementById('feries');
const nfRange       = document.getElementById('non-facturables');
const margeRange    = document.getElementById('marge');

const valConges     = document.getElementById('val-conges');
const valFeries     = document.getElementById('val-feries');
const valNf         = document.getElementById('val-nf');
const valMarge      = document.getElementById('val-marge');

const tjmDisplay    = document.getElementById('tjm-display');
const tauxHoraireEl = document.getElementById('taux-horaire');
const demiJourneeEl = document.getElementById('demi-journee');
const caMensuelEl   = document.getElementById('ca-mensuel');
const caAnnuelEl    = document.getElementById('ca-annuel');
const joursFactEl   = document.getElementById('jours-fact');
const tjmBaseEl     = document.getElementById('tjm-base');
const warningsBox   = document.getElementById('warnings-box');
const statutInfo    = document.getElementById('statut-info');
const copyBtn       = document.getElementById('copy-btn');

// ── Sliders ───────────────────────────────────────────────────────────

congesRange.addEventListener('input', () => { valConges.textContent = congesRange.value; recalculate(); });
feriesRange.addEventListener('input', () => { valFeries.textContent = feriesRange.value; recalculate(); });
nfRange.addEventListener('input',     () => { valNf.textContent     = nfRange.value;     recalculate(); });
margeRange.addEventListener('input',  () => { valMarge.textContent  = margeRange.value;  recalculate(); });

salaireInput.addEventListener('input', recalculate);
statutSelect.addEventListener('change', recalculate);
fraisInput.addEventListener('input', recalculate);

// ── Formatage ────────────────────────────────────────────────────────

function fmt(val) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(val);
}

// ── Animation ────────────────────────────────────────────────────────

function animateNumber(el, newVal, formatter) {
  const oldVal = parseFloat(el.dataset.raw) || 0;
  el.dataset.raw = newVal;
  const start = performance.now();
  const dur   = 400;
  function step(now) {
    const t    = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = formatter(oldVal + (newVal - oldVal) * ease);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = formatter(newVal);
  }
  requestAnimationFrame(step);
}

// ── Calcul ───────────────────────────────────────────────────────────

let currentTJM = 0;

function recalculate() {
  const salaireMensuel  = parseFloat(salaireInput.value)  || 0;
  const statutKey       = statutSelect.value;
  const fraisAnnuels    = parseFloat(fraisInput.value)    || 0;
  const conges          = parseInt(congesRange.value);
  const feries          = parseInt(feriesRange.value);
  const nonFact         = parseInt(nfRange.value);
  const margePct        = parseFloat(margeRange.value);

  const statut = STATUTS[statutKey];
  const taux   = statut.taux;

  // Jours facturables
  const joursFacturables = Math.max(365 - 104 - feries - conges - nonFact, 1);

  // CA nécessaire
  const salaireAnnuel = salaireMensuel * 12;
  const caBase        = (salaireAnnuel + fraisAnnuels) / (1 - taux);
  const caAvecMarge   = caBase * (1 + margePct / 100);

  // TJM
  const tjm          = caAvecMarge / joursFacturables;
  const tjmBase      = caBase / joursFacturables;
  const tauxHoraire  = tjm / 7.5;
  const demiJournee  = tjm / 2;
  const caMensuel    = caAvecMarge / 12;

  currentTJM = tjm;

  // Affichage
  animateNumber(tjmDisplay,    tjm,         v => fmt(v) + ' / j');
  animateNumber(tauxHoraireEl, tauxHoraire, fmt);
  animateNumber(demiJourneeEl, demiJournee, fmt);
  animateNumber(caMensuelEl,   caMensuel,   fmt);
  animateNumber(caAnnuelEl,    caAvecMarge, fmt);
  joursFactEl.textContent = joursFacturables + ' j';
  animateNumber(tjmBaseEl,     tjmBase,     v => fmt(v) + ' / j');

  // Graphique
  const charges    = caBase * taux;
  const margeEuros = caAvecMarge - caBase;
  const total      = salaireAnnuel + charges + fraisAnnuels + margeEuros;
  if (total > 0) {
    document.getElementById('seg-salaire').style.width = (salaireAnnuel / total * 100).toFixed(1) + '%';
    document.getElementById('seg-charges').style.width = (charges       / total * 100).toFixed(1) + '%';
    document.getElementById('seg-frais').style.width   = (fraisAnnuels  / total * 100).toFixed(1) + '%';
    document.getElementById('seg-marge').style.width   = (margeEuros    / total * 100).toFixed(1) + '%';
  }

  // Alertes
  const warnings = [];
  if (statut.seuil && caAvecMarge > statut.seuil) {
    warnings.push(`⚠️ Votre CA prévisionnel (${fmt(caAvecMarge)}) dépasse le plafond AE (${fmt(statut.seuil)}). Pensez à changer de statut.`);
  }
  if (joursFacturables < 100) {
    warnings.push(`⚠️ Seulement ${joursFacturables} jours facturables — votre TJM sera très élevé.`);
  }
  if (tjm > 2000) {
    warnings.push('⚠️ TJM > 2 000 € : assurez-vous que ce tarif est cohérent avec votre marché.');
  }

  if (warnings.length > 0) {
    warningsBox.classList.remove('hidden');
    warningsBox.innerHTML = warnings.map(w => `<div class="warning-item">${w}</div>`).join('');
  } else {
    warningsBox.classList.add('hidden');
    warningsBox.innerHTML = '';
  }

  statutInfo.textContent = 'Calcul basé sur : ' + statut.label;
}

// ── Copier ────────────────────────────────────────────────────────────

copyBtn.addEventListener('click', () => {
  if (!currentTJM) return;
  navigator.clipboard.writeText(Math.round(currentTJM).toString()).then(() => {
    copyBtn.textContent = '✅ Copié !';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = '📋 Copier';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
});

// ── Init ─────────────────────────────────────────────────────────────
recalculate();
