# The Cost of My Trading Decisions

A permanent personal archive of trading losses, mistakes, and lessons — built as a production-grade Next.js application.

**Client:** Manoj Kumar Jena (XU6K2) · **Period:** Jul 2022 – Jun 2026 · **Total Net Loss:** ₹2,84,893 (MEDIUM confidence)

---

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** — utility-first styling, 3 themes (Dark / Light / Journal)
- **Recharts** — all charts (bar, area, pie) fully theme-aware
- **Lucide React** — icons
- **SheetJS (xlsx)** + **PapaParse** — client-side Excel/CSV parsing
- **Local JSON DB** — file-backed store at `/data/uploads.json` (falls back to in-memory automatically on read-only serverless filesystems)

## Project Structure

```
/app                    Next.js App Router pages (one folder per route)
  /api/upload           REST API for the upload center (GET/POST/PATCH/DELETE)
  /dashboard, /audit, /platforms, /instruments, /top50,
  /deposits, /timeline, /mistakes, /lessons, /analytics,
  /upload, /vault, /reconciliation        13 archive pages + upload center
/components
  /layout                Navbar, ThemeProvider (dark/light/journal)
  /ui                     Reusable primitives: MetricCard, Badge, InfoBox, FindingCard...
  /charts                 Recharts wrappers, all theme-aware
/data
  trading-data.ts         ALL VERIFIED NUMBERS — single source of truth, typed
  uploads.json             Local JSON DB for uploaded report metadata
/lib
  utils.ts                 Formatters (INR/USD), confidence badge config
  file-parser.ts            Excel / CSV / PDF client-side parsers
  db.ts                      JSON DB read/write/update helpers
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected). No environment variables required.
4. Deploy.

> **Note on the local JSON database:** Vercel's serverless functions have a read-only filesystem outside `/tmp`. The `/lib/db.ts` module detects write failures automatically and falls back to an in-memory store for that request lifecycle, so the Upload Center remains fully functional on Vercel — uploaded file *metadata* just won't persist between deployments/cold starts. For a permanently persistent uploads log in production, swap `lib/db.ts` for a hosted store (Vercel KV, Postgres, Supabase, etc.) — the function signatures are designed to make that a drop-in change.

## Data Integrity

**All calculations and numbers are unchanged from the original HTML dashboard.** Every figure in `/data/trading-data.ts` traces back to a source file documented on the `/audit` and `/vault` pages, with explicit confidence levels:

- **VERIFIED** — exact value from a source Excel/CSV file
- **DERIVED** — read from a screenshot or computed via an approximate FX rate
- **MISSING** — data not yet provided (e.g. Kotak broker, Upstox/Paytm deposit statements)

New uploads via the **Upload Center** (`/upload`) are parsed and logged but **never automatically merged** into the totals — this preserves the no-double-counting guarantee documented on the Data Audit page. To incorporate a new verified report, review it in the Upload Center, then manually update `/data/trading-data.ts`.

## Themes

- **Dark** — default. Reflective, warning-toned, deep ink black with red accents.
- **Light** — clean professional dashboard for reading analytics and tables.
- **Journal** — warm sepia/parchment tone for a more personal, diary-like reading experience.

Theme preference is detected from system settings on first visit and persisted in `localStorage`.

## License

Personal archive — not licensed for redistribution of the underlying financial data.
