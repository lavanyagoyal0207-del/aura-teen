# PROMPT.md — Project: Teen Menstrual Health & Mood Manager

## 1. Vision & Non-Negotiables
Build a quirky, highly aesthetic, teenager-focused 3-screen web app. It maps basic cycle data and daily mood/energy logs to visualize personal phase-based patterns—focusing purely on self-awareness, not medical diagnosis.

### STRICT SCOPE BOUNDARIES (DO NOT VIOLATE)
- 🚫 **NO Medical Claims / PCOS/PCOD Detection:** Absolutely no clinical language, diagnostic claims, or treatment advice.
- 🚫 **NO Login / Authentication / Database:** State lives strictly in browser memory (`useState` / `localStorage`).
-  Gamification or Streaks:** Keep the focus on clean, expressive self-awareness.

---

## 2. Quirky & Dynamic UI Design System (Gen-Z / Teen Aesthetics)
- **Visual Style:** Bold rounded containers (`rounded-3xl`), soft thick borders (`border-2 border-slate-900/10`), playful emoji accents, floating pill badges, high-contrast typography, and glassmorphism cards.
- **Dynamic Phase-Based Background Transitions:**
  The main app background MUST smoothly transition (`transition-colors duration-700 ease-in-out`) depending on the calculated active cycle phase:
  - **Menstrual Phase:** Soft Crimson / Dusty Rose gradient (`from-rose-100 to-pink-200`)
  - **Follicular Phase:** Electric Pastel Peach / Coral glow (`from-amber-100 to-orange-200`)
  - **Ovulation Phase:** Vibrant Sunshine / Lime Pastel tint (`from-emerald-100 to-teal-200`)
  - **Luteal Phase:** Cozy Twilight Lavender / Violet gradient (`from-purple-100 to-indigo-200`)

---

## 3. Core Deliverable Architecture (3 Screens Only)

### Screen 1: Cycle Setup
- **Inputs:** 
  1. Last period start date (`<input type="date">`)
  2. Average cycle length in days (slider or input, default `28`)
- **Calculated State:** Determines current cycle phase mathematically from today's date:
  - Days 1–5: *Menstrual*
  - Days 6–13: *Follicular*
  - Days 14–16: *Ovulation*
  - Days 17–28+: *Luteal*
- **Action:** "Lock In My Cycle ✨" button transitions seamlessly to the main dashboard.

### Screen 2: Daily Check-In
- **Dynamic Header:** Displays current phase badge and a warm, uplifting non-medical reflection generated via Gemini.
- **Interactive Loggers:**
  - **Mood:** 1–5 scale using large interactive bouncy emoji buttons (`😫 1`, `🙁 2`, `😐 3`, `🙂 4`, `🤩 5`).
  - **Energy Level:** 1–5 scale using a quirky segmented battery or lightning indicator.
  - **Optional Note:** Short single-line text input for personal context.
- **Submit Action:** Adds the entry (tagged with current phase) to the active session state.

### Screen 3: Insight Screen (The Core Deliverable)
- **Visual Chart:** Built with `Recharts` or `Chart.js`. A bar/line chart displaying Average Mood and Average Energy grouped across the 4 cycle phases.
- **Active Phase Highlight:** Visually accentuates the bar/section corresponding to the user's current phase.
- **Mandatory Disclaimer Copy:** Prominently featured below the chart:
  > *"Your patterns, not a universal rule."*
  1. Under Screen 2: Daily Check-In, add:
Toggles/Checkboxes: Add two quick Yes/No toggles for:

🍫 Cravings (Yes/No + optional 1-word note)

⛈️ Emotional Breakdowns (Yes/No + optional 1-word note)

2. Under Screen 3: Insight Screen, add:
Text Tally Summary (No extra charts): Below the main Mood + Energy chart, render a simple stat card displaying:

"Cravings logged: X times — mostly during [Phase Name]"
"Emotional breakdowns logged: Y times — mostly during [Phase Name]"

3. Update Seed Data (~28 Days):
Ensure the pre-loaded 28-day mock log array includes cravings: boolean and emotionalBreakdown: boolean values (weighted slightly higher during Luteal/Menstrual phases).

---
### Additional Low-Scope Polish Features

1. **Diary View (Screen 2 Sub-Tab or Drawer):**
   - Reuses existing check-in `note` entries from local state (zero new backend/storage).
   - Displays a simple vertical feed of past notes tagged with date, mood emoji, and cycle phase badge.

2. **Education & Hygiene Tips Card:**
   - Static non-medical educational content cards (e.g., period product guides, panty liner vs. pad timing, gentle hygiene tips).

3. **Encouragement Toast Popups:**
   - Displays a playful, supportive toast notification when a check-in is submitted (e.g., *"Check-in logged! You're doing great ✨"*).
   - Shows a welcome-back toast if logging after a multi-day gap.

## 4. Pre-Loaded Seed Data (Demo Readiness)
To ensure the insight chart is populated immediately during judge evaluation, initialize local state with ~28 days (one full cycle) of realistic mock entries:
- Higher energy/mood during Follicular & Ovulation phases.
- Slight energy dip & reflective mood during Late Luteal & Menstrual phases.
### Updated Modules: Independent Journal & Scope-Safe Education Hub

1. **Standalone Journal (Free-Text Entries):**
   - Separate from daily check-ins: maintained as an independent state array `journalEntries` (e.g., `{ id, date, title, content }`).
   - UI: A clean, minimal free-text writing screen/card with an "Add Entry" form and a scrollable list of past journal logs.

2. **Education Hub (Hygiene & PCOS/PCOD Awareness):**
   - Combines general period care (tampons, pads, period panties, hygiene) with a dedicated PCOS/PCOD educational section.
   - **Mandatory Static Content Array:**

```javascript
const pcosEducation = [
  { topic: "What is PCOS/PCOD?", content: "A hormonal condition where the ovaries produce higher-than-typical levels of certain hormones, which can affect ovulation and periods." },
  { topic: "Common signs", content: "Irregular or absent periods, excess hair growth, acne, and weight changes are commonly reported — but these vary widely and aren't diagnostic on their own." },
  { topic: "Why it's often missed in teens", content: "Irregular periods are common as bodies develop, so early PCOS/PCOD signs can look like normal puberty variation. There's no substitute for a doctor's evaluation." },
  { topic: "What to do if something feels off", content: "Track your cycle and symptoms, and bring the log to a doctor — that's the actual diagnostic step, not this app." }
];

---

## 5. Integrations: Stitch MCP, Gemini 2.5 Flash, & ADK

### A. UI Generation via Stitch MCP
Use `StitchMCP` to generate/extract the primary UI layout and components into `src/components/StitchUI.jsx`, maintaining the Gen-Z quirky design tokens and dynamic background styling.

### B. Lightweight Non-Diagnostic Gemini Integration (`@google/genai`)
Use `gemini-2.5-flash` via `@google/genai` inside `src/services/geminiService.js` strictly to generate a 1-sentence friendly, upbeat teen reflection or quote based on the current cycle phase. 
*Constraint: Keep prompt instructions strictly non-medical, empathetic, and encouraging.*

### C. Build & Verification via ADK
Utilize ADK/ADB and terminal execution tools to verify compilation, test local dev server responses (HTTP 200), and inspect runtime assets.

---

## 6. Execution Instructions for Antigravity Agent
# PROMPT.md — Project: Aura Teen ✨

## 1. Vision & UI/UX Non-Negotiables
Aura Teen is a ultra-aesthetic, Gen-Z focused menstrual health & mood companion app. 
**UI/UX is the primary judging metric:** It must feature buttery-smooth screen transitions, glassmorphic floating cards, organic rounded borders (`rounded-3xl`), bouncy micro-interactions, and a full-screen dynamic background color wash that shifts based on cycle phase.

---

## 2. Dynamic "Aura" Color System & Transition Specs
The root layout container MUST have `transition-all duration-1000 ease-in-out bg-gradient-to-br` applied. As the active phase changes, the background smoothly morphs:

- **Welcome / Onboarding:** Soft Iridescent Aura (`from-pink-100 via-purple-100 to-indigo-100`)
- **Menstrual Phase (Rest Aura):** Deep Velvet Rose (`from-rose-200 via-pink-100 to-red-100`)
- **Follicular Phase (Energy Aura):** Warm Peach Sunset (`from-amber-100 via-orange-100 to-peach-200`)
- **Ovulation Phase (Glow Aura):** Fresh Mint & Electric Emerald (`from-emerald-100 via-teal-100 to-cyan-100`)
- **Luteal Phase (Reflection Aura):** Cosmic Violet Dusk (`from-purple-200 via-indigo-100 to-slate-200`)

---

## 3. Screen Architecture & User Flow (4 Key Views)

### Screen 0: Welcome / Splash Landing ("Welcome to Aura Teen")
- **Hero Title:** Bold typography reading **"Aura Teen ✨"**
- **Tagline:** *"Your cycle, your mood, your vibe — mapped in sync."*
- **Visuals:** Floating glassmorphic preview cards with subtle shadow floating animations.
- **Primary CTA:** A prominent, bouncy button: **"Explore My Aura →"** (transitions smoothly to Cycle Setup or Dashboard).

### Screen 1: Cycle Setup (Card Overlay)
- Glassmorphic card (`backdrop-blur-xl bg-white/60 border border-white/80 shadow-2xl rounded-3xl p-8`)
- Inputs for last period start date and cycle length (default 28).
- Button: **"Sync My Cycle ✨"**

### Screen 2: Main Dashboard & Daily Check-In
- **Top Bar:** Aura Phase Pill Badge (e.g., `⚡ Follicular Phase — Energy High`).
- **AI Reflection Banner:** A 1-line encouraging note from `gemini-2.5-flash`.
- **Interactive Loggers:**
  - Bouncy emoji mood scale (1–5)
  - Segmented lightning/battery energy bar (1–5)
  - Quick toggle pills: 🍫 Cravings | ⛈️ Emotional Breakdown
  - Short note input
- **Primary CTA:** **"Log Today's Vibe"** (triggers confetti + toast confirmation).

### Screen 3: Insights & Education Hub
- **Mood & Energy Chart:** Recharts bar/line chart with current phase highlighted in bold accent colors.
- **Quick Stat Tally:** *"Cravings logged: X times — mostly during [Phase]"*
- **Scope Disclaimer:** *"Your patterns, not a universal rule."*
- **Journal Feed:** Standalone free-text journal list.
- **Education Hub:** Expandable cards with period care tips + PCOS/PCOD educational facts (stating: *"Strictly educational — consult a doctor for diagnosis"*).

---

## 4. Execution Instructions for Antigravity Agent

1. **Stitch UI Re-skin:** Use `StitchMCP` to generate/replace components in `src/components/StitchUI.jsx` with full glassmorphism, gradient backdrops, and Gen-Z typography (`Plus Jakarta Sans` or `Fredoka`).
2. **Onboarding Flow:** Implement state navigation starting on `WelcomeScreen` before reaching `Dashboard`.
3. **Background Sync:** Bind the root `div` className to the active cycle phase to drive background gradient shifts.
4. **Build & Test:** Run `npm run dev` and ensure smooth UI transitions with zero console errors.

Please perform the following steps sequentially:

1. **Stitch UI Component Setup:** Call `StitchMCP` tools to fetch/generate the quirky interface components and save into `src/components/StitchUI.jsx`.
2. **SDK Installation:** Run `npm install @google/genai recharts lucide-react` to install Gemini and charting tools.
3. **Gemini Service Setup:** Create `src/services/geminiService.js` calling model `gemini-2.5-flash` for short daily encouragement notes.
4. **Wire State & Color System:** Connect the global active phase state to the top-level container's background gradient classes so switching phases smoothly transitions background colors.
5. **Seed Data Integration:** Embed the 28-day historical mock data directly into state initialization.
6. **ADK Build & Launch:** Run project build scripts (`npm run dev` / `vite build`), verify HTTP 200 server response, and ensure no console errors exist.
# PROMPT.md — Aura Teen (Strict Welcome-First Routing)

## 1. Initial State & Screen Routing (STRICT)
- **Default State:** `activeScreen = 'welcome'`.
- On initial page load, **ONLY Screen 0 (Welcome Screen)** must be visible. All other screens (Cycle Setup, Daily Check-In, Insights, Journal, Education Hub) MUST be completely hidden.
- Clicking the primary CTA **"Explore My Aura ✨"** transitions the state (`setActiveScreen('setup')` or `'dashboard'`) with a smooth fade/zoom transition.

---

## 2. Screen 0: Full-Screen Welcome Overlay
- **Headline:** *"Welcome to Aura Teen ✨"*
- **Tagline:** *"Your cycle, your mood, your vibe — mapped in sync."*
- **Visuals:** Floating glassmorphic preview pill badges (`⚡ Follicular Energy`, `🌸 Rest & Glow`, `📊 Mood Patterns`).
- **Background:** Dynamic soft iridescent gradient (`from-pink-100 via-purple-100 to-indigo-100`).
- **Action:** A big, bouncy button reading **"Explore My Aura ✨"** that hides Screen 0 and reveals the main app.
# PROMPT.md — Project: Aura Teen ✨

## 1. Executive Summary & Judging Priorities
**Aura Teen** is a quirky, Gen-Z focused menstrual health and mood companion prototype built for teens.
- **Judging Focus:** High-impact UI/UX design, full-screen background phase color morphs, glassmorphic card styling, and immediate demo readiness.
- **Strict Scope Boundaries:**
  - 🚫 **NO Medical/Diagnostic Claims:** Zero clinical detection, PCOS/PCOD diagnosis, or diagnostic claims.
  - 🚫 **NO Auth / Database / Backend:** All data lives strictly in React local state (`useState` / `localStorage`).
  - 🚫 **NO Gamification/Streaks:** Focus purely on mood/cycle self-awareness.

---

## 2. Screen 0: Initial Welcome Page Routing (STRICT)
- **Initial View State:** `activeScreen = 'welcome'`.
- On page load, **ONLY Screen 0 (Welcome Screen)** is displayed. All main dashboard components, navigation menus, setup forms, and charts MUST be completely hidden.
- **Visuals:** Full-screen soft iridescent aura background (`from-pink-100 via-purple-100 to-indigo-100`), hero title **"Welcome to Aura Teen ✨"**, tagline *"Your cycle, your mood, your vibe — mapped in sync"*, and floating glassmorphic preview pills.
- **Action:** Prominent bouncy CTA button: **"Explore My Aura ✨"**.
- **Behavior:** Clicking the CTA transitions state (`setActiveScreen('setup')` or `'dashboard'`) with a smooth CSS fade/zoom effect (`transition-all duration-700 ease-in-out`).

---

## 3. Dynamic "Aura" Color System & Transition Specs
The top-level container MUST feature smooth background color transitions (`transition-all duration-1000 ease-in-out bg-gradient-to-br`). As the calculated cycle phase changes, the screen background morphs:

- **Welcome Landing:** Soft Iridescent Aura (`from-pink-100 via-purple-100 to-indigo-100`)
- **Menstrual Phase (Days 1–5):** Velvet Rose (`from-rose-200 via-pink-100 to-red-100`)
- **Follicular Phase (Days 6–13):** Peach Sunset (`from-amber-100 via-orange-100 to-peach-200`)
- **Ovulation Phase (Days 14–16):** Fresh Mint & Lime (`from-emerald-100 via-teal-100 to-cyan-100`)
- **Luteal Phase (Days 17–28+):** Cosmic Twilight Violet (`from-purple-200 via-indigo-100 to-slate-200`)

---

## 4. Main App Features & Screens (After Welcome Page)

### Screen 1: Cycle Setup
- **Inputs:** 
  1. Last period start date (`<input type="date">`)
  2. Average cycle length in days (slider or number input, default `28`)
- **Action:** **"Lock In My Cycle ✨"** button transitions to the main dashboard.

### Screen 2: Daily Check-In
- **Header:** Displays current phase pill badge and a warm, non-diagnostic reflection generated via Gemini (`gemini-2.5-flash`).
- **Interactive Controls:**
  - **Mood:** 1–5 scale using interactive bouncy emojis (`😫 1`, `🙁 2`, `😐 3`, `🙂 4`, `🤩 5`).
  - **Energy Level:** 1–5 scale using a segmented battery/lightning bar.
  - **Toggles:** 🍫 **Cravings** (Yes/No toggle + optional 1-word note) | ⛈️ **Emotional Breakdown** (Yes/No toggle + optional 1-word note).
  - **Short Note Input:** Optional single-line context string.
- **Submit Action:** Adds entry to state and triggers an encouragement toast popup (`canvas-confetti` or Tailwind toast banner: *"Check-in logged! You're doing great ✨"*).

### Screen 3: Insights & Pattern Visuals
- **Mood & Energy Chart:** Recharts bar/line chart displaying Average Mood and Average Energy across the 4 cycle phases, highlighting the user's current phase.
- **Text Tally Summary (No Extra Charting Complexity):** A clean stat box below the main chart:
  - *"Cravings logged: **X times** — mostly during **[Phase Name]**"*
  - *"Emotional breakdowns logged: **Y times** — mostly during **[Phase Name]**"*
- **Mandatory Copy:** Prominently displays:
  > *"Your patterns, not a universal rule."*

### Screen 4: Standalone Journal
- Separate state array (`journalEntries`) for free-text writing (completely independent of daily check-ins).
- Allows writing personal entries and renders a vertical scrollable card feed of past journal entries with date tags.

### Screen 5: Education & Hygiene Care Hub
- **Period Basics:** Static guides on pads, tampons, panty liners, and period panties.
- **PCOS/PCOD Awareness Card Array:**
  ```javascript
  const pcosEducation = [
    { topic: "What is PCOS/PCOD?", content: "A hormonal condition where the ovaries produce higher-than-typical levels of certain hormones, which can affect ovulation and periods." },
    { topic: "Common signs", content: "Irregular or absent periods, excess hair growth, acne, and weight changes are commonly reported — but these vary widely and aren't diagnostic on their own." },
    { topic: "Why it's often missed in teens", content: "Irregular periods are common as bodies develop, so early PCOS/PCOD signs can look like normal puberty variation. There's no substitute for a doctor's evaluation." },
    { topic: "What to do if something feels off", content: "Track your cycle and symptoms, and bring the log to a doctor — that's the actual diagnostic step, not this app." }
  ];