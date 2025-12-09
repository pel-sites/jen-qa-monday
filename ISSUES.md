# Planned Issues - Jen QA Monday Redesign

## Dependency Graph

```
Issue #1: Design System Foundation
    │
    ├─────────────────┬─────────────────┬─────────────────┐
    ▼                 ▼                 ▼                 ▼
Issue #2          Issue #3          Issue #4          Issue #5
Index Page        Procedure         Executive         Navigation
Redesign          Reading UX        Summaries         Component
    │                 │                 │                 │
    └─────────────────┴─────────────────┴─────────────────┘
                              │
                              ▼
                        Issue #6
                        Interactive
                        Checkboxes
                              │
                              ▼
                        Issue #7
                        Micro-interactions
                        & Polish
```

---

## Issue #1: Design System Foundation

**Priority:** Critical - Blocks all other issues

### Goal
Extract shared styles into a single CSS file with design tokens (variables) that establish typography, spacing, and color system. All other pages will import this file.

### Files to Create
- `docs/css/shared.css` (new)

### Files to Modify
- `docs/index.html` - add CSS import, remove duplicated styles
- `docs/qa_manager_procedure.html` - add CSS import, remove duplicated styles
- `docs/team_performance_analysis.html` - add CSS import, remove duplicated styles
- `docs/qa_workflow_analysis.html` - add CSS import, remove duplicated styles
- `docs/production_board_structure.html` - add CSS import, remove duplicated styles
- `docs/next_steps_roadmap.html` - add CSS import, remove duplicated styles
- `docs/ideal_candidate_profile.html` - add CSS import, remove duplicated styles

### Design Tokens to Establish

```css
:root {
  /* Colors - muted, content-first palette */
  --color-text: #e8e8e8;
  --color-text-muted: #a0a0a0;
  --color-bg: #1a1a2e;
  --color-surface: #16213e;
  --color-surface-raised: #1e2a47;
  --color-border: #2a2a4a;

  /* Semantic colors - less saturated than current */
  --color-accent: #9d50dd;
  --color-success: #00c875;
  --color-warning: #fdab3d;
  --color-critical: #df2f4a;
  --color-info: #579bfc;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

  /* Font sizes - modular scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Layout */
  --measure: 65ch;  /* Ideal line length */
  --content-width: 800px;
  --wide-width: 1200px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 25px rgba(0,0,0,0.4);
}
```

### Typography System

```css
/* Base typography */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
}

/* Prose container - enforces readable line length */
.prose {
  max-width: var(--measure);
}

/* Headings */
h1 { font-size: var(--text-3xl); line-height: 1.2; }
h2 { font-size: var(--text-2xl); line-height: 1.3; }
h3 { font-size: var(--text-xl); line-height: 1.4; }
```

### Acceptance Criteria
- [ ] `shared.css` exists with all design tokens
- [ ] All 7 HTML pages import shared.css via `<link>`
- [ ] Duplicate CSS removed from each page (page-specific styles can remain inline)
- [ ] Visual appearance is similar to current (no major regressions)
- [ ] Line length on prose sections is max 65ch (~600px)
- [ ] Pages still work when opened directly (no build step)

### Dependencies
- Requires: Nothing
- Blocks: Issues #2, #3, #4, #5

### Notes for Agent
- Keep it simple. This is extraction and organization, not redesign.
- Test each page after changes to ensure nothing breaks.
- The goal is to enable parallel work on other issues.

---

## Issue #2: Index Page Redesign

**Priority:** High

### Goal
Transform the index page from a simple card list into a welcoming entry point that orients all audiences (stakeholders, staff, new hires) and makes the recommended reading path clear.

### Files to Modify
- `docs/index.html` (primary)

### Files NOT to Touch
- All other HTML pages (other issues own these)

### Design Requirements

**Hero Section:**
- Clear headline: What this site is
- One-sentence value prop for each audience
- Visual indication of "Start Here" path

**Card Redesign:**
- Primary path (Procedure → Performance → Workflow → Roadmap) visually distinct
- Reference section (Board Structure, Candidate Profile) clearly secondary
- Cards show estimated read time or "5 min" / "15 min" indicators
- Subtle numbering or flow arrows showing recommended order

**Layout:**
- Narrower content width (800px max for text)
- More breathing room between cards
- Remove heavy gradient header - simpler, quieter

### Wireframe Concept

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│     Jen QA Monday                                   │
│     Everyone aligned on QA. One page.              │
│                                                     │
│     [Stakeholders: Get the big picture]            │
│     [Staff: Reference the process]                 │
│     [New hires: Learn what success looks like]     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  START HERE                                         │
│  ┌─────────────┐  ┌─────────────┐                  │
│  │ 1. QA       │→ │ 2. Team     │                  │
│  │ Procedure   │  │ Performance │                  │
│  │ 15 min read │  │ 5 min read  │                  │
│  └─────────────┘  └─────────────┘                  │
│         ↓                ↓                          │
│  ┌─────────────┐  ┌─────────────┐                  │
│  │ 3. Workflow │→ │ 4. Next     │                  │
│  │ Analysis    │  │ Steps       │                  │
│  │ 10 min read │  │ 5 min read  │                  │
│  └─────────────┘  └─────────────┘                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  REFERENCE                                          │
│  ┌─────────────┐  ┌─────────────┐                  │
│  │ Board       │  │ Ideal       │                  │
│  │ Structure   │  │ Candidate   │                  │
│  └─────────────┘  └─────────────┘                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Acceptance Criteria
- [ ] Hero section clearly explains what site is for
- [ ] Three audiences mentioned with their use case
- [ ] Primary reading path (4 docs) visually connected/numbered
- [ ] Reference docs clearly secondary
- [ ] Read time estimates on each card
- [ ] Max content width ~800px
- [ ] Page feels calm, not busy
- [ ] Mobile responsive

### Dependencies
- Requires: Issue #1 (Design System) merged
- Blocks: Nothing

---

## Issue #3: Procedure Page - Reading Experience

**Priority:** High

### Goal
Transform the 1200-line procedure page from a wall of content into a comfortable reading experience with progress awareness and easy navigation.

### Files to Modify
- `docs/qa_manager_procedure.html` (primary)

### Files NOT to Touch
- All other HTML pages
- `docs/css/shared.css` (use what's there, don't modify)

### Features to Add

**1. Reading Progress Indicator**
- Subtle progress bar at top of viewport (thin line, 2-3px)
- Shows how far through the document you are
- Uses phase colors (blue → orange → green → purple) as you progress

**2. Sticky Table of Contents**
- TOC sticks to left side on wide screens (>1200px)
- Current section highlighted as you scroll
- Clicking TOC item smooth-scrolls to section
- Collapses to hamburger on narrow screens

**3. Section Focus**
- Active section has subtle left border or background tint
- Scroll-margin-top so anchored sections aren't hidden under sticky nav

**4. Better Section Anchors**
- "Copy link" button appears on hover near section headers
- Visual flash/highlight when landing on an anchor from URL

### Wireframe Concept

```
┌──────────────────────────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  35% complete │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│  CONTENTS     │  Step 4: Equipment Calibration              │
│               │  ═══════════════════════════════════════    │
│  ○ Step 0     │                                              │
│  ○ Step 1     │  [Content here with max-width: 65ch]        │
│  ○ Step 2     │                                              │
│  ○ Step 3     │  ┌─────────────────────────────────────┐    │
│  ● Step 4  ←  │  │ Checklist                           │    │
│  ○ Step 5     │  │ □ Torque meter calibrated           │    │
│  ○ Step 6     │  │ □ Scale calibrated and tared        │    │
│  ...          │  └─────────────────────────────────────┘    │
│               │                                              │
│               │  [Continue scrolling...]                     │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

### Acceptance Criteria
- [ ] Progress bar shows reading progress (0-100%)
- [ ] Progress bar uses phase colors
- [ ] TOC is sticky on desktop (>1200px)
- [ ] Current section highlighted in TOC
- [ ] Smooth scroll when clicking TOC items
- [ ] `scroll-margin-top` set so sections aren't hidden
- [ ] Content area max-width is readable (~65ch)
- [ ] Works on mobile (TOC collapses or hides)
- [ ] No external JS dependencies (vanilla JS only, or esm.sh import)

### Dependencies
- Requires: Issue #1 (Design System) merged
- Blocks: Issue #6 (Interactive Checkboxes)

### Technical Notes
```javascript
// Progress bar - Intersection Observer or scroll listener
// TOC highlighting - Intersection Observer on sections
// Smooth scroll - CSS scroll-behavior: smooth; or JS
```

---

## Issue #4: Executive Summaries (TL;DR Sections)

**Priority:** High

### Goal
Add a "TL;DR" or executive summary to the top of each content page so stakeholders can get the gist in 30 seconds without reading the full document.

### Files to Modify
- `docs/team_performance_analysis.html`
- `docs/qa_workflow_analysis.html`
- `docs/next_steps_roadmap.html`
- `docs/production_board_structure.html`
- `docs/ideal_candidate_profile.html`

### Files NOT to Touch
- `docs/index.html` (Issue #2 owns this)
- `docs/qa_manager_procedure.html` (Issue #3 owns this)
- `docs/css/shared.css`

### Design Pattern

Each page gets a summary box immediately after the header:

```html
<section class="tldr">
  <h2>TL;DR</h2>
  <ul>
    <li><strong>Key point 1</strong> - Brief explanation</li>
    <li><strong>Key point 2</strong> - Brief explanation</li>
    <li><strong>Key point 3</strong> - Brief explanation</li>
  </ul>
  <p class="read-time">Full read: ~10 minutes</p>
</section>
```

### Summary Content by Page

**Team Performance Analysis:**
- 60% of FULFILLED items missing QA DOCS
- 63% have no owner assigned
- Top performers: [names], Needs attention: [areas]

**QA Workflow Analysis:**
- Jen's 13-step process maps to Monday.com with gaps
- Key gaps: [2-3 biggest gaps]
- Recommendation: [one sentence]

**Next Steps Roadmap:**
- Phase 1: [priority action]
- Phase 2: [next priority]
- Timeline: [if applicable]

**Production Board Structure:**
- Board ID: 9304930311
- Key column: QA DOCS (file_mktcs58s)
- 5 connected boards

**Ideal Candidate Profile:**
- Role: QA Compliance Coordinator
- Key skills: [2-3 skills]
- Reports to: [who]

### Styling

```css
.tldr {
  background: var(--color-surface-raised);
  border-left: 4px solid var(--color-accent);
  padding: var(--space-6);
  margin: var(--space-8) 0;
  border-radius: 0 8px 8px 0;
}

.tldr h2 {
  font-size: var(--text-lg);
  margin: 0 0 var(--space-4) 0;
  color: var(--color-accent);
}

.tldr ul {
  margin: 0;
  padding-left: var(--space-6);
}

.tldr li {
  margin: var(--space-2) 0;
}

.tldr .read-time {
  margin: var(--space-4) 0 0 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
```

### Acceptance Criteria
- [ ] All 5 pages have TL;DR section after header
- [ ] Each TL;DR has 3-5 bullet points max
- [ ] Each TL;DR includes estimated read time
- [ ] Styling is consistent across all pages
- [ ] TL;DR is visually distinct but not overwhelming
- [ ] Content is accurate to page content (read each page first!)

### Dependencies
- Requires: Issue #1 (Design System) merged
- Blocks: Nothing

### Notes for Agent
- You must READ each page to write accurate summaries
- Don't make up statistics - pull from actual page content
- Keep summaries genuinely brief - if it takes >30 seconds to read, it's too long

---

## Issue #5: Navigation Component

**Priority:** High

### Goal
Create a consistent, well-designed navigation that works across all pages, shows current location, and adapts to mobile.

### Files to Modify
- All HTML files in `docs/` (nav section only)

### Files to Create
- `docs/js/nav.js` (optional - for mobile toggle)

### Current State
- Nav is copy-pasted into each file with slight variations
- Mobile hamburger exists but implementation varies
- Current page highlighting is inconsistent

### Design Requirements

**Desktop (>768px):**
- Logo/brand left, nav links right
- Current page clearly indicated (not just color - maybe underline + color)
- Subtle hover states
- Sticky at top

**Mobile (<768px):**
- Logo left, hamburger right
- Menu expands below nav bar
- Smooth animation (not instant)
- Clear tap targets (min 44px)

**Consistent Across All Pages:**
- Same HTML structure
- Same styling
- Current page detection (can be manual `class="active"` per page)

### HTML Structure

```html
<nav class="nav">
  <div class="nav-inner">
    <a href="/" class="nav-brand">Jen QA Monday</a>

    <button class="nav-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/qa_manager_procedure.html">Procedure</a></li>
      <li><a href="/qa_workflow_analysis.html">Workflow</a></li>
      <li><a href="/team_performance_analysis.html">Performance</a></li>
      <li><a href="/next_steps_roadmap.html">Roadmap</a></li>
      <li><a href="/production_board_structure.html">Board</a></li>
      <li><a href="/ideal_candidate_profile.html">Candidate</a></li>
    </ul>
  </div>
</nav>
```

### Acceptance Criteria
- [ ] All pages have identical nav HTML structure
- [ ] Current page is visually distinct (active state)
- [ ] Mobile menu works with smooth toggle animation
- [ ] Hamburger animates to X when open
- [ ] Nav is sticky on scroll
- [ ] Tap targets are min 44px on mobile
- [ ] No layout shift when nav loads
- [ ] Works without JavaScript (links still work, just no animation)

### Dependencies
- Requires: Issue #1 (Design System) merged
- Blocks: Nothing

---

## Issue #6: Interactive Checkboxes

**Priority:** Medium

### Goal
Make the checkboxes in the procedure page actually interactive - clicking them checks them off with a satisfying animation. State persists in localStorage so users can track their progress.

### Files to Modify
- `docs/qa_manager_procedure.html` (primary)

### Files NOT to Touch
- Other pages
- `docs/css/shared.css`

### Current State
- Checkboxes are purely visual (`<div class="check-box">`)
- No interactivity
- No state persistence

### New Behavior

**Interaction:**
1. Click checkbox → toggles checked state
2. Checked state shows checkmark with satisfying animation
3. Checked items have subtle style change (muted text, line-through optional)
4. Progress count shows "3/8 items complete" per section

**Persistence:**
- Store checked state in localStorage
- Key: `qa-procedure-checklist`
- Value: `{ "step-0-item-1": true, "step-0-item-2": false, ... }`
- Load state on page load
- "Reset progress" button at bottom

**Animation:**
- Checkmark draws in (SVG line animation)
- Subtle scale bounce on check
- ~200ms duration, ease-out

### HTML Changes

```html
<!-- Before -->
<div class="check-box"></div>

<!-- After -->
<button class="checkbox" data-id="step-0-item-1" aria-pressed="false">
  <svg viewBox="0 0 24 24" class="checkbox-icon">
    <path d="M5 12l5 5L19 7" />
  </svg>
</button>
```

### Acceptance Criteria
- [ ] All checklist items are clickable
- [ ] Clicking toggles checked state
- [ ] Checkmark animates in (not instant)
- [ ] State persists across page reloads (localStorage)
- [ ] Reset button clears all progress
- [ ] Keyboard accessible (Enter/Space to toggle)
- [ ] ARIA attributes correct (aria-pressed)
- [ ] Works without JavaScript (checkboxes just don't toggle)

### Dependencies
- Requires: Issue #1 (Design System) merged
- Requires: Issue #3 (Procedure Page) merged (so we're not both editing same file)
- Blocks: Issue #7

---

## Issue #7: Micro-interactions & Polish

**Priority:** Low (final polish)

### Goal
Add subtle micro-interactions throughout the site that make it feel responsive and alive without being distracting.

### Files to Modify
- Any/all HTML files
- `docs/css/shared.css` (if adding shared animations)

### Interactions to Add

**1. Link Hover Effects**
- Underline animates in from left
- Subtle color shift
- ~150ms transition

**2. Card Hover Effects**
- Gentle lift (translateY: -2px)
- Subtle shadow increase
- Border highlight
- ~200ms transition

**3. Button Press Effects**
- Scale down slightly on :active (0.98)
- Instant down, ease-out return

**4. Section Scroll Reveal**
- Sections fade/slide in as they enter viewport
- Very subtle (opacity: 0.8 → 1, translateY: 10px → 0)
- Only on first load, not on scroll back up
- Use Intersection Observer

**5. Anchor Highlight**
- When navigating to #anchor, section flashes/highlights briefly
- Subtle yellow/gold background fade in/out

**6. Focus States**
- Clear, visible focus rings
- Match brand colors
- Works for keyboard navigation

### Technical Approach
```javascript
// Scroll reveal with Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(el => observer.observe(el));
```

```css
.section {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.section.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

### Acceptance Criteria
- [ ] Hover effects on links and cards
- [ ] Button press feedback
- [ ] Sections reveal on scroll (subtle)
- [ ] Anchor navigation highlights target section
- [ ] All interactive elements have focus states
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No jank or performance issues
- [ ] Feels polished, not gimmicky

### Dependencies
- Requires: All other issues merged
- Blocks: Nothing (this is final polish)

### Notes for Agent
- Less is more. If an animation feels like "too much," dial it back.
- Test with `prefers-reduced-motion: reduce` - should disable animations
- Performance matters - use CSS transforms, avoid layout thrashing

---

## Summary: Merge Order

```
1. Issue #1: Design System Foundation      ← MERGE FIRST (blocks everything)
   │
   ├── 2. Issue #2: Index Page            ← Can merge in any order
   ├── 3. Issue #3: Procedure Page        ← Can merge in any order
   ├── 4. Issue #4: Executive Summaries   ← Can merge in any order
   └── 5. Issue #5: Navigation            ← Can merge in any order
           │
           └── 6. Issue #6: Checkboxes    ← After #3 merges (same file)
                   │
                   └── 7. Issue #7: Polish ← MERGE LAST
```

**Parallel Work Windows:**
- After #1 merges: #2, #3, #4, #5 can all run in parallel
- After #3 merges: #6 can start
- After #6 merges: #7 can start

---

## Labels

Suggested GitHub labels:
- `foundation` - Must merge before other work
- `parallel-safe` - Can be worked on alongside other parallel-safe issues
- `sequential` - Has dependencies, must wait
- `polish` - Low priority, final touches
