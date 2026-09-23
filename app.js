let hexagramsData = [];
let currentLines = []; // Memorizza i valori dei lanci (es. [7, 8, 9, 6, 7, 8])

// Caricamento dati JSON
async function loadHexagrams() {
  try {
    const response = await fetch('iching_data.json');
    hexagramsData = await response.json();
    renderBrowseGrid(hexagramsData);
  } catch (error) {
    console.error('Errore nel caricamento del JSON:', error);
  }
}

// Gestione Navigazione Tab
document.getElementById('btn-oracle').addEventListener('click', (e) => switchTab('oracle', e.target));
document.getElementById('btn-browse').addEventListener('click', (e) => switchTab('browse', e.target));

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(el => el.classList.remove('active'));
  document.getElementById(`section-${tab}`).classList.add('active');
  btn.classList.add('active');
}

// Simula il lancio di 3 monete
document.getElementById('btn-cast').addEventListener('click', () => {
  if (currentLines.length >= 6) return;

  // 3 monete: ciascuna può essere 2 (croce) o 3 (testa)
  const coin1 = Math.random() < 0.5 ? 2 : 3;
  const coin2 = Math.random() < 0.5 ? 2 : 3;
  const coin3 = Math.random() < 0.5 ? 2 : 3;
  const sum = coin1 + coin2 + coin3;

  currentLines.push(sum); // Aggiunge la linea dal basso verso l'alto
  renderCurrentLines();

  if (currentLines.length === 6) {
    processOracleResult();
  }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  currentLines = [];
  document.getElementById('hexagram-building').innerHTML = '';
  document.getElementById('oracle-result').innerHTML = '';
  document.getElementById('coin-results').innerHTML = '';
  document.getElementById('btn-cast').disabled = false;
});

// Rendering delle linee lanciate
function renderCurrentLines() {
  const container = document.getElementById('hexagram-building');
  container.innerHTML = '';

  // Rendering invertito per mostrare la prima linea in basso
  [...currentLines].reverse().forEach((val) => {
    const lineDiv = document.createElement('div');
    const isYang = (val === 7 || val === 9);
    const isChanging = (val === 6 || val === 9);

    lineDiv.className = `hexagram-line ${isYang ? 'yang' : 'yin'} ${isChanging ? 'changing' : ''}`;
    container.appendChild(lineDiv);
  });
}

// Calcola la struttura binaria ed individua l'esagramma
function processOracleResult() {
  document.getElementById('btn-cast').disabled = true;

  // Converti i lanci in stringa binaria (1 per Yang, 0 per Yin)
  // Nota: la prima linea in basso corrisponde al primo carattere della stringa
  const binaryString = currentLines.map(val => (val === 7 || val === 9) ? '1' : '0').join('');
  
  const hexagram = hexagramsData.find(h => h.struttura_binaria === binaryString);

  if (hexagram) {
    displayOracleResult(hexagram);
  }
}

function displayOracleResult(hex) {
  const resultDiv = document.getElementById('oracle-result');
  
  // Trova eventuali linee mutanti (1-based index)
  const changingLines = currentLines
    .map((val, idx) => (val === 6 || val === 9) ? idx + 1 : null)
    .filter(val => val !== null);

  let html = `
    <h2>Esagramma Otenuto: N. ${hex.numero} — ${hex.nome_ita} (${hex.nome_pinyin})</h2>
    <p><strong>Sentenza:</strong> ${hex.sentenza}</p>
    <p><strong>Immagine:</strong> ${hex.immagine}</p>
    <p>${hex.interpretazione_wiki}</p>
  `;

  if (changingLines.length > 0) {
    html += `<h3>Linee Mutanti:</h3><ul>`;
    changingLines.forEach(lineNum => {
      html += `<li><strong>Linea ${lineNum}:</strong> ${hex.linee_mutanti[lineNum]}</li>`;
    });
    html += `</ul>`;
  }

  resultDiv.innerHTML = html;
}

// Rendering Modalità Sfoglia
function renderBrowseGrid(data) {
  const grid = document.getElementById('hexagram-grid');
  grid.innerHTML = '';

  data.forEach(hex => {
    const card = document.createElement('div');
    card.className = 'hexagram-card';
    card.innerHTML = `
      <h3>${hex.numero}. ${hex.nome_ita}</h3>
      <p><em>${hex.nome_pinyin}</em></p>
    `;
    card.addEventListener('click', () => openModal(hex));
    grid.appendChild(card);
  });
}

// Gestione Ricerca
document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = hexagramsData.filter(h => 
    h.numero.toString().includes(query) ||
    h.nome_ita.toLowerCase().includes(query) ||
    h.nome_pinyin.toLowerCase().includes(query)
  );
  renderBrowseGrid(filtered);
});

// Modale Dettaglio
function openModal(hex) {
  const modal = document.getElementById('modal-detail');
  const body = document.getElementById('modal-body');
  
  body.innerHTML = `
    <h2>${hex.numero}. ${hex.nome_ita} (${hex.nome_pinyin})</h2>
    <p><strong>Sentenza:</strong> ${hex.sentenza}</p>
    <p><strong>Immagine:</strong> ${hex.immagine}</p>
    <p><strong>Interpretazione:</strong> ${hex.interpretazione_wiki}</p>
  `;
  modal.classList.remove('hidden');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-detail').classList.add('hidden');
});

// Inizializzazione
loadHexagrams();