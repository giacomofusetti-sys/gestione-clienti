# Gestione Clienti — CRM

CRM personale per la gestione del pacchetto clienti.

## Funzionalità

- **Dashboard** — panoramica con score clienti, alert e statistiche
- **Anagrafica clienti** — scheda completa con contatti, documenti, email, visite
- **Tracking email** — storico email inviate/ricevute per ogni cliente
- **Archivio documenti** — catalogo file organizzati per cliente
- **Calendario visite** — vista mensile con alert visite scadute e suggerimenti
- **Pipeline vendite** — board Kanban con fasi personalizzabili
- **Report & statistiche** — grafici valore, distribuzione settore, score
- **Alert intelligenti** — notifiche automatiche per clienti fermi, visite scadute, follow-up

## Setup

```bash
# Installa le dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Build per produzione
npm run build
```

Il server di sviluppo si apre automaticamente su `http://localhost:3000`.

## Struttura

```
gestione-clienti/
├── index.html          # Entry point HTML
├── package.json        # Dipendenze e script
├── vite.config.js      # Configurazione Vite
└── src/
    ├── main.jsx        # Bootstrap React
    └── App.jsx         # Componente CRM principale
```

## Prossimi sviluppi

- [ ] Persistenza dati con localStorage / database
- [ ] Integrazione Google Calendar
- [ ] Integrazione Gmail
- [ ] Export report PDF/Excel
- [ ] Multi-utente con autenticazione
