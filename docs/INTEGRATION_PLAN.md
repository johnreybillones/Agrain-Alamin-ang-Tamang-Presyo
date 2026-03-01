# Integration Plan: LevelAppV2 UI → Root Project

> **Purpose:** Step-by-step plan to replace the root UPLB-Hackathon UI with LevelAppV2's earth-tone design while preserving root's full backend (services, stores, PWA, routing, context). Each step includes guardrails — manual checklists and automated test scripts — to catch bugs before moving forward.
>
> **Golden Rule:** Never proceed to the next step until all guardrails for the current step are green.

---

## Table of Contents

- [Decisions & Ground Rules](#decisions--ground-rules)
- [Phase 1 — Decompose LevelAppV2 Into Modular Files](#phase-1--decompose-levelappv2-into-modular-files)
  - [Step 1.0 — Set Up Test Harness](#step-10--set-up-test-harness)
  - [Step 1.1 — Extract Design Tokens & Constants](#step-11--extract-design-tokens--constants)
  - [Step 1.2 — Extract Layout Components](#step-12--extract-layout-components)
  - [Step 1.3 — Extract UI Utility Components](#step-13--extract-ui-utility-components)
  - [Step 1.4 — Extract Expense Components](#step-14--extract-expense-components)
  - [Step 1.5 — Extract Camera / LogModal Components](#step-15--extract-camera--logmodal-components)
  - [Step 1.6 — Extract Negotiation Components](#step-16--extract-negotiation-components)
  - [Step 1.7 — Extract Page/Screen Components](#step-17--extract-pagescreen-components)
  - [Step 1.8 — Extract GlobalStyles to Separate CSS File](#step-18--extract-globalstyles-to-separate-css-file)
  - [Step 1.9 — Phase 1 Integration Test](#step-19--phase-1-integration-test)
- [Phase 2 — Convert to Tailwind & Wire Into Root](#phase-2--convert-to-tailwind--wire-into-root)
  - [Step 2.1 — Define Custom Tailwind Theme](#step-21--define-custom-tailwind-theme)
  - [Step 2.2 — Add Google Fonts](#step-22--add-google-fonts)
  - [Step 2.3 — Convert Layout Components to Tailwind](#step-23--convert-layout-components-to-tailwind)
  - [Step 2.4 — Convert UI Utility Components to Tailwind](#step-24--convert-ui-utility-components-to-tailwind)
  - [Step 2.5 — Convert Expense Components to Tailwind](#step-25--convert-expense-components-to-tailwind)
  - [Step 2.6 — Convert Camera / LogModal to Tailwind](#step-26--convert-camera--logmodal-to-tailwind)
  - [Step 2.7 — Convert Negotiation Components to Tailwind](#step-27--convert-negotiation-components-to-tailwind)
  - [Step 2.8 — Convert Page Components to Tailwind](#step-28--convert-page-components-to-tailwind)
  - [Step 2.9 — Wire Data Layer (Services, Stores, Context)](#step-29--wire-data-layer-services-stores-context)
  - [Step 2.10 — Wire Routing](#step-210--wire-routing)
  - [Step 2.11 — Photo Storage: base64 → Blob](#step-211--photo-storage-base64--blob)
  - [Step 2.12 — Reconcile Labels & Terminology](#step-212--reconcile-labels--terminology)
  - [Step 2.13 — Remove Extracted CSS File & GlobalStyles](#step-213--remove-extracted-css-file--globalstyles)
  - [Step 2.14 — Phase 2 Integration Test](#step-214--phase-2-integration-test)
- [Phase 3 — Final Verification](#phase-3--final-verification)

---

## Decisions & Ground Rules

These decisions were agreed upon and must be followed throughout:

| Decision | Chosen Option |
|---|---|
| **Integration direction** | Replace root's UI with LevelAppV2's look & feel; keep root's backend |
| **Visual design** | LevelAppV2's earth-tone palette (`#FEFAE0`, `#606C38`, `#BC6C25`) + Google Fonts (Righteous, Bebas Neue, Playfair Display) |
| **Styling system** | Tailwind CSS (as specified in Claude.md). Convert LevelAppV2's inline styles → Tailwind utility classes |
| **Tier values** | Root's values (₱500 / ₱2,500 / ₱7,000) from Claude.md |
| **Categories** | Add LevelAppV2's categories (Binhi, Pataba, Tubig, Tauhan, Kagamitan, Iba pa) |
| **Photo storage** | `Blob` objects in IndexedDB (not base64 strings) |
| **Routing** | `react-router-dom` (from root), not `useState`-based screen switching |
| **Data persistence** | IndexedDB via `localforage` (from root), not in-memory `useState` |
| **State management** | React Context (`SeasonContext`) from root |
| **PWA** | Root's `vite-plugin-pwa` configuration |
| **Decomposition approach** | Phase 1: decompose with inline styles intact. Phase 2: convert to Tailwind |

### Reference Files

- **Source of truth for spec:** `Claude.md`
- **Source of truth for design:** `LevelAppV2/src/LevelApp.jsx`
- **Source of truth for functionality:** `src/services/`, `src/stores/`, `src/context/`

---

## Phase 1 — Decompose LevelAppV2 Into Modular Files

> **Goal:** Break `LevelAppV2/src/LevelApp.jsx` (1,282 lines) into individual component files matching root's directory structure. **Keep inline styles as-is** — only structural changes in this phase.

### Step 1.0 — Set Up Test Harness

**What:** Install Vitest and create a minimal test setup so we can write automated guardrail tests.

**Actions:**
1. Add `vitest` and `@testing-library/react` and `@testing-library/jest-dom` to root's `devDependencies`:
   ```
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```
2. Add a `test` script to root's `package.json`:
   ```json
   "scripts": {
     "test": "vitest run",
     "test:watch": "vitest"
   }
   ```
3. Create `vitest.config.js` (or add `test` config to existing `vite.config.js`):
   ```js
   // vitest.config.js
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: './src/test/setup.js',
     },
   });
   ```
4. Create `src/test/setup.js`:
   ```js
   import '@testing-library/jest-dom';
   ```

**Guardrails:**
- [ ] **Manual:** `npm run test` executes without errors (should report "no tests found" at this point)
- [ ] **Manual:** `npm run dev` still starts without errors

---

### Step 1.1 — Extract Design Tokens & Constants

**What:** Pull all design values (colors, fonts, sizes, categories) out of `LevelAppV2/src/LevelApp.jsx` into importable modules.

**Source locations in `LevelAppV2/src/LevelApp.jsx`:**
- `C` object (16 colors): `cream`, `tan1`, `tan2`, `burnt`, `olive`, `dark`, `pula`, `pulaLight`, `pulaBorder`, `berde`, `berdeLight`, `berdeBorder`, `white`, `line`, `muted`, `shadow`
- `FONTS` object (4 keys): `logo` (Righteous), `duvet` (Bebas Neue), `rustyne` (Playfair Display), `body` (Helvetica Neue)
- `card` style object (shared card styling with white bg, border, borderRadius, overflow, boxShadow)
- `SIZES_AMOUNT` object (tier size/value mapping): `{ S: 300, M: 1500, L: 3500 }` — **but we use root's values instead**
- `CATS` object (6 category labels + emoji): `{ Binhi: '🌱', Pataba: '🧪', Tubig: '💧', Tauhan: '👷', Kagamitan: '🚜', Iba pa: '📦' }`

**Actions:**
1. Create `src/utils/designTokens.js` — export `COLORS`, `FONTS`, `CARD_STYLE` objects with values copied verbatim from LevelAppV2
2. Update `src/utils/constants.js`:
   - Keep root's tier values: `{ S: 500, M: 2500, L: 7000 }`
   - Add `EXPENSE_CATEGORIES` object: `{ Binhi: '🌱', Pataba: '🧪', Tubig: '💧', Tauhan: '👷', Kagamitan: '🚜', 'Iba pa': '📦' }` (6 entries, matching LevelAppV2's `CATS` exactly)
   - Add `TIER_LABELS` mapping: `{ S: 'Maliit', M: 'Katamtaman', L: 'Malaki' }`

**Guardrails:**
- [ ] **Automated test** (`src/utils/__tests__/designTokens.test.js`):
  ```
  - Import COLORS — verify all 16 color keys exist and are valid hex/rgba strings
  - Import FONTS — verify all 4 font keys exist and are non-empty strings
  - Import CARD_STYLE — verify it's a non-empty object with background, border, borderRadius
  ```
- [ ] **Automated test** (`src/utils/__tests__/constants.test.js`):
  ```
  - TIER_VALUES.S === 500, TIER_VALUES.M === 2500, TIER_VALUES.L === 7000
  - EXPENSE_CATEGORIES has exactly 6 entries
  - EXPENSE_CATEGORIES includes 'Binhi', 'Pataba', 'Tubig', 'Tauhan', 'Kagamitan', 'Iba pa'
  - Each category has an emoji that is a non-empty string
  ```
- [ ] **Manual:** `npm run test` passes
- [ ] **Manual:** Verify values match LevelAppV2 source exactly (spot-check `COLORS.cream === '#FEFAE0'`, etc.)

---

### Step 1.2 — Extract Layout Components

**What:** Extract `TopBar` and `BottomNav` from LevelAppV2 into root's layout component files.

**Source → Target mapping:**

| LevelAppV2 Component | Target File | Notes |
|---|---|---|
| `TopBar` | `src/components/layout/Header.jsx` | Preserve inline styles, import `COLORS`/`FONTS` from designTokens |
| `BottomNav` | `src/components/layout/BottomNav.jsx` | Preserve inline styles, adapt to accept `react-router-dom` navigation props |
| Root layout logic (safe-area padding, bg color) | `src/components/layout/AppShell.jsx` | Wraps Header + children + BottomNav |

**Actions:**
1. Back up existing root layout files (copy current content to comments or a temp location)
2. Replace `Header.jsx` content with LevelAppV2's `TopBar`, importing from `designTokens.js`
3. Replace `BottomNav.jsx` with LevelAppV2's `BottomNav`, **but keep the component interface accepting a route change mechanism** (for now, accept an `onNavigate` prop — will switch to router in Phase 2)
4. Update `AppShell.jsx` to compose the new Header + BottomNav + render children in between

**Guardrails:**
- [ ] **Automated test** (`src/components/layout/__tests__/Header.test.jsx`):
  ```
  - Renders without crashing
  - Contains the text "Level" (app name)
  - Imports COLORS from designTokens (no hardcoded color values in component)
  ```
- [ ] **Automated test** (`src/components/layout/__tests__/BottomNav.test.jsx`):
  ```
  - Renders without crashing
  - Renders exactly 3 navigation items
  - Each nav item has an accessible label/text matching: 'Kamalig', 'Gastos', 'Benta'
  - Calls onNavigate callback when a nav item is clicked
  ```
- [ ] **Automated test** (`src/components/layout/__tests__/AppShell.test.jsx`):
  ```
  - Renders without crashing
  - Renders Header and BottomNav as children
  - Renders child content passed to it
  ```
- [ ] **Manual:** `npm run dev` → app loads, header and bottom nav are visible
- [ ] **Manual:** No console errors in browser DevTools

---

### Step 1.3 — Extract UI Utility Components

**What:** Extract reusable UI atoms from LevelAppV2.

**Source → Target mapping:**

| LevelAppV2 Component | Target File |
|---|---|
| `ActionBtn` | `src/components/ui/BigButton.jsx` |
| `SuccessFlash` | `src/components/ui/ConfirmAnimation.jsx` |

**Actions:**
1. Extract `ActionBtn` → `BigButton.jsx` with same inline styles, accept `label`, `onClick`, `color`, `icon` props
2. Extract `SuccessFlash` → `ConfirmAnimation.jsx` with same animation logic

**Guardrails:**
- [ ] **Automated test** (`src/components/ui/__tests__/BigButton.test.jsx`):
  ```
  - Renders without crashing
  - Displays the passed label text
  - Calls onClick when clicked
  - Has a minimum height of 56px (check style or computed)
  ```
- [ ] **Automated test** (`src/components/ui/__tests__/ConfirmAnimation.test.jsx`):
  ```
  - Renders without crashing when `show` is true
  - Does not render visible content when `show` is false
  - Contains the success message text ("Nailista na" — LevelAppV2's actual text)
  ```
- [ ] **Manual:** `npm run test` passes

---

### Step 1.4 — Extract Expense Components

**What:** Extract expense display components from LevelAppV2.

**Source → Target mapping:**

| LevelAppV2 Component | Target File |
|---|---|
| `ExpenseFullRow` | `src/components/expenses/ExpenseCard.jsx` |
| Expense list rendering logic (`.map()` in `GastosScreen`) | `src/components/expenses/ExpenseList.jsx` |
| Tier/size selection buttons (from `LogModal`) | `src/components/expenses/TierPicker.jsx` |

**Actions:**
1. Extract `ExpenseFullRow` into `ExpenseCard.jsx` — keep delete confirmation modal inline for now
2. Extract expense list `.map()` logic into `ExpenseList.jsx` — accepts `expenses` array as prop, renders `ExpenseCard` for each
3. Extract tier/size selection buttons from `LogModal` into `TierPicker.jsx` — three buttons with inline styles

**Guardrails:**
- [ ] **Automated test** (`src/components/expenses/__tests__/ExpenseCard.test.jsx`):
  ```
  - Renders without crashing given a valid expense object
  - Displays the expense amount formatted with ₱
  - Displays the category name
  - Displays the tier label (Maliit/Katamtaman/Malaki)
  - Has a delete button/mechanism
  ```
- [ ] **Automated test** (`src/components/expenses/__tests__/ExpenseList.test.jsx`):
  ```
  - Renders without crashing with an empty array
  - Renders correct number of ExpenseCard components for a given array
  - Shows empty state message ("Walang gastos pa") when array is empty
  ```
- [ ] **Automated test** (`src/components/expenses/__tests__/TierPicker.test.jsx`):
  ```
  - Renders without crashing
  - Renders exactly 3 tier buttons
  - Each button displays correct label: Maliit, Katamtaman, Malaki
  - Each button displays correct value: ₱500, ₱2,500, ₱7,000 (root's values, NOT LevelAppV2's)
  - Calls onSelect callback with correct tier key when clicked
  ```
- [ ] **Manual:** `npm run test` passes
- [ ] **Manual:** Visual check — tier buttons use root's values (₱500/₱2,500/₱7,000)

---

### Step 1.5 — Extract Camera / LogModal Components

**What:** Extract camera and expense logging modal from LevelAppV2.

**Source → Target mapping:**

| LevelAppV2 Component | Target File |
|---|---|
| Camera capture logic in `LogModal` | `src/components/camera/CameraCapture.jsx` |
| Photo preview/retake logic in `LogModal` | `src/components/camera/PhotoPreview.jsx` |
| Full `LogModal` (orchestrates camera → category → tier → confirm) | `src/components/expenses/LogModal.jsx` (NEW file) |

**Actions:**
1. Extract camera `getUserMedia` + viewfinder + shutter into `CameraCapture.jsx`
2. Extract photo preview/retake into `PhotoPreview.jsx`
3. Create `LogModal.jsx` as an orchestrator that composes: CameraCapture → PhotoPreview → category select → TierPicker → confirm → SuccessFlash
4. The `useCamera.js` hook from root can be referenced but NOT wired yet (keep LevelAppV2's camera logic intact for now)

**Guardrails:**
- [ ] **Automated test** (`src/components/camera/__tests__/CameraCapture.test.jsx`):
  ```
  - Renders without crashing (mock getUserMedia)
  - Shows a shutter/capture button
  - Calls onCapture callback when shutter is pressed (with mocked media)
  - Handles NotAllowedError gracefully (shows error message, no crash)
  ```
- [ ] **Automated test** (`src/components/camera/__tests__/PhotoPreview.test.jsx`):
  ```
  - Renders without crashing given a photo source
  - Shows a "retake" button and a "confirm" button
  - Calls onRetake when retake is pressed
  - Calls onConfirm when confirm is pressed
  ```
- [ ] **Automated test** (`src/components/expenses/__tests__/LogModal.test.jsx`):
  ```
  - Renders without crashing when open
  - Does not render when closed
  - Has a close/cancel mechanism
  ```
- [ ] **Manual:** `npm run test` passes

---

### Step 1.6 — Extract Negotiation Components

**What:** Extract all negotiation/slider components from LevelAppV2.

**Source → Target mapping:**

| LevelAppV2 Component/Logic | Target File |
|---|---|
| Harvest weight input | `src/components/negotiation/HarvestInput.jsx` |
| Offer slider | `src/components/negotiation/NegotiationSlider.jsx` |
| Break-even price display + LUGI/SULIT label | `src/components/negotiation/BreakEvenDisplay.jsx` |

**Note:** `BucketVisual` is used on the **HomePage** (SakahanScreen), not the NegotiationPage. It is extracted in Step 1.7 as part of HomePage.

**Actions:**
1. Extract each component with its inline styles
2. Keep LevelAppV2's visual logic (bucket fill, slider gradient, red/green background transitions)
3. Components accept data via props (not internal state) for easy wiring later

**Guardrails:**
- [ ] **Automated test** (`src/components/negotiation/__tests__/HarvestInput.test.jsx`):
  ```
  - Renders without crashing
  - Has an input field for weight
  - Calls onChange with numeric value when user types
  - Labels in Filipino ("Timbang ng Ani (kg)" or LevelAppV2 equivalent)
  ```
- [ ] **Automated test** (`src/components/negotiation/__tests__/BucketVisual.test.jsx`):
  ```
  - Renders without crashing
  - Displays total expense amount
  - Fill level changes when totalExpenses prop changes (check style attribute)
  ```
- [ ] **Automated test** (`src/components/negotiation/__tests__/NegotiationSlider.test.jsx`):
  ```
  - Renders without crashing
  - Has an input[type="range"] element
  - Calls onChange when slider value changes
  - Slider thumb is at least 40px (check inline style or class)
  ```
- [ ] **Automated test** (`src/components/negotiation/__tests__/BreakEvenDisplay.test.jsx`):
  ```
  - Renders without crashing
  - Shows break-even price formatted with ₱
  - Shows "LUGI!" when offer < breakEven
  - Shows "SULIT!" when offer >= breakEven
  - Background changes to red when LUGI, green when SULIT
  ```
- [ ] **Manual:** `npm run test` passes

---

### Step 1.7 — Extract Page/Screen Components

**What:** Extract screen-level components from LevelAppV2 into root's page files.

**Source → Target mapping:**

| LevelAppV2 Screen | Target File |
|---|---|
| `SakahanScreen` | `src/pages/HomePage.jsx` |
| `GastosScreen` | `src/pages/ExpensesPage.jsx` |
| `NegoScreen` | `src/pages/NegotiationPage.jsx` |

**Actions:**
1. Replace each page file with LevelAppV2's screen, composing the extracted components from Steps 1.2–1.6
2. Pages still use props/callbacks for data — no service wiring yet
3. Temporarily use in-memory state at the page level (like LevelAppV2 does) for rendering verification

**Guardrails:**
- [ ] **Automated test** (`src/pages/__tests__/HomePage.test.jsx`):
  ```
  - Renders without crashing
  - Contains the BucketVisual component
  - Contains a button/link to log expenses ("Maglista ng Gastos")
  ```
- [ ] **Automated test** (`src/pages/__tests__/ExpensesPage.test.jsx`):
  ```
  - Renders without crashing
  - Contains the ExpenseList component
  - Contains a button to open LogModal
  - Shows empty state when no expenses
  ```
- [ ] **Automated test** (`src/pages/__tests__/NegotiationPage.test.jsx`):
  ```
  - Renders without crashing
  - Contains HarvestInput, NegotiationSlider, BreakEvenDisplay
  - Shows appropriate message when no expenses logged yet
  ```
- [ ] **Manual:** `npm run dev` → all three pages render correctly via navigation
- [ ] **Manual:** Visual comparison with LevelAppV2 — layouts should look identical

---

### Step 1.8 — Extract GlobalStyles to Separate CSS File

**What:** Move the injected `<style>` from LevelAppV2's `GlobalStyles` component into a standalone CSS file.

**Actions:**
1. Create `src/styles/levelapp-legacy.css`
2. Copy all CSS from the `GlobalStyles` component's template literal into this file
3. Import it in `src/main.jsx`: `import './styles/levelapp-legacy.css'`
4. Remove the `GlobalStyles` component from any remaining references

**Guardrails:**
- [ ] **Manual:** `npm run dev` → app looks identical to before this step
- [ ] **Manual:** No `<style>` tags injected by React in the DOM (check DevTools → Elements)
- [ ] **Manual:** All custom classes (`.bucket-tank`, `.offer-slider`, etc.) still apply correctly
- [ ] **Automated:** Verify `src/styles/levelapp-legacy.css` file exists and is non-empty (file system check in test)

---

### Step 1.9 — Phase 1 Integration Test

**What:** Full smoke test of the decomposed app before starting Tailwind conversion.

**Guardrails — ALL must pass:**
- [ ] **`npm run test`** — all automated tests from Steps 1.1–1.8 pass
- [ ] **`npm run dev`** — app starts without errors
- [ ] **`npm run build`** — production build succeeds with no errors
- [ ] **Manual: Home page** — bucket visual renders, "Maglista ng Gastos" button works
- [ ] **Manual: Expenses page** — can open LogModal, see camera (or mock), select category, select tier, see success flash, expense appears in list
- [ ] **Manual: Negotiation page** — can enter harvest weight, move slider, see red/green transitions
- [ ] **Manual: Navigation** — all three pages reachable via bottom nav
- [ ] **Manual: Console** — zero errors, zero warnings related to component imports
- [ ] **Manual: Visual parity** — side-by-side comparison with original LevelAppV2 shows no visual regressions
- [ ] **Count check:** `LevelAppV2/src/LevelApp.jsx` is NO LONGER imported anywhere. All code now lives in `src/` modular files

---

## Phase 2 — Convert to Tailwind & Wire Into Root

> **Goal:** Convert all inline styles to Tailwind utility classes and replace in-memory state with root's service/store layer.

### Step 2.1 — Define Custom Tailwind Theme

**What:** Register LevelAppV2's design tokens as custom Tailwind theme values.

**Actions:**
1. In `src/index.css`, add custom theme using Tailwind v4's `@theme` directive:
   ```css
   @import "tailwindcss";

   @theme {
     --color-cream: #FEFAE0;
     --color-tan1: #EFDCAC;
     --color-tan2: #D4A373;
     --color-burnt: #BC6C25;
     --color-olive: #606C38;
     --color-dark: #45462A;
     --color-pula: #C0392B;
     --color-pula-light: #FDF0EE;
     --color-berde: #3B7D3E;
     --color-berde-light: #EEF5EE;
     --color-line: #E0D4B0;
     --color-muted: #8B7D5A;

     --font-logo: 'Righteous', 'Arial Black', sans-serif;
     --font-duvet: 'Bebas Neue', 'Arial Narrow', sans-serif;
     --font-rustyne: 'Playfair Display', Georgia, serif;
     --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
   }
   ```
2. Add custom keyframes for success flash animation in the same file
3. Add slider thumb/track overrides compatible with LevelAppV2's burnt-orange styling

**Guardrails:**
- [ ] **Manual:** Create a temporary test component that uses every custom class: `bg-cream`, `text-olive`, `font-logo`, `font-duvet`, etc. Verify they compile and render correctly
- [ ] **Automated test** (`src/test/tailwind-theme.test.js`):
  ```
  - Read src/index.css, verify it contains all 12 custom color definitions
  - Verify it contains all 4 custom font definitions
  ```
- [ ] **Manual:** `npm run dev` — no Tailwind compilation errors
- [ ] **Manual:** `npm run build` — no build errors

---

### Step 2.2 — Add Google Fonts

**What:** Load LevelAppV2's Google Fonts.

**Actions:**
1. Add to `index.html` `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Righteous&family=Bebas+Neue&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
   ```
2. Remove the `@import url(...)` from `levelapp-legacy.css` (if it was there) to avoid double-loading

**Guardrails:**
- [ ] **Manual:** Open DevTools → Network tab → verify fonts load from Google CDN
- [ ] **Manual:** Temporarily apply `font-duvet` class to a heading — verify Righteous font renders
- [ ] **Manual:** Test with offline (the PWA should cache fonts after first load — verify in Application → Cache Storage)

---

### Step 2.3 — Convert Layout Components to Tailwind

**What:** Replace inline `style={{...}}` in Header, BottomNav, AppShell with Tailwind utility classes.

**Conversion approach for each component:**
1. Map each inline style property to its Tailwind equivalent
2. Use custom theme values (`bg-cream`, `text-olive`, `font-duvet`, etc.)
3. For dynamic styles (e.g., active tab indicator), use conditional `className` with template literals
4. Remove the `style` attribute entirely — no hybrid

**Guardrails:**
- [ ] **All existing automated tests from Step 1.2 still pass**
- [ ] **Manual: Visual comparison** — Header and BottomNav look identical before/after conversion
- [ ] **Manual:** No inline `style=` attributes remain in Header.jsx, BottomNav.jsx, AppShell.jsx (search the files)
- [ ] **Manual:** Responsive check — resize browser, verify layout doesn't break at 320px, 375px, 414px widths

---

### Step 2.4 — Convert UI Utility Components to Tailwind

**What:** Convert BigButton and ConfirmAnimation to Tailwind.

**Guardrails:**
- [ ] **All existing automated tests from Step 1.3 still pass**
- [ ] **Manual:** BigButton has `min-h-14` (56px) touch target — verify with DevTools
- [ ] **Manual:** ConfirmAnimation flash plays correctly (green/olive overlay, ~1s duration)
- [ ] **Manual:** No inline `style=` attributes remain

---

### Step 2.5 — Convert Expense Components to Tailwind

**What:** Convert ExpenseCard, ExpenseList, TierPicker to Tailwind.

**Guardrails:**
- [ ] **All existing automated tests from Step 1.4 still pass**
- [ ] **Manual:** TierPicker buttons are `min-h-20` (80px) — verify with DevTools
- [ ] **Manual:** TierPicker displays ₱500 / ₱2,500 / ₱7,000 (ROOT values)
- [ ] **Manual:** ExpenseCard shows category emoji + name correctly
- [ ] **Manual:** Delete confirmation modal in ExpenseCard renders correctly
- [ ] **Manual:** No inline `style=` attributes remain in these 3 files

---

### Step 2.6 — Convert Camera / LogModal to Tailwind

**What:** Convert CameraCapture, PhotoPreview, LogModal to Tailwind.

**Guardrails:**
- [ ] **All existing automated tests from Step 1.5 still pass**
- [ ] **Manual:** Camera viewfinder is full-screen on mobile viewport
- [ ] **Manual:** Shutter button is large, centered, and high-contrast
- [ ] **Manual:** Photo preview shows captured image correctly
- [ ] **Manual:** LogModal flow works: camera → preview → category → tier → confirm
- [ ] **Manual:** No inline `style=` attributes remain (except `style` on `<video>` element for object-fit if needed)

---

### Step 2.7 — Convert Negotiation Components to Tailwind

**What:** Convert HarvestInput, BucketVisual, NegotiationSlider, BreakEvenDisplay to Tailwind.

**Special attention:**
- `BucketVisual` has dynamic fill height — use Tailwind arbitrary values or keep a single inline `style={{ height: \`${percent}%\` }}` for the dynamic part only
- `NegotiationSlider` has custom thumb/track styling — use the CSS overrides defined in Step 2.1
- Red/green background transitions need to be instant — use Tailwind `transition-none` or `duration-0`

**Guardrails:**
- [ ] **All existing automated tests from Step 1.6 still pass**
- [ ] **Manual:** Bucket fill animates smoothly when expenses change
- [ ] **Manual:** Slider thumb is large (≥40px), high-contrast burnt-orange
- [ ] **Manual:** Red/green background changes INSTANTLY when slider crosses break-even (no transition delay)
- [ ] **Manual:** Only truly dynamic values (percentages, calculated positions) use inline `style=`; all static styling uses Tailwind

---

### Step 2.8 — Convert Page Components to Tailwind

**What:** Convert HomePage, ExpensesPage, NegotiationPage to Tailwind.

**Guardrails:**
- [ ] **All existing automated tests from Step 1.7 still pass**
- [ ] **Manual:** All three pages render correctly
- [ ] **Manual:** No inline `style=` attributes remain (except dynamic values)
- [ ] **Manual:** Page backgrounds use `bg-cream` or appropriate theme color

---

### Step 2.9 — Wire Data Layer (Services, Stores, Context)

**What:** Replace in-memory `useState` data with root's persistent data layer. This is the most critical integration step.

**Actions:**
1. **Expenses:** Replace `useState([])` expense arrays with:
   - `expenseService.createExpense(tier, photoBlob, category)` for saving (add `category` parameter)
   - `expenseService.getExpensesBySeason(seasonId)` for listing
   - Wire delete to `expenseStore` removal
2. **Seasons:** Connect to `SeasonContext` provider in `App.jsx`:
   - `seasonService.getActiveSeason()` on app mount
   - `seasonService.createSeason(id)` if no active season
   - `seasonService.updateSeason(id, { totalExpenseValue })` after each expense
3. **Negotiation:** Wire:
   - `negotiationService.calculateBreakEven(totalWeight)` for break-even computation
   - `feedbackService.checkOffer(currentOffer, breakEvenPrice)` for haptic + boolean result
4. **Update schemas:** Add `category` field to expense schema in `expenseStore.js`

**Guardrails:**
- [ ] **Automated test** (`src/services/__tests__/expenseService.test.js`):
  ```
  - createExpense saves with correct tier value (500/2500/7000)
  - createExpense saves category field
  - getExpensesBySeason returns only matching expenses
  ```
- [ ] **Automated test** (`src/services/__tests__/negotiationService.test.js`):
  ```
  - calculateBreakEven(500) with ₱10,000 total expenses returns 20
  - calculateBreakEven returns Infinity or error for 0 weight
  ```
- [ ] **Automated test** (`src/services/__tests__/feedbackService.test.js`):
  ```
  - checkOffer(18, 20) returns false (loss)
  - checkOffer(20, 20) returns true (break-even)
  - checkOffer(25, 20) returns true (profit)
  ```
- [ ] **Manual:** Log an expense → refresh page → expense persists (IndexedDB, not lost)
- [ ] **Manual:** Open DevTools → Application → IndexedDB → `level-db` → verify expense record exists with correct fields
- [ ] **Manual:** Log multiple expenses → total on HomePage updates correctly
- [ ] **Manual:** Archive season → expenses for that season are preserved but new season starts clean

---

### Step 2.10 — Wire Routing

**What:** Replace LevelAppV2's `useState("sakahan")` screen switching with `react-router-dom`.

**Actions:**
1. In `App.jsx`, set up routes:
   - `/` → `HomePage`
   - `/gastos` → `ExpensesPage`
   - `/negosasyon` → `NegotiationPage`
2. Update `BottomNav.jsx` to use `<NavLink>` or `useNavigate()` instead of `onNavigate` prop
3. Ensure `AppShell` wraps the `<Outlet />` or route content

**Guardrails:**
- [ ] **Automated test** (`src/__tests__/routing.test.jsx`):
  ```
  - Rendering App with MemoryRouter at "/" shows HomePage
  - Rendering with "/gastos" shows ExpensesPage
  - Rendering with "/negosasyon" shows NegotiationPage
  ```
- [ ] **Manual:** Click each bottom nav tab → URL changes in address bar
- [ ] **Manual:** Direct navigation to `/gastos` loads ExpensesPage
- [ ] **Manual:** Browser back/forward buttons work
- [ ] **Manual:** Active tab indicator in BottomNav matches current route

---

### Step 2.11 — Photo Storage: base64 → Blob

**What:** Convert LevelAppV2's `canvas.toDataURL()` to `canvas.toBlob()` per Claude.md spec.

**Actions:**
1. In `CameraCapture.jsx`, change capture logic:
   ```js
   // Before (LevelAppV2): canvas.toDataURL('image/jpeg', 0.7)
   // After: canvas.toBlob(callback, 'image/jpeg', 0.7)
   ```
2. In `ExpenseCard.jsx` and anywhere photos are displayed:
   ```js
   // Create object URL: URL.createObjectURL(blob)
   // Revoke on cleanup: URL.revokeObjectURL(url) in useEffect return
   ```
3. Update `expenseService.createExpense` to accept and store `Blob` (not string)

**Guardrails:**
- [ ] **Automated test** (`src/components/camera/__tests__/CameraCapture.test.jsx` — update):
  ```
  - onCapture callback receives a Blob, not a string
  - Blob type is 'image/jpeg'
  ```
- [ ] **Manual:** Capture a photo → check IndexedDB → the `photoBlob` field is a Blob object (not a base64 string)
- [ ] **Manual:** Captured photo displays correctly in ExpenseCard
- [ ] **Manual:** No memory leaks — object URLs are revoked (check DevTools → Memory)

---

### Step 2.12 — Reconcile Labels & Terminology

**What:** Align Filipino labels to LevelAppV2's terminology since its design is being adopted.

**Actions:**
1. Update `src/utils/constants.js` with agreed labels:

   | Concept | Final Label (from LevelAppV2) |
   |---|---|
   | Home tab | Kamalig |
   | Expenses tab | Gastos |
   | Negotiation tab | Benta |
   | Loss state | LUGI! |
   | Profit state | SULIT! |
   | Break-even price | Presyong Balik-Puhunan |
   | Log expense button | Maglista ng Gastos |
   | Empty state | Walang gastos pa |
   | Save confirmation | Nailista na |

2. Search all component files for hardcoded Filipino strings and replace with constants from the labels file

**Guardrails:**
- [ ] **Automated test:** Grep all `.jsx` files under `src/components/` and `src/pages/` — no hardcoded Filipino strings appear outside of `constants.js` (all UI text should come from the constants file)
- [ ] **Manual:** Navigate all pages and verify all text is in Filipino, consistent, and matches the table above
- [ ] **Manual:** No English fallback text visible anywhere in the UI

---

### Step 2.13 — Remove Extracted CSS File & GlobalStyles

**What:** Delete `src/styles/levelapp-legacy.css` now that all styles are in Tailwind.

**Actions:**
1. Remove `import './styles/levelapp-legacy.css'` from `src/main.jsx`
2. Delete `src/styles/levelapp-legacy.css`
3. Verify no component references any class defined in that file

**Guardrails:**
- [ ] **Manual:** `npm run dev` — app loads correctly, no missing styles
- [ ] **Manual:** `npm run build` — no build errors
- [ ] **Manual:** Full visual comparison against LevelAppV2 — no regressions
- [ ] **Automated:** Grep for any classname from the deleted CSS file (e.g., `bucket-tank`, `offer-slider`, `camera-fullscreen`) — should return zero matches in `.jsx` files

---

### Step 2.14 — Phase 2 Integration Test

**What:** Comprehensive smoke test of the fully integrated app.

**Guardrails — ALL must pass:**
- [ ] **`npm run test`** — all automated tests pass (target: 30+ tests across all files)
- [ ] **`npm run build`** — production build succeeds with zero errors, zero warnings
- [ ] **`npm run preview`** — preview production build works

**Manual Test Matrix:**

| Test | Steps | Expected Result |
|---|---|---|
| **Log expense flow** | Open app → Gastos → "Maglista" → camera opens → capture → select category → select tier → confirm | Expense saved, success flash, expense appears in list |
| **Expense persistence** | Log expense → refresh page | Expense still in list |
| **Expense delete** | Swipe/tap delete on expense → confirm | Expense removed, total updates |
| **Break-even calculation** | Log 4 expenses (₱500 + ₱2,500 + ₱2,500 + ₱7,000 = ₱12,500) → Benta → enter 500kg | Break-even shows ₱25/kg |
| **LUGI signal** | With break-even at ₱25, slide to ₱20 | Background turns red, "LUGI!" shows, phone vibrates (Android) |
| **SULIT signal** | Slide to ₱30 | Background turns green, "SULIT!" shows, no vibration |
| **Instant feedback** | Slowly drag slider across break-even line | Color + label + vibration change at EXACT threshold, no delay |
| **Bucket visual** | Log expenses on Home page | Bucket fill level increases with each expense |
| **Navigation** | Tap each bottom nav tab | Correct page loads, active indicator updates |
| **URL routing** | Type `/gastos` in address bar | Expenses page loads directly |

---

## Phase 3 — Final Verification

### PWA Verification
- [ ] `npm run build` then serve with a static server
- [ ] Open in Chrome → Application tab → Service Worker registered and active
- [ ] Manifest loads correctly with earth-tone `theme_color` updated to `#606C38` (olive)
- [ ] All 3 icons present (192, 512, maskable)
- [ ] Enable Offline mode in DevTools → app fully functional
- [ ] Install as PWA on Android → verify standalone mode, custom icon

### Device Testing
- [ ] **Android Chrome:** Camera, vibration, PWA install, offline — all work
- [ ] **iOS Safari:** Camera works, vibration fails gracefully (no crash, red screen is the signal), add to home screen works
- [ ] **Small screen (320px width):** No horizontal overflow, all touch targets ≥ 56px
- [ ] **Sunlight readability:** High-contrast earth tones visible on screen at max brightness

### Performance
- [ ] Lighthouse PWA score ≥ 90
- [ ] Lighthouse Performance score ≥ 80
- [ ] First paint under 2 seconds on throttled 3G
- [ ] IndexedDB data survives app update (build new version, verify old data intact)

### 30-Second Test (from Claude.md)
- [ ] Timer: open app fresh → log one expense → navigate to Benta → enter weight → see red/green signal — **under 30 seconds**

### Zero-Math UI Test (from Claude.md)
- [ ] Complete the entire user journey without typing any number except harvest weight in kg
- [ ] No calculator, no formula, no math required from user

---

## Appendix: Component Mapping Reference

Quick reference for which LevelAppV2 component maps to which root file:

| LevelAppV2 (`LevelApp.jsx`) | Root Target File | Phase 1 Step | Phase 2 Step |
|---|---|---|---|
| `C`, `FONTS`, `card`, `SIZES_AMOUNT`, `CATS` | `src/utils/designTokens.js` + `src/utils/constants.js` | 1.1 | 2.1 |
| `TopBar` | `src/components/layout/Header.jsx` | 1.2 | 2.3 |
| `BottomNav` | `src/components/layout/BottomNav.jsx` | 1.2 | 2.3 |
| Layout wrapper | `src/components/layout/AppShell.jsx` | 1.2 | 2.3 |
| `ActionBtn` | `src/components/ui/BigButton.jsx` | 1.3 | 2.4 |
| `SuccessFlash` | `src/components/ui/ConfirmAnimation.jsx` | 1.3 | 2.4 |
| `ExpenseFullRow` | `src/components/expenses/ExpenseCard.jsx` | 1.4 | 2.5 |
| Expense list `.map()` | `src/components/expenses/ExpenseList.jsx` | 1.4 | 2.5 |
| Tier buttons (from LogModal) | `src/components/expenses/TierPicker.jsx` | 1.4 | 2.5 |
| Camera capture (from LogModal) | `src/components/camera/CameraCapture.jsx` | 1.5 | 2.6 |
| Photo preview (from LogModal) | `src/components/camera/PhotoPreview.jsx` | 1.5 | 2.6 |
| `LogModal` | `src/components/expenses/LogModal.jsx` (NEW) | 1.5 | 2.6 |
| Harvest weight input | `src/components/negotiation/HarvestInput.jsx` | 1.6 | 2.7 |
| Bucket visual | `src/components/negotiation/BucketVisual.jsx` | 1.6 | 2.7 |
| Offer slider | `src/components/negotiation/NegotiationSlider.jsx` | 1.6 | 2.7 |
| Break-even display | `src/components/negotiation/BreakEvenDisplay.jsx` | 1.6 | 2.7 |
| `SakahanScreen` | `src/pages/HomePage.jsx` | 1.7 | 2.8 |
| `GastosScreen` | `src/pages/ExpensesPage.jsx` | 1.7 | 2.8 |
| `NegoScreen` | `src/pages/NegotiationPage.jsx` | 1.7 | 2.8 |
| `GlobalStyles` | `src/styles/levelapp-legacy.css` (temporary) | 1.8 | 2.13 (deleted) |
