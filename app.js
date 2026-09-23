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
