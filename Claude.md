# Claude.md — Level: Farmer Financial Shield

> This file is the single source of truth for building the **Level** MVP. Any AI agent or developer should be able to build the entire app by following this document alone.

---

## Project Overview

**Level** is an offline-first Progressive Web App (PWA) that helps Filipino small-scale farmers:

1. **Log expenses** during planting season using camera + one-tap cost tiers (no typing, no math).
2. **Defend against unfair pricing** at harvest by calculating break-even price per kilo and giving instant red/green + haptic feedback when a middleman makes an offer.

### The Farmer's Journey (Mang Juan Scenario)

- **Phase 1 — Planting Season (Data Logging):** Mang Juan buys fertilizer. He opens Level, taps "Log Expense," takes a photo of the sack/receipt, taps the "Medium" button (₱2,500). Over 4 months he logs seeds (Medium), daily labor (Small), truck rental (Large).
- **Phase 2 — Harvest Gate (Negotiation):** A middleman offers ₱18/kg. Mang Juan enters his harvest weight (500kg). The app calculates break-even at ₱20/kg. He slides to ₱18 — the screen turns **aggressive red** and the phone **vibrates**. He says "No" and waits for a better buyer.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | React 19 + Vite | Fast dev server, optimized builds |
| **Language** | JavaScript (no TypeScript) | Simpler setup for rapid MVP |
| **Styling** | Tailwind CSS v4 via `@tailwindcss/vite` | Utility-first, high-contrast field UI |
| **PWA** | `vite-plugin-pwa` (Workbox `generateSW`) | Cache-first, `registerType: 'autoUpdate'` |
| **Local Database** | IndexedDB via `localforage` | Offline-first, stores photos as Blobs |
| **State** | React Context | Tracks `Total_Expenses`, `Harvest_Weight`, `Break_Even_Price` |
| **Routing** | `react-router-dom` | 3-page navigation |
| **Camera** | HTML5 `navigator.mediaDevices.getUserMedia` | Rear camera, receipt capture |
| **Haptics** | `navigator.vibrate()` | Vibration API for negotiation warnings |
| **Auth** | None | No user accounts |
| **Server/Backend** | None | All logic runs client-side in the browser |
| **UI Language** | Filipino (Tagalog) | Hardcoded strings, no i18n library |

### NPM Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "localforage": "^1.10.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "vite-plugin-pwa": "^0.21.0"
  }
}
```

---

## Project Structure

```
level/
├── public/
│   ├── favicon.ico
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── maskable-icon-512x512.png
│   └── apple-touch-icon.png
│
├── src/
│   ├── main.jsx                        # ReactDOM.createRoot + SW registration
│   ├── App.jsx                         # Root component, router setup
│   ├── index.css                       # Tailwind directives
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx            # Header + main area + bottom nav
│   │   │   ├── BottomNav.jsx           # 3-tab fixed bottom navigation
│   │   │   └── Header.jsx             # Title bar, season indicator
│   │   │
│   │   ├── expenses/
│   │   │   ├── TierPicker.jsx          # Three large buttons: Maliit / Katamtaman / Malaki
│   │   │   ├── ExpenseList.jsx         # Scrollable list of logged expenses
│   │   │   └── ExpenseCard.jsx         # Single expense row (tier, value, photo thumb)
│   │   │
│   │   ├── camera/
│   │   │   ├── CameraCapture.jsx       # getUserMedia viewfinder + shutter button
│   │   │   └── PhotoPreview.jsx        # Confirm or retake captured photo
│   │   │
│   │   ├── negotiation/
│   │   │   ├── HarvestInput.jsx        # Input for total sacks/kilos
│   │   │   ├── BucketVisual.jsx        # "Filling tank" showing total seasonal debt
│   │   │   ├── NegotiationSlider.jsx   # High-contrast range slider for offer price
│   │   │   └── BreakEvenDisplay.jsx    # Shows break-even price, red/green status
│   │   │
│   │   └── ui/
│   │       ├── BigButton.jsx           # Reusable large touch-target button (min 60px)
│   │       ├── ConfirmAnimation.jsx    # Green flash animation for successful save
│   │       ├── Toast.jsx               # Feedback toasts in Filipino
│   │       └── EmptyState.jsx          # "Walang gastos pa" empty illustrations
│   │
│   ├── pages/
│   │   ├── HomePage.jsx                # Dashboard: bucket visual + quick "Mag-log ng Gastos"
│   │   ├── ExpensesPage.jsx            # Expense logger: camera → tier picker → confirm
│   │   └── NegotiationPage.jsx         # Break-even dashboard + slider
│   │
│   ├── context/
│   │   └── SeasonContext.jsx           # React Context: current season state provider
│   │
│   ├── hooks/
│   │   └── useCamera.js                # getUserMedia lifecycle management
│   │
│   ├── services/
│   │   ├── expenseService.js           # Expense CRUD + tier-to-value mapping
│   │   ├── negotiationService.js       # Break-even calculation engine
│   │   ├── feedbackService.js          # Offer check, haptic trigger, returns isProfitable
│   │   └── seasonService.js            # Season summary CRUD (create/update/archive)
│   │
│   ├── stores/
│   │   ├── db.js                       # localForage instance configuration
│   │   ├── expenseStore.js             # Expense CRUD via localForage
│   │   └── seasonStore.js              # Season summary CRUD via localForage
│   │
│   ├── utils/
│   │   ├── constants.js                # Tier values, category labels, app version
│   │   ├── breakeven.js                # Pure math: BreakEvenPrice = TotalExpenses / Weight
│   │   ├── formatCurrency.js           # ₱ formatting via Intl.NumberFormat
│   │   └── dateUtils.js               # Filipino-friendly date formatting
│   │
│   └── assets/
│       └── icons/                      # SVG icons for tiers (binhi, pataba, trak)
│
├── index.html
├── vite.config.js                      # Vite + PWA plugin + Tailwind plugin
├── package.json
├── Claude.md                           # This file
└── .gitignore
```

---

## Core Business Logic

### Expense Tiers (Fixed Constants)
Tier	Filipino Label	Value	Examples
S (Maliit)	Maliit	₱500	Daily labor, hand tools, weeding
M (Katamtaman)	Katamtaman	₱2,500	1 sack of fertilizer, 1 sack of seed
L (Malaki)	Malaki	₱7,000	Equipment rental, bulk transport, truck rental
The farmer never types a number. They only tap one of three large, color-coded buttons.

### Break-Even Formula

$$BreakEvenPrice = \frac{\sum ExpenseValues}{TotalHarvestWeight_{kg}}$$

- `ExpenseValues` = sum of all tier values logged during the season
- `TotalHarvestWeight` = kilos entered by farmer at harvest time
- Output = minimum price per kilo the farmer must receive to not lose money

### Negotiation Logic (The Shield)

```
IF slider_value < BreakEvenPrice:
    → Screen background: bg-red-600 (Bright Red)
    → Trigger: navigator.vibrate([300, 100, 300])
    → Label: "LUGI!" (Loss!)

IF slider_value >= BreakEvenPrice:
    → Screen background: bg-green-600 (Bright Green)
    → No vibration
    → Label: "KITA!" (Profit!)
```

The vibration and color change must happen the exact millisecond the slider crosses the break-even threshold. No delay.

---

## Database Schema (IndexedDB via localForage)

### Configuration

Two named localForage instances sharing one IndexedDB database:

```javascript
// stores/db.js
import localforage from 'localforage';

export const expenseDB = localforage.createInstance({
  name: 'level-db',
  storeName: 'expenses'
});

export const seasonDB = localforage.createInstance({
  name: 'level-db',
  storeName: 'season_summaries'
});
```

### Store: `expenses`
Field	Type	Description
id	string	UUID v4. Also used as the localForage key.
seasonId	string	Foreign key linking to a season.
tier	enum	"Small" | "Medium" | "Large"
value	number	Pre-set constant: 500, 2500, or 7000
photoBlob	Blob	Camera-captured receipt/product photo. Stored as Blob directly in IndexedDB.
timestamp	string	ISO-8601 datetime string

### Store: `season_summaries`
Field	Type	Description
id	string	Unique season identifier (e.g., "season_2025_wet")
totalWeight	number	Total harvest weight in kg. Inputted by farmer at harvest.
totalExpenseValue	number	Calculated sum of all expense value fields for this season.
status	enum	"Active" | "Harvested" | "Archived"

### Data Access Patterns

- **List expenses for a season:** `expenseDB.iterate()` → filter by `seasonId` in memory
- **Total expenses:** Reduce filtered array, sum `value` fields
- **Archive old season:** Set `status` to `"Archived"`, move data conceptually (no separate store needed for MVP)
- **UI confirmation:** Only show save-success (`ConfirmAnimation`) **after** localForage write promise resolves

---

## Component Specifications

### TierPicker.jsx — The Three Buttons
Three large, color-coded, full-width buttons in a vertical stack:

Button	Label	Sublabel	Color	Value
S	Maliit	Paggawa, kagamitan	bg-yellow-500	₱500
M	Katamtaman	Pataba, binhi	bg-orange-500	₱2,500
L	Malaki	Renta, transportasyon	bg-red-500	₱7,000
Each button must be at minimum 60px tall, with min 18pt text. Use icons alongside text.

### CameraCapture.jsx — Receipt Camera

- Opens rear camera via `getUserMedia`({ video: { facingMode: { ideal: 'environment' } }, audio: false })
- Full-screen viewfinder with a large circular shutter button
- On capture: draw video frame to off-screen `<canvas>`, export as Blob via `canvas.toBlob('image/jpeg', 0.7)`
- **iOS Safari:** `<video>` element must have `playsInline` and `muted` attributes
- **Cleanup:** Stop all MediaStream tracks on component unmount
- **Errors:** Handle `NotAllowedError` (camera denied), `NotFoundError` (no camera) with Filipino messages

### NegotiationSlider.jsx — The Shield

- A high-contrast `<input type="range" />` component
- Range: ₱0 to ₱100 per kilo (or dynamic based on break-even × 2)
- **Visual:** Slider fills red below break-even, green above
- **Break-even line:** A visible vertical marker on the slider track
- **Real-time feedback:** On every `onChange`, compare `sliderValue` to `breakEvenPrice`:
  - Below → `bg-red-600` on entire screen background + `navigator.vibrate([300, 100, 300])`
  - Above → `bg-green-600` on entire screen background
- The slider must be "sticky" and highly visible — thick track, large thumb (min 40px)

### BucketVisual.jsx — The Filling Tank

- A visual container (tank/bucket SVG or styled div) that fills from bottom to top
- Fill level represents total seasonal expenses relative to some visual max
- Each new expense visually "adds" to the tank
- Color: red tones indicating "cost weight"
- Shows the total ₱ amount in large text overlaid on the bucket

### ConfirmAnimation.jsx — Save Confirmation

- Full-screen green flash that appears for ~800ms after a successful local save
- The farmer does **not** need to read any text — the green flash alone signals success
- Use CSS animation: scale up a green circle from the center, fade out

---

## Local Data Service (Client-Side API)

Instead of network requests, components import these async functions. All logic runs in the browser.

### `services/expenseService.js`

- **`createExpense(tier, photoBlob)`**
  - Maps `tier` (S, M, L) to its constant value (500, 2500, 7000) via a switch/object map
  - Generates a UUID and saves `{ id, seasonId, tier, value, photoBlob, timestamp }` to the `expenses` store
  - Returns the saved expense object only after the localForage write promise resolves

- **`getExpensesBySeason(seasonId)`**
  - Calls `expenseDB.iterate()` and filters records by `seasonId` in memory
  - Returns an array of all matching expense objects

### `services/negotiationService.js`

- **`calculateBreakEven(totalWeight)`**
  - Fetches all expenses for the current season via `expenseService.getExpensesBySeason()`
  - Sums all `value` fields to get `totalCost`
  - Applies formula: `BreakEvenPrice = totalCost / totalWeight`
  - Returns the break-even price per kilo (number)

### `services/feedbackService.js`

- **`checkOffer(currentOffer, breakEvenPrice)`**
  - Compares `currentOffer` to `breakEvenPrice`
  - If `currentOffer < breakEvenPrice`: triggers `window.navigator.vibrate([300, 100, 300])` and returns `false`
  - If `currentOffer >= breakEvenPrice`: no vibration, returns `true`
  - Always guards with `if ('vibrate' in navigator)` before calling

### `services/seasonService.js`

- **`createSeason(id)`** — Saves a new season summary with `status: "Active"` to `season_summaries` store
- **`updateSeason(id, updates)`** — Merges `updates` (e.g., `totalWeight`, `totalExpenseValue`) into the existing season record
- **`archiveSeason(id)`** — Sets `status: "Archived"` to close out a completed season
- **`getActiveSeason()`** — Returns the single season record with `status: "Active"`, or `null` if none exists

---

## PWA Configuration

### `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // No runtime caching needed — fully static, no API calls
      },
      manifest: {
        name: 'Level - Kalasag ng Magsasaka',
        short_name: 'Level',
        description: 'Offline na expense tracker at break-even calculator para sa magsasaka.',
        theme_color: '#166534',
        background_color: '#f0fdf4',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      devOptions: {
        enabled: true // Test SW in dev mode
      }
    })
  ]
});
```

### Service Worker Behavior

- **Install:** Precaches all static assets (HTML, JS, CSS, images). App is fully offline after first visit.
- **Fetch:** Cache-first strategy — all navigations served from cache.
- **Update:** `autoUpdate` mode — new SW silently installs and activates. No user prompt needed.
- **Registration callback:** On `onOfflineReady`, show Toast: `"Handa na ang Level para sa offline!"`

---

## UI/UX Rules

### Design Principles

1. **Zero-Math UI** — The farmer never types a formula. Only taps buttons and moves a slider.
2. **30-Second Test** — A user must be able to go from opening the app to seeing a Red/Green signal in under 30 seconds.
3. **Sunlight Readability** — All UI must be visible in bright outdoor sunlight. No subtle grays.
4. **Fat Finger Safe** — All interactive elements ≥ 60px tall. Designed for dirty/wet hands.

### Color System

| Semantic | Tailwind Class | Hex | Usage |
|---|---|---|---|
| **Bankrupt / Loss** | `bg-red-600` | `#dc2626` | Negotiation loss state, "LUGI!" |
| **Profit / Safe** | `bg-green-600` | `#16a34a` | Negotiation profit state, "KITA!" |
| Primary surface | `bg-green-700` | `#15803d` | Headers, primary buttons |
| Page background | `bg-green-50` | `#f0fdf4` | Default page background |
| Card surface | `bg-white` | `#ffffff` | Cards, forms |
| Text primary | `text-gray-900` | `#111827` | Body text |
| Text secondary | `text-gray-600` | `#4b5563` | Labels, hints |

### Typography

| Element | Size | Weight | Classes |
|---|---|---|---|
| Page title | 24px | Bold | `text-2xl font-bold` |
| Section header | 20px | Semibold | `text-xl font-semibold` |
| Body text | 18px (minimum) | Regular | `text-lg` |
| Button labels | 18px | Bold | `text-lg font-bold` |
| Amount display | 30px | Bold | `text-3xl font-bold tabular-nums` |
| Small labels | 16px | Regular | `text-base` |

### Touch Targets

| Element | Minimum Height | Classes |
|---|---|---|
| Buttons | 56px | `min-h-14 px-6 py-4 text-lg font-bold rounded-xl` |
| Tier picker buttons | 80px | `min-h-20 flex flex-col items-center justify-center rounded-2xl` |
| Bottom nav tabs | 64px | `min-h-16 flex flex-col items-center justify-center` |
| Form inputs | 56px | `min-h-14 px-4 py-3 text-lg border-2 rounded-xl` |

### Filipino UI Labels

| English | Filipino |
|---|---|
| Log Expense | Mag-log ng Gastos |
| Small | Maliit |
| Medium | Katamtaman |
| Large | Malaki |
| Break-Even Price | Presyong Balik-Puhunan |
| Loss / Bankrupt | LUGI! |
| Profit | KITA! |
| Total Expenses | Kabuuang Gastos |
| Harvest Weight | Timbang ng Ani (kg) |
| No expenses yet | Walang gastos pa |
| Saved! | Na-save na! |
| Ready for offline | Handa na para sa offline! |
| Home | Tahanan |
| Expenses | Gastos |
| Negotiation | Negosasyon |

---

## Implementation Order (4-Day Sprint)

### Day 1 — Foundation

- [ ] Initialize React + Vite project
- [ ] Install all dependencies
- [ ] Configure `vite.config.js` with PWA plugin + Tailwind plugin
- [ ] Set up `index.css` with Tailwind directives
- [ ] Create `AppShell`, `Header`, `BottomNav` layout components
- [ ] Set up `react-router-dom` with 3 routes (Home, Gastos, Negosasyon)
- [ ] Initialize localForage instances in `stores/db.js`
- [ ] Define constants in `utils/constants.js` (tier values, labels)
- [ ] Set up `SeasonContext` with React Context provider
- [ ] Scaffold `services/` directory with placeholder files for all four services

### Day 2 — Expense Logging (Camera + Tiers)

- [ ] Build `CameraCapture.jsx` — full-screen rear camera viewfinder
- [ ] Build `PhotoPreview.jsx` — confirm/retake flow
- [ ] Build `TierPicker.jsx` — three large S/M/L buttons
- [ ] Build `ConfirmAnimation.jsx` — green flash on successful save
- [ ] Implement `expenseStore.js` — CRUD via localForage (write Blob directly)
- [ ] Implement `services/expenseService.js` — `createExpense(tier, photoBlob)` + `getExpensesBySeason(seasonId)`
- [ ] Implement `services/seasonService.js` — `createSeason`, `updateSeason`, `archiveSeason`, `getActiveSeason`
- [ ] Build `ExpensesPage.jsx` — camera → tier pick → save → confirm animation
- [ ] Build `ExpenseList.jsx` + `ExpenseCard.jsx` for viewing logged expenses

### Day 3 — Negotiation Shield

- [ ] Implement `breakeven.js` — pure function: `totalExpenses / harvestWeight`
- [ ] Implement `services/negotiationService.js` — `calculateBreakEven(totalWeight)`
- [ ] Implement `services/feedbackService.js` — `checkOffer(currentOffer, breakEvenPrice)` with haptic trigger
- [ ] Build `HarvestInput.jsx` — large number input for total kilos
- [ ] Build `BucketVisual.jsx` — filling tank showing total seasonal debt
- [ ] Build `NegotiationSlider.jsx` — high-contrast range slider
- [ ] Build `BreakEvenDisplay.jsx` — shows computed price + red/green label
- [ ] Wire up real-time slider: crossing break-even toggles red/green + vibration
- [ ] Build `NegotiationPage.jsx` — assemble all negotiation components

### Day 4 — Season Management + PWA Polish + Testing

- [ ] Implement `seasonStore.js` — season CRUD
- [ ] Build `HomePage.jsx` — dashboard with bucket visual + quick-log button
- [ ] Implement "Clear Season" / archive logic for next year's reset
- [ ] Generate PWA icons (192, 512, maskable) and place in `public/`
- [ ] Test service worker: verify app loads with zero Wi-Fi/data
- [ ] Test camera on actual phone (Android Chrome, iOS Safari)
- [ ] Sunlight test: verify high-contrast visibility outdoors
- [ ] Haptic test: verify vibration fires the exact millisecond slider crosses break-even
- [ ] 30-second test: open app → log expense → see red/green signal in < 30s
- [ ] Handle SW update without clearing IndexedDB data
- [ ] Handle edge cases: no camera permission, empty season, zero harvest weight
- [ ] Add Toast for offline-ready: `"Handa na ang Level para sa offline!"`

---

## Definition of Done

Three non-negotiable checks from the project spec:

Offline Reality Check — Can I log an expense and use the slider with zero Wi-Fi or data? The app must be fully functional after first install with no internet.

Zero-Math UI — Does the user only have to tap buttons and move a slider, without ever typing a formula? No number inputs except harvest weight in kilos.

The "Vibe" Test — Does the phone vibrate the exact millisecond the slider crosses the break-even line? No perceptible delay between crossing the threshold and the haptic + color feedback.

---

## Key Technical Notes

### Photos as Blobs

Photos are stored as `Blob` objects directly in IndexedDB (not base64 strings). This is more memory-efficient and is what localForage's IndexedDB driver supports natively. When displaying photos, create an object URL via `URL.createObjectURL(blob)` and revoke it on cleanup.

### Vibration API Compatibility

- `navigator.vibrate()` works on Android Chrome and most Android browsers
- **Does NOT work on iOS Safari** — this is a known platform limitation. The red-screen color change remains the primary warning signal on iOS.
- Always check `if ('vibrate' in navigator)` before calling

### Camera HTTPS Requirement

- `getUserMedia()` requires HTTPS or `localhost`
- PWA must be deployed on HTTPS (Vercel, Netlify, GitHub Pages, etc.)
- Local dev on `localhost` works fine

### localForage Iteration

localForage has no query/index support. All filtering happens in memory:

- `expenseDB.iterate()` to loop all records, filter by `seasonId` in JavaScript
- For the MVP with <100 expenses per season, this is fast enough
- If performance becomes an issue, maintain a separate index key per season
