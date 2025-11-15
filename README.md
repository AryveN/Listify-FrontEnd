# Listify FrontEnd

Jednoduchá React/TypeScript aplikace pro správu nákupních seznamů vytvořená podle zadání BFSY.

## Struktura
- `listify-frontend/` – projekt vytvořený pomocí Create React App.
  - hlavní zdrojové soubory a styly jsou ve složce `src/`

## Požadavky
- Node.js 18+
- npm 10+

## Instalace a spuštění
```bash
cd listify-frontend
npm install
npm start
```
Aplikace se otevře na adrese http://localhost:3000.

## Build a test
```bash
npm run build
```
Tento příkaz ověří kompilaci a vytvoří produkční build ve složce `build/`.

## Mock účty
Pro přihlášení lze použít libovolný e‑mail z `src/data/mockData.ts` (např. `eva@example.com`). Heslo může být libovolné – autentizace je pouze simulovaná.

## Hlavní funkce
- přehled aktivních a archivovaných nákupních seznamů
- detail seznamu s přidáváním, odškrtáváním a mazáním položek
- editace názvu seznamu, filtr vyřešených položek a správa členů
- jednoduchá tvorba nového seznamu a správa členů na samostatných stránkách
