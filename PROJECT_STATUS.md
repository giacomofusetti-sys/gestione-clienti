# Project Status — Gestione Clienti CRM

## 1. Stack tecnico

| Voce | Dettaglio |
|------|-----------|
| Linguaggio | JavaScript (JSX) |
| Framework | React 18.3.1 |
| Build tool | Vite 6.0.0 |
| Styling | CSS inline (variabili CSS, tema scuro) |
| API esterne | Anthropic Claude (analisi email + note visite), Google Calendar API v3 (OAuth2) |
| Persistenza | localStorage (browser) |

## 2. Struttura cartelle

```
gestione-clienti/
├── index.html              # Entry point HTML (carica gapi + gsi)
├── package.json
├── vite.config.js           # Vite — dev server porta 3000, auto-open
├── .env                     # VITE_ANTHROPIC_API_KEY, VITE_GOOGLE_CLIENT_ID
├── dist/                    # Build di produzione
├── node_modules/
└── src/
    ├── main.jsx             # Bootstrap React → #root
    └── App.jsx              # Componente unico monolitico (~1520 righe)
```

## 3. Architettura

- **Solo frontend** — nessun backend, nessun server, nessun database.
- I dati sono hardcodati nell'app (43 clienti, 10 eventi calendario di fallback) e persistiti in **localStorage**.
- Le chiamate API (Claude, Google Calendar) avvengono direttamente dal browser.
- Il token Anthropic è esposto lato client tramite header `anthropic-dangerous-direct-browser-access`.

## 4. Moduli / sezioni principali

| Sezione | Descrizione |
|---------|-------------|
| Dashboard | Panoramica: score clienti, KPI, alert, statistiche aggregate |
| Anagrafica clienti | Lista completa con ricerca, dettaglio scheda, aggiunta nuovo cliente |
| Calendario visite | Griglia mensile + lista eventi, integrazione Google Calendar (OAuth2), note visita con AI |
| Alert intelligenti | Notifiche automatiche: clienti fermi, visite scadute, cali fatturato, follow-up outreach |
| Pipeline vendite | Board Kanban a 4 stadi (attivo, recupero, a_rischio, inattivo) con drag & drop concettuale |
| Giri visita | Suggerimento percorsi ottimizzati per zona geografica (nearest-neighbor, distanza Haversine) |
| Email analysis | Classificazione email tramite Claude AI (RdO, Ordine, Conferma, Sollecito, Info, Amministrativa) |
| Outreach tracking | Registrazione email inviate per cliente, stato follow-up |
| Report & statistiche | Budget per agente, distribuzione settore, score clienti |
| Note visite AI | Editor note per eventi passati con organizzazione automatica via Claude (riepilogo, azioni, follow-up, sentiment) |

## 5. Stato dei dati (localStorage)

| Chiave | Contenuto |
|--------|-----------|
| `crm_clients` | Array di 43 oggetti cliente (anagrafica, fatturato 2024/2025, budget 2026, vendite actual, coords, outreach, note, pipeline stage) |
| `crm_visitNotes` | Mappa `{ eventId: { raw: string, ai: object } }` — note grezze + versione strutturata da Claude |
| `crm_emailAnalysis` | Array di analisi email (testo, classificazione, cliente associato) |
| `crm_gcalEvents` | Array di eventi Google Calendar trasformati nel formato interno (null se non connesso) |

Reset completo disponibile nell'app (svuota tutte le chiavi e ricarica).

## 6. Dipendenze

**Produzione:**
- `react` ^18.3.1
- `react-dom` ^18.3.1

**Sviluppo:**
- `@vitejs/plugin-react` ^4.3.4
- `vite` ^6.0.0
- `@types/react` ^18.3.0
- `@types/react-dom` ^18.3.0

Nessuna libreria UI esterna (no Tailwind, no MUI, no chart library). Tutto custom.

## 7. Build / deploy

- **Build**: `npm run build` → output in `dist/`
- **Dev**: `npm run dev` → localhost:3000
- **Nessuna configurazione di deploy** presente (no vercel.json, netlify.toml, Dockerfile, GitHub Actions, fly.toml)
- La cartella `dist/` è già generata ma non c'è CI/CD configurato

## 8. Punti aperti

- Nessun commento TODO/FIXME/HACK nel codice sorgente.
- **Dal README**, roadmap dichiarata:
  - [ ] Persistenza dati con localStorage / database (localStorage già implementato, database no)
  - [x] Integrazione Google Calendar (implementata — richiede configurazione Client ID)
  - [ ] Integrazione Gmail
  - [ ] Export report PDF/Excel
  - [ ] Multi-utente con autenticazione
- La data di riferimento `TODAY` è hardcodata a `"2026-03-12"` (riga ~103) anziché calcolata dinamicamente.
- Il `VITE_GOOGLE_CLIENT_ID` nel `.env` è vuoto — l'integrazione Google Calendar richiede configurazione manuale.
- L'API key Anthropic è esposta nel bundle client-side.
- L'intera app è in un singolo file `App.jsx` (~1520 righe), senza decomposizione in moduli.
