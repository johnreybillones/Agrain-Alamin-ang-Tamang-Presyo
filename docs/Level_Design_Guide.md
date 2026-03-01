# LEVEL — Design Guide

**Level: The Human Experience**
An offline, visual financial shield designed to protect farmers at the exact moment of sale.

---

## App Identity

- **Name:** Level
- **Tagline:** The Human Experience
- **Icon:** 🌾
- **Mission:** Replace numbers with colors, math with photography, and anxiety with confidence. Level stands beside the farmer like a silent, math-savvy partner who never blinks.

---

## Color Palette

Earth tones that feel warm, trustworthy, and grounded — like the soil itself.

### Primary Palette

| Swatch | Hex       | Name    | Role                                                        |
|--------|-----------|---------|-------------------------------------------------------------|
| ██████ | `#FEFAE0` | Cream   | Primary background — warm, paper-like base for all screens  |
| ██████ | `#EFDCAC` | Tan     | Secondary surface — card borders, dividers, soft separators |
| ██████ | `#D4A373` | Sienna  | Accent warm — interactive borders, subtle emphasis          |
| ██████ | `#BC6C25` | Burnt   | Primary action — CTA buttons, highlights, active states     |
| ██████ | `#606C38` | Olive   | Success / primary — save actions, positive states, profit   |
| ██████ | `#45462A` | Dark    | Text primary — headings, strong labels, high-contrast text  |

### Semantic Colors

| Swatch | Hex       | Name         | Role                                          |
|--------|-----------|--------------|-----------------------------------------------|
| ██████ | `#C0392B` | Pula (Red)   | DANGER — bankruptcy warning, loss indicator   |
| ██████ | `#3B7D3E` | Berde (Green)| SAFE — profit confirmation, successful save   |
| ██████ | `#FDF0EE` | Red Light    | Danger background — soft red screen tint      |
| ██████ | `#EEF5EE` | Green Light  | Safe background — soft green screen tint      |

### Derived / UI Colors

| Hex                       | Name         | Usage                            |
|---------------------------|--------------|----------------------------------|
| `#FFFFFF`                 | White        | Card backgrounds                 |
| `#E0D4B0`                | Line         | Borders, dividers                |
| `#8B7D5A`                | Muted        | Secondary text, captions         |
| `rgba(69,70,42,0.12)`    | Shadow       | Card drop shadows                |
| `rgba(192,57,43,0.25)`   | Red Border   | Danger state border              |
| `rgba(59,125,62,0.28)`   | Green Border | Safe state border                |

---

## Typography

Three typefaces that balance authority, elegance, and readability.

### Logo Font (Placeholder: Righteous)
- **Usage:** "LEVEL" logo/brand name only
- **Style:** All-caps, wide letter-spacing (3px), bold and rounded
- **Sample:** `LEVEL`
- **Why:** Rounded, distinctive letterforms that give the brand identity a strong, memorable presence. Used exclusively for the app name.

### Duvet (Placeholder: Bebas Neue)
- **Usage:** Headlines, prices, CTAs, navigation labels
- **Style:** All-caps, wide letter-spacing (2–3px), bold condensed
- **Sizes:** 22px–38px (fluid with clamp)
- **Sample:** `KITA! · BANGKAROTA · ₱24,500`
- **Why:** Commands attention without requiring reading skill. A farmer sees weight and importance, not words.

### Rustyne (Placeholder: Playfair Display)
- **Usage:** Section labels, subtle guidance text, greetings
- **Style:** Italic, serif, 11–14px, uppercase with letter-spacing
- **Sample:** *Magandang araw, Mang Jose*
- **Why:** Adds warmth and approachability. Feels personal, like a handwritten note.

### System Sans (Helvetica Neue / Arial)
- **Usage:** Body text, descriptions, secondary information
- **Style:** Regular/medium weight, 11–15px
- **Sample:** 3 gastos ang na-log ngayong season · Litrato na-save
- **Why:** Clean and neutral — never fights for attention. Maximizes readability.

### Font Loading
```
Google Fonts import:
https://fonts.googleapis.com/css2?family=Righteous&family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap
```

---

## Visual Language

Icons replace words — every expense category has an instantly recognizable symbol.

### Expense Category Icons

| Icon | Category    | Filipino      | Description                   |
|------|-------------|---------------|-------------------------------|
| 🌱   | Seeds       | Binhi         | Planting seeds and seedlings  |
| 🧪   | Fertilizer  | Pataba        | Chemical and organic inputs   |
| 💧   | Irrigation  | Patubig       | Water and irrigation costs    |
| 👷   | Labor       | Manggagawa    | Workers and hired help        |
| 🚜   | Equipment   | Kagamitan     | Tools, machines, maintenance  |
| 📦   | Other       | Iba pa        | Miscellaneous expenses        |

### Size Indicators (Replace Exact Numbers)

Instead of typing peso amounts, the farmer taps one of three visual blocks:

| Size | Label (Filipino) | Range           | Visual             |
|------|-------------------|-----------------|---------------------|
| S    | MALIIT           | < ₱500          | Single short bar    |
| M    | KATAMTAMAN       | ₱500 – ₱2,000  | Three medium bars   |
| L    | MALAKI           | > ₱2,000        | Three tall bars     |

**Mapped Amounts:** S = ₱300, M = ₱1,200, L = ₱3,500

Size badge colors:
- S → Blue tint (`#EEF0F8`, text `#3A50A0`)
- M → Gold tint (`#FEF6E6`, text `#8B6914`)
- L → Green tint (`#EEF2E6`, text `#606C38`)

### Status Indicators

| State       | Icon | Color      | Background   | Label       | Extra              |
|-------------|------|------------|--------------|-------------|--------------------|
| Profit      | ✅   | `#3B7D3E`  | `#EEF5EE`   | KITA!       | Green screen tint  |
| Bankruptcy  | ⛔   | `#C0392B`  | `#FDF0EE`   | BANGKAROTA  | Red tint + vibrate |

---

## Core Components

Every component is designed for touch-first, zero-reading interaction.

### Action Buttons

Two gradient variants, both full-width with large padding:

**Olive Variant** (Primary actions — Log, Save)
- Background: `linear-gradient(135deg, #45462A, #606C38)`
- Shadow: `0 4px 16px rgba(96,108,56,0.35)`
- Text: Cream (`#FEFAE0`), Duvet font, uppercase, 2px tracking

**Burnt Variant** (Secondary actions — Check Offer, Navigate)
- Background: `linear-gradient(135deg, #9A4A10, #BC6C25)`
- Shadow: `0 4px 16px rgba(188,108,37,0.35)`
- Text: Same as olive

**Shared properties:** `border-radius: 14px`, `padding: 14–18px 20px`, disabled state uses `#EFDCAC` background

### Cards

**Standard Card**
- Background: White (`#FFFFFF`)
- Border: `1.5px solid #E0D4B0`
- Radius: 18px
- Shadow: `0 2px 12px rgba(69,70,42,0.12)`

**Elevated Card** (hero/summary elements)
- Background: `linear-gradient(145deg, #FFFFFF, #FEFAE0)`
- Border: `2px solid #D4A373`
- Same radius and shadow

### Input Fields

**Harvest Weight Input**
- Background: `#FEFAE0` (Cream)
- Border: `2px solid` — `#EFDCAC` (inactive) / `#BC6C25` (active)
- Radius: 10px
- Font: Huvet, 18–24px
- Transition: border-color 0.2s

### Slider (Offer Price)

- Track: 8px height, `#EFDCAC` background, rounded
- Thumb: 30–40px circle, `#BC6C25` fill, 3px cream border, orange drop shadow
- Accent color shifts: Olive (profit) / Red (loss)

### Bottom Navigation

- 3 tabs: Tahanan (🏠), Gastos (📋), Negosasyon (⚖️)
- Active state: Burnt Orange text + 24x3px indicator bar below icon
- Inactive: Muted text (`#8B7D5A`)
- Sticky to bottom, respects safe-area-inset

### Bottom Sheet Modal

- Backdrop: `rgba(69,70,42,0.55)` with `backdrop-filter: blur(3px)`
- Sheet: Cream background, `border-radius: 28px 28px 0 0`
- Handle bar: 40x4px, Sienna color, centered
- Animation: Slide up from bottom, 350ms ease-out-cubic
- Max-height: 90dvh with scroll

---

## The Visual Tank

The central metaphor — a filling bucket that replaces spreadsheets with intuition.

### How It Works

The tank is a rectangular container that visually fills from bottom to top based on the buyer's offered price. A fixed horizontal line marks the **break-even point**.

```
┌─────────────────────────┐
│                         │
│       ₱18 /kilo         │  ← Offer label (floats above fill)
│                         │
│ ───── Break-even ────── │  ← Fixed line (Burnt Orange, 3px, glowing)
│  █████████████████████  │
│  █████████████████████  │  ← Fill color:
│  █████████████████████  │     GREEN if above break-even
│  █████████████████████  │     RED if below break-even
└─────────────────────────┘
```

### Tank Properties

- Height: responsive (120–180px)
- Background: Cream
- Border: `2px solid #EFDCAC`, radius 14px
- Fill opacity: 0.55
- Fill transition: `height 0.6s cubic-bezier(0.22,1,0.36,1)`
- Break-even line: `3px solid #BC6C25` with `box-shadow: 0 0 8px rgba(188,108,37,0.5)`
- Break-even label: Burnt Orange pill, white text, positioned above the line

### Home Screen Bucket

A vertical tank on the Tahanan screen shows accumulated expenses filling a bucket (🪣):
- Fill: `linear-gradient(to top, #606C38cc, #BC6C2599)`
- Wave effect at the top of the fill level
- Center label: Bucket emoji + total peso amount in Duvet font

---

## Micro-interactions & Animation

Every interaction confirms without words — through motion, color, and touch.

### 1. Success Flash
- **Trigger:** Expense saved successfully
- **Visual:** Full-screen olive green overlay with checkmark (✓) inside a pulsing circle
- **Animation:** `flashAnim` — fade in (0→15%), hold (15→75%), fade out (75→100%), total 1.1s
- **Checkmark:** `pulseCheck` — scale from 0.3 to 1.15 to 1.0 over 0.6s
- **Purpose:** Confirms save without reading. The farmer FEELS it.

### 2. Haptic Vibration
- **Trigger:** Offer price falls below break-even on the negotiation slider
- **Pattern:** `[200, 100, 200]` (vibrate 200ms, pause 100ms, vibrate 200ms)
- **Also:** Double pulse `[100, 50, 100]` on successful save
- **Purpose:** Physical urgency signal. Even without looking, the farmer knows.

### 3. Color Transitions
- **Trigger:** Slider movement changes profit/loss state
- **Visual:** Background smoothly transitions between Cream → Red Light (`#FDF0EE`) → Green Light (`#EEF5EE`)
- **Duration:** 400ms ease
- **Purpose:** No jarring state changes. The mood of the screen shifts gradually.

### 4. Tank Fill Animation
- **Trigger:** Slider value changes
- **Visual:** Tank fill height animates fluidly
- **Duration:** 600ms, cubic-bezier(0.22, 1, 0.36, 1)
- **Purpose:** Mimics water filling a real bucket. Intuitive and satisfying.

### 5. Bottom Sheet Slide
- **Trigger:** "Log Cost" button tapped
- **Visual:** Modal slides up from bottom of viewport
- **Duration:** 350ms, cubic-bezier(0.22, 1, 0.36, 1)
- **Purpose:** Matches native mobile patterns for familiarity.

### 6. Selection Feedback
- **Trigger:** Size block or category pill tapped
- **Visual:** Border color and background color transition in 200ms
- **Purpose:** Instant visual confirmation of the selection.

### 7. Vibration Blink
- **Trigger:** Loss state active
- **Visual:** "📳 Nanginginig ang telepono" text blinks (opacity 1→0.2→1, 0.8s loop)
- **Purpose:** Reinforces the haptic warning visually.

---

## Accessibility & Inclusivity

Designed for farmers who may have low literacy, poor eyesight, or no patience for complexity.

### Zero-Math Design
No calculator, no spreadsheet, no mental arithmetic. The app answers one question: "Is this offer good enough?" with a color. Red or Green. That's it.

### Photography-Based Input
Instead of typing peso amounts, farmers photograph their expenses. A sack of fertilizer IS the data entry. Physical reality becomes digital record.

### Color-Coded Communication
- Red = Danger / Loss
- Green = Safe / Profit
- Burnt Orange = Action needed / Attention
These associations are universal, not learned.

### Haptic Feedback
The phone vibrates when the offer is below break-even. Even without looking at the screen, the farmer FEELS the warning in their hand.

### Offline-First Architecture
Works in the middle of a muddy field with zero signal. All data stored locally on device (IndexedDB via localForage). No cloud dependency, no loading spinners, no "poor connection" errors.

### Touch-Optimized Targets
- Minimum touch target: 30px (recommended 44px+)
- Large buttons with generous padding
- Chunky slider thumb (30–40px diameter)
- Big, tappable icon blocks
- Designed for calloused hands and outdoor use under sunlight

### Language
All UI text is in Filipino (Tagalog) to match the target users. Labels are short and direct. Icons are used alongside text so the meaning is clear even without reading.

---

## Design Principles

The philosophy behind every pixel.

### 01 — Feel, Don't Read
If the user has to read a sentence to understand the state, the design has failed. Color, vibration, and motion carry the message.

### 02 — The Farmer's Reality IS the Interface
Sacks of fertilizer, not spreadsheet rows. Photos, not text fields. The app mirrors their world, not an accountant's world.

### 03 — One Glance, One Answer
Red or Green. That's it. The entire app exists to deliver this single, unmistakable signal at the moment it matters most.

### 04 — Respect, Not Rescue
Level doesn't teach, lecture, or simplify. It arms the farmer with their own data, presented in their own visual language, ensuring they can look a buyer in the eye and demand their fair share.

---

## Technical Notes

### Responsive Behavior
- Fully responsive web app — adapts to any device size and orientation
- Uses CSS `clamp()` for fluid typography and spacing
- Grid layouts collapse from 3 → 2 → 1 columns on smaller screens
- Landscape mode reduces vertical padding and tank heights
- Supports safe-area-inset for notched phones

### PWA Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="theme-color" content="#45462A" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### Tech Stack
- Frontend: React 19 + Vite 7 (PWA)
- Database: IndexedDB (via localForage) — local storage only
- APIs: HTML5 Camera API, Device Vibration API
- Styling: Inline styles + CSS-in-JS (no external CSS framework)
