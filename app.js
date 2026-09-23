let hexagramsData = [];
let currentLines = [];
const ideograms = [
  "", "乾", "坤", "屯", "蒙", "需", "訟", "師", "比", "小畜", "履",
  "泰", "否", "同人", "大有", "謙", "豫", "隨", "蠱", "臨", "觀",
  "噬嗑", "賁", "剝", "復", "無妄", "大畜", "頤", "大過", "坎", "離",
  "咸", "恆", "遁", "大壯", "晉", "明夷", "家人", "睽", "蹇", "解",
  "損", "益", "夬", "姤", "萃", "升", "困", "井", "革", "鼎",
  "震", "艮", "漸", "歸妹", "豐", "旅", "巽", "兌", "渙", "節",
  "中孚", "小過", "既濟", "未濟"
];

// Mappa binaria corretta (dal basso verso l'alto: 1=Yang, 0=Yin) -> Numero Esagramma
const binaryToHexagram = {
  "111111": 1, "000000": 2, "100010": 3, "010001": 4, "111010": 5, "010111": 6,
  "010000": 7, "000010": 8, "111011": 9, "110111": 10, "111000": 11, "000111": 12,
  "101111": 13, "111101": 14, "001000": 15, "000100": 16, "100110": 17, "011001": 18,
  "110000": 19, "000011": 20, "100101": 21, "101001": 22, "000001": 23, "100000": 24,
  "100111": 25, "111001": 26, "100001": 27, "011110": 28, "010010": 29, "101101": 30,
  "001110": 31, "011100": 32, "001111": 33, "111100": 34, "000101": 35, "101000": 36,
  "101011": 37, "110101": 38, "001010": 39, "010100": 40, "110001": 41, "100011": 42,
  "111110": 43, "011111": 44, "000110": 45, "011000": 46, "010110": 47, "011010": 48,
  "101110": 49, "011101": 50, "100100": 51, "001001": 52, "001011": 53, "110100": 54,
  "101100": 55, "001101": 56, "011011": 57, "110110": 58, "010011": 59, "110010": 60,
  "110011": 61, "001100": 62, "101010": 63, "010101": 64
};

async function loadHexagrams() {
  try {
    // Richiede il nome del file esatto caricato su GitHub
    const response = await fetch('iching_3.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    hexagramsData = await response.json();
    renderBrowseGrid(hexagramsData);
  } catch (error) {
    console.error('Errore critico nel caricamento del JSON:', error);
    document.getElementById('oracle-result').innerHTML = `<p style="color:red">Errore critico: impossibile caricare il file JSON.</p>`;
  }
}

document.getElementById('btn-oracle').addEventListener('click', (e) => switchTab('oracle', e.target));
document.getElementById('btn-browse').addEventListener('click', (e) => switchTab('browse', e.target));

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(el => el.classList.remove('active'));
  document.getElementById(`section-${tab}`).classList.add('active');
  btn.classList.add('active');
}

document.getElementById('btn-cast').addEventListener('click', () => {
  if (currentLines.length >= 6) return;

  const coin1 = Math.random() < 0.5 ? 2 : 3;
  const coin2 = Math.random() < 0.5 ? 2 : 3;
  const coin3 = Math.random() < 0.5 ? 2 : 3;
  const sum = coin1 + coin2 + coin3;

  currentLines.push(sum);
  renderCurrentLines();

  if (currentLines.length === 6) {
    processOracleResult();
  }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  currentLines = [];
  document.getElementById('hexagram-building').innerHTML = '';
  document.getElementById('oracle-result').innerHTML = '';
  document.getElementById('btn-cast').disabled = false;
});

function renderCurrentLines() {
  const container = document.getElementById('hexagram-building');
  container.innerHTML = '';

  const totalLines = currentLines.length;

  [...currentLines].reverse().forEach((val, index) => {
    // Calcola il numero della linea (la prima che hai lanciato è la 1, in basso)
    const lineNum = totalLines - index;

    // Contenitore per allineare numero e linea
    const rowDiv = document.createElement('div');
    rowDiv.className = 'hexagram-row';

    // Div per il numero
    const numDiv = document.createElement('div');
    numDiv.className = 'line-number';
    numDiv.textContent = `${lineNum}.`;

    // Div per la linea
    const lineDiv = document.createElement('div');
    const isYang = (val === 7 || val === 9);
    const isChanging = (val === 6 || val === 9);

    lineDiv.className = `hexagram-line ${isYang ? 'yang' : 'yin'} ${isChanging ? 'changing' : ''}`;

    rowDiv.appendChild(numDiv);
    rowDiv.appendChild(lineDiv);
    container.appendChild(rowDiv);
  });
}
function processOracleResult() {
  document.getElementById('btn-cast').disabled = true;
  const resultDiv = document.getElementById('oracle-result');

  // Estrazione della stringa binaria
  const binaryString = currentLines.map(val => (val === 7 || val === 9) ? '1' : '0').join('');
  
  // Ricerca dell'ID tramite la mappa univoca, ignorando il campo struttura_binaria del JSON
  const hexNumber = binaryToHexagram[binaryString];
  
  if (!hexNumber) {
    resultDiv.innerHTML = `<p style="color:red">Errore logico: la stringa binaria ${binaryString} non ha prodotto corrispondenze valide.</p>`;
    return;
  }

  const hexagram = hexagramsData.find(h => h.numero === hexNumber);

  if (hexagram) {
    displayOracleResult(hexagram);
  } else {
    resultDiv.innerHTML = `<p style="color:red">Errore dati: Esagramma N. ${hexNumber} non trovato nel file JSON.</p>`;
  }
}

function displayOracleResult(hex) {
  const resultDiv = document.getElementById('oracle-result');
  const ideogram = ideograms[hex.numero];
  
  const changingLines = currentLines
    .map((val, idx) => (val === 6 || val === 9) ? idx + 1 : null)
    .filter(val => val !== null);

  let html = `
    <h2>Esagramma Ottenuto: N. ${hex.numero} — ${hex.nome_ita} <span class="ideogram">${ideogram}</span> (${hex.nome_pinyin})</h2>
    <p><strong>Sentenza:</strong> ${hex.sentenza}</p>
    <p><strong>Immagine:</strong> ${hex.immagine}</p>
    <p>${hex.interpretazione_wiki}</p>
  `;

  if (changingLines.length > 0) {
    html += `<h3>Linee Mutanti:</h3><ul>`;
    changingLines.forEach(lineNum => {
      const lineaText = hex.linee_mutanti[lineNum.toString()];
      if (lineaText) {
        html += `<li><strong>Linea ${lineNum}:</strong> ${lineaText}</li>`;
      }
    });
    html += `</ul>`;
  }

  resultDiv.innerHTML = html;
}

function renderBrowseGrid(data) {
  const grid = document.getElementById('hexagram-grid');
  grid.innerHTML = '';

  data.forEach(hex => {
    const card = document.createElement('div');
    const ideogram = ideograms[hex.numero];
    card.className = 'hexagram-card';
    card.innerHTML = `
      <h3>${hex.numero}. ${hex.nome_ita} <span class="ideogram">${ideogram}</span></h3>
      <p><em>${hex.nome_pinyin}</em></p>
    `;
    card.addEventListener('click', () => openModal(hex));
    grid.appendChild(card);
  });
}

document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = hexagramsData.filter(h => 
    h.numero.toString().includes(query) ||
    h.nome_ita.toLowerCase().includes(query) ||
    h.nome_pinyin.toLowerCase().includes(query)
  );
  renderBrowseGrid(filtered);
});

function openModal(hex) {
  const modal = document.getElementById('modal-detail');
  const body = document.getElementById('modal-body');
  const ideogram = ideograms[hex.numero];
  
  body.innerHTML = `
    <h2>${hex.numero}. ${hex.nome_ita} <span class="ideogram">${ideogram}</span> (${hex.nome_pinyin})</h2>
    <p><strong>Sentenza:</strong> ${hex.sentenza}</p>
    <p><strong>Immagine:</strong> ${hex.immagine}</p>
    <p><strong>Interpretazione:</strong> ${hex.interpretazione_wiki}</p>
  `;
  modal.classList.remove('hidden');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-detail').classList.add('hidden');
});

loadHexagrams();
