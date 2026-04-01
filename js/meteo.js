// ── Constantes ───────────────────────────────────────────────────────

const GEO_URL     = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const DAYS_FR   = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// ── Interprétation des codes WMO ─────────────────────────────────────

function wmo(code, isDay = 1) {
  const night = !isDay;
  if (code === 0)  return { label: 'Ciel dégagé',          emoji: night ? '🌙' : '☀️',  bg: night ? 'clear-night' : 'clear-day' };
  if (code === 1)  return { label: 'Peu nuageux',           emoji: night ? '🌙' : '🌤️', bg: night ? 'clear-night' : 'clear-day' };
  if (code === 2)  return { label: 'Partiellement nuageux', emoji: '⛅',                  bg: night ? 'cloudy-night': 'cloudy-day' };
  if (code === 3)  return { label: 'Couvert',               emoji: '☁️',                  bg: night ? 'cloudy-night': 'cloudy-day' };
  if (code <= 48)  return { label: 'Brouillard',            emoji: '🌫️',                 bg: night ? 'cloudy-night': 'cloudy-day' };
  if (code <= 55)  return { label: 'Bruine',                emoji: '🌦️',                 bg: 'rain' };
  if (code <= 65)  return { label: 'Pluie',                 emoji: '🌧️',                 bg: 'rain' };
  if (code <= 75)  return { label: 'Neige',                 emoji: '❄️',                  bg: 'snow' };
  if (code <= 82)  return { label: 'Averses',               emoji: '🌦️',                 bg: 'rain' };
  if (code <= 99)  return { label: 'Orage',                 emoji: '⛈️',                  bg: 'storm' };
  return           { label: 'Inconnu', emoji: '🌡️', bg: 'clear-day' };
}

// ── DOM ──────────────────────────────────────────────────────────────

const searchInput = document.getElementById('search');
const locateBtn   = document.getElementById('locate-btn');
const loadingEl   = document.getElementById('loading');
const errorEl     = document.getElementById('error');
const contentEl   = document.getElementById('content');

// ── Recherche ────────────────────────────────────────────────────────

async function searchCity(name) {
  const res  = await fetch(`${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=fr&format=json`);
  const data = await res.json();
  if (!data.results?.length) throw new Error(`Ville introuvable : "${name}"`);
  return data.results[0];
}

async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude:  lat,
    longitude: lon,
    current:   'temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m,precipitation,is_day',
    hourly:    'temperature_2m,weathercode,is_day',
    daily:     'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone:  'auto',
    forecast_days: 7,
    wind_speed_unit: 'kmh',
  });
  const res  = await fetch(`${WEATHER_URL}?${params}`);
  return res.json();
}

// ── Affichage ────────────────────────────────────────────────────────

function setBackground(bgKey) {
  document.body.className = `bg-${bgKey}`;
}

function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  contentEl.classList.add('hidden');
}

function showError(msg) {
  loadingEl.classList.add('hidden');
  errorEl.classList.remove('hidden');
  errorEl.textContent = '⚠️  ' + msg;
  contentEl.classList.add('hidden');
}

function showContent() {
  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  contentEl.classList.remove('hidden');
}

function render(city, weather) {
  const c       = weather.current;
  const isDay   = c.is_day;
  const w       = wmo(c.weathercode, isDay);

  setBackground(w.bg);

  // Carte principale
  document.getElementById('city-name').textContent  = city.name;
  document.getElementById('country').textContent    = city.country || '';
  document.getElementById('weather-icon').textContent = w.emoji;
  document.getElementById('main-temp').textContent  = Math.round(c.temperature_2m) + '°';
  document.getElementById('condition').textContent  = w.label;

  const todayMax = Math.round(weather.daily.temperature_2m_max[0]);
  const todayMin = Math.round(weather.daily.temperature_2m_min[0]);
  document.getElementById('temp-range').textContent = `↑ ${todayMax}°  ↓ ${todayMin}°`;

  // Détails
  document.getElementById('humidity').textContent = c.relativehumidity_2m + '%';
  document.getElementById('wind').textContent     = Math.round(c.windspeed_10m) + ' km/h';
  document.getElementById('feels').textContent    = Math.round(c.apparent_temperature) + '°';
  document.getElementById('precip').textContent   = c.precipitation + ' mm';

  // Horaire — trouver l'index de l'heure actuelle
  const now       = new Date();
  const padded    = (n) => String(n).padStart(2, '0');
  const nowStr    = `${now.getFullYear()}-${padded(now.getMonth()+1)}-${padded(now.getDate())}T${padded(now.getHours())}:00`;
  const times     = weather.hourly.time;
  let   startIdx  = times.findIndex(t => t === nowStr);
  if (startIdx < 0) startIdx = 0;

  const hourlyEl = document.getElementById('hourly');
  hourlyEl.innerHTML = '';
  for (let i = startIdx; i < Math.min(startIdx + 24, times.length); i++) {
    const time  = times[i].split('T')[1].substring(0, 5);
    const temp  = Math.round(weather.hourly.temperature_2m[i]);
    const code  = weather.hourly.weathercode[i];
    const iD    = weather.hourly.is_day[i];
    const emoji = wmo(code, iD).emoji;
    const isNow = i === startIdx;

    const card = document.createElement('div');
    card.className = 'hour-card' + (isNow ? ' now' : '');
    card.innerHTML = `
      <div class="hour-time">${isNow ? 'Maint.' : time}</div>
      <div class="hour-icon">${emoji}</div>
      <div class="hour-temp">${temp}°</div>
    `;
    hourlyEl.appendChild(card);
  }

  // 7 jours
  const dailyEl = document.getElementById('daily');
  dailyEl.innerHTML = '';
  weather.daily.time.forEach((dateStr, i) => {
    const d    = new Date(dateStr + 'T12:00:00');
    const name = i === 0 ? "Auj." : i === 1 ? "Dem." : DAYS_FR[d.getDay()];
    const max  = Math.round(weather.daily.temperature_2m_max[i]);
    const min  = Math.round(weather.daily.temperature_2m_min[i]);
    const code = weather.daily.weathercode[i];
    const emoji = wmo(code, 1).emoji;

    const row = document.createElement('div');
    row.className = 'day-row';
    row.innerHTML = `
      <span class="day-name">${name}</span>
      <span class="day-icon">${emoji}</span>
      <span class="day-range">
        <span class="day-max">${max}°</span>
        <span class="day-min">${min}°</span>
      </span>
    `;
    dailyEl.appendChild(row);
  });

  showContent();
}

// ── Chargement principal ─────────────────────────────────────────────

async function loadCity(name) {
  showLoading();
  try {
    const city    = await searchCity(name);
    const weather = await fetchWeather(city.latitude, city.longitude);
    render(city, weather);
  } catch (e) {
    showError(e.message);
  }
}

async function loadCoords(lat, lon, label = 'Ma position') {
  showLoading();
  try {
    const weather = await fetchWeather(lat, lon);
    render({ name: label, country: '' }, weather);
  } catch (e) {
    showError(e.message);
  }
}

// ── Événements ───────────────────────────────────────────────────────

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && searchInput.value.trim()) {
    loadCity(searchInput.value.trim());
    searchInput.blur();
  }
});

locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return showError('Géolocalisation non supportée.');
  locateBtn.textContent = '⏳';
  navigator.geolocation.getCurrentPosition(
    pos => {
      locateBtn.textContent = '📍';
      loadCoords(pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      locateBtn.textContent = '📍';
      showError('Impossible d\'obtenir la position.');
    }
  );
});

// ── Démarrage : Paris par défaut ─────────────────────────────────────
loadCity('Paris');
