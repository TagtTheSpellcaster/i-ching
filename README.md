# I Ching — Web App

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-browser%20%7C%20PWA-lightgrey)
![Built with HTML](https://img.shields.io/badge/built%20with-HTML%2FCSS%2FJavaScript-orange)
![Status](https://img.shields.io/badge/status-stable-brightgreen)

Applicazione web leggera, responsive e interattiva per la consultazione e il lancio dell'oracolo dell'**I Ching (易經)**. Sviluppata in puro HTML5, CSS3 e JavaScript (Vanilla), l'app non richiede l'installazione di dipendenze esterne ed è progettata per girare direttamente su qualsiasi browser moderno, supportare l'installazione nativa tramite standard PWA ed essere ospitata facilmente su GitHub Pages.

---

## Caratteristiche Principali

* **Simulazione dell'Oracolo (Metodo delle Tre Monete):** Generazione interattiva dell'esagramma linea per linea (dal basso verso l'alto), con calcolo statistico fedele alla tradizione.
* **Linee Mutanti:** Riconoscimento automatico e marcatura visiva delle linee in movimento (Yang/Yin mutanti) con indicazione dei testi specifici associati.
* **Catalogo Completo dei 64 Esagrammi:** Sezione di consultazione rapida con ricerca in tempo reale per numero, nome in italiano o trascrizione Pinyin.
* **Design Tradizionale e Curato:** Rendering grafico personalizzato delle linee (proporzioni quadrate, tratti irregolari e numerazione posizionale) arricchito dall'inserimento degli ideogrammi cinesi originali e da una delicata filigrana di sfondo con steli di achillea.
* **Guida Integrata alla Decodifica:** Pannello di istruzioni avanzato con glossario delle figure archetipiche (*Il Nobile*, *Il Re*, *Il Grand'uomo*), dei punti cardinali e delle stagioni.
* **Progressive Web App (PWA):** Installabile direttamente su desktop e dispositivi mobili (Chrome, Edge, Brave, Firefox) con supporto offline completo tramite Service Worker.

---

## Struttura del Progetto

Il repository è organizzato nella seguente struttura di file:

```text
iching-app/
│
├── index.html         # Interfaccia utente (HTML5)
├── style.css          # Fogli di stile, layout e personalizzazioni visive
├── app.js             # Logica dell'oracolo, gestione DOM e Service Worker
├── iching_3.json      # Database strutturato con i 64 esagrammi, sentenze e linee
├── manifest.json      # Manifesto di configurazione per la PWA
├── sw.js              # Service Worker per la gestione della cache e offline
├── achillea-bg.jpg    # Grafica di sfondo in filigrana
└── LICENSE            # Licenza MIT del progetto
