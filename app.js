let hexagramsData = [];
let currentLines = [];

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

const ideograms = [
  "", "乾", "坤", "屯", "蒙", "需", "訟", "師", "比", "小畜", "履",
  "泰", "否", "同人", "大有", "謙", "豫", "隨", "蠱", "臨", "觀",
  "噬嗑", "賁", "剝", "復", "無妄", "大畜", "頤", "大過", "坎", "離",
  "咸", "恆", "遁", "大壯", "晉", "明夷", "家人", "睽", "蹇", "解",
  "損", "益", "夬", "姤", "萃", "升", "困", "井", "革", "鼎",
  "震", "艮", "漸", "歸妹", "豐", "旅", "巽", "兌", "渙", "節",
  "中孚", "小過", "既濟", "未濟"
];

// Mappa diretta dei codici binari a 3 bit dei trigrammi (dal basso verso l'alto)
const trigramsBitsMap = {
  "111": { id: "1", name: "Qián (乾) — Il Cielo / Il Creativo", image: "Tre linee intere (Yang puro).", meaning: "Forza, movimento inesauribile, creatività, luce, leadership, fermezza." },
  "000": { id: "2", name: "Kūn (坤) — La Terra / Il Ricettivo", image: "Tre linee spezzate (Yin puro).", meaning: "Devozione, accoglienza, nutrimento, docilità, la capacità di sostenere." },
  "001": { id: "3", name: "Zhèn (震) — Il Tuono / L'Eccitante", image: "Un tratto intero sotto due spezzati.", meaning: "Scossa, movimento improvviso, risveglio, energia che irrompe, dinamismo." },
  "010": { id: "4", name: "Kǎn (Acqua) — L'Abissale", image: "Un tratto spezzato racchiuso tra due interi.", meaning: "Pericolo, profondità, flusso che supera gli ostacoli, fluidità, prova interiore." },
  "101": { id: "5", name: "Lí (Fuoco) — Il Luminoso", image: "Un tratto spezzato racchiuso tra due interi.", meaning: "Chiarezza, luce, intelligenza, consapevolezza, discernimento." },
  "100": { id: "6", name: "Gèn (Montagna) — L'Arresto", image: "Un tratto intero sopra due spezzati.", meaning: "Quiete, stabilità, fermarsi al momento giusto per evitare la dispersione." },
  "011": { id: "7", name: "Xùn (Vento) — Il Mite", image: "Un tratto spezzato sotto due interi.", meaning: "Flessibilità, penetrazione graduale e costante, diplomazia, pazienza." },
  "110": { id: "8", name: "Duì (Lago) — Il Gioioso", image: "Un tratto spezzato sopra due interi.", meaning: "Apertura, comunicazione, gioia condivisa, soddisfazione, scambio sereno." }
};

const hexagramTrigramsMap = [
  [],
  [1, 1], [8, 2], [4, 3], [6, 4], [5, 1], [4, 6], [2, 4], [4, 2],
  [5, 7], [7, 8], [2, 1], [1, 2], [1, 5], [5, 8], [7, 2], [3, 8],
  [3, 4], [7, 6], [2, 8], [2, 5], [3, 5], [6, 7], [6, 2], [3, 2],
  [3, 1], [6, 1], [6, 3], [7, 4], [4, 4], [5, 5], [6, 7], [3, 4],
  [7, 3], [3, 1], [5, 2], [4, 5], [7, 5], [5, 4], [4, 6], [3, 2],
  [7, 1], [8, 7], [1, 4], [7, 1], [2, 7], [7, 2], [4, 6], [4, 7],
  [5, 4], [5, 3], [3, 3], [6, 6], [7, 6], [3, 4], [3, 4], [6, 2],
  [5, 5], [7, 7], [8, 8], [6, 4], [6, 7], [3, 7], [4, 5], [5, 4]
];

function getHexagramTrigrams(hexNumber) {
  // Trova la stringa binaria associata a questo numero di esagramma
  const binaryStr = Object.keys(binaryToHexagram).find(k => binaryToHexagram[k] === hexNumber);
  if (!binaryStr) return null;

  // I primi 3 caratteri (0, 1, 2) sono il trigramma inferiore
  const lowerBits = binaryStr.substring(0, 3);
  // Gli ultimi 3 caratteri (3, 4, 5) sono il trigramma superiore
  const upperBits = binaryStr.substring(3, 6);

  return {
    lower: trigramsBitsMap[lowerBits],
    upper: trigramsBitsMap[upperBits]
  };
}

async function loadHexagrams() {
  try {
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
    const lineNum = totalLines - index;
    const rowDiv = document.createElement('div');
    rowDiv.className = 'hexagram-row';

    const numDiv = document.createElement('div');
    numDiv.className = 'line-number';
    numDiv.textContent = `${lineNum}.`;

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

  const binaryString = currentLines.map(val => (val === 7 || val === 9) ? '1' : '0').join('');
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
  const trigrams = getHexagramTrigrams(hex.numero);
  
  const changingLines = currentLines
    .map((val, idx) => (val === 6 || val === 9) ? idx + 1 : null)
    .filter(val => val !== null);

  let html = `
    <h2>Esagramma Ottenuto: N. ${hex.numero} — ${hex.nome_ita} <span class="ideogram">${ideogram}</span> (${hex.nome_pinyin})</h2>
  `;

if (trigrams) {
    html += `
      <div class="trigrams-info">
        <p><strong>Trigramma superiore (esterno):</strong> ${trigrams.upper.name}</p>
        <p style="margin-left: 1rem;"><em>Immagine:</em> ${trigrams.upper.image}<br><em>Significato:</em> ${trigrams.upper.meaning}</p>
        
        <p><strong>Trigramma inferiore (interno):</strong> ${trigrams.lower.name}</p>
        <p style="margin-left: 1rem;"><em>Immagine:</em> ${trigrams.lower.image}<br><em>Significato:</em> ${trigrams.lower.meaning}</p>
      </div>
    `;
  }
  
  html += `
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
  const trigrams = getHexagramTrigrams(hex.numero);
  
  let html = `
    <h2>${hex.numero}. ${hex.nome_ita} <span class="ideogram">${ideogram}</span> (${hex.nome_pinyin})</h2>
  `;

if (trigrams) {
    html += `
      <div class="trigrams-info">
        <p><strong>Trigramma superiore (esterno):</strong> ${trigrams.upper.name}</p>
        <p style="margin-left: 1rem;"><em>Immagine:</em> ${trigrams.upper.image}<br><em>Significato:</em> ${trigrams.upper.meaning}</p>
        
        <p><strong>Trigramma inferiore (interno):</strong> ${trigrams.lower.name}</p>
        <p style="margin-left: 1rem;"><em>Immagine:</em> ${trigrams.lower.image}<br><em>Significato:</em> ${trigrams.lower.meaning}</p>
      </div>
    `;
  }
  
  html += `
    <p><strong>Sentenza:</strong> ${hex.sentenza}</p>
    <p><strong>Immagine:</strong> ${hex.immagine}</p>
    <p><strong>Interpretazione:</strong> ${hex.interpretazione_wiki}</p>
  `;

  body.innerHTML = html;
  modal.classList.remove('hidden');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-detail').classList.add('hidden');
});

loadHexagrams();
