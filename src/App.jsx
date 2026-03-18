import { useState, useMemo, useEffect } from "react";

// ─── ICONS ───
const I = {
  Users: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Mail: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Calendar: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>,
  Folder: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>,
  Pipeline: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  Chart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="8" rx="0.5"/><rect x="14" y="6" width="3" height="12" rx="0.5"/></svg>,
  Bell: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Plus: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Search: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  X: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  Trash: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Fire: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  Snow: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></svg>,
  ArrowRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  TrendDown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>,
  AlertTriangle: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  Clock: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  MapPin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Sparkle: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  FileText: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>,
  Loader: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>,
};

// ─── FALLBACK CALENDAR EVENTS (used when Google Calendar is not connected) ───
const FALLBACK_CALENDAR_EVENTS = [
  { id:"ev1", summary:"Chiamare Giani Astra per fissare appuntamento", date:"2026-03-02", time:"09:00", type:"chiamata", matchKeys:["astra","giani"], location:"", notes:"Astra Refrigeranti" },
  { id:"ev2", summary:"Chiamare Rebuffo Maina x appuntamento", date:"2026-03-02", time:"10:00", type:"chiamata", matchKeys:["maina","rebuffo"], location:"", notes:"Fissare appuntamento" },
  { id:"ev3", summary:"Consegna Costacurta Garlate", date:"2026-03-02", time:"11:00", type:"consegna", matchKeys:["costacurta"], location:"Via Valmolina Inferiore, 130, Garlate LC", notes:"Consegna dadi M6" },
  { id:"ev4", summary:"Costacurta Visita Giovanna", date:"2026-03-02", time:"11:30", type:"visita", matchKeys:["costacurta","giovanna","lauriola"], location:"Via Adda, 20, Olginate LC", notes:"Visita Giovanna Lauriola" },
  { id:"ev5", summary:"Visita Daniele Teti - Bittime (analisi software)", date:"2026-03-02", time:"14:30", type:"visita", matchKeys:["bittime","teti"], location:"", notes:"Analisi nuovo software gestionale" },
  { id:"ev6", summary:"Visita Astra", date:"2026-03-04", time:"15:30", type:"visita", matchKeys:["astra","giani"], location:"Via Leopardi, 27, San Pietro Mosezzo (NO)", notes:"Stefano Giani" },
  { id:"ev7", summary:"Visita Stranich", date:"2026-03-06", time:"11:00", type:"visita", matchKeys:["stranich","bogdanovic","aeromeccanica"], location:"Via G. Di Vittorio 300, Sesto San Giovanni MI", notes:"Nikola Bogdanovic" },
  { id:"ev8", summary:"Visita KSB", date:"2026-03-06", time:"14:00", type:"visita", matchKeys:["ksb","colonna"], location:"KSB Italia, Concorezzo", notes:"Giuseppe Colonna" },
  { id:"ev9", summary:"Visita Presezzi", date:"2026-03-10", time:"16:00", type:"visita", matchKeys:["presezzi","lonobile","bruno"], location:"Via per Ornago, 8, Burago di Molgora MB", notes:"Lonobile Michele" },
  { id:"ev10", summary:"Chiamare Sanco x fissare incontro", date:"2026-03-12", time:"", type:"chiamata", matchKeys:["sanco","bombari"], location:"", notes:"Settimana scorsa incasinato, riprovare" },
];

// ─── GOOGLE CALENDAR INTEGRATION ───
function classifyEventType(summary) {
  const s = summary.toLowerCase();
  if (/consegn/i.test(s)) return "consegna";
  if (/chiam|telefonat|call/i.test(s)) return "chiamata";
  return "visita";
}

function generateMatchKeys(summary, description) {
  const text = `${summary} ${description || ""}`.toLowerCase();
  const stopWords = new Set(["per","con","del","della","delle","dei","degli","dal","dalla","che","non","una","uno","gli","nel","nella","alle","alla","fissare","appuntamento","visita","chiamare","consegna","incontro","analisi","nuovo","nuova","riunione","meeting","evento"]);
  const words = text
    .replace(/[^a-zàèéìòù\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
  return [...new Set(words)];
}

function parseGoogleEvent(gEvent) {
  const start = gEvent.start?.dateTime || gEvent.start?.date || "";
  let date = "", time = "";
  if (start.includes("T")) {
    date = start.slice(0, 10);
    time = start.slice(11, 16);
  } else {
    date = start.slice(0, 10);
  }
  const summary = gEvent.summary || "(senza titolo)";
  return {
    id: gEvent.id,
    summary,
    date,
    time,
    type: classifyEventType(summary),
    matchKeys: generateMatchKeys(summary, gEvent.description),
    location: gEvent.location || "",
    notes: gEvent.description || "",
    source: "google",
  };
}

async function fetchGoogleCalendarEvents(accessToken, timeMin, timeMax) {
  const params = new URLSearchParams({
    timeMin: new Date(timeMin).toISOString(),
    timeMax: new Date(timeMax).toISOString(),
    maxResults: "250",
  });
  const resp = await fetch(`/api/gcal/events?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!resp.ok) {
    if (resp.status === 401) throw new Error("TOKEN_EXPIRED");
    throw new Error("Errore nel caricamento eventi");
  }
  const data = await resp.json();
  return (data.items || []).map(parseGoogleEvent);
}

async function refreshGcalToken(refreshToken) {
  const resp = await fetch("/api/gcal/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!resp.ok) throw new Error("Impossibile rinnovare il token");
  const data = await resp.json();
  return data.access_token;
}

// ─── CLIENT DATA ───
const INITIAL_CLIENTS = [
  { id:1, name:"ABB SPA - ABB SACE DIVISION", contact:"MORIGGI ANDREA", phone:"02 90347452", email:"moriggi.andrea@it.abb.com", city:"SESTO S. GIOVANNI", province:"MI", sector:"Elettronica/Automazione", agente:"SOCCAL FABIO", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:3864.5, fatturato2025:2898.5, budget2026:3623.12, delta:-25.0, venditeActual2026:1060, coords:{lat:45.5346,lng:9.2384}, notes:"", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email inviata ma TORNATA INDIETRO — indirizzo moriggi.andrea@it.abb.com probabilmente errato. Verificare contatto.",stato:"da_follow_up",dataRisposta:null} },
  { id:2, name:"AEROMECCANICA STRANICH SPA", contact:"Carla Pertile / Nikola Bogdanovic", phone:"02 87202122 / 02 87202198", email:"Carla.Pertile@duscon.it / Nikola.Bogdanovic@stranich.com", city:"SESTO SAN GIOVANNI", province:"MI", sector:"Acciaio/Metalmeccanica", agente:"PIRAN MATTIA", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:1397.52, fatturato2025:787.3, budget2026:4723.8, delta:-43.7, venditeActual2026:0, coords:{lat:45.5346,lng:9.2384}, notes:"Budget 2026 con incremento 5x", outreach:null },
  { id:3, name:"AIR LIQUIDE ITALIA PRODUZIONE SRL", contact:"ING. CUBONI ANTONIO", phone:"070 900190", email:"antonio.cuboni@airliquide.com", city:"MILANO", province:"MI", sector:"Energia/Chimica", agente:"SOCCAL FABIO", priority:"bassa", status:"inattivo", pipelineStage:"recupero", fatturato2024:2260.3, fatturato2025:0, budget2026:1500, delta:-100.0, venditeActual2026:0, coords:{lat:45.4900,lng:9.1780}, notes:"Fermo nel 2025 — da ricontattare", outreach:null },
  { id:4, name:"ARMSTRONG INTERNATIONAL", contact:"LUCA ZAPPELLONI", phone:"342 3731254", email:"lzappelloni@armstronginternational.eu", city:"MUGGIO", province:"MB", sector:"Valvole/Flow Control", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:406.8, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.5872,lng:9.2331}, notes:"", outreach:null },
  { id:5, name:"ASTRA REFRIGERANTI SRL", contact:"Elisa Gallone / Dario Nuni", phone:"0321.4856248 / 0321 808035", email:"elisa.gallone@baglionispa.com", city:"GALLIATE", province:"NO", sector:"Refrigerazione/HVAC", agente:"PIRAN MATTIA", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:22315.26, fatturato2025:903.24, budget2026:1806.48, delta:-96.0, venditeActual2026:1316, coords:{lat:45.4785,lng:8.6920}, notes:"Forte calo da 2024", outreach:null },
  { id:6, name:"BABCOCK WANSON ITALIANA S.P.A.", contact:"Emanuele Antoniazzi", phone:"02 959121", email:"eantoniazzi@babcock-wanson.com", city:"CAVENAGO DI BRIANZA", province:"MB", sector:"Valvole/Flow Control", agente:"SOCCAL FABIO", priority:"bassa", status:"inattivo", pipelineStage:"recupero", fatturato2024:2190.8, fatturato2025:0, budget2026:1500, delta:-100.0, venditeActual2026:0, coords:{lat:45.5774,lng:9.3989}, notes:"Da recuperare", outreach:null },
  { id:7, name:"BELLELI ENERGY CPE SRL", contact:"ALESSANDRO VECCHI / MAURO TARASCHI", phone:"0376 490220 / 0376490277", email:"alessandro.vecchi@belleli.it", city:"MANTOVA", province:"MN", sector:"Acciaio/Metalmeccanica", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:3022.3, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.1564,lng:10.7914}, notes:"", outreach:null },
  { id:8, name:"BRUNO PRESEZZI SPA", contact:"LONOBILE MICHELE", phone:"039 635021", email:"michele.lonobile@brunopresezzi.com", city:"BURAGO MOLGORA", province:"MI", sector:"Elettronica/Automazione", agente:"SOCCAL FABIO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:654.55, fatturato2025:1394.3, budget2026:8365.8, delta:113.0, venditeActual2026:0, coords:{lat:45.5988,lng:9.3706}, notes:"In forte crescita +113% — budget 5x", outreach:null },
  { id:9, name:"CA.S.T.IM. 2000 SRL", contact:"SIG.RA GAIA MAGLIANO", phone:"0173-65137", email:"gaia.magliano@castim2000.com", city:"VEZZA", province:"CN", sector:"Acciaio/Metalmeccanica", agente:"BRENNA ALESSANDRO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:1514, budget2026:16654, delta:0, venditeActual2026:0, coords:{lat:44.7583,lng:8.0108}, notes:"Cliente nuovo 2025 — grande potenziale", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:10, name:"CDB ENGINEERING SPA", contact:"STEFANO RESTA", phone:"0377 912268", email:"stefano.resta@cdbengineering.com", city:"CASALPUSTERLENGO", province:"LO", sector:"Refrigerazione/HVAC", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:247.29, budget2026:1483.74, delta:0, venditeActual2026:0, coords:{lat:45.1764,lng:9.6503}, notes:"", outreach:null },
  { id:11, name:"CIMMA MORANDOTTI SPA", contact:"Andrea Vaòòa", phone:"0382422012", email:"acquisti@cimma.it", city:"PAVIA", province:"PV", sector:"Elettronica/Automazione", agente:"PIRAN MATTIA", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:7406, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.1847,lng:9.1582}, notes:"Perso nel 2025", outreach:null },
  { id:12, name:"COMI CONDOR SPA", contact:"Giovanni Franzoni / Mattia", phone:"02 33579914", email:"comi-ua@comicondor.com", city:"SANTA CRISTINA E BISSONE", province:"PV", sector:"Elettronica/Automazione", agente:"PIRAN MATTIA", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:13816.4, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.2500,lng:9.3167}, notes:"Da 13.8k a zero — capire motivazioni", outreach:null },
  { id:13, name:"STB ASTUR S.A.", contact:"BARZAGHI ALESSANDRO", phone:"0034 985303898", email:"alessandro.barzaghi@stbastur.com", city:"GIJON (Spagna)", province:"UE", sector:"Acciaio/Metalmeccanica", agente:"SOCCAL FABIO", priority:"bassa", status:"attivo", pipelineStage:"a_rischio", fatturato2024:3018.74, fatturato2025:2076.42, budget2026:0, delta:-31.2, venditeActual2026:0, coords:{lat:43.5322,lng:-5.6611}, notes:"Budget zero — a rischio", outreach:null },
  { id:14, name:"COSTACURTA S.P.A. -VICO-", contact:"SIG.RA GIOVANNA LAURIOLA", phone:"3441309079", email:"acc@costacurta.it", city:"MILANO", province:"MI", sector:"Acciaio/Metalmeccanica", agente:"BRENNA ALESSANDRO", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:80357.97, fatturato2025:41950.46, budget2026:43208.97, delta:-47.8, venditeActual2026:270, coords:{lat:45.7932,lng:9.4161}, notes:"TOP CLIENT — calo 48% da monitorare", outreach:null },
  { id:15, name:"DE NORA HYDROGEN TECHNOLOGIES", contact:"GARANTINI NICOLO'", phone:"02 21291", email:"nicolo.garantini@denora.com", city:"MILANO", province:"MI", sector:"Elettronica/Automazione", agente:"SOCCAL FABIO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:8222.05, fatturato2025:19144.91, budget2026:9572.45, delta:132.8, venditeActual2026:0, coords:{lat:45.4580,lng:9.2270}, notes:"+133% nel 2025 — budget ridotto 2026", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:16, name:"DE NORA WATER TECHNOLOGIES", contact:"", phone:"", email:"", city:"MILANO", province:"MI", sector:"Acciaio/Metalmeccanica", agente:"SOCCAL FABIO", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:406, budget2026:406, delta:0, venditeActual2026:0, coords:{lat:45.4580,lng:9.2270}, notes:"Completare contatto", outreach:null },
  { id:17, name:"ERREDUE SPA", contact:"BARONTINI ANDREA", phone:"0586 444066", email:"andreabarontini@erredue.com", city:"LIVORNO", province:"LI", sector:"Energia/Chimica", agente:"SOCCAL FABIO", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:40528.18, fatturato2025:18656.66, budget2026:27984.99, delta:-54.0, venditeActual2026:0, coords:{lat:43.5485,lng:10.3106}, notes:"Calo 54% — recupero parziale previsto", outreach:null },
  { id:18, name:"EUROGUARCO SPA", contact:"SIG. LIVIO LUCIANO", phone:"0187-562611", email:"livio.luciano@euroguraco.com", city:"ARCOLA", province:"SP", sector:"Valvole/Flow Control", agente:"BRENNA ALESSANDRO", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:5946.24, fatturato2025:32910.25, budget2026:36201.28, delta:453.5, venditeActual2026:0, coords:{lat:44.1114,lng:9.8564}, notes:"BOOM +454% — in forte espansione", outreach:null },
  { id:19, name:"FLENCO FLUID SYSTEM SRL", contact:"SIG. LEONARDO PORCIANI", phone:"011-9330-871", email:"leonardo.porciani@flenco.com", city:"AVIGLIANA", province:"TO", sector:"Valvole/Flow Control", agente:"BRENNA ALESSANDRO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:1722, budget2026:10332, delta:0, venditeActual2026:0, coords:{lat:45.0784,lng:7.3942}, notes:"Nuovo 2025 — budget 5x", outreach:null },
  { id:20, name:"FRANCO TOSI MECCANICA SPA", contact:"TANZI MARIA TERESA", phone:"0331 522111", email:"mariateresa.tanzi@francotosimeccanica.it", city:"LEGNANO", province:"MI", sector:"Energia/Chimica", agente:"SOCCAL FABIO", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:4497.22, fatturato2025:23667.32, budget2026:26034.05, delta:426.3, venditeActual2026:0, coords:{lat:45.5964,lng:8.9139}, notes:"Crescita +426% — consolidare", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:21, name:"GALPERTI ENG. & FLOW CONTROL", contact:"MATTEO VITALI", phone:"0341 930780", email:"matteo.vitali@galpeng.com", city:"COLICO", province:"LC", sector:"Elettronica/Automazione", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:0, fatturato2025:0, budget2026:0, delta:0, venditeActual2026:0, coords:{lat:46.1333,lng:9.3667}, notes:"Mai attivato", outreach:null },
  { id:22, name:"GALPERTI TECH FORGED PRODUCTS", contact:"RAJA AMMARI", phone:"0341 930186", email:"raja.ammari@galptech.com", city:"COLICO", province:"LC", sector:"Valvole/Flow Control", agente:"OLTOLINI MASSIMILIANO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:7658, budget2026:15316, delta:0, venditeActual2026:0, coords:{lat:46.1333,lng:9.3667}, notes:"Nuovo 2025 — budget raddoppiato", outreach:null },
  { id:23, name:"GRUPPO ANTONINI ENERGY S.R.L.", contact:"SIG. CANTINI MARCO", phone:"0187-1771300", email:"m.cantini@gruppoantonini.it", city:"ARCOLA", province:"SP", sector:"Impiantistica", agente:"BRENNA ALESSANDRO", priority:"bassa", status:"attivo", pipelineStage:"a_rischio", fatturato2024:0, fatturato2025:870, budget2026:0, delta:0, venditeActual2026:0, coords:{lat:44.1114,lng:9.8564}, notes:"Budget zero — a rischio", outreach:null },
  { id:24, name:"GRUPPO ANTONINI SPA", contact:"SIG. CANTINI MARCO", phone:"0187-1771300", email:"m.cantini@gruppoantonini.it", city:"ARCOLA", province:"SP", sector:"Impiantistica", agente:"BRENNA ALESSANDRO", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:1940.08, fatturato2025:14632.52, budget2026:21948.78, delta:654.2, venditeActual2026:0, coords:{lat:44.1114,lng:9.8564}, notes:"TOP CRESCITA +654% — strategico", outreach:null },
  { id:25, name:"GUSBERTI MARCELLO SRL", contact:"LUCA SCIUTO", phone:"039 748551", email:"gusmar@gusmar.it", city:"MONZA", province:"MB", sector:"Valvole/Flow Control", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:7565.93, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.5845,lng:9.2744}, notes:"Da 7.5k a zero", outreach:null },
  { id:26, name:"HS.MARINE SRL", contact:"FABIO PADOVA", phone:"0375254819", email:"f.padova@hsmarine.net", city:"VIADANA", province:"MN", sector:"Trasmissione/Meccanica", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:11629, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:44.9297,lng:10.5197}, notes:"Perso — era 11.6k", outreach:null },
  { id:27, name:"INDUSTRIE DE NORA SPA", contact:"", phone:"", email:"", city:"MILANO", province:"MI", sector:"Energia/Chimica", agente:"SOCCAL FABIO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:12980, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.4580,lng:9.2270}, notes:"13k persi — trovare contatto", outreach:null },
  { id:28, name:"INOXIHP SRL", contact:"PEREGO FABIO", phone:"0362 190111", email:"f.perego@inoxihp.com", city:"NOVA MILANESE", province:"MB", sector:"Elettronica/Automazione", agente:"SOCCAL FABIO", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:970, budget2026:970, delta:0, venditeActual2026:0, coords:{lat:45.5883,lng:9.2017}, notes:"", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:29, name:"ITALVALV S.R.L.", contact:"Silvia Zuccotti", phone:"0143489491 / 3347465324", email:"silvia.zuccotti@italvalv.it", city:"SAN ANTONIO DI BASALUZZO", province:"AL", sector:"Refrigerazione/HVAC", agente:"PIRAN MATTIA", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:2297.71, fatturato2025:4599.5, budget2026:4737.48, delta:100.2, venditeActual2026:0, coords:{lat:44.7300,lng:8.7100}, notes:"Raddoppiato nel 2025", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:31, name:"KSB ITALIA SPA", contact:"GIUSEPPE COLONNA", phone:"039 6048 062 / 3667582333", email:"giuseppe.colonna@ksb.com", city:"MILANO", province:"MI", sector:"Impiantistica", agente:"OLTOLINI MASSIMILIANO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:26260.34, fatturato2025:6920.79, budget2026:13841.58, delta:-73.6, venditeActual2026:2802.20, coords:{lat:45.5872,lng:9.3291}, notes:"Forte calo — recupero parziale previsto", outreach:null },
  { id:32, name:"MAINA ORGANI DI TRASMISSIONE", contact:"Rebuffo Marco", phone:"0141 492821", email:"acquisti@maina.it", city:"ASTI", province:"AT", sector:"Trasmissione/Meccanica", agente:"PIRAN MATTIA", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:69845.65, fatturato2025:35111.1, budget2026:38622.21, delta:-49.7, venditeActual2026:16960, coords:{lat:44.9000,lng:8.2069}, notes:"TOP CLIENT — calo 50%, budget conservativo", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:33, name:"MELCAL SPA", contact:"GAGLIARDO FRANCESCO", phone:"0924 506974", email:"f.gagliardo@melcal.com", city:"CALATAFIMI SEGESTA", province:"TP", sector:"Acciaio/Metalmeccanica", agente:"SOCCAL FABIO", priority:"bassa", status:"attivo", pipelineStage:"a_rischio", fatturato2024:6809.55, fatturato2025:25735.17, budget2026:0, delta:277.9, venditeActual2026:0, coords:{lat:37.9167,lng:12.8667}, notes:"+278% ma budget zero — chiarire!", outreach:null },
  { id:34, name:"NEWCLEO SRL", contact:"Ibrahim M'himdi", phone:"+39 366 6698665", email:"ibrahim.mhimdi@newcleo.com", city:"TORINO", province:"TO", sector:"Nucleare", agente:"BRENNA ALESSANDRO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:563.9, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:45.0703,lng:7.6869}, notes:"Settore nucleare — potenziale futuro", outreach:null },
  { id:35, name:"SANCASSIANO SPA", contact:"BONICOLINI", phone:"0173 280324", email:"e.bonicolini@sancassiano.com", city:"RODDI", province:"CN", sector:"Elettronica/Automazione", agente:"SOCCAL FABIO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:1343, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:44.6792,lng:7.9750}, notes:"", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:36, name:"SANCO SISTEMI ANTINCENDIO", contact:"Roberto Bombari", phone:"0321-807521", email:"r.bombari@sanco-spa.it", city:"GALLIATE", province:"NO", sector:"Elettronica/Automazione", agente:"PIRAN MATTIA", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:56298.92, fatturato2025:1014.5, budget2026:2029, delta:-98.2, venditeActual2026:0, coords:{lat:45.4764,lng:8.6917}, notes:"Crollo da 56k a 1k — capire", outreach:null },
  { id:37, name:"SCANDIUZZI STEEL CONSTRUCTIONS", contact:"PAOLO GHIRARDI", phone:"0423 872463", email:"p.girardi@scandiuzzi.it", city:"VOLPAGO DEL MONTELLO", province:"TV", sector:"Acciaio/Metalmeccanica", agente:"OLTOLINI MASSIMILIANO", priority:"bassa", status:"attivo", pipelineStage:"attivo", fatturato2024:7662.19, fatturato2025:831.01, budget2026:2493.03, delta:-89.2, venditeActual2026:0, coords:{lat:45.7806,lng:12.1144}, notes:"", outreach:null },
  { id:38, name:"SIMIC SPA", contact:"SIG. THOMAS FRANCO / SIG. BALDI", phone:"349 309 0889 / 338-6190484", email:"thomas.franco@simic.it / nico.baldi@simic.it", city:"CAMERANA", province:"CN", sector:"Valvole/Flow Control", agente:"BRENNA ALESSANDRO", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:22055.69, budget2026:33083.53, delta:0, venditeActual2026:218.75, coords:{lat:44.4167,lng:8.1333}, notes:"NUOVO TOP CLIENT 2025 — budget +50%", outreach:{dataInvio:"2026-03-13",tipo:"presentazione",note:"Email di presentazione come nuovo referente + proposta visita",stato:"inviata",dataRisposta:null} },
  { id:39, name:"SO.CO.FER. COSTRUZIONI FERROVIARIE", contact:"LAURETTI ANDREA", phone:"0761 495046", email:"a.lauretti@socofer.it", city:"ROMA", province:"RM", sector:"Ferroviario/Trasporti", agente:"SOCCAL FABIO", priority:"bassa", status:"inattivo", pipelineStage:"inattivo", fatturato2024:5461.2, fatturato2025:0, budget2026:0, delta:-100.0, venditeActual2026:0, coords:{lat:41.9028,lng:12.4964}, notes:"", outreach:null },
  { id:40, name:"TENCONI SA", contact:"SIG. BERTA", phone:"0041-918733016", email:"alan.berta@tenconi.ch", city:"AIROLO", province:"CH", sector:"Ferroviario/Trasporti", agente:"EXPORT SALES", priority:"alta", status:"attivo", pipelineStage:"attivo", fatturato2024:0, fatturato2025:32215.77, budget2026:38658.92, delta:0, venditeActual2026:0, coords:{lat:46.5289,lng:8.6117}, notes:"Export Svizzera — nuovo top client", outreach:null },
  { id:41, name:"TERMOTECNICA INDUSTRIALE SRL", contact:"SALVATORE MIRELLA", phone:"0828 616320", email:"mirella.salvatore@termotecnica.it", city:"BATTIPAGLIA", province:"SA", sector:"Energia/Chimica", agente:"SOCCAL FABIO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:29876.19, fatturato2025:1597, budget2026:9582, delta:-94.7, venditeActual2026:0, coords:{lat:40.6083,lng:14.9833}, notes:"Crollo 95% — da rilanciare", outreach:null },
  { id:42, name:"TROYER AG SPA", contact:"MAGRO GIORGIO", phone:"0472 765195", email:"giorgio.magro@troyer.it", city:"STERZING VIPITENO", province:"BZ", sector:"Energia/Chimica", agente:"SOCCAL FABIO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:2945.32, fatturato2025:4280, budget2026:14980, delta:45.3, venditeActual2026:0, coords:{lat:46.8947,lng:11.4308}, notes:"In crescita — budget 2.5x", outreach:null },
  { id:43, name:"WALTER TOSTO SPA", contact:"G.PAGLIARO / MADALINE CRINGUS", phone:"0871580327", email:"g.pagliaro@waltertosto.it", city:"CHIETI SCALO", province:"CH", sector:"Acciaio/Metalmeccanica", agente:"OLTOLINI MASSIMILIANO", priority:"media", status:"attivo", pipelineStage:"attivo", fatturato2024:1710.52, fatturato2025:2512.06, budget2026:7536.18, delta:46.9, venditeActual2026:0, coords:{lat:42.3498,lng:14.1464}, notes:"Crescita costante — budget 3x", outreach:null },
];

const PIPELINE_STAGES = [
  { id:"attivo", label:"Attivo", color:"#10B981" },
  { id:"recupero", label:"Da Recuperare", color:"#F59E0B" },
  { id:"a_rischio", label:"A Rischio", color:"#EF4444" },
  { id:"inattivo", label:"Inattivo", color:"#6B7280" },
];
const PCOL = { alta:"#EF4444", media:"#F59E0B", bassa:"#6B7280" };
const TYPE_COLORS = { visita:"#6366F1", chiamata:"#3B82F6", consegna:"#10B981" };
const TYPE_LABELS = { visita:"Visita", chiamata:"Chiamata", consegna:"Consegna" };
const fmtC = (v) => new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(v);
const fmtD = (d) => d ? new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"short"}) : "—";
const TODAY = new Date().toISOString().split('T')[0];
const daysDiff = (a,b) => Math.round((new Date(b)-new Date(a))/86400000);

// ─── VISIT FREQUENCY BY SCORE ───
// Score ≥70: every 25 days | 40-69: every 50 days | <40: every 90 days
function visitFrequency(score) {
  if (score >= 70) return { days: 25, label: "ogni 3-4 settimane" };
  if (score >= 40) return { days: 50, label: "ogni 6-8 settimane" };
  return { days: 90, label: "ogni 3 mesi" };
}

// Match calendar events to clients
function matchEventToClient(event, clients) {
  const keys = event.matchKeys;
  for (const c of clients) {
    const nameLow = c.name.toLowerCase();
    const contactLow = c.contact.toLowerCase();
    if (keys.some(k => nameLow.includes(k) || contactLow.includes(k))) return c.id;
  }
  return null;
}

function clientScore(c) {
  let s = 30;
  if (c.fatturato2025 > 20000) s += 30; else if (c.fatturato2025 > 5000) s += 20; else if (c.fatturato2025 > 0) s += 10;
  if (c.budget2026 > 20000) s += 25; else if (c.budget2026 > 5000) s += 15; else if (c.budget2026 > 0) s += 5;
  if (c.delta > 100) s += 15; else if (c.delta > 0) s += 10; else if (c.delta < -50) s -= 10;
  if (c.priority === "alta") s += 10;
  if (c.status === "inattivo") s -= 20;
  return Math.max(0, Math.min(100, s));
}

function getAlerts(clients, eventsByClient, emailAnalysis) {
  const alerts = [];
  clients.forEach((c) => {
    if (c.fatturato2024 > 5000 && c.fatturato2025 === 0) alerts.push({ type:"danger", client:c, message:`${c.name} — fatturava €${Math.round(c.fatturato2024).toLocaleString("it")} nel 2024, ora a zero!`, icon:"Snow" });
    if (c.fatturato2025 > 0 && c.budget2026 === 0) alerts.push({ type:"danger", client:c, message:`${c.name} — attivo nel 2025 ma budget 2026 a zero!`, icon:"AlertTriangle" });
    if (c.delta < -50 && c.fatturato2025 > 0) alerts.push({ type:"warning", client:c, message:`${c.name} — calo ${Math.abs(c.delta)}% vs 2024`, icon:"TrendDown" });
    if (c.delta > 200) alerts.push({ type:"info", client:c, message:`${c.name} — crescita +${c.delta}%! Consolidare`, icon:"Fire" });
    if (!c.email && c.budget2026 > 0) alerts.push({ type:"suggestion", client:c, message:`${c.name} — manca email`, icon:"Mail" });
    if (c.budget2026 > 5000 && (c.venditeActual2026 || 0) === 0) alerts.push({ type:"warning", client:c, message:`⚠️ ${c.name} — budget ${fmtC(c.budget2026)} ma zero vendite nel 2026. Attivare!`, icon:"AlertTriangle" });
    // Outreach alerts
    if (c.outreach) {
      if (c.outreach.stato === "inviata") {
        const gg = daysDiff(c.outreach.dataInvio, TODAY);
        if (gg > 5) alerts.push({ type:"warning", client:c, message:`⏰ ${c.name} — email di ${c.outreach.tipo} inviata ${gg} giorni fa senza risposta. Follow-up!`, icon:"Mail" });
      }
      if (c.outreach.stato === "da_follow_up") {
        alerts.push({ type:"warning", client:c, message:`📤 ${c.name} — follow-up da inviare`, icon:"Mail" });
      }
    }
    // Visit alerts based on score
    if (c.status === "attivo" && c.budget2026 > 0) {
      const score = clientScore(c);
      const freq = visitFrequency(score);
      const evts = eventsByClient[c.id] || [];
      const pastVisits = evts.filter(e => e.date <= TODAY && (e.type === "visita" || e.type === "consegna"));
      const futureVisits = evts.filter(e => e.date > TODAY);
      if (pastVisits.length === 0 && futureVisits.length === 0) {
        alerts.push({ type:"suggestion", client:c, message:`📅 ${c.name} — nessuna visita registrata. Consigliato: ${freq.label}`, icon:"Calendar" });
      } else if (futureVisits.length === 0 && pastVisits.length > 0) {
        const lastVisit = pastVisits.sort((a,b) => b.date.localeCompare(a.date))[0];
        const daysSince = daysDiff(lastVisit.date, TODAY);
        if (daysSince >= freq.days) {
          alerts.push({ type:"warning", client:c, message:`📅 ${c.name} — ultima visita ${daysSince}gg fa (${fmtD(lastVisit.date)}). Pianificane una! (freq: ${freq.label})`, icon:"Calendar" });
        }
      }
    }
  });
  // RdO email alerts (last 3 days)
  if (emailAnalysis && emailAnalysis.length > 0) {
    const cutoff = new Date(TODAY);
    cutoff.setDate(cutoff.getDate() - 3);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    emailAnalysis.filter(a => a.data >= cutoffStr).forEach(a => {
      a.emails.filter(e => e.tipo === "RdO").forEach(e => {
        const matched = clients.find(c => e.clienteAssociato && (c.name.toLowerCase().includes(e.clienteAssociato.toLowerCase()) || e.clienteAssociato.toLowerCase().includes(c.name.split(" ")[0].toLowerCase())));
        if (matched) {
          alerts.push({ type:"danger", client:matched, message:`📧 RdO da ${e.clienteAssociato || matched.name} — ${e.oggetto || "richiesta d'offerta"}. Rispondere!`, icon:"Mail" });
        }
      });
    });
  }
  return alerts.sort((a,b) => ({danger:0,warning:1,info:2,suggestion:3}[a.type]-{danger:0,warning:1,info:2,suggestion:3}[b.type]));
}

// ─── VISIT ROUTES (GIRI VISITA) ───
const ZONE_DEFS = [
  { id:"milano_brianza", name:"Milano e Brianza", center:{lat:45.4642,lng:9.1900}, radiusKm:30, provinces:["MI","MB"] },
  { id:"piemonte", name:"Piemonte", center:{lat:45.07,lng:7.69}, radiusKm:120, provinces:["TO","AT","CN","NO","AL"] },
  { id:"liguria_spezia", name:"Liguria / La Spezia", center:{lat:44.11,lng:9.85}, radiusKm:80, provinces:["SP","GE"] },
  { id:"lombardia_est", name:"Lombardia Est", center:{lat:45.5,lng:10.2}, radiusKm:100, provinces:["MN","LO","LC","BG","BS","PV"] },
  { id:"centro_italia", name:"Centro Italia", center:{lat:42.0,lng:12.5}, radiusKm:300, provinces:["RM","LI","SA","CH"] },
  { id:"nord_est", name:"Nord-Est", center:{lat:46.0,lng:11.5}, radiusKm:150, provinces:["TV","BZ"] },
  { id:"estero", name:"Estero", center:{lat:46.0,lng:8.0}, radiusKm:999, provinces:["UE","EE"] },
];

function haversineKm(a, b) {
  if (!a || !b) return 9999;
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

function assignZone(c) {
  for (const z of ZONE_DEFS) {
    if (z.provinces.includes(c.province)) return z.id;
  }
  if (c.coords) {
    for (const z of ZONE_DEFS) {
      if (haversineKm(c.coords, z.center) < z.radiusKm) return z.id;
    }
  }
  return "altro";
}

function nearestNeighborOrder(clientsInRoute) {
  if (clientsInRoute.length <= 1) return clientsInRoute;
  const remaining = [...clientsInRoute];
  const ordered = [remaining.shift()];
  while (remaining.length > 0) {
    const last = ordered[ordered.length - 1];
    let bestIdx = 0, bestDist = Infinity;
    remaining.forEach((c, i) => {
      const d = haversineKm(last.coords, c.coords);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    ordered.push(remaining.splice(bestIdx, 1)[0]);
  }
  return ordered;
}

function suggestVisitRoutes(clients, eventsByClient) {
  const needVisit = clients.filter(c => {
    if (c.status !== "attivo" || c.budget2026 <= 0 || !c.coords) return false;
    const score = clientScore(c);
    const freq = visitFrequency(score);
    const evts = eventsByClient[c.id] || [];
    const future = evts.filter(e => e.date > TODAY);
    if (future.length > 0) return false;
    const past = evts.filter(e => e.date <= TODAY && (e.type === "visita" || e.type === "consegna"));
    if (past.length === 0) return true;
    const lastD = past.sort((a, b) => b.date.localeCompare(a.date))[0].date;
    return daysDiff(lastD, TODAY) >= freq.days;
  });

  const byZone = {};
  needVisit.forEach(c => {
    const zId = assignZone(c);
    if (!byZone[zId]) byZone[zId] = [];
    byZone[zId].push(c);
  });

  const routes = [];
  Object.entries(byZone).forEach(([zId, zClients]) => {
    const zoneDef = ZONE_DEFS.find(z => z.id === zId);
    const ordered = nearestNeighborOrder(zClients);
    let totalDist = 0;
    for (let i = 1; i < ordered.length; i++) {
      totalDist += haversineKm(ordered[i-1].coords, ordered[i].coords);
    }
    const avgUrgency = ordered.reduce((s, c) => {
      const evts = eventsByClient[c.id] || [];
      const past = evts.filter(e => e.date <= TODAY && (e.type === "visita" || e.type === "consegna"));
      if (past.length === 0) return s + 100;
      const lastD = past.sort((a, b) => b.date.localeCompare(a.date))[0].date;
      return s + daysDiff(lastD, TODAY);
    }, 0) / ordered.length;

    routes.push({
      zoneId: zId,
      zoneName: zoneDef?.name || "Altro",
      clients: ordered,
      totalDistKm: Math.round(totalDist),
      avgUrgency: Math.round(avgUrgency),
      totalBudget: ordered.reduce((s, c) => s + c.budget2026, 0),
    });
  });

  return routes.sort((a, b) => b.avgUrgency - a.avgUrgency);
}

function buildGoogleMapsUrl(routeClients) {
  const waypoints = routeClients.filter(c => c.coords).map(c => `${c.coords.lat},${c.coords.lng}`);
  return `https://www.google.com/maps/dir/${waypoints.join("/")}`;
}

// ─── CSS ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
:root{--bg:#0A0E17;--bg-card:#111827;--bg-card-hover:#1A2234;--bg-elevated:#1E293B;--border:#1E293B;--border-light:#2D3A4F;--text:#F1F5F9;--text-secondary:#94A3B8;--text-muted:#64748B;--accent:#6366F1;--accent-soft:rgba(99,102,241,.15);--danger:#EF4444;--danger-soft:rgba(239,68,68,.12);--warning:#F59E0B;--warning-soft:rgba(245,158,11,.12);--success:#10B981;--success-soft:rgba(16,185,129,.12);--info:#3B82F6;--info-soft:rgba(59,130,246,.12);--suggestion:#8B5CF6;--suggestion-soft:rgba(139,92,246,.12);--radius:12px;--radius-sm:8px}
*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif}
.app{display:flex;height:100vh;overflow:hidden}
.sidebar{width:220px;background:var(--bg-card);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0}
.sidebar-logo{padding:20px 16px;font-size:18px;font-weight:700;letter-spacing:-.5px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)}
.sidebar-logo .dot{width:10px;height:10px;background:var(--accent);border-radius:50%;box-shadow:0 0 12px var(--accent)}
.sidebar-nav{padding:12px 8px;flex:1;display:flex;flex-direction:column;gap:2px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:var(--radius-sm);cursor:pointer;transition:all .15s;font-size:13px;color:var(--text-secondary);position:relative}
.nav-item:hover{background:var(--bg-elevated);color:var(--text)}.nav-item.active{background:var(--accent-soft);color:var(--accent);font-weight:500}
.nav-item.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:18px;background:var(--accent);border-radius:0 3px 3px 0}
.nav-item svg{width:17px;height:17px;flex-shrink:0}
.nav-badge{margin-left:auto;background:var(--danger);color:white;font-size:10px;font-weight:600;padding:1px 6px;border-radius:10px}
.main{flex:1;overflow-y:auto;padding:24px 28px}.main::-webkit-scrollbar{width:6px}.main::-webkit-scrollbar-thumb{background:var(--border-light);border-radius:3px}
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px}
.page-title{font-size:24px;font-weight:700;letter-spacing:-.5px}.page-subtitle{font-size:13px;color:var(--text-muted);margin-top:3px}
.card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:18px}.card:hover{border-color:var(--border-light)}
.card-grid{display:grid;gap:14px}.card-grid-2{grid-template-columns:repeat(2,1fr)}.card-grid-4{grid-template-columns:repeat(4,1fr)}.card-grid-5{grid-template-columns:repeat(5,1fr)}
.stat-card{text-align:center}.stat-value{font-size:26px;font-weight:700;letter-spacing:-1px;font-family:'JetBrains Mono',monospace}.stat-label{font-size:12px;color:var(--text-muted);margin-top:3px}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg-elevated);color:var(--text);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;font-family:inherit}
.btn:hover{border-color:var(--border-light);background:var(--bg-card-hover)}.btn svg{width:14px;height:14px}
.btn-primary{background:var(--accent);border-color:var(--accent);color:white}.btn-primary:hover{opacity:.9}
.btn-sm{padding:4px 10px;font-size:11px}.btn-danger{border-color:var(--danger);color:var(--danger)}.btn-danger:hover{background:var(--danger-soft)}
.search-bar{display:flex;align-items:center;gap:8px;padding:7px 12px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);width:240px}
.search-bar svg{width:14px;height:14px;color:var(--text-muted)}.search-bar input{background:none;border:none;outline:none;color:var(--text);font-size:12px;font-family:inherit;width:100%}.search-bar input::placeholder{color:var(--text-muted)}
.input,.select{padding:8px 12px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-size:12px;font-family:inherit;width:100%;outline:none}.input:focus{border-color:var(--accent)}.textarea{min-height:70px;resize:vertical}
.form-group{display:flex;flex-direction:column;gap:5px}.form-label{font-size:11px;font-weight:500;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.5px}.form-row{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
table{width:100%;border-collapse:collapse}th{text-align:left;padding:8px 12px;font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.7px;border-bottom:1px solid var(--border)}
td{padding:10px 12px;font-size:12px;border-bottom:1px solid var(--border)}tbody tr:hover{background:var(--bg-card-hover)}tbody tr{cursor:pointer}
.tag{display:inline-flex;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600}.tag-danger{background:var(--danger-soft);color:var(--danger)}.tag-warning{background:var(--warning-soft);color:var(--warning)}.tag-success{background:var(--success-soft);color:var(--success)}.tag-info{background:var(--info-soft);color:var(--info)}.tag-muted{background:rgba(100,116,139,.15);color:var(--text-muted)}
.score-bar{width:50px;height:5px;background:var(--border);border-radius:3px;overflow:hidden}.score-fill{height:100%;border-radius:3px}
.alert-item{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border-radius:var(--radius-sm);border:1px solid var(--border);cursor:pointer}.alert-item:hover{background:var(--bg-card-hover)}
.alert-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.alert-icon svg{width:14px;height:14px}
.alert-item.danger .alert-icon{background:var(--danger-soft);color:var(--danger)}.alert-item.warning .alert-icon{background:var(--warning-soft);color:var(--warning)}.alert-item.info .alert-icon{background:var(--info-soft);color:var(--info)}.alert-item.suggestion .alert-icon{background:var(--suggestion-soft);color:var(--suggestion)}
.pipeline-board{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px}
.pipeline-col{min-width:200px;flex:1;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:12px;display:flex;flex-direction:column;gap:8px}
.pipeline-col-header{display:flex;align-items:center;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid var(--border)}
.pipeline-col-title{font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px}.pipeline-col-title .dot{width:7px;height:7px;border-radius:50%}
.pipeline-count{font-size:10px;color:var(--text-muted);background:var(--bg-elevated);padding:2px 7px;border-radius:10px}
.pipeline-card{background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px;cursor:pointer}.pipeline-card:hover{border-color:var(--border-light)}
.pipeline-card-name{font-size:11px;font-weight:600;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pipeline-card-sub{font-size:10px;color:var(--text-muted);margin-bottom:5px}.pipeline-card-value{font-size:12px;font-weight:700;font-family:'JetBrains Mono',monospace;color:var(--success)}
.report-bar-chart{display:flex;flex-direction:column;gap:8px}.report-bar-row{display:flex;align-items:center;gap:10px}
.report-bar-label{width:100px;font-size:11px;color:var(--text-secondary);text-align:right;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.report-bar{flex:1;height:24px;background:var(--bg-elevated);border-radius:4px;overflow:hidden}
.report-bar-fill{height:100%;border-radius:4px;display:flex;align-items:center;padding-left:8px;font-size:10px;font-weight:600;font-family:'JetBrains Mono',monospace;color:white;min-width:16px}
.report-bar-value{font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--text-secondary);min-width:70px;text-align:right}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center}
.modal{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);width:90%;max-width:680px;max-height:85vh;overflow-y:auto;box-shadow:0 4px 24px rgba(0,0,0,.3)}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--border)}.modal-title{font-size:16px;font-weight:700}
.modal-close{width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm);border:none;background:var(--bg-elevated);color:var(--text-muted);cursor:pointer}.modal-close:hover{background:var(--border);color:var(--text)}.modal-close svg{width:14px;height:14px}
.modal-body{padding:22px}.modal-footer{padding:14px 22px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px}
.detail-section{margin-bottom:20px}.detail-section-title{font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.7px;margin-bottom:10px}
.detail-row{display:flex;gap:20px;margin-bottom:10px}.detail-field{flex:1}.detail-label{font-size:10px;color:var(--text-muted);margin-bottom:2px;text-transform:uppercase;letter-spacing:.5px}.detail-value{font-size:13px}
/* Calendar specific */
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
.cal-header{font-size:10px;font-weight:600;color:var(--text-muted);text-align:center;padding:6px;text-transform:uppercase}
.cal-day{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:12px;border-radius:var(--radius-sm);cursor:pointer;position:relative;gap:2px}
.cal-day:hover{background:var(--bg-elevated)}.cal-day.today{background:var(--accent-soft);color:var(--accent);font-weight:700}.cal-day.other{color:var(--text-muted);opacity:.3}
.cal-dot{width:4px;height:4px;border-radius:50%}
.cal-event-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-elevated);border-radius:var(--radius-sm);border-left:3px solid var(--accent);font-size:12px;cursor:pointer;margin-bottom:6px}
.cal-event-item:hover{background:var(--bg-card-hover)}
.cal-event-item.past{opacity:.6;border-left-color:var(--text-muted)}
.cal-event-item.future{border-left-color:var(--accent)}
.visit-suggest{background:var(--suggestion-soft);border:1px dashed rgba(139,92,246,.3);border-radius:var(--radius-sm);padding:10px 12px;font-size:12px;color:var(--suggestion);margin-bottom:6px;display:flex;align-items:center;gap:8px}
.visit-suggest svg{width:14px;height:14px;flex-shrink:0}
/* Visit Notes */
.note-editor{background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px;margin-top:8px}
.note-editor textarea{width:100%;min-height:60px;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:12px;font-family:inherit;padding:8px 10px;resize:vertical;outline:none}
.note-editor textarea:focus{border-color:var(--accent)}
.note-editor textarea::placeholder{color:var(--text-muted)}
.note-actions{display:flex;gap:6px;margin-top:8px;justify-content:flex-end}
.ai-result{margin-top:10px;padding:12px;background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.15);border-radius:var(--radius-sm);font-size:12px;line-height:1.6}
.ai-result h4{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--accent);margin:0 0 6px 0;font-weight:600}
.ai-result .ai-section{margin-bottom:10px}.ai-result .ai-section:last-child{margin-bottom:0}
.ai-result ul{margin:0;padding-left:16px;color:var(--text-secondary)}
.ai-result li{margin-bottom:3px}
.sentiment-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600}
.sentiment-positivo{background:var(--success-soft);color:var(--success)}
.sentiment-negativo{background:var(--danger-soft);color:var(--danger)}
.sentiment-neutro{background:rgba(100,116,139,.15);color:var(--text-muted)}
.ai-loading{display:flex;align-items:center;gap:8px;padding:12px;color:var(--accent);font-size:12px}
.ai-loading svg{animation:spin 1s linear infinite;width:16px;height:16px}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.client-notes-section{margin-top:12px;display:flex;flex-direction:column;gap:8px}
.client-note-card{background:var(--bg-elevated);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px 12px;font-size:12px}
.client-note-card .note-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:11px;color:var(--text-muted)}
.route-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:14px}
.route-card:hover{border-color:var(--border-light)}
.route-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.route-zone-name{font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px}
.route-meta{display:flex;gap:10px;align-items:center}
.route-meta-item{font-size:11px;color:var(--text-muted);display:flex;align-items:center;gap:4px}
.route-client-row{display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--bg-elevated);border-radius:var(--radius-sm);margin-bottom:6px;cursor:pointer}
.route-client-row:hover{background:var(--bg-card-hover)}
.route-step{width:22px;height:22px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0}
.route-actions{display:flex;gap:8px;margin-top:12px}
`;

// ─── SMALL COMPONENTS ───
function Modal({title,onClose,children,footer}) { return (<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-header"><div className="modal-title">{title}</div><button className="modal-close" onClick={onClose}><I.X/></button></div><div className="modal-body">{children}</div>{footer&&<div className="modal-footer">{footer}</div>}</div></div>); }
function ScoreBar({score}) { const c=score>=70?"var(--success)":score>=40?"var(--warning)":"var(--danger)"; return <div style={{display:"flex",alignItems:"center",gap:6}}><div className="score-bar"><div className="score-fill" style={{width:`${score}%`,background:c}}/></div><span style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:c}}>{score}</span></div>; }
function PTag({p}) { return <span className={`tag ${p==="alta"?"tag-danger":p==="media"?"tag-warning":"tag-muted"}`}>{p}</span>; }
function STag({s}) { const st=PIPELINE_STAGES.find(x=>x.id===s); return st?<span className="tag" style={{background:`${st.color}20`,color:st.color}}>{st.label}</span>:null; }
function DTag({d}) { return d===0?<span className="tag tag-muted">—</span>:d>0?<span className="tag tag-success">+{d}%</span>:<span className="tag tag-danger">{d}%</span>; }

// ─── AI NOTE ORGANIZER ───
async function organizeNotesWithAI(rawNotes, clientName, eventSummary, eventDate) {
  console.log("[AI] Avvio organizzazione note per:", clientName, "-", eventSummary);
  try {
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: `Sei un assistente CRM per un agente commerciale italiano. Organizza questi appunti grezzi di una visita commerciale.

Cliente: ${clientName}
Evento: ${eventSummary}
Data: ${eventDate}

Appunti grezzi:
${rawNotes}

Rispondi SOLO in JSON valido (niente markdown, niente backtick), con questa struttura esatta:
{
  "puntiChiave": ["punto 1", "punto 2"],
  "azioni": ["azione 1", "azione 2"],
  "followUp": [{"cosa": "descrizione", "entro": "data o tempistica"}],
  "sentiment": "positivo" o "negativo" o "neutro",
  "riepilogo": "una frase di riepilogo"
}` }]
      })
    });
    console.log("[AI] Risposta HTTP status:", response.status);
    if (!response.ok) {
      const errText = await response.text();
      console.error("[AI] Errore risposta API:", response.status, errText);
      return null;
    }
    const data = await response.json();
    console.log("[AI] Dati ricevuti:", data);
    const text = data.content.map(b => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    console.log("[AI] Risultato parsato con successo:", parsed);
    return parsed;
  } catch (err) {
    console.error("[AI] Errore:", err);
    return null;
  }
}

// ─── VISIT NOTE EDITOR COMPONENT ───
function VisitNoteEditor({ eventId, clientName, eventSummary, eventDate, existingRaw, existingAI, onSave }) {
  const [raw, setRaw] = useState(existingRaw || "");
  const [aiResult, setAiResult] = useState(existingAI || null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(!existingRaw);
  const [aiError, setAiError] = useState(null);

  const handleAI = async () => {
    if (!raw.trim()) return;
    setLoading(true);
    setAiError(null);
    const result = await organizeNotesWithAI(raw, clientName, eventSummary, eventDate);
    setLoading(false);
    if (result) {
      setAiResult(result);
      setAiError(null);
      onSave(eventId, raw, result);
    } else {
      setAiError("Errore nella chiamata AI. Controlla la console del browser per dettagli.");
    }
  };

  const handleSaveRaw = () => {
    onSave(eventId, raw, aiResult);
    setEditing(false);
  };

  const SENT_EMOJI = { positivo: "😊", negativo: "😟", neutro: "😐" };

  return (
    <div className="note-editor">
      {editing ? (
        <>
          <textarea
            value={raw}
            onChange={e => setRaw(e.target.value)}
            placeholder="Incolla qui i tuoi appunti della visita..."
          />
          <div className="note-actions">
            <button className="btn btn-sm" onClick={handleSaveRaw} disabled={!raw.trim()}>
              <I.Check /> Salva note
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleAI} disabled={!raw.trim() || loading}>
              <I.Sparkle /> Organizza con AI
            </button>
          </div>
        </>
      ) : (
        <div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>📝 Appunti:</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", whiteSpace: "pre-wrap", marginBottom: 6 }}>{raw}</div>
          <button className="btn btn-sm" onClick={() => setEditing(true)} style={{ fontSize: 10 }}><I.FileText /> Modifica</button>
          {!aiResult && raw.trim() && <button className="btn btn-primary btn-sm" onClick={handleAI} disabled={loading} style={{ fontSize: 10, marginLeft: 6 }}><I.Sparkle /> Organizza con AI</button>}
        </div>
      )}
      {loading && <div className="ai-loading"><I.Loader /> Elaborazione AI in corso...</div>}
      {aiError && <div style={{marginTop:8,padding:8,background:"var(--danger-soft)",border:"1px solid var(--danger)",borderRadius:6,fontSize:11,color:"var(--danger)"}}>{aiError}</div>}
      {aiResult && <AIResultDisplay result={aiResult} />}
    </div>
  );
}

function AIResultDisplay({ result }) {
  const SENT_EMOJI = { positivo: "😊", negativo: "😟", neutro: "😐" };
  const SENT_CLASS = { positivo: "sentiment-positivo", negativo: "sentiment-negativo", neutro: "sentiment-neutro" };
  return (
    <div className="ai-result">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>✨ Organizzato da AI</span>
        {result.sentiment && <span className={`sentiment-badge ${SENT_CLASS[result.sentiment] || ""}`}>{SENT_EMOJI[result.sentiment] || ""} {result.sentiment}</span>}
      </div>
      {result.riepilogo && <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--text)" }}>{result.riepilogo}</div>}
      {result.puntiChiave?.length > 0 && <div className="ai-section"><h4>Punti chiave</h4><ul>{result.puntiChiave.map((p, i) => <li key={i}>{p}</li>)}</ul></div>}
      {result.azioni?.length > 0 && <div className="ai-section"><h4>Azioni da fare</h4><ul>{result.azioni.map((a, i) => <li key={i} style={{ color: "var(--warning)" }}>{a}</li>)}</ul></div>}
      {result.followUp?.length > 0 && <div className="ai-section"><h4>Follow-up</h4><ul>{result.followUp.map((f, i) => <li key={i}><span style={{ color: "var(--info)" }}>{f.cosa}</span>{f.entro && <span style={{ color: "var(--text-muted)" }}> — entro {f.entro}</span>}</li>)}</ul></div>}
    </div>
  );
}

// ─── EMAIL ANALYSIS ───
const EMAIL_TYPE_STYLE = {
  "RdO":       { bg:"rgba(239,68,68,0.12)", color:"#EF4444", emoji:"🔴" },
  "Ordine":    { bg:"rgba(16,185,129,0.12)", color:"#10B981", emoji:"🟢" },
  "Conferma":  { bg:"rgba(16,185,129,0.08)", color:"#059669", emoji:"✅" },
  "Sollecito": { bg:"rgba(245,158,11,0.12)", color:"#F59E0B", emoji:"🟡" },
  "Info":      { bg:"rgba(59,130,246,0.12)",  color:"#3B82F6", emoji:"🔵" },
  "Amministrativa": { bg:"rgba(139,92,246,0.12)", color:"#8B5CF6", emoji:"🟣" },
  "Altro":     { bg:"rgba(100,116,139,0.15)", color:"#64748B", emoji:"⚪" },
};
function emailStyle(tipo) { return EMAIL_TYPE_STYLE[tipo] || EMAIL_TYPE_STYLE.Altro; }

function parseEmailJson(text) {
  const clean = (text || "").replace(/```json|```/g, "").trim();
  if (!clean) return null;
  try { const r = JSON.parse(clean); if (Array.isArray(r)) return r; } catch(_) {}
  const match = clean.match(/\[[\s\S]*\]/);
  if (match) { try { const r = JSON.parse(match[0]); if (Array.isArray(r)) return r; } catch(_) {} }
  return null;
}

async function analyzeEmailsWithAI(rawText, clientNames) {
  try {
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: `Sei un assistente commerciale per Comvitea SRL, azienda che produce e vende viteria e bulloneria speciale (viti, dadi, tiranti, prigionieri).

Analizza queste email ricevute e per ognuna estrai le informazioni. Se ci sono più email nel testo, analizzale tutte separatamente.

Lista clienti noti: ${clientNames.join(", ")}

Email da analizzare:
${rawText}

Rispondi SOLO in JSON array valido (no markdown, no backtick):
[{"mittente":"nome persona","azienda":"nome azienda","email":"indirizzo email","clienteAssociato":"nome esatto dal CRM o Nuovo cliente se non riconosciuto","oggetto":"oggetto email","data":"${TODAY}","tipo":"RdO|Ordine|Conferma|Sollecito|Info|Amministrativa|Altro","urgenza":"alta|media|bassa","riepilogo":"breve riepilogo in italiano del contenuto","prodotti":"prodotti menzionati se presenti"}]` }]
      })
    });
    if (!response.ok) return null;
    const data = await response.json();
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text || "").join("");
    return parseEmailJson(text);
  } catch (err) {
    console.error("[AI Email] Errore:", err);
    return null;
  }
}

function EmailAnalyzer({ clients, emailAnalysis, onNewAnalysis, onOpenClient }) {
  const [jsonText, setJsonText] = useState("");
  const [rawText, setRawText] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const importJsonArray = (arr, source) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      setError("Nessuna email trovata nel JSON.");
      return false;
    }
    onNewAnalysis({ id: Date.now(), data: TODAY, emails: arr });
    setSuccess(`${arr.length} email importate da ${source}`);
    setTimeout(() => setSuccess(null), 4000);
    return true;
  };

  const handleImportJson = () => {
    setError(null); setSuccess(null);
    const parsed = parseEmailJson(jsonText);
    if (parsed) {
      importJsonArray(parsed, "JSON incollato");
      setJsonText("");
      setShowJson(false);
    } else {
      setError("JSON non valido. Assicurati di incollare un array JSON valido ([{...}, ...]).");
    }
  };

  const handleClassifyRaw = async () => {
    if (!rawText.trim()) return;
    setLoading(true); setError(null); setSuccess(null);
    const clientNames = clients.map(c => c.name);
    const result = await analyzeEmailsWithAI(rawText, clientNames);
    setLoading(false);
    if (result && Array.isArray(result)) {
      importJsonArray(result, "classificazione AI");
      setRawText("");
      setShowRaw(false);
    } else {
      setError("Errore nell'analisi AI. Controlla la console.");
    }
  };

  const handleClipboardImport = async () => {
    setError(null); setSuccess(null);
    try {
      const clip = await navigator.clipboard.readText();
      if (!clip || !clip.trim()) { setError("Clipboard vuota."); return; }
      const parsed = parseEmailJson(clip);
      if (parsed) {
        importJsonArray(parsed, "clipboard");
      } else {
        setRawText(clip);
        setShowRaw(true);
        setShowJson(false);
        setSuccess("Testo copiato dalla clipboard — non è JSON. Puoi classificarlo con AI.");
      }
    } catch (err) {
      setError("Impossibile leggere la clipboard. Controlla i permessi del browser.");
    }
  };

  const findClient = (name) => {
    if (!name || name === "Nuovo cliente") return null;
    const low = name.toLowerCase();
    return clients.find(c => c.name.toLowerCase() === low || c.name.toLowerCase().includes(low) || low.includes(c.name.split(" ")[0].toLowerCase()));
  };

  const allEmails = emailAnalysis.flatMap(a => a.emails.map(e => ({ ...e, analysisDate: a.data })));

  return (<>
    <div className="page-header"><div><div className="page-title">Email</div><div className="page-subtitle">{allEmails.length} email analizzate · {emailAnalysis.length} analisi</div></div></div>

    <div className="card" style={{marginBottom:16,padding:20}}>
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        <button className="btn btn-primary" onClick={() => { setShowJson(true); setShowRaw(false); setError(null); setSuccess(null); }} disabled={loading}>
          📋 Incolla analisi email
        </button>
        <button className="btn btn-sm" onClick={() => { setShowRaw(true); setShowJson(false); setError(null); setSuccess(null); }} disabled={loading}>
          <I.FileText style={{width:12,height:12}}/> Incolla email grezze
        </button>
        <button className="btn btn-sm" onClick={handleClipboardImport} disabled={loading}>
          📧 Importa da clipboard
        </button>
      </div>

      {success && <div style={{marginTop:10,padding:8,background:"rgba(16,185,129,0.1)",border:"1px solid var(--success)",borderRadius:6,fontSize:11,color:"var(--success)"}}>{success}</div>}
      {error && <div style={{marginTop:10,padding:8,background:"var(--danger-soft)",border:"1px solid var(--danger)",borderRadius:6,fontSize:11,color:"var(--danger)"}}>{error}</div>}

      {showJson && (
        <div style={{marginTop:14,borderTop:"1px solid var(--border)",paddingTop:14}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div style={{fontSize:12,fontWeight:600}}>Incolla il JSON generato da Claude</div>
            <button className="btn btn-sm" onClick={() => { setShowJson(false); setJsonText(""); setError(null); }}><I.X style={{width:12,height:12}}/></button>
          </div>
          <div style={{fontSize:10,color:"var(--text-muted)",marginBottom:8}}>Chiedi a Claude: "analizza le email degli ultimi 3 giorni su Gmail e rispondi con un JSON array". Poi incolla qui il risultato.</div>
          <textarea
            className="input textarea"
            style={{minHeight:180,marginBottom:10,fontFamily:"'JetBrains Mono',monospace",fontSize:11}}
            value={jsonText}
            onChange={e => setJsonText(e.target.value)}
            placeholder='[{"mittente":"...", "azienda":"...", "clienteAssociato":"...", "oggetto":"...", "data":"2026-03-12", "tipo":"RdO", "urgenza":"alta", "riepilogo":"...", "prodotti":"..."}]'
          />
          <button className="btn btn-primary" onClick={handleImportJson} disabled={!jsonText.trim()}>
            <I.Check style={{width:14,height:14}}/> Importa JSON
          </button>
        </div>
      )}

      {showRaw && (
        <div style={{marginTop:14,borderTop:"1px solid var(--border)",paddingTop:14}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div style={{fontSize:12,fontWeight:600,color:"var(--text-secondary)"}}>Incolla email grezze per classificazione AI</div>
            <button className="btn btn-sm" onClick={() => { setShowRaw(false); setRawText(""); setError(null); }}><I.X style={{width:12,height:12}}/></button>
          </div>
          <textarea
            className="input textarea"
            style={{minHeight:120,marginBottom:8}}
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            placeholder="Incolla qui le email ricevute dai clienti (copia da Outlook o Gmail)..."
          />
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button className="btn btn-primary btn-sm" onClick={handleClassifyRaw} disabled={!rawText.trim() || loading}>
              <I.Sparkle style={{width:14,height:14}}/> Classifica con AI
            </button>
            {loading && <div className="ai-loading" style={{margin:0}}><I.Loader style={{width:14,height:14}}/> Analisi in corso...</div>}
          </div>
        </div>
      )}
    </div>

    {emailAnalysis.map(analysis => (
      <div key={analysis.id} style={{marginBottom:20}}>
        <div style={{fontSize:12,color:"var(--text-muted)",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
          <I.Clock style={{width:12,height:12}}/> Analisi del {analysis.data} · {analysis.emails.length} email
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {analysis.emails.map((em, i) => {
            const st = emailStyle(em.tipo);
            const urgCol = em.urgenza === "alta" ? "var(--danger)" : em.urgenza === "media" ? "var(--warning)" : "var(--text-muted)";
            const matchedClient = findClient(em.clienteAssociato);
            const isNew = !matchedClient && em.clienteAssociato !== "Nuovo cliente" ? false : !matchedClient;
            return (
              <div key={i} className="card" style={{padding:12,borderLeft:`3px solid ${st.color}`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span className="tag" style={{background:st.bg,color:st.color,fontSize:10}}>{st.emoji} {em.tipo}</span>
                    <span style={{fontSize:12,fontWeight:600}}>{em.oggetto || "Senza oggetto"}</span>
                  </div>
                  <span className="tag" style={{background:`${urgCol}20`,color:urgCol,fontSize:9}}>{em.urgenza}</span>
                </div>
                <div style={{fontSize:11,color:"var(--text-secondary)",marginBottom:4,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  <span>Da: <strong>{em.mittente}</strong></span>
                  {em.azienda && <span style={{color:"var(--text-muted)"}}>({em.azienda})</span>}
                  {em.email && <span style={{color:"var(--text-muted)",fontSize:10}}>{em.email}</span>}
                  <span>→</span>
                  {matchedClient ? (
                    <span style={{color:"var(--accent)",cursor:"pointer",textDecoration:"underline"}} onClick={() => onOpenClient(matchedClient)}>{matchedClient.name}</span>
                  ) : isNew ? (
                    <span style={{display:"inline-flex",alignItems:"center",gap:4}}><span className="tag" style={{background:"rgba(245,158,11,0.12)",color:"#F59E0B",fontSize:9}}>🆕 Nuovo</span>{em.clienteAssociato}</span>
                  ) : (
                    <span style={{color:"var(--text-muted)"}}>{em.clienteAssociato}</span>
                  )}
                </div>
                <div style={{fontSize:11,color:"var(--text-muted)",marginBottom:em.prodotti?4:0}}>{em.riepilogo}</div>
                {em.prodotti && <div style={{fontSize:10,color:"var(--info)",marginTop:2}}>Prodotti: {em.prodotti}</div>}
              </div>
            );
          })}
        </div>
      </div>
    ))}
    {emailAnalysis.length === 0 && !showJson && !showRaw && <div className="card" style={{textAlign:"center",padding:30,color:"var(--text-muted)"}}>Nessuna email analizzata. Clicca il bottone sopra per iniziare.</div>}
  </>);
}

function OutreachSection({ client, onUpdate }) {
  const c = client;
  const [showForm, setShowForm] = useState(false);
  const [oForm, setOForm] = useState({ dataInvio: TODAY, tipo: "presentazione", note: "" });

  if (c.outreach) {
    const o = c.outreach;
    const statoBadge = {
      inviata: { bg: "var(--info-soft)", color: "var(--info)", label: `📤 Inviata il ${fmtD(o.dataInvio)}` },
      risposta_ricevuta: { bg: "var(--success-soft)", color: "var(--success)", label: `✅ Risposta il ${o.dataRisposta ? fmtD(o.dataRisposta) : "—"}` },
      da_follow_up: { bg: "var(--warning-soft)", color: "var(--warning)", label: "⏰ Da ricontattare" },
      visita_fissata: { bg: "rgba(139,92,246,.15)", color: "#8B5CF6", label: "📅 Visita fissata" },
    }[o.stato] || { bg: "var(--info-soft)", color: "var(--info)", label: o.stato };
    return (
      <div className="detail-section">
        <div className="detail-section-title">📤 Outreach</div>
        <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span className="tag" style={{ background: statoBadge.bg, color: statoBadge.color, fontSize: 11 }}>{statoBadge.label}</span>
            <span className="tag tag-muted" style={{ fontSize: 10 }}>{o.tipo}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}><strong>Data invio:</strong> {fmtD(o.dataInvio)}</div>
          {o.note && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>{o.note}</div>}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {o.stato !== "risposta_ricevuta" && <button className="btn btn-sm" style={{ fontSize: 10, color: "var(--success)" }} onClick={() => onUpdate({ ...o, stato: "risposta_ricevuta", dataRisposta: TODAY })}>✅ Risposta ricevuta</button>}
          {o.stato !== "da_follow_up" && <button className="btn btn-sm" style={{ fontSize: 10, color: "var(--warning)" }} onClick={() => onUpdate({ ...o, stato: "da_follow_up" })}>⏰ Pianifica follow-up</button>}
          {o.stato !== "visita_fissata" && <button className="btn btn-sm" style={{ fontSize: 10, color: "#8B5CF6" }} onClick={() => onUpdate({ ...o, stato: "visita_fissata" })}>📅 Visita fissata</button>}
          <button className="btn btn-sm btn-danger" style={{ fontSize: 10 }} onClick={() => onUpdate(null)}>Rimuovi outreach</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-section">
      <div className="detail-section-title">📤 Outreach</div>
      {showForm ? (
        <div style={{ background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)", padding: 12 }}>
          <div className="form-row" style={{ marginBottom: 8 }}>
            <div className="form-group"><label className="form-label">Data invio</label><input className="input" type="date" value={oForm.dataInvio} onChange={e => setOForm(p => ({ ...p, dataInvio: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Tipo</label><select className="input select" value={oForm.tipo} onChange={e => setOForm(p => ({ ...p, tipo: e.target.value }))}><option value="presentazione">Presentazione</option><option value="follow-up">Follow-up</option><option value="proposta">Proposta visita</option></select></div>
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}><label className="form-label">Note</label><textarea className="input textarea" style={{ minHeight: 50 }} value={oForm.note} onChange={e => setOForm(p => ({ ...p, note: e.target.value }))} /></div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-primary btn-sm" onClick={() => { onUpdate({ dataInvio: oForm.dataInvio, tipo: oForm.tipo, note: oForm.note, stato: "inviata", dataRisposta: null }); }}>Salva</button>
            <button className="btn btn-sm" onClick={() => setShowForm(false)}>Annulla</button>
          </div>
        </div>
      ) : (
        <button className="btn btn-sm" onClick={() => setShowForm(true)}>📤 Registra email inviata</button>
      )}
    </div>
  );
}

function NewClientModal({onClose,onSave}) {
  const [f,setF]=useState({name:"",contact:"",email:"",phone:"",city:"",province:"",sector:"",agente:"",priority:"media",budget2026:0,notes:""});
  const u=(k,v)=>setF(o=>({...o,[k]:v}));
  return <Modal title="Nuovo Cliente" onClose={onClose} footer={<><button className="btn btn-sm" onClick={onClose}>Annulla</button><button className="btn btn-primary btn-sm" onClick={()=>onSave(f)} disabled={!f.name}><I.Check/> Salva</button></>}>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div className="form-row"><div className="form-group"><label className="form-label">Ragione Sociale *</label><input className="input" value={f.name} onChange={e=>u("name",e.target.value)}/></div><div className="form-group"><label className="form-label">Referente</label><input className="input" value={f.contact} onChange={e=>u("contact",e.target.value)}/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Email</label><input className="input" value={f.email} onChange={e=>u("email",e.target.value)}/></div><div className="form-group"><label className="form-label">Telefono</label><input className="input" value={f.phone} onChange={e=>u("phone",e.target.value)}/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Città</label><input className="input" value={f.city} onChange={e=>u("city",e.target.value)}/></div><div className="form-group"><label className="form-label">Provincia</label><input className="input" value={f.province} onChange={e=>u("province",e.target.value)}/></div></div>
      <div className="form-row"><div className="form-group"><label className="form-label">Settore</label><input className="input" value={f.sector} onChange={e=>u("sector",e.target.value)}/></div><div className="form-group"><label className="form-label">Budget 2026</label><input className="input" type="number" value={f.budget2026} onChange={e=>u("budget2026",+e.target.value)}/></div></div>
      <div className="form-group"><label className="form-label">Note</label><textarea className="input textarea" value={f.notes} onChange={e=>u("notes",e.target.value)}/></div>
    </div>
  </Modal>;
}

// ─── MAIN APP ───
export default function CRMApp() {
  const [clients,setClients]=useState(()=>{
    try {
      const s=localStorage.getItem("crm_clients");
      if(s){
        const parsed=JSON.parse(s);
        return parsed.map(c=>{
          const original=INITIAL_CLIENTS.find(o=>o.id===c.id);
          return {...original,...c,venditeActual2026:c.venditeActual2026??original?.venditeActual2026??0,coords:original?.coords??c.coords??null,city:original?.city??c.city,province:original?.province??c.province,outreach:c.outreach!==null&&c.outreach!==undefined?c.outreach:(original?.outreach??null)};
        });
      }
      return INITIAL_CLIENTS;
    } catch { return INITIAL_CLIENTS; }
  });
  const [sec,setSec]=useState("dashboard");
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [showNew,setShowNew]=useState(false);
  const [calMonth,setCalMonth]=useState(new Date(2026,2,1)); // March 2026
  const [visitNotes,setVisitNotes]=useState(()=>{
    try { const s=localStorage.getItem("crm_visitNotes"); return s?JSON.parse(s):{}; } catch { return {}; }
  }); // { eventId: { raw: "...", ai: {...} } }
  const [expandedNoteId,setExpandedNoteId]=useState(null);
  const [expandedVisitNotes,setExpandedVisitNotes]=useState({});
  const [emailAnalysis,setEmailAnalysis]=useState(()=>{
    try { const s=localStorage.getItem("crm_emailAnalysis"); return s?JSON.parse(s):[]; } catch { return []; }
  });

  // ─── GOOGLE CALENDAR STATE ───
  const [gcalEvents,setGcalEvents]=useState(()=>{
    try { const s=localStorage.getItem("crm_gcalEvents"); return s?JSON.parse(s):null; } catch { return null; }
  });
  const [gcalToken,setGcalToken]=useState(()=>localStorage.getItem("crm_gcalToken")||null);
  const [gcalRefresh,setGcalRefresh]=useState(()=>localStorage.getItem("crm_gcalRefresh")||null);
  const [gcalConnected,setGcalConnected]=useState(()=>!!localStorage.getItem("crm_gcalToken"));
  const [gcalLoading,setGcalLoading]=useState(false);
  const [gcalError,setGcalError]=useState(null);

  // Active calendar events: Google Calendar if connected, otherwise fallback
  const calendarEvents = gcalEvents || FALLBACK_CALENDAR_EVENTS;

  // Check URL for OAuth callback tokens on mount
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const token = params.get("gcal_token");
    const refresh = params.get("gcal_refresh");
    if (token) {
      setGcalToken(token);
      localStorage.setItem("crm_gcalToken", token);
      setGcalConnected(true);
      if (refresh) {
        setGcalRefresh(refresh);
        localStorage.setItem("crm_gcalRefresh", refresh);
      }
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Fetch events with the new token
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth()-3, 1).toISOString().slice(0,10);
      const to = new Date(now.getFullYear(), now.getMonth()+4, 0).toISOString().slice(0,10);
      fetchGoogleCalendarEvents(token, from, to)
        .then(events => setGcalEvents(events))
        .catch(e => setGcalError(e.message));
    }
  },[]);

  useEffect(()=>{
    if(gcalEvents) try { localStorage.setItem("crm_gcalEvents",JSON.stringify(gcalEvents)); } catch {}
  },[gcalEvents]);

  const connectGoogleCalendar = () => {
    window.location.href = "/api/gcal/auth";
  };

  const fetchWithRefresh = async (token, from, to) => {
    try {
      return await fetchGoogleCalendarEvents(token, from, to);
    } catch (e) {
      if (e.message === "TOKEN_EXPIRED" && gcalRefresh) {
        const newToken = await refreshGcalToken(gcalRefresh);
        setGcalToken(newToken);
        localStorage.setItem("crm_gcalToken", newToken);
        return await fetchGoogleCalendarEvents(newToken, from, to);
      }
      throw e;
    }
  };

  const syncGoogleCalendar = async () => {
    if (!gcalToken) { setGcalError("Token mancante, riconnetti Google Calendar"); return; }
    setGcalLoading(true); setGcalError(null);
    try {
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth()-3, 1).toISOString().slice(0,10);
      const to = new Date(now.getFullYear(), now.getMonth()+4, 0).toISOString().slice(0,10);
      const events = await fetchWithRefresh(gcalToken, from, to);
      setGcalEvents(events);
    } catch(e) { setGcalError(e.message||"Errore sincronizzazione"); }
    finally { setGcalLoading(false); }
  };

  const disconnectGoogleCalendar = () => {
    setGcalConnected(false);
    setGcalToken(null);
    setGcalRefresh(null);
    setGcalEvents(null);
    localStorage.removeItem("crm_gcalToken");
    localStorage.removeItem("crm_gcalRefresh");
    localStorage.removeItem("crm_gcalEvents");
  };

  useEffect(()=>{ try { localStorage.setItem("crm_clients",JSON.stringify(clients)); } catch {} },[clients]);
  useEffect(()=>{ try { localStorage.setItem("crm_visitNotes",JSON.stringify(visitNotes)); } catch {} },[visitNotes]);
  useEffect(()=>{ try { localStorage.setItem("crm_emailAnalysis",JSON.stringify(emailAnalysis)); } catch {} },[emailAnalysis]);

  const saveVisitNote = (eventId, raw, ai) => {
    setVisitNotes(prev => ({ ...prev, [eventId]: { raw, ai } }));
  };

  // Map events to clients
  const eventsByClient = useMemo(()=>{
    const map={};
    calendarEvents.forEach(ev=>{
      const cid=matchEventToClient(ev,clients);
      if(cid){if(!map[cid])map[cid]=[];map[cid].push(ev);}
    });
    return map;
  },[clients,calendarEvents]);

  // For each client, get last visit and next visit
  const visitInfo = useMemo(()=>{
    const info={};
    clients.forEach(c=>{
      const evts=eventsByClient[c.id]||[];
      const past=evts.filter(e=>e.date<=TODAY).sort((a,b)=>b.date.localeCompare(a.date));
      const future=evts.filter(e=>e.date>TODAY).sort((a,b)=>a.date.localeCompare(b.date));
      info[c.id]={ lastVisit:past[0]||null, nextVisit:future[0]||null, totalVisits:evts.length };
    });
    return info;
  },[clients,eventsByClient]);

  const alerts=useMemo(()=>getAlerts(clients,eventsByClient,emailAnalysis),[clients,eventsByClient,emailAnalysis]);
  const visitRoutes=useMemo(()=>suggestVisitRoutes(clients,eventsByClient),[clients,eventsByClient]);
  const urgent=alerts.filter(a=>a.type==="danger"||a.type==="warning").length;
  const filtered=useMemo(()=>{
    if(!search)return clients;const q=search.toLowerCase();
    return clients.filter(c=>c.name.toLowerCase().includes(q)||c.contact.toLowerCase().includes(q)||c.city.toLowerCase().includes(q)||c.sector.toLowerCase().includes(q)||c.agente.toLowerCase().includes(q));
  },[clients,search]);

  const totalBudget=clients.reduce((s,c)=>s+c.budget2026,0);
  const totalFatt=clients.reduce((s,c)=>s+c.fatturato2025,0);
  const totalActual2026=clients.reduce((s,c)=>s+(c.venditeActual2026||0),0);
  const active=clients.filter(c=>c.status==="attivo").length;
  const openClient=(c)=>{setSel(c);setSec("clients");};

  const nav=[
    {id:"dashboard",label:"Dashboard",icon:I.Home},
    {id:"clients",label:"Clienti",icon:I.Users},
    {id:"calendar",label:"Calendario",icon:I.Calendar},
    {id:"email",label:"Email",icon:I.Mail},
    {id:"alerts",label:"Alert",icon:I.Bell,badge:urgent||null},
    {id:"pipeline",label:"Pipeline",icon:I.Pipeline},
    {id:"routes",label:"Giri Visita",icon:I.MapPin},
    {id:"reports",label:"Report",icon:I.Chart},
  ];

  // ─── CALENDAR VIEW ───
  const renderCalendar = () => {
    const y=calMonth.getFullYear(), m=calMonth.getMonth();
    const first=new Date(y,m,1), last=new Date(y,m+1,0);
    const startDay=(first.getDay()+6)%7;
    const days=[]; const prev=new Date(y,m,0);
    for(let i=startDay-1;i>=0;i--) days.push({d:prev.getDate()-i,o:true});
    for(let i=1;i<=last.getDate();i++) days.push({d:i,o:false});
    while(days.length<42) days.push({d:days.length-startDay-last.getDate()+1,o:true});

    const monthStr = `${y}-${String(m+1).padStart(2,"0")}`;
    const monthEvents = calendarEvents.filter(e=>e.date.startsWith(monthStr)).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));

    // Clients that need a visit (suggestion)
    const needVisit = clients.filter(c=>{
      if(c.status!=="attivo"||c.budget2026<=0) return false;
      const score=clientScore(c); const freq=visitFrequency(score);
      const evts=eventsByClient[c.id]||[];
      const future=evts.filter(e=>e.date>TODAY);
      if(future.length>0) return false;
      const past=evts.filter(e=>e.date<=TODAY&&(e.type==="visita"||e.type==="consegna"));
      if(past.length===0) return true;
      const lastD=past.sort((a,b)=>b.date.localeCompare(a.date))[0].date;
      return daysDiff(lastD,TODAY)>=freq.days;
    }).sort((a,b)=>clientScore(b)-clientScore(a)).slice(0,8);

    const dayNames=["Lun","Mar","Mer","Gio","Ven","Sab","Dom"];
    const monthNames=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];

    return (<>
      <div className="page-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <div className="page-title">Calendario Visite</div>
          <div className="page-subtitle">
            {monthEvents.length} eventi questo mese · {gcalEvents ? "sincronizzato con Google Calendar" : "dati statici (collega Google Calendar)"}
          </div>
          {gcalError && <div style={{color:"#EF4444",fontSize:11,marginTop:4}}>{gcalError}</div>}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {gcalEvents ? (<>
            <button className="btn btn-sm" onClick={syncGoogleCalendar} disabled={gcalLoading} style={{display:"inline-flex",alignItems:"center",gap:4}}>
              <I.Loader style={{width:12,height:12,animation:gcalLoading?"spin 1s linear infinite":"none"}}/> {gcalLoading?"Sync...":"Sincronizza"}
            </button>
            <button className="btn btn-sm" onClick={disconnectGoogleCalendar} style={{color:"var(--text-muted)",fontSize:11}}>Disconnetti</button>
          </>) : (
            <button className="btn btn-primary btn-sm" onClick={connectGoogleCalendar} disabled={gcalLoading} style={{display:"inline-flex",alignItems:"center",gap:4}}>
              <I.Calendar style={{width:14,height:14}}/> {gcalLoading?"Connessione...":"Collega Google Calendar"}
            </button>
          )}
        </div>
      </div>
      <div className="card-grid card-grid-2">
        <div className="card">
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <button className="btn btn-sm" onClick={()=>setCalMonth(new Date(y,m-1,1))}>←</button>
            <div style={{fontSize:16,fontWeight:600,minWidth:160}}>{monthNames[m]} {y}</div>
            <button className="btn btn-sm" onClick={()=>setCalMonth(new Date(y,m+1,1))}>→</button>
          </div>
          <div className="cal-grid">
            {dayNames.map(dn=><div key={dn} className="cal-header">{dn}</div>)}
            {days.map((dy,i)=>{
              const dateStr=dy.o?null:`${y}-${String(m+1).padStart(2,"0")}-${String(dy.d).padStart(2,"0")}`;
              const hasEvent=dateStr&&calendarEvents.some(e=>e.date===dateStr);
              const isToday=dateStr===TODAY;
              return <div key={i} className={`cal-day${dy.o?" other":""}${isToday?" today":""}`}>{dy.d}{hasEvent&&<div className="cal-dot" style={{background:"var(--accent)"}}/>}</div>;
            })}
          </div>
        </div>
        <div className="card">
          <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>Eventi del mese</div>
          {monthEvents.map(ev=>{
            const isPast=ev.date<TODAY;
            const cid=matchEventToClient(ev,clients);
            const client=cid?clients.find(c=>c.id===cid):null;
            const typeCol=TYPE_COLORS[ev.type]||"var(--accent)";
            const note=visitNotes[ev.id];
            const isExpanded=expandedNoteId===ev.id;
            return <div key={ev.id} style={{marginBottom:10}}>
              <div className={`cal-event-item ${isPast?"past":"future"}`} style={{borderLeftColor:typeCol,marginBottom:0}} onClick={()=>client&&openClient(client)}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,marginBottom:2}}>{ev.summary}</div>
                  <div style={{fontSize:11,color:"var(--text-muted)",display:"flex",gap:8,flexWrap:"wrap"}}>
                    <span>{fmtD(ev.date)}{ev.time?` · ${ev.time}`:""}</span>
                    <span className="tag" style={{background:`${typeCol}20`,color:typeCol,fontSize:9}}>{TYPE_LABELS[ev.type]||ev.type}</span>
                    {client&&<span style={{color:"var(--accent)"}}>{client.name.split(" ")[0]}</span>}
                  </div>
                  {ev.location&&<div style={{fontSize:10,color:"var(--text-muted)",marginTop:3,display:"flex",alignItems:"center",gap:4}}><I.MapPin style={{width:10,height:10}}/>{ev.location.slice(0,60)}</div>}
                </div>
                {isPast?<span className="tag tag-muted">Fatto</span>:<span className="tag tag-info">Prossimo</span>}
              </div>
              {isPast && <div style={{marginTop:4}}>
                <button
                  className="btn btn-sm"
                  style={{fontSize:10,display:"inline-flex",alignItems:"center",gap:4}}
                  onClick={e=>{e.stopPropagation();setExpandedNoteId(isExpanded?null:ev.id);}}
                >
                  {note ? <>📝 Note salvate <span style={{background:"var(--accent)",color:"white",borderRadius:8,fontSize:9,padding:"1px 5px"}}>✓</span></> : "📝 Note"}
                  <span style={{fontSize:9,color:"var(--text-muted)"}}>{isExpanded?"▲":"▼"}</span>
                </button>
                {isExpanded && <VisitNoteEditor
                  eventId={ev.id}
                  clientName={client?.name||ev.summary}
                  eventSummary={ev.summary}
                  eventDate={ev.date}
                  existingRaw={note?.raw||""}
                  existingAI={note?.ai||null}
                  onSave={saveVisitNote}
                />}
              </div>}
            </div>;
          })}
          {monthEvents.length===0&&<div style={{textAlign:"center",padding:24,color:"var(--text-muted)"}}>Nessun evento questo mese</div>}
        </div>
      </div>
      {needVisit.length>0&&<div className="card" style={{marginTop:14}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>📅 Suggerimenti: clienti da visitare</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
          {needVisit.map(c=>{
            const score=clientScore(c);const freq=visitFrequency(score);
            const vi=visitInfo[c.id];
            return <div key={c.id} className="visit-suggest" onClick={()=>openClient(c)} style={{cursor:"pointer"}}>
              <I.Calendar/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:12}}>{c.name.length>30?c.name.slice(0,28)+"…":c.name}</div>
                <div style={{fontSize:10,opacity:.8}}>
                  {vi.lastVisit?`Ultima: ${fmtD(vi.lastVisit.date)} (${daysDiff(vi.lastVisit.date,TODAY)}gg fa)`:"Mai visitato"} · Freq: {freq.label}
                </div>
              </div>
              <ScoreBar score={score}/>
            </div>;
          })}
        </div>
      </div>}
    </>);
  };

  // ─── DASHBOARD ───
  const renderDashboard = () => {
    const top=[...clients].sort((a,b)=>b.budget2026-a.budget2026).slice(0,6);
    return (<>
      <div className="page-header"><div><div className="page-title">Dashboard</div><div className="page-subtitle">Budget 2026 — Giacomo Fusetti</div></div></div>
      <div className="card-grid card-grid-5" style={{marginBottom:20}}>
        <div className="card stat-card"><div className="stat-value" style={{color:"var(--accent)"}}>{clients.length}</div><div className="stat-label">Clienti</div></div>
        <div className="card stat-card"><div className="stat-value" style={{color:"var(--success)"}}>{active}</div><div className="stat-label">Attivi</div></div>
        <div className="card stat-card"><div className="stat-value" style={{color:"var(--warning)",fontSize:20}}>{fmtC(totalBudget)}</div><div className="stat-label">Budget 2026</div></div>
        <div className="card stat-card"><div className="stat-value" style={{color:"var(--success)",fontSize:20}}>{fmtC(totalActual2026)}</div><div className="stat-label">Vendite ACT 2026</div></div>
        <div className="card stat-card"><div className="stat-value" style={{color:"var(--info)",fontSize:20}}>{fmtC(totalFatt)}</div><div className="stat-label">Fatt. 2025</div></div>
        {emailDaGestire>0&&<div className="card stat-card" style={{cursor:"pointer"}} onClick={()=>setSec("email")}><div className="stat-value" style={{color:"var(--danger)"}}>{emailDaGestire}</div><div className="stat-label">RdO aperte</div></div>}
      </div>
      <div className="card-grid card-grid-2">
        <div className="card">
          <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>Top Clienti Budget 2026</div>
          {top.map(c=>(<div key={c.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)",cursor:"pointer"}} onClick={()=>openClient(c)}>
            <div style={{width:30,height:30,borderRadius:8,background:`${PCOL[c.priority]}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:PCOL[c.priority],flexShrink:0}}>{c.name[0]}</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div><div style={{fontSize:11,color:"var(--text-muted)"}}>{c.city}</div></div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:"var(--success)"}}>{fmtC(c.budget2026)}</div>
          </div>))}
        </div>
        <div className="card">
          <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>Alert ({alerts.length})</div>
          {alerts.slice(0,6).map((a,i)=>{const Ic=I[a.icon]||I.Bell;return(<div key={i} className={`alert-item ${a.type}`} style={{marginBottom:6}} onClick={()=>openClient(a.client)}><div className="alert-icon"><Ic/></div><div style={{fontSize:12,lineHeight:1.4}}>{a.message}</div></div>);})}
        </div>
      </div>
      {visitRoutes.length>0&&<div className="card" style={{marginTop:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:600}}>Prossimi giri consigliati</div>
          <button className="btn btn-sm" onClick={()=>setSec("routes")}><I.MapPin style={{width:12,height:12}}/> Vedi tutti</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {visitRoutes.slice(0,3).map(r=>{
            const urgCol=r.avgUrgency>=80?"var(--danger)":r.avgUrgency>=40?"var(--warning)":"var(--success)";
            return <div key={r.zoneId} style={{background:"var(--bg-elevated)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:12,cursor:"pointer"}} onClick={()=>setSec("routes")}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><I.MapPin style={{width:14,height:14,color:urgCol}}/><span style={{fontSize:13,fontWeight:600}}>{r.zoneName}</span></div>
              <div style={{fontSize:11,color:"var(--text-muted)",marginBottom:4}}>{r.clients.length} clienti · ~{r.totalDistKm} km</div>
              <div style={{fontSize:12,fontFamily:"'JetBrains Mono',monospace",color:"var(--success)",fontWeight:600}}>{fmtC(r.totalBudget)}</div>
              <div style={{marginTop:6}}><span className="tag" style={{background:`${urgCol}20`,color:urgCol,fontSize:9}}>{r.avgUrgency>=80?"Urgente":r.avgUrgency>=40?"Da pianificare":"Ok"}</span></div>
            </div>;
          })}
        </div>
      </div>}
    </>);
  };

  // ─── CLIENTS ───
  const renderClients = () => (<>
    <div className="page-header">
      <div><div className="page-title">Clienti</div><div className="page-subtitle">{filtered.length} clienti</div></div>
      <div style={{display:"flex",gap:8}}><div className="search-bar"><I.Search/><input placeholder="Cerca..." value={search} onChange={e=>setSearch(e.target.value)}/></div><button className="btn btn-primary" onClick={()=>setShowNew(true)}><I.Plus/> Nuovo</button></div>
    </div>
    <div className="card" style={{overflow:"auto"}}>
      <table><thead><tr><th>Azienda</th><th>Referente</th><th>Città</th><th>Priorità</th><th>Fatt.25</th><th>Budget 26</th><th>ACT 2026</th><th>Δ</th><th>Outreach</th><th>Ultima visita</th><th>Score</th></tr></thead>
      <tbody>{filtered.map(c=>{const vi=visitInfo[c.id];return(
        <tr key={c.id} onClick={()=>setSel(c)}>
          <td><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:7,background:`${PCOL[c.priority]}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:PCOL[c.priority],flexShrink:0}}>{c.name[0]}</div><div style={{fontWeight:600,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div></div></td>
          <td style={{fontSize:11,maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.contact||"—"}</td>
          <td style={{fontSize:11}}>{c.city}</td>
          <td><PTag p={c.priority}/></td>
          <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600,fontSize:11}}>{c.fatturato2025>0?fmtC(c.fatturato2025):"—"}</td>
          <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600,fontSize:11,color:c.budget2026>0?"var(--success)":"var(--text-muted)"}}>{c.budget2026>0?fmtC(c.budget2026):"—"}</td>
          <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600,fontSize:11,color:(c.venditeActual2026||0)>0?"var(--success)":(c.budget2026>0?"var(--danger)":"var(--text-muted)")}}>{(c.venditeActual2026||0)>0?fmtC(c.venditeActual2026):(c.budget2026>0?"€ 0":"—")}</td>
          <td><DTag d={c.delta}/></td>
          <td style={{fontSize:11}}>{c.outreach?(()=>{const o=c.outreach;const gg=daysDiff(o.dataInvio,TODAY);if(o.stato==="inviata"&&gg>5)return<span className="tag tag-warning" style={{fontSize:9}}>⏰ {gg}gg</span>;if(o.stato==="inviata")return<span className="tag tag-info" style={{fontSize:9}}>📤</span>;if(o.stato==="risposta_ricevuta")return<span className="tag tag-success" style={{fontSize:9}}>✅</span>;if(o.stato==="da_follow_up")return<span className="tag tag-warning" style={{fontSize:9}}>⏰</span>;if(o.stato==="visita_fissata")return<span className="tag" style={{background:"rgba(139,92,246,.15)",color:"#8B5CF6",fontSize:9}}>📅</span>;return null;})():null}</td>
          <td style={{fontSize:11}}>{vi.lastVisit?<span style={{color:daysDiff(vi.lastVisit.date,TODAY)>30?"var(--warning)":"var(--text-secondary)"}}>{fmtD(vi.lastVisit.date)}</span>:<span style={{color:"var(--text-muted)"}}>—</span>}</td>
          <td><ScoreBar score={clientScore(c)}/></td>
        </tr>
      );})}</tbody></table>
    </div>
  </>);

  // ─── ALERTS ───
  const renderAlerts = () => (<>
    <div className="page-header"><div><div className="page-title">Centro Alert</div><div className="page-subtitle">{alerts.length} notifiche</div></div></div>
    <div className="card" style={{display:"flex",flexDirection:"column",gap:6}}>
      {alerts.map((a,i)=>{const Ic=I[a.icon]||I.Bell;return(
        <div key={i} className={`alert-item ${a.type}`} onClick={()=>openClient(a.client)}>
          <div className="alert-icon"><Ic/></div><div style={{flex:1}}><div style={{fontSize:12,lineHeight:1.4}}>{a.message}</div><div style={{fontSize:10,color:"var(--text-muted)",marginTop:3}}>{a.client.city} · {a.client.agente}</div></div>
          <I.ArrowRight style={{width:14,height:14,color:"var(--text-muted)"}}/>
        </div>
      );})}
    </div>
  </>);

  // ─── PIPELINE ───
  const renderPipeline = () => (<>
    <div className="page-header"><div><div className="page-title">Pipeline</div></div></div>
    <div className="pipeline-board">{PIPELINE_STAGES.map(st=>{
      const sc=clients.filter(c=>c.pipelineStage===st.id);const sv=sc.reduce((s,c)=>s+c.budget2026,0);
      return <div key={st.id} className="pipeline-col">
        <div className="pipeline-col-header"><div className="pipeline-col-title"><div className="dot" style={{background:st.color}}/>{st.label}</div><span className="pipeline-count">{sc.length}</span></div>
        {sc.map(c=><div key={c.id} className="pipeline-card" onClick={()=>openClient(c)}><div className="pipeline-card-name">{c.name}</div><div className="pipeline-card-sub">{c.contact||c.city}</div><div className="pipeline-card-value">{c.budget2026>0?fmtC(c.budget2026):"—"}</div></div>)}
        {sc.length>0&&<div style={{fontSize:11,color:"var(--text-muted)",textAlign:"center",paddingTop:6,borderTop:"1px solid var(--border)",fontFamily:"'JetBrains Mono',monospace"}}>Tot: {fmtC(sv)}</div>}
      </div>;
    })}</div>
  </>);

  // ─── EMAIL ───
  const addEmailAnalysis = (analysis) => {
    setEmailAnalysis(prev => [analysis, ...prev]);
  };
  const renderEmail = () => <EmailAnalyzer clients={clients} emailAnalysis={emailAnalysis} onNewAnalysis={addEmailAnalysis} onOpenClient={openClient} />;

  // RdO aperte negli ultimi 7 giorni
  const emailDaGestire = useMemo(() => {
    const cutoff = new Date(TODAY);
    cutoff.setDate(cutoff.getDate() - 7);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return emailAnalysis
      .filter(a => a.data >= cutoffStr)
      .flatMap(a => a.emails)
      .filter(e => e.tipo === "RdO")
      .length;
  }, [emailAnalysis]);

  // ─── GIRI VISITA ───
  const renderRoutes = () => {
    const urgCol = (u) => u >= 80 ? "var(--danger)" : u >= 40 ? "var(--warning)" : "var(--success)";
    return (<>
      <div className="page-header"><div><div className="page-title">Giri Visita</div><div className="page-subtitle">{visitRoutes.length} giri suggeriti · {visitRoutes.reduce((s,r)=>s+r.clients.length,0)} clienti da visitare</div></div></div>
      {visitRoutes.length === 0 && <div className="card" style={{textAlign:"center",padding:40,color:"var(--text-muted)"}}>Tutti i clienti sono in regola con le visite!</div>}
      {visitRoutes.map(route => (
        <div key={route.zoneId} className="route-card">
          <div className="route-header">
            <div className="route-zone-name">
              <I.MapPin style={{width:18,height:18,color:urgCol(route.avgUrgency)}}/>
              {route.zoneName}
              <span className="tag" style={{background:`${urgCol(route.avgUrgency)}20`,color:urgCol(route.avgUrgency),fontSize:10}}>
                {route.avgUrgency >= 80 ? "Urgente" : route.avgUrgency >= 40 ? "Da pianificare" : "Ok"}
              </span>
            </div>
            <div className="route-meta">
              <div className="route-meta-item"><I.Users style={{width:12,height:12}}/>{route.clients.length} clienti</div>
              <div className="route-meta-item" style={{fontFamily:"'JetBrains Mono',monospace",color:"var(--success)"}}>{fmtC(route.totalBudget)}</div>
              {route.totalDistKm > 0 && <div className="route-meta-item">~{route.totalDistKm} km</div>}
            </div>
          </div>
          {route.clients.map((c, i) => {
            const score = clientScore(c);
            const vi = visitInfo[c.id];
            const daysSince = vi.lastVisit ? daysDiff(vi.lastVisit.date, TODAY) : null;
            return (
              <div key={c.id} className="route-client-row" onClick={() => openClient(c)}>
                <div className="route-step">{i + 1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                  <div style={{fontSize:10,color:"var(--text-muted)",display:"flex",gap:8,flexWrap:"wrap"}}>
                    <span>{c.city} ({c.province})</span>
                    <span>{c.contact || "—"}</span>
                    {daysSince !== null ? <span style={{color:daysSince>50?"var(--danger)":"var(--warning)"}}>Ultima visita: {daysSince}gg fa</span> : <span style={{color:"var(--danger)"}}>Mai visitato</span>}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"var(--success)",fontWeight:600}}>{fmtC(c.budget2026)}</div>
                  <ScoreBar score={score}/>
                </div>
              </div>
            );
          })}
          <div className="route-actions">
            <a href={buildGoogleMapsUrl(route.clients)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{textDecoration:"none"}}>
              <I.MapPin style={{width:12,height:12}}/> Apri su Google Maps
            </a>
            <button className="btn btn-sm" disabled style={{opacity:.5}}>
              <I.Calendar style={{width:12,height:12}}/> Pianifica sul calendario
            </button>
          </div>
        </div>
      ))}
    </>);
  };

  // ─── REPORTS ───
  const renderReports = () => {
    const byA=[...new Set(clients.map(c=>c.agente))].map(a=>({a,n:clients.filter(c=>c.agente===a).length,b:clients.filter(c=>c.agente===a).reduce((s,c)=>s+c.budget2026,0)})).sort((a,b)=>b.b-a.b);
    const byS=[...new Set(clients.map(c=>c.sector))].map(s=>({s,n:clients.filter(c=>c.sector===s).length,b:clients.filter(c=>c.sector===s).reduce((s2,c)=>s2+c.budget2026,0)})).sort((a,b)=>b.b-a.b);
    const mA=Math.max(...byA.map(a=>a.b),1);const mS=Math.max(...byS.map(s=>s.b),1);
    const cols=["#6366F1","#8B5CF6","#EC4899","#F59E0B","#10B981","#3B82F6","#EF4444","#14B8A6","#F97316"];
    return (<>
      <div className="page-header"><div><div className="page-title">Report</div></div></div>
      <div className="card-grid card-grid-2">
        <div className="card"><div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Budget per Agente</div><div className="report-bar-chart">{byA.map((a,i)=><div key={a.a} className="report-bar-row"><div className="report-bar-label">{a.a.split(" ")[0]}</div><div className="report-bar"><div className="report-bar-fill" style={{width:`${(a.b/mA)*100}%`,background:cols[i%9]}}>{a.n}</div></div><div className="report-bar-value">{fmtC(a.b)}</div></div>)}</div></div>
        <div className="card"><div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Budget per Settore</div><div className="report-bar-chart">{byS.map((s,i)=><div key={s.s} className="report-bar-row"><div className="report-bar-label">{s.s.split("/")[0]}</div><div className="report-bar"><div className="report-bar-fill" style={{width:`${(s.b/mS)*100}%`,background:cols[i%9]}}>{s.n}</div></div><div className="report-bar-value">{fmtC(s.b)}</div></div>)}</div></div>
        <div className="card"><div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Top Score</div><div className="report-bar-chart">{[...clients].filter(c=>c.status==="attivo").sort((a,b)=>clientScore(b)-clientScore(a)).slice(0,10).map(c=><div key={c.id} className="report-bar-row"><div className="report-bar-label">{c.name.split(" ")[0]}</div><div className="report-bar"><div className="report-bar-fill" style={{width:`${clientScore(c)}%`,background:clientScore(c)>=70?"var(--success)":clientScore(c)>=40?"var(--warning)":"var(--danger)"}}/></div><div className="report-bar-value">{clientScore(c)}/100</div></div>)}</div></div>
        <div className="card"><div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Vendite Actual 2026 per Cliente</div><div className="report-bar-chart">{(()=>{const ac=[...clients].filter(c=>(c.venditeActual2026||0)>0).sort((a,b)=>b.venditeActual2026-a.venditeActual2026);const mAc=Math.max(...ac.map(c=>c.venditeActual2026),1);return ac.map((c,i)=><div key={c.id} className="report-bar-row"><div className="report-bar-label">{c.name.split(" ")[0]}</div><div className="report-bar"><div className="report-bar-fill" style={{width:`${(c.venditeActual2026/mAc)*100}%`,background:cols[i%9]}}></div></div><div className="report-bar-value">{fmtC(c.venditeActual2026)}</div></div>);})()}</div></div>
        <div className="card"><div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Riepilogo</div><div style={{display:"flex",flexDirection:"column",gap:12}}>{[["Budget medio",fmtC(totalBudget/clients.length)],["Alta priorità",clients.filter(c=>c.priority==="alta").length],["Attivi",active],["Inattivi",clients.filter(c=>c.status==="inattivo").length],["A rischio",clients.filter(c=>c.pipelineStage==="a_rischio").length],["Crescita vs 2025",`${Math.round(((totalBudget-totalFatt)/totalFatt)*100)}%`]].map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",paddingBottom:10,borderBottom:"1px solid var(--border)"}}><span style={{fontSize:12,color:"var(--text-secondary)"}}>{l}</span><span style={{fontSize:14,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{v}</span></div>)}</div></div>
      </div>
    </>);
  };

  // ─── CLIENT DETAIL ───
  const renderDetail = () => {
    if(!sel)return null; const c=sel; const vi=visitInfo[c.id]; const evts=eventsByClient[c.id]||[];
    const score=clientScore(c); const freq=visitFrequency(score);
    return <Modal title={c.name} onClose={()=>setSel(null)} footer={<><button className="btn btn-danger btn-sm" onClick={()=>{if(confirm("Eliminare?")){setClients(p=>p.filter(x=>x.id!==c.id));setSel(null);}}}><I.Trash/> Elimina</button><button className="btn btn-sm" onClick={()=>setSel(null)}>Chiudi</button></>}>
      <div className="detail-section">
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
          <div style={{width:50,height:50,borderRadius:12,background:"var(--accent-soft)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:"var(--accent)"}}>{c.name[0]}</div>
          <div style={{flex:1}}><div style={{fontSize:17,fontWeight:700}}>{c.name}</div><div style={{fontSize:13,color:"var(--text-muted)"}}>{c.contact||"Nessun referente"}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"var(--text-muted)",marginBottom:3}}>SCORE</div><ScoreBar score={score}/></div>
        </div>
        <div className="detail-row"><div className="detail-field"><div className="detail-label">Email</div><div className="detail-value">{c.email||"—"}</div></div><div className="detail-field"><div className="detail-label">Telefono</div><div className="detail-value">{c.phone||"—"}</div></div></div>
        <div className="detail-row"><div className="detail-field"><div className="detail-label">Città</div><div className="detail-value">{c.city} ({c.province})</div></div><div className="detail-field"><div className="detail-label">Settore</div><div className="detail-value">{c.sector}</div></div></div>
        <div className="detail-row"><div className="detail-field"><div className="detail-label">Agente prec.</div><div className="detail-value">{c.agente}</div></div><div className="detail-field"><div className="detail-label">Priorità / Stage</div><div className="detail-value" style={{display:"flex",gap:6}}><PTag p={c.priority}/><STag s={c.pipelineStage}/></div></div></div>
      </div>
      <div className="detail-section">
        <div className="detail-section-title">Dati Economici</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
          {[["FATT. 2024",c.fatturato2024,"var(--text)"],["FATT. 2025",c.fatturato2025,"var(--info)"],["BUDGET 2026",c.budget2026,"var(--warning)"],["VENDITE ACT 2026",c.venditeActual2026||0,"var(--success)"]].map(([l,v,col])=>(
            <div key={l} className="card" style={{padding:12,textAlign:"center"}}><div style={{fontSize:10,color:"var(--text-muted)",marginBottom:3}}>{l}</div><div style={{fontSize:16,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:v>0?col:"var(--text-muted)"}}>{v>0?fmtC(v):"—"}</div></div>
          ))}
        </div>
        {c.delta!==0&&<div style={{marginTop:10,textAlign:"center"}}><DTag d={c.delta}/><span style={{fontSize:11,color:"var(--text-muted)",marginLeft:6}}>vs 2024</span></div>}
      </div>
      {/* VISIT SECTION */}
      <div className="detail-section">
        <div className="detail-section-title">Visite ({evts.length}) · freq. consigliata: {freq.label}</div>
        {evts.length>0?evts.sort((a,b)=>b.date.localeCompare(a.date)).map(ev=>{
          const isPast=ev.date<=TODAY;const typeCol=TYPE_COLORS[ev.type]||"var(--accent)";
          const note=visitNotes[ev.id];
          return <div key={ev.id} style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:"var(--bg-elevated)",borderRadius:"var(--radius-sm)",borderLeft:`3px solid ${typeCol}`,fontSize:12}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{ev.summary}</div>
                <div style={{fontSize:11,color:"var(--text-muted)"}}>{fmtD(ev.date)}{ev.time?` · ${ev.time}`:""}{ev.location?` · ${ev.location.slice(0,40)}`:""}</div>
              </div>
              <span className="tag" style={{background:`${typeCol}20`,color:typeCol,fontSize:9}}>{TYPE_LABELS[ev.type]}</span>
              {isPast?<span className="tag tag-muted">✓</span>:<span className="tag tag-info">Prossimo</span>}
            </div>
            {/* Show toggle for notes if available */}
            {(note?.ai || note?.raw) && <div style={{marginLeft:12,marginTop:4}}>
              <button
                className="btn btn-sm"
                style={{fontSize:10}}
                onClick={()=>setExpandedVisitNotes(prev=>({...prev,[ev.id]:!prev[ev.id]}))}
              >
                {note?.ai ? "✨ " : "📝 "}
                {expandedVisitNotes[ev.id] ? "Nascondi note ▲" : "Mostra note ▼"}
              </button>
              {expandedVisitNotes[ev.id] && <>
                {note?.ai && <AIResultDisplay result={note.ai}/>}
                {note?.raw && !note?.ai && <div style={{marginTop:6,padding:10,background:"var(--bg-elevated)",borderRadius:6,fontSize:11,color:"var(--text-secondary)",whiteSpace:"pre-wrap",lineHeight:1.5}}>📝 {note.raw}</div>}
              </>}
            </div>}
          </div>;
        }):<div style={{fontSize:12,color:"var(--text-muted)",padding:12,textAlign:"center"}}>Nessuna visita registrata per questo cliente</div>}
        {vi.lastVisit&&<div style={{fontSize:11,color:"var(--text-muted)",marginTop:6}}>Ultima visita: {fmtD(vi.lastVisit.date)} ({daysDiff(vi.lastVisit.date,TODAY)}gg fa)</div>}
        {!vi.nextVisit&&c.status==="attivo"&&c.budget2026>0&&<div className="visit-suggest" style={{marginTop:8}}><I.Calendar/>Nessuna visita futura pianificata — consigliato {freq.label}</div>}
      </div>
      {/* OUTREACH SECTION */}
      <OutreachSection client={c} onUpdate={(newOutreach)=>{setClients(p=>p.map(x=>x.id===c.id?{...x,outreach:newOutreach}:x));setSel({...c,outreach:newOutreach});}}/>
      {/* EMAIL SECTION */}
      {(()=>{
        const cEmails=emailAnalysis.flatMap(a=>a.emails.map(e=>({...e,analysisDate:a.data}))).filter(e=>e.clienteAssociato&&c.name.toLowerCase().includes(e.clienteAssociato.toLowerCase())||e.clienteAssociato&&e.clienteAssociato.toLowerCase().includes(c.name.split(" ")[0].toLowerCase()));
        return <div className="detail-section">
          <div className="detail-section-title">Email recenti ({cEmails.length})</div>
          {cEmails.length>0?cEmails.slice(0,5).map((em,i)=>{
            const st=emailStyle(em.tipo);
            return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:"var(--bg-elevated)",borderRadius:"var(--radius-sm)",borderLeft:`3px solid ${st.color}`,marginBottom:6,fontSize:11}}>
              <span className="tag" style={{background:st.bg,color:st.color,fontSize:9}}>{st.emoji} {em.tipo}</span>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{em.oggetto||"Senza oggetto"}</div><div style={{color:"var(--text-muted)",fontSize:10}}>{em.riepilogo}</div></div>
              <span style={{fontSize:9,color:"var(--text-muted)",flexShrink:0}}>{em.analysisDate}</span>
            </div>;
          }):<div style={{fontSize:12,color:"var(--text-muted)",padding:12,textAlign:"center"}}>Nessuna email tracciata per questo cliente</div>}
        </div>;
      })()}
      {c.notes&&<div style={{padding:12,background:"var(--bg-elevated)",borderRadius:"var(--radius-sm)",fontSize:12,color:"var(--text-secondary)",fontStyle:"italic"}}>📝 {c.notes}</div>}
    </Modal>;
  };

  const pages={dashboard:renderDashboard,clients:renderClients,calendar:renderCalendar,email:renderEmail,alerts:renderAlerts,pipeline:renderPipeline,routes:renderRoutes,reports:renderReports};

  return (<>
    <style>{CSS}</style>
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-logo"><div className="dot"/> GestioneClienti</div>
        <div className="sidebar-nav">{nav.map(n=><div key={n.id} className={`nav-item${sec===n.id?" active":""}`} onClick={()=>setSec(n.id)}><n.icon/>{n.label}{n.badge&&<span className="nav-badge">{n.badge}</span>}</div>)}</div>
        <div style={{padding:"12px 8px",borderTop:"1px solid var(--border)"}}>
          <button className="btn btn-sm btn-danger" style={{width:"100%",justifyContent:"center",fontSize:11}} onClick={()=>{if(confirm("Cancellare tutti i dati salvati e tornare ai dati iniziali?")){localStorage.removeItem("crm_clients");localStorage.removeItem("crm_visitNotes");localStorage.removeItem("crm_emailAnalysis");location.reload();}}}>
            <I.Trash/> Reset dati
          </button>
        </div>
      </div>
      <div className="main">{pages[sec]?.()}</div>
      {renderDetail()}
      {showNew&&<NewClientModal onClose={()=>setShowNew(false)} onSave={d=>{setClients(p=>[...p,{...d,id:Date.now(),fatturato2024:0,fatturato2025:0,venditeActual2026:0,delta:0,status:"attivo",pipelineStage:"attivo",outreach:null}]);setShowNew(false);}}/>}
    </div>
  </>);
}
