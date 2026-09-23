# I Ching — Web App

![Version](https://img.shields.io/badge/version-1.0.5-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-browser-lightgrey)
![Built with HTML](https://img.shields.io/badge/built%20with-HTML%2FCSS%2FJavaScript-orange)
![Status](https://img.shields.io/badge/status-stable-brightgreen)

Applicazione web leggera, responsive e interattiva per la consultazione e il lancio dell'oracolo dell'**I Ching (易經)**. Sviluppata in puro HTML5, CSS3 e JavaScript (Vanilla), l'app non richiede l'installazione di dipendenze esterne ed è progettata per girare direttamente su qualsiasi browser moderno o essere ospitata facilmente su GitHub Pages.

---

## Caratteristiche Principali

* **Simulazione dell'Oracolo (Metodo delle Tre Monete):** Generazione interattiva dell'esagramma linea per linea (dal basso verso l'alto), con calcolo statistico fedele alla tradizione.
* **Linee Mutanti:** Riconoscimento automatico e marcatura visiva delle linee in movimento (Yang/Yin mutanti) con indicazione dei testi specifici associati.
* **Catalogo Completo dei 64 Esagrammi:** Sezione di consultazione rapida con ricerca in tempo reale per numero, nome in italiano o trascrizione Pinyin.
* **Design Tradizionale e Curato:** Rendering grafico personalizzato delle linee (proporzioni quadrate, tratti irregolari e numerazione posizionale) arricchito dall'inserimento degli ideogrammi cinesi originali.
* **Guida Integrata:** Pannello di istruzioni espandibile per orientare anche chi si avvicina per la prima volta alla consultazione.

---

## Struttura del Progetto

Il repository è organizzato nella seguente struttura di file piatti:

```text
iching-app/
│
├── index.html         # Interfaccia utente (HTML5)
├── style.css          # Fogli di stile, layout e personalizzazioni visive
├── app.js             # Logica dell'oracolo, gestione DOM e mappatura binaria
├── iching_3.json      # Database strutturato con i 64 esagrammi, sentenze e linee
└── LICENSE            # Licenza MIT del progetto
