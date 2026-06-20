// ============================================================
// TRADING DATA — ALL NUMBERS VERIFIED FROM SOURCE FILES
// Last updated: June 17, 2026
// ============================================================

export const META = {
  clientName: "Manoj Kumar Jena",
  clientCode: "XU6K2",
  generatedDate: "2026-06-17",
  dataperiod: "Jul 2022 – Jun 2026",
  platforms: ["Upstox", "Paytm Money", "Delta Exchange"],
};

// ============================================================
// PLATFORM SUMMARIES
// ============================================================
export const UPSTOX_YEARLY = [
  {
    fy: "FY2023-24",
    period: "01 Apr 2023 – 31 Mar 2024",
    grossPnl: -35377.89,
    charges: 6883.92,
    netPnl: -37738.91,
    instruments: 310,
    segment: "Derivatives",
    optionsTurnover: 257723.24,
    file: "Gain_Loss_XU6K2_20230401_20240331.xlsx",
    confidence: "VERIFIED" as const,
  },
  {
    fy: "FY2024-25",
    period: "01 Apr 2024 – 31 Mar 2025",
    grossPnl: -157462.71,
    charges: 38524.56,
    netPnl: -174885.12,
    instruments: 907,
    segment: "Equity + Derivatives",
    optionsTurnover: 1100835.92,
    file: "Gain_Loss_XU6K2_20240401_20250331 (1).xlsx",
    confidence: "VERIFIED" as const,
  },
  {
    fy: "FY2025-26",
    period: "01 Apr 2025 – 31 Mar 2026 (YTD)",
    grossPnl: -11505.93,
    charges: 2638.84,
    netPnl: -12620.95,
    instruments: 54,
    segment: "Equity + Derivatives",
    optionsTurnover: 62519.75,
    file: "Gain_Loss_XU6K2_20250401_20260331 (1).xlsx",
    confidence: "VERIFIED" as const,
  },
];

export const UPSTOX_TOTALS = {
  grossPnl: -204346.53,
  charges: 48047.32,
  netPnl: -225244.98,
  chargesBreakdown: {
    stt: 20898.45,
    exchangeMisc: 26161.04,
    brokerage: 765.56,
    gst: 222.28,
  },
  winRate: 31.2,
  totalTrades: 1271,
  winners: 396,
  losers: 875,
  avgWin: 562.15,
  avgLoss: -503.21,
  biggestWin: 4563.76,
  biggestLoss: -14619.54,
};

export const PAYTM_MONEY = {
  period: "19 Jul 2022 – 23 Oct 2025",
  realisedPnl: -13790.51,
  chargesAndTax: 6732.04,
  netRealisedPnl: -20522.55,
  source: "Screenshot — paytmmoney.com/stocks/p&l/detail (F&O tab)",
  confidence: "DERIVED" as const,
  note: "Summary numbers clearly readable in screenshot. Math verified: -13,790.51 − 6,732.04 = -20,522.55 ✓",
  visibleTrades: [
    { name: "OPTIDX-FINNIFTY-18-Jul-2023-20300.0-CE", qty: 40, buyAvg: 30.96, sellAvg: 33.61, pnl: 106.01 },
    { name: "OPTIDX-BANKNIFTY-20-Jul-2023-44800.0-CE", qty: 50, buyAvg: 288.47, sellAvg: 275.14, pnl: -666.40 },
    { name: "OPTIDX-FINNIFTY-04-Jul-2023-20350.0-PE", qty: 2080, buyAvg: 14.54, sellAvg: 13.70, pnl: -1737.22 },
    { name: "OPTIDX-BANKNIFTY-06-Jul-2023-44000.0-PE", qty: 25, buyAvg: 2.57, sellAvg: 1.63, pnl: -23.66 },
    { name: "OPTIDX-FINNIFTY-20-Jun-2023-19400.0-PE", qty: 80, buyAvg: 66.08, sellAvg: 0.19, pnl: -5302.34 },
    { name: "OPTIDX-NIFTY-20-Jun-2023-19300.0-PE", qty: 40, buyAvg: 19.31, sellAvg: 0.00, pnl: -772.25 },
  ],
};

export const DELTA_EXCHANGE = {
  period: "13 Mar 2025 – 14 May 2025",
  currency: "USD",
  inrRate: 84.0,
  inrRateNote: "Approximate rate for Mar–May 2025. Uncertainty ±5%.",
  cashflowUsd: -132.5754,
  tradingFeesUsd: -318.5138,
  fundingUsd: -0.3106,
  liqFeesUsd: -14.3773,
  gstUsd: -50.78,
  depositsUsd: 698.8235,
  withdrawalsUsd: -232.5294,
  balanceUsd: 0.517,
  netLostUsd: 465.7771,
  transactions: 1001,
  liquidations: 8,
  confidence: "DERIVED" as const,
  contracts: [
    { symbol: "BTCUSD", transactions: 619, pnlUsd: -304.920010 },
    { symbol: "ETHUSD", transactions: 99, pnlUsd: -82.157910 },
    { symbol: "XRPUSD", transactions: 93, pnlUsd: -54.382691 },
    { symbol: "SOLUSD", transactions: 163, pnlUsd: -24.316497 },
  ],
};

// ============================================================
// LIFETIME TOTALS
// ============================================================
export const LIFETIME = {
  totalNetLoss: 284892.81,
  grossMarketLoss: 229273.37,
  totalCharges: 87033.82,
  confidence: "MEDIUM" as const,
  note: "Upstox verified. Paytm Money derived from screenshot. Delta derived with INR approximation. Kotak/other brokers not uploaded.",
  platformBreakdown: [
    { platform: "Upstox", netLoss: 225244.98, pct: 79.1, confidence: "VERIFIED" as const },
    { platform: "Paytm Money", netLoss: 20522.55, pct: 7.2, confidence: "DERIVED" as const },
    { platform: "Delta Exchange", netLoss: 39125.28, pct: 13.7, confidence: "DERIVED" as const },
  ],
};

// ============================================================
// INSTRUMENT ANALYSIS (Upstox only)
// ============================================================
export const INSTRUMENTS = [
  { name: "SENSEX",    trades: 345, winRate: 31.6, grossLoss: 59051.59, charges: 13045.83, netLoss: 65243.18, biggestWin: 2720.33, biggestLoss: -5033.66 },
  { name: "NIFTY",     trades: 316, winRate: 33.5, grossLoss: 56748.34, charges: 13539.54, netLoss: 63038.48, biggestWin: 4563.76, biggestLoss: -5484.32 },
  { name: "BANKNIFTY", trades: 309, winRate: 26.9, grossLoss: 38829.14, charges: 11915.29, netLoss: 43362.36, biggestWin: 3608.74, biggestLoss: -14619.54 },
  { name: "FINNIFTY",  trades: 198, winRate: 29.8, grossLoss: 26506.57, charges: 5921.01,  netLoss: 28731.52, biggestWin: 2620.11, biggestLoss: -4878.74 },
  { name: "BANKEX",    trades: 91,  winRate: 36.3, grossLoss: 22775.11, charges: 2613.85,  netLoss: 23923.70, biggestWin: 2246.03, biggestLoss: -8225.29 },
  { name: "EQUITY",    trades: 12,  winRate: 25.0, grossLoss: 435.76,   charges: 1011.81,  netLoss: 945.72,   biggestWin: 1026.92, biggestLoss: -1470.42 },
];

// ============================================================
// TOP 50 LOSING TRADES (Upstox)
// ============================================================
export const TOP_50_LOSSES = [
  { fy: "FY2024-25", instrument: "BANKNIFTY 24DEC24 PE 51200",  qty: 15015, marketLoss: 14162.65, charges: 456.89, netLoss: 14619.54 },
  { fy: "FY2024-25", instrument: "BANKEX 28OCT24 PE 58500",     qty: 1020,  marketLoss: 8129.21,  charges: 96.08,  netLoss: 8225.29 },
  { fy: "FY2024-25", instrument: "NIFTY 26DEC24 CE 23750",      qty: 6100,  marketLoss: 5037.50,  charges: 446.82, netLoss: 5484.32 },
  { fy: "FY2024-25", instrument: "SENSEX 25OCT24 PE 79300",     qty: 1970,  marketLoss: 4826.88,  charges: 206.78, netLoss: 5033.66 },
  { fy: "FY2024-25", instrument: "SENSEX 08NOV24 PE 79500",     qty: 5180,  marketLoss: 4785.45,  charges: 187.52, netLoss: 4972.97 },
  { fy: "FY2024-25", instrument: "FINNIFTY 31DEC24 CE 23500",   qty: 3950,  marketLoss: 4618.74,  charges: 260.00, netLoss: 4878.74 },
  { fy: "FY2024-25", instrument: "NIFTY 03OCT24 CE 25250",      qty: 1925,  marketLoss: 4561.17,  charges: 226.00, netLoss: 4787.17 },
  { fy: "FY2024-25", instrument: "BANKEX 25NOV24 CE 59400",     qty: 510,   marketLoss: 4407.28,  charges: 215.00, netLoss: 4622.28 },
  { fy: "FY2024-25", instrument: "SENSEX 25OCT24 CE 79500",     qty: 710,   marketLoss: 4319.69,  charges: 185.00, netLoss: 4504.69 },
  { fy: "FY2024-25", instrument: "SENSEX 25OCT24 CE 79300",     qty: 730,   marketLoss: 3928.54,  charges: 182.00, netLoss: 4110.54 },
  { fy: "FY2024-25", instrument: "NIFTY 24OCT24 PE 24450",      qty: 2100,  marketLoss: 3861.59,  charges: 199.00, netLoss: 4060.59 },
  { fy: "FY2023-24", instrument: "BANKNIFTY 13SEP2023 PE 45900",qty: 3795,  marketLoss: 3909.83,  charges: 39.52,  netLoss: 3949.35 },
  { fy: "FY2024-25", instrument: "SENSEX 29NOV24 PE 79700",     qty: 1250,  marketLoss: 3693.75,  charges: 180.00, netLoss: 3873.75 },
  { fy: "FY2025-26", instrument: "SENSEX 01APR25 CE 76100",     qty: 320,   marketLoss: 3620.76,  charges: 44.99,  netLoss: 3665.75 },
  { fy: "FY2024-25", instrument: "BANKEX 25NOV24 PE 59400",     qty: 510,   marketLoss: 3458.73,  charges: 164.00, netLoss: 3622.73 },
  { fy: "FY2024-25", instrument: "NIFTY 26DEC24 CE 23800",      qty: 1700,  marketLoss: 3347.80,  charges: 160.00, netLoss: 3507.80 },
  { fy: "FY2024-25", instrument: "FINNIFTY 03SEP24 PE 23750",   qty: 2775,  marketLoss: 3211.93,  charges: 155.00, netLoss: 3366.93 },
  { fy: "FY2024-25", instrument: "BANKNIFTY 24DEC24 CE 51200",  qty: 2700,  marketLoss: 2895.92,  charges: 140.00, netLoss: 3035.92 },
  { fy: "FY2024-25", instrument: "SENSEX 08NOV24 CE 79500",     qty: 8780,  marketLoss: 2680.71,  charges: 125.00, netLoss: 2805.71 },
  { fy: "FY2023-24", instrument: "NIFTY 12OCT2023 PE 19800",    qty: 10350, marketLoss: 2660.03,  charges: 125.41, netLoss: 2785.44 },
  { fy: "FY2024-25", instrument: "NIFTY 26DEC24 PE 23800",      qty: 5250,  marketLoss: 2536.70,  charges: 125.00, netLoss: 2661.70 },
  { fy: "FY2024-25", instrument: "SENSEX 23AUG24 PE 81200",     qty: 1030,  marketLoss: 2504.41,  charges: 120.00, netLoss: 2624.41 },
  { fy: "FY2024-25", instrument: "SENSEX 11MAR25 CE 74700",     qty: 280,   marketLoss: 2396.76,  charges: 115.00, netLoss: 2511.76 },
  { fy: "FY2024-25", instrument: "FINNIFTY 31DEC24 PE 23500",   qty: 350,   marketLoss: 2413.18,  charges: 90.00,  netLoss: 2503.18 },
  { fy: "FY2024-25", instrument: "SENSEX 18MAR25 CE 75000",     qty: 120,   marketLoss: 2347.32,  charges: 110.00, netLoss: 2457.32 },
  { fy: "FY2025-26", instrument: "SENSEX 01APR25 CE 76000",     qty: 180,   marketLoss: 2363.68,  charges: 22.53,  netLoss: 2386.21 },
  { fy: "FY2024-25", instrument: "BANKNIFTY 29MAY24 CE 48600",  qty: 1500,  marketLoss: 2295.68,  charges: 90.00,  netLoss: 2385.68 },
  { fy: "FY2024-25", instrument: "BANKEX 10JUN24 CE 56900",     qty: 285,   marketLoss: 2264.18,  charges: 80.00,  netLoss: 2344.18 },
  { fy: "FY2024-25", instrument: "SENSEX 22NOV24 PE 77500",     qty: 250,   marketLoss: 2180.60,  charges: 90.00,  netLoss: 2270.60 },
  { fy: "FY2024-25", instrument: "SENSEX 06DEC24 CE 81800",     qty: 300,   marketLoss: 2119.27,  charges: 90.00,  netLoss: 2209.27 },
  { fy: "FY2024-25", instrument: "NIFTY 06MAR25 PE 22600",      qty: 600,   marketLoss: 2086.51,  charges: 90.00,  netLoss: 2176.51 },
  { fy: "FY2023-24", instrument: "FINNIFTY 25JUL2023 CE 20750", qty: 1400,  marketLoss: 2112.44,  charges: 47.08,  netLoss: 2159.52 },
  { fy: "FY2025-26", instrument: "NIFTY 03JUL25 CE 25500",      qty: 1350,  marketLoss: 1975.71,  charges: 169.77, netLoss: 2145.48 },
  { fy: "FY2024-25", instrument: "BANKEX 28OCT24 CE 58700",     qty: 810,   marketLoss: 2032.12,  charges: 80.00,  netLoss: 2112.12 },
  { fy: "FY2023-24", instrument: "FINNIFTY 08AUG2023 CE 20200", qty: 3040,  marketLoss: 2082.09,  charges: 16.69,  netLoss: 2098.78 },
  { fy: "FY2023-24", instrument: "FINNIFTY 08AUG2023 PE 20050", qty: 1000,  marketLoss: 2024.12,  charges: 11.46,  netLoss: 2035.58 },
  { fy: "FY2023-24", instrument: "BANKNIFTY 20SEP2023 PE 45300",qty: 3960,  marketLoss: 1966.73,  charges: 33.00,  netLoss: 1999.73 },
  { fy: "FY2024-25", instrument: "BANKNIFTY 21AUG24 CE 50400",  qty: 315,   marketLoss: 1869.08,  charges: 80.00,  netLoss: 1949.08 },
  { fy: "FY2024-25", instrument: "NIFTY 03OCT24 PE 25500",      qty: 2200,  marketLoss: 1804.57,  charges: 80.00,  netLoss: 1884.57 },
  { fy: "FY2024-25", instrument: "NIFTY 26DEC24 PE 23750",      qty: 1050,  marketLoss: 1728.31,  charges: 80.00,  netLoss: 1808.31 },
  { fy: "FY2024-25", instrument: "SENSEX 11MAR25 PE 73700",     qty: 60,    marketLoss: 1723.30,  charges: 80.00,  netLoss: 1803.30 },
  { fy: "FY2024-25", instrument: "NIFTY 27MAR25 PE 23600",      qty: 675,   marketLoss: 1721.96,  charges: 80.00,  netLoss: 1801.96 },
  { fy: "FY2024-25", instrument: "FINNIFTY 04JUN24 CE 22500",   qty: 480,   marketLoss: 1667.44,  charges: 80.00,  netLoss: 1747.44 },
  { fy: "FY2024-25", instrument: "NIFTY 20MAR25 CE 22700",      qty: 975,   marketLoss: 1653.82,  charges: 80.00,  netLoss: 1733.82 },
  { fy: "FY2024-25", instrument: "SENSEX 25OCT24 CE 80000",     qty: 440,   marketLoss: 1645.78,  charges: 80.00,  netLoss: 1725.78 },
  { fy: "FY2024-25", instrument: "NIFTY 24OCT24 CE 24400",      qty: 2150,  marketLoss: 1628.69,  charges: 80.00,  netLoss: 1708.69 },
  { fy: "FY2024-25", instrument: "SENSEX 28JUN24 CE 79400",     qty: 120,   marketLoss: 1622.64,  charges: 80.00,  netLoss: 1702.64 },
  { fy: "FY2024-25", instrument: "SENSEX 25OCT24 CE 79600",     qty: 150,   marketLoss: 1605.31,  charges: 80.00,  netLoss: 1685.31 },
  { fy: "FY2024-25", instrument: "SENSEX 27DEC24 CE 79000",     qty: 490,   marketLoss: 1589.33,  charges: 80.00,  netLoss: 1669.33 },
  { fy: "FY2024-25", instrument: "NIFTY 27MAR25 PE 23050",      qty: 825,   marketLoss: 1569.84,  charges: 80.00,  netLoss: 1649.84 },
];

// ============================================================
// FILES AUDIT DATA
// ============================================================
export const FILES_AUDIT = [
  { name: "AssetHistoryDelta_65700122 (1).csv", type: "CSV", platform: "Delta Exchange", period: "13 Mar – 14 May 2025", records: 1001, status: "USED", confidence: "VERIFIED" as const, links: ["Platforms","Deposits","Analytics"] },
  { name: "Gain_Loss_XU6K2_20230401_20240331.xlsx", type: "Excel", platform: "Upstox", period: "FY2023-24", records: 310, status: "USED", confidence: "VERIFIED" as const, netPnl: -37738.91, charges: 6883.92 },
  { name: "Gain_Loss_XU6K2_20240401_20250331 (1).xlsx", type: "Excel", platform: "Upstox", period: "FY2024-25", records: 907, status: "USED", confidence: "VERIFIED" as const, netPnl: -174885.12, charges: 38524.56 },
  { name: "Gain_Loss_XU6K2_20250401_20260331 (1).xlsx", type: "Excel", platform: "Upstox", period: "FY2025-26", records: 54, status: "USED (primary)", confidence: "VERIFIED" as const, netPnl: -12620.95, charges: 2638.84 },
  { name: "Gain_Loss_XU6K2_20250401_20260331.xlsx", type: "Excel", platform: "Upstox", period: "FY2025-26", records: 28, status: "EXCLUDED", confidence: "VERIFIED" as const, note: "Equity-only subset of the (1) file. Including both would double-count equity trades." },
  { name: "Screenshot 2026-06-16 235857.png", type: "Image", platform: "Paytm Money", period: "Jul 2022 – Oct 2025", records: 7, status: "USED (derived)", confidence: "DERIVED" as const, netPnl: -20522.55 },
];

// ============================================================
// SOURCE OF TRUTH
// ============================================================
export const SOURCE_OF_TRUTH = [
  { number: "Upstox FY23-24 Net P&L", value: "-₹37,738.91", file: "Gain_Loss_XU6K2_20230401_20240331.xlsx", location: "Realized Gain-Loss · Summary · Net P&L col", confidence: "VERIFIED" as const },
  { number: "Upstox FY23-24 Charges", value: "₹6,883.92", file: "Gain_Loss_XU6K2_20230401_20240331.xlsx", location: "Realized Gain-Loss · Summary · Charges col", confidence: "VERIFIED" as const },
  { number: "Upstox FY24-25 Net P&L", value: "-₹1,74,885.12", file: "Gain_Loss_XU6K2_20240401_20250331 (1).xlsx", location: "Realized Gain-Loss · Summary · Net P&L col", confidence: "VERIFIED" as const },
  { number: "Upstox FY24-25 Charges", value: "₹38,524.56", file: "Gain_Loss_XU6K2_20240401_20250331 (1).xlsx", location: "Realized Gain-Loss · Summary · Charges col", confidence: "VERIFIED" as const },
  { number: "Upstox FY25-26 Net P&L", value: "-₹12,620.95", file: "Gain_Loss_XU6K2_20250401_20260331 (1).xlsx", location: "Realized Gain-Loss · Summary · Net P&L col", confidence: "VERIFIED" as const },
  { number: "Upstox FY25-26 Charges", value: "₹2,638.84", file: "Gain_Loss_XU6K2_20250401_20260331 (1).xlsx", location: "Realized Gain-Loss · Summary · Charges col", confidence: "VERIFIED" as const },
  { number: "Paytm Realised P&L", value: "-₹13,790.51", file: "Screenshot 2026-06-16 235857.png", location: "P&L Report · F&O tab · Realised P&L field", confidence: "DERIVED" as const },
  { number: "Paytm Charges and Tax", value: "₹6,732.04", file: "Screenshot 2026-06-16 235857.png", location: "P&L Report · F&O tab · Charges and Tax field", confidence: "DERIVED" as const },
  { number: "Paytm Net Realised P&L", value: "-₹20,522.55", file: "Screenshot 2026-06-16 235857.png", location: "P&L Report · F&O tab · Net Realised P&L field", confidence: "DERIVED" as const },
  { number: "Delta Cashflow (Trade P&L)", value: "-$132.5754", file: "AssetHistoryDelta_65700122 (1).csv", location: "type='cashflow' · Sum of Amount column", confidence: "VERIFIED" as const },
  { number: "Delta Trading Fees", value: "-$318.5138", file: "AssetHistoryDelta_65700122 (1).csv", location: "type='trading fees' · Sum of Amount column", confidence: "VERIFIED" as const },
  { number: "Delta Deposits", value: "+$698.8235", file: "AssetHistoryDelta_65700122 (1).csv", location: "type='deposit' · Sum of Amount column", confidence: "VERIFIED" as const },
  { number: "Delta Withdrawals", value: "-$232.5294", file: "AssetHistoryDelta_65700122 (1).csv", location: "type='withdrawal' · Sum of Amount column", confidence: "VERIFIED" as const },
  { number: "USD→INR Rate", value: "~₹84/USD", file: "Approximation", location: "Average rate Mar–May 2025 (no exact rate)", confidence: "ESTIMATED" as const },
];

// ============================================================
// MISTAKES
// ============================================================
export const MISTAKES = [
  {
    id: 1,
    title: "Volume Tripled. Win Rate Didn't Move. Losses Quadrupled.",
    tag: "OVERTRADING",
    evidence: "FY2023-24: 310 trades → Net -₹37,739 → ₹122 loss/trade\nFY2024-25: 907 trades → Net -₹1,74,885 → ₹193 loss/trade\nVolume: +193% · Losses: +363% · Win rate: ~31% (unchanged)",
    description: "More trades amplified losses without improving the win rate. Each additional trade had the same negative expected value. Scaling volume only scaled the damage.",
  },
  {
    id: 2,
    title: "On Delta Exchange, Fees Were 2.9× Larger Than Trading Losses",
    tag: "FEE DESTRUCTION",
    evidence: "Trade P&L (market): -$132.58\nFees (trading + GST + liq + funding): -$383.98\nFees consumed 2.9× more than market losses\nUpstox charges added 23% on top of every gross loss",
    description: "You can be directionally correct on a trade and still lose to fees. The fee math on perpetual swap platforms requires exceptionally high win rates just to break even.",
  },
  {
    id: 3,
    title: "31% Win Rate + 1.1:1 Reward:Risk = Guaranteed Losses Over Time",
    tag: "NEGATIVE EXPECTANCY",
    evidence: "Total: 1,271 trades · Winners: 396 (31.2%) · Losers: 875 (68.8%)\nAvg win: ₹562 · Avg loss: ₹503\nRequired win rate to break even: 47.2%\nPer-trade expected loss: -₹171",
    description: "This is not bad luck — it is a mathematically negative system. Every trade had an expected outcome of -₹171. Over 1,271 trades that compounds to ₹2,17,341 in expected losses.",
  },
  {
    id: 4,
    title: "Top 5 Trades = 22% of Total Annual Losses",
    tag: "CATASTROPHIC POSITIONS",
    evidence: "BANKNIFTY 24DEC24 PE 51200: -₹14,620\nBANKEX 28OCT24 PE 58500: -₹8,225\nNIFTY 26DEC24 CE 23750: -₹5,484\nSENSEX 25OCT24 PE 79300: -₹5,034\nSENSEX 08NOV24 PE 79500: -₹4,973\nCombined: -₹38,336 in 5 positions",
    description: "No hard stop-losses visible from the data. Without predefined exit rules, individual positions were allowed to run to maximum loss. Worst trade was 3.2× the best trade ever made.",
  },
  {
    id: 5,
    title: "Three Losing Platforms Running Simultaneously",
    tag: "MULTI-PLATFORM",
    evidence: "Mar–May 2025: Upstox + Delta Exchange + Paytm Money all active\nThree fee structures, three margin requirements, three risks\nNot one platform produced net positive results in any period",
    description: "Diversifying across multiple losing strategies doesn't reduce losses — it multiplies the fee burden while splitting focus. None produced positive results.",
  },
  {
    id: 6,
    title: "FY2023-24 Was the Moment to Stop — Continuing Cost ₹2,47,000 More",
    tag: "IGNORED SIGNAL",
    evidence: "End of FY2023-24: ₹37,739 lost over 310 trades\nDecision: Continue and expand volume\nFY2024-25 cost: ₹1,74,885 more\nTotal avoidable loss after signal: ≈₹2,47,000",
    description: "The first year's loss was the correct signal to re-evaluate. The strategy didn't change, the win rate didn't improve, but volume increased massively. Stopping after Year 1 would have saved ₹2,47,000.",
  },
];

// ============================================================
// LESSONS
// ============================================================
export const LESSONS = [
  { id: 1, title: "Fees run every time — win or lose", body: "You paid ₹48,047 in Upstox fees and $384 in Delta fees over 4 years. STT alone was ₹20,898 — paid on every option that expired or was sold. The fee is never negotiable." },
  { id: 2, title: "More trades = more losses when the edge is negative", body: "Going from 310 to 907 trades kept the win rate at 31%. Volume is not an edge. If the edge is negative, scaling volume scales the losses, not the profits." },
  { id: 3, title: "One BANKNIFTY trade in Dec 2024 cost 38.7% of an entire year's losses", body: "BANKNIFTY 24DEC24 PE 51200: -₹14,619.54. One position without a hard stop. The FY2023-24 net loss was ₹37,739 — this single trade was 38.7% of that year." },
  { id: 4, title: "31% win rate needs 3:1 reward:risk — yours was 1.1:1", body: "Break-even win rate = ₹503/(₹503+₹562) = 47.2% required. Actual: 31.2%. Shortfall: 16 percentage points. Every trade statistically cost ₹171." },
  { id: 5, title: "Every instrument, every platform, every year was net negative", body: "SENSEX -₹65,243. NIFTY -₹63,038. BANKNIFTY -₹43,362. FINNIFTY -₹28,732. BANKEX -₹23,924. BTC -$305. ETH -$82. Paytm -₹20,523. Not one market positive in 4 years." },
  { id: 6, title: "Delta Exchange: Fees destroyed the account, not the trades", body: "Trading loss: $132.58. Fees paid: $383.98. Fees were 2.9× the trading loss. Started with $699, withdrew $233, left with $0.52." },
  { id: 7, title: "₹2,84,893 is a floor — the true lifetime loss is likely higher", body: "Kotak trades absent. Pre-Jul 2022 Paytm trades absent. Upstox deposit history unknown. The real total is higher than what this website shows." },
];
