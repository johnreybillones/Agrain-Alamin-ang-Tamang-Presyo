# LEVEL — User Flow

**Level: The Human Experience**
From opening the app to a Red/Green signal in under 30 seconds.

---

## Overview

Level's user flow is split into two phases:

1. **Phase 1: The Growing Season** — Recording expenses over weeks/months. Each log takes under 10 seconds.
2. **Phase 2: Harvest Day** — Checking a buyer's offer in seconds. The farmer gets a Red or Green signal instantly.

### Target User
Older, independent smallholder farmers who struggle with rapid mental accounting. They may have low literacy, limited smartphone experience, and calloused hands. They stand in muddy fields with one buyer and zero internet.

### The 30-Second Promise
A farmer can open Level, navigate to the Negotiation screen, enter their harvest weight, slide to the buyer's offer, and see a GREEN or RED signal — all in under 30 seconds. No typing paragraphs, no reading charts, no waiting for data to load.

---

## Phase 1: The Growing Season

**Context:** Throughout the planting and growing months, the farmer logs expenses as they occur. Each log takes under 10 seconds — tap, snap, tap, done. These expenses accumulate in the "Expense Bucket" on the home screen.

### Step 1 → Tap "Mag-log ng Gastos"

- **Screen:** Tahanan (Home)
- **Action:** From the home screen, the farmer taps the large olive-green button labeled "📋 Mag-log ng Gastos"
- **Design Notes:** No menus, no navigation required — one tap to start. The button is full-width, high contrast, and uses Duvet font for maximum visibility.
- **Time:** ~1 second

```
┌──────────────────────────────┐
│  🌾 LEVEL     [Season Pill]  │
│                              │
│  Magandang araw,             │
│  MANG JOSE 👋               │
│                              │
│  ┌──────────────────────┐   │
│  │   🪣 Expense Bucket  │   │
│  │      ₱12,000         │   │
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │
│  │ 📋 MAG-LOG NG GASTOS │ ← TAPS HERE
│  └──────────────────────┘   │
│                              │
│  🏠      📋      ⚖️         │
└──────────────────────────────┘
```

---

### Step 2 → Camera Opens — Take a Photo

- **Screen:** Log Modal (Bottom Sheet)
- **Action:** The bottom sheet slides up instantly. The farmer taps the dashed camera zone to capture a photo of the receipt, fertilizer sack, seed bag, or tool.
- **Design Notes:** Camera zone is large (100–140px tall), centered, with a 📷 icon and "Kumuha ng Litrato" label. After capture, it switches to a ✅ confirmation state.
- **Key Principle:** The photo IS the data. No typing required.
- **Time:** ~3 seconds

```
┌──────────────────────────────┐
│  ─── (handle bar) ───        │
│                              │
│  MAG-LOG NG GASTOS           │
│                              │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│  │                       │  │
│  │       📷              │ ← TAPS TO CAPTURE
│  │  Kumuha ng Litrato    │  │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  │
│                              │
│         ↓ AFTER TAP ↓       │
│                              │
│  ┌───────────────────────┐  │
│  │       ✅               │  │
│  │  Litrato na-save!     │  │
│  └───────────────────────┘  │
└──────────────────────────────┘
```

---

### Step 3 → Tap a Size Block (S / M / L)

- **Screen:** Log Modal (Bottom Sheet)
- **Action:** Three large, color-coded blocks replace number input. Farmer taps one:
  - **S (MALIIT)** — Small expense, under ₱500
  - **M (KATAMTAMAN)** — Medium expense, ₱500–₱2,000
  - **L (MALAKI)** — Large expense, over ₱2,000
- **Design Notes:** Each block has visual bar indicators (short/medium/tall bars). Active state uses olive green border and light green background. No keyboard ever appears.
- **Key Principle:** Replace exact numbers with intuitive size categories.
- **Time:** ~1 second

```
  Gaano kalaki ang gastos?

  ┌─────────┐ ┌─────────┐ ┌─────────┐
  │    |    │ │  | || |  │ │ | ||| | │
  │         │ │          │ │         │
  │ MALIIT  │ │KATAMTAMAN│ │ MALAKI  │ ← TAPS ONE
  │ <₱500   │ │₱500-2000 │ │ >₱2000  │
  └─────────┘ └─────────┘ └─────────┘
```

---

### Step 4 → Select Expense Category

- **Screen:** Log Modal (Bottom Sheet)
- **Action:** Farmer taps an icon pill to categorize the expense:
  - 🌱 Binhi (Seeds)
  - 🧪 Pataba (Fertilizer)
  - 💧 Patubig (Irrigation)
  - 👷 Manggagawa (Labor)
  - 🚜 Kagamitan (Equipment)
  - 📦 Iba pa (Other)
- **Design Notes:** Pills use icons alongside text. Active state has burnt orange border and warm background tint. Pills wrap to multiple lines on small screens.
- **Time:** ~1 second

```
  Uri ng Gastos

  [🌱 Binhi] [🧪 Pataba] [💧 Patubig]
  [👷 Manggagawa] [🚜 Kagamitan] [📦 Iba pa]
```

---

### Step 5 → Flash Confirmation — Saved!

- **Screen:** Full-Screen Overlay
- **Action:** Farmer taps "✓ I-save sa Aking Talaan" button. The entire screen flashes olive green with a pulsing checkmark.
- **Feedback:**
  - Visual: Full-screen green overlay, large ✓ with pulse animation, "Na-save ang Gastos!" text
  - Haptic: Phone vibrates twice ([100, 50, 100] pattern)
  - Duration: 1.1 seconds, auto-dismisses
- **Key Principle:** No "Success" message to read — the farmer FEELS and SEES it.
- **Time:** ~1 second (auto)

```
┌──────────────────────────────┐
│                              │
│     ██████████████████████   │
│     ██                  ██   │
│     ██    ✓ (pulsing)   ██   │
│     ██                  ██   │
│     ██████████████████████   │
│                              │
│    NA-SAVE ANG GASTOS!       │
│                              │
│    (entire screen is olive   │
│     green, fades out after   │
│     1.1 seconds)             │
│                              │
└──────────────────────────────┘
```

---

### Phase 1 Summary

```
📋 Log  →  📷 Photo  →  📊 Size  →  🏷️ Category  →  ✅ Saved!
  1s          3s          1s           1s              1s (auto)

Total: ~7 seconds per expense

⟲ Repeat throughout the growing season
```

**After each log:** The expense appears in the Expense Bucket on the home screen. The bucket fills visually — the farmer watches their investment grow over the season.

---

## Phase 2: Harvest Day — The Negotiation

**Context:** The middleman arrives at the farm with a truck and a calculator. The farmer needs to know — right now — whether the offered price covers their seasonal expenses. Level gives them the answer in seconds.

### Step 1 → Navigate to Negosasyon

- **Screen:** Bottom Nav / Tahanan (Home)
- **Action:** Farmer taps either:
  - The ⚖️ "Negosasyon" tab in the bottom navigation, OR
  - The "⚖️ I-check ang Alok" burnt orange button on the home screen
- **Design Notes:** Two paths to the same destination — whichever the farmer finds first works.
- **Time:** ~1 second

---

### Step 2 → See the Expense Bucket

- **Screen:** Negosasyon
- **Action:** The total seasonal expense is displayed prominently at the top of the negotiation screen:
  - Large peso amount in Duvet font
  - Bucket emoji (🪣)
  - Gradient card background
- **Design Notes:** This is the farmer's total investment — their "floor." They need to know this number is real and complete. The visual weight communicates importance.
- **Time:** ~1 second (glance)

```
┌──────────────────────────────┐
│  SURIIN ANG ALOK             │
│                              │
│  ┌──────────────────────┐   │
│  │ Kabuuang Gastos  🪣  │   │
│  │ ₱ 24,500             │ ← TOTAL COSTS
│  └──────────────────────┘   │
└──────────────────────────────┘
```

---

### Step 3 → Enter Harvest Weight (kg)

- **Screen:** Negosasyon
- **Action:** The single number input on this screen. Farmer enters how many kilos they harvested (e.g., 500 kg).
- **Design Notes:** Large input field with Duvet font. Placeholder text: "hal. 500". This is the ONLY number the farmer needs to type. The break-even price per kilo is calculated automatically.
- **Calculation:** Break-even = Total Expenses ÷ Harvest Weight
- **Time:** ~3 seconds

```
  Timbang ng Ani (kg)
  ┌──────────────────────────┐
  │  500                     │ ← TYPES WEIGHT
  └──────────────────────────┘
  Ilagay ang timbang ng iyong ani...
```

---

### Step 4 → Slide to the Buyer's Offer

- **Screen:** Negosasyon
- **Action:** A large, tactile slider lets the farmer match the buyer's offered price per kilo. As the slider moves:
  - The visual tank fills or empties in real-time
  - The offer amount (₱/kilo) floats above the fill level
  - The break-even line stays fixed
  - The background color transitions between red and green
- **Design Notes:** Slider thumb is oversized (30–40px), burnt orange, with a cream border and drop shadow. Range: ₱5/kg to ₱35/kg, step: ₱0.50.
- **Time:** ~3 seconds

```
          ₱18 /kilo
  ┌─────────────────────────┐
  │                         │
  │  ═══ Break-even ═══════ │  ← Fixed line
  │  █████████████████████  │
  │  █████████████████████  │  ← Fill rises/falls
  │  █████████████████████  │     with slider
  └─────────────────────────┘

  Ilipat sa alok ng mamimili
  ○────────────●──────────○
  ₱5/kg                ₱35/kg
```

---

### Step 5 → See the Signal

Two possible outcomes:

#### 🟢 GREEN — Profit! (KITA!)

- **Condition:** Slider value ≥ break-even price per kilo
- **Visual:**
  - Screen background transitions to soft green (`#EEF5EE`)
  - Status badge: ✅ icon, "KITA!" heading in green, "Sakop ng alok ang iyong gastos" message
  - Tank fill turns green (olive gradient)
  - Tank fill level is ABOVE the break-even line
- **Meaning:** The buyer's offer covers all expenses. The farmer can accept.

```
┌──────────────────────────────┐
│  (green background)          │
│                              │
│  ┌──────────────────────┐   │
│  │ ✅  KITA!             │   │
│  │ Sakop ng alok ang     │   │
│  │ iyong gastos.         │   │
│  └──────────────────────┘   │
│                              │
│  Tank: GREEN fill above line │
└──────────────────────────────┘
```

---

#### 🔴 RED — Bankruptcy! (BANGKAROTA!)

- **Condition:** Slider value < break-even price per kilo
- **Visual:**
  - Screen background transitions to soft red (`#FDF0EE`)
  - Status badge: ⛔ icon, "BANGKAROTA" heading in red, "Hindi sakop ng alok" message
  - Tank fill turns red
  - Tank fill level is BELOW the break-even line
  - **Phone VIBRATES aggressively** ([200, 100, 200] pattern)
  - Blinking text: "📳 Nanginginig ang telepono"
- **Meaning:** The buyer's offer does NOT cover expenses. The farmer should REJECT.

```
┌──────────────────────────────┐
│  (red background)            │
│                              │
│  ┌──────────────────────┐   │
│  │ ⛔  BANGKAROTA        │   │
│  │ Hindi sakop ng alok   │   │
│  │ ang iyong gastos.     │   │
│  └──────────────────────┘   │
│                              │
│  📳 Nanginginig ang telepono │
│  (blinking)                  │
│                              │
│  Tank: RED fill below line   │
│  Phone: VIBRATING            │
└──────────────────────────────┘
```

---

### Phase 2 Summary

```
⚖️ Navigate → 🪣 See Bucket → 🔢 Weight → 📊 Slide → 🟢 KITA! / 🔴 BANGKAROTA
    1s            1s              3s          3s          instant

Total: ~8 seconds to get a Red/Green signal
```

---

## Complete Flow Overview

```
═══════════════════════════════════════════════════════════════════
  PHASE 1: GROWING SEASON (repeated throughout planting months)
═══════════════════════════════════════════════════════════════════

  📋 Log → 📷 Photo → 📊 Size → 🏷️ Category → ✅ Saved!  ⟲ Repeat
   1s        3s         1s          1s            1s

═══════════════════════════════════════════════════════════════════
  PHASE 2: HARVEST DAY (single session when buyer arrives)
═══════════════════════════════════════════════════════════════════

  ⚖️ Navigate → 🪣 See Bucket → 🔢 Enter Weight → 📊 Slide Offer
      1s             1s               3s                3s

                                                         │
                                                         ▼
                                              ┌─────────────────┐
                                              │  🟢 KITA!       │
                                              │  (Accept Offer)  │
                                              ├─────────────────┤
                                              │  🔴 BANGKAROTA  │
                                              │  (Reject Offer)  │
                                              └─────────────────┘
```

---

## Screen Map

All screens the user interacts with, and how they connect.

| Screen         | Icon | Description                                           | Access From               |
|----------------|------|-------------------------------------------------------|---------------------------|
| Tahanan (Home) | 🏠   | Home dashboard. Expense bucket, recent logs, actions. | Bottom nav, app launch    |
| Gastos         | 📋   | Full expense list. All items with category and size.  | Bottom nav                |
| Negosasyon     | ⚖️   | Break-even calculator. Tank, slider, Red/Green signal.| Bottom nav, Home button   |
| Log Modal      | 📷   | Bottom sheet. Camera, size picker, category selector. | "Mag-log" button          |
| Success Flash  | ✅   | Full-screen green overlay. Checkmark, vibration.      | After saving (auto)       |

### Navigation Diagram

```
                    ┌───────────┐
                    │  TAHANAN  │ ← App Launch
                    │   (Home)  │
                    └─────┬─────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  GASTOS  │ │ LOG MODAL│ │NEGOSASYON│
        │ (Expenses│ │ (Add New)│ │(Negotiate│
        │   List)  │ │          │ │  Offer)  │
        └──────────┘ └────┬─────┘ └──────────┘
                          │
                          ▼
                    ┌──────────┐
                    │ SUCCESS  │
                    │  FLASH   │
                    │  (Auto)  │
                    └──────────┘
```

---

## Key Design Decisions

### Why no exact number input for expenses?
Farmers may not know the exact cost of a sack of fertilizer bought weeks ago. By using S/M/L categories, we remove the pressure to be precise and still build a useful expense picture.

### Why a slider instead of typing the offer price?
During negotiation, the buyer may change their offer multiple times. A slider lets the farmer quickly adjust and see the result in real-time. It's also more intuitive than a number pad.

### Why vibration on the Red state?
The farmer may be in bright sunlight where the screen is hard to see, or may be distracted by the negotiation conversation. The physical vibration ensures they FEEL the warning even if they can't see it clearly.

### Why the tank metaphor?
A filling container is universally understood. "Is the water above the line or below the line?" requires zero financial literacy. It transforms a complex break-even calculation into a visual that a child could understand.

### Why Filipino language?
The target users are Filipino smallholder farmers. English financial terms create a barrier. Using their native language — and keeping labels short and icon-supported — removes that barrier entirely.
