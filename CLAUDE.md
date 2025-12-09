# Jen QA Monday

## What This Is

Jen's alignment tool. A single source of truth for Pure Earth Labs' QA process.

Jen is the Production Manager. She needs everyone - stakeholders, current staff, new hires - on the same page about how QA works and what kind of person they need to hire. This site is that page.

## The Audiences

| Who | What they need | How they read |
|-----|----------------|---------------|
| **Stakeholders** | Big picture. Why hire? What's the gap? | Skim in 30 seconds |
| **Current staff** | Clarity. "This is how we do it." | Reference specific sections |
| **New hire / candidate** | Context. The job. What success looks like. | Read thoroughly, maybe once |
| **Jen** | An artifact to point to instead of repeating herself | Share links to specific sections |

## Design Philosophy

**Extravagantly practical.** Useful, functional, purpose-driven - but delightful to use.

Not restricting. Breathing room. Focuses the user on the purpose of each page and section without distraction. Like a well-designed textbook, minus the boring.

### Principles

1. **Content is the hero** - Design serves content, never competes with it
2. **Skimmable AND deep** - Get the gist fast, or dive into detail
3. **Know where you are** - Clear hierarchy, reading progress, "you are here"
4. **Satisfying interactions** - Micro-moments that feel good (hovers, checks, transitions)
5. **Breathing room** - Generous whitespace, proper typography, nothing cramped
6. **Shareable** - Deep-link to any section, any step

### What This Means in Practice

- Typography-first: proper measure (50-75 chars), clear hierarchy
- Progressive disclosure: collapse what you don't need
- Section focus: the section you're reading feels "active"
- Subtle progress indicators: know how far you've come
- Smooth transitions: scrolling feels like progress, not work

## Tech Stack

**No-build philosophy.** Static HTML, CSS, vanilla JS. No npm, no webpack, no node_modules.

```
docs/
├── index.html                    # Landing - the welcome mat
├── qa_manager_procedure.html     # The 13-step SOP (main content)
├── qa_workflow_analysis.html     # Gap analysis - what's missing
├── team_performance_analysis.html # Current metrics
├── next_steps_roadmap.html       # Action plan
├── ideal_candidate_profile.html  # Hiring docs
└── components/                   # Interactive UI components
    ├── index.html
    ├── step-indicator.html
    ├── interactive-checklist.html
    └── phase-transitions.html
```

### Libraries (CDN imports only)

```javascript
// Diagrams
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';

// Animation (when needed)
import gsap from 'https://esm.sh/gsap';

// Reactivity (when needed)
import { signal } from 'https://esm.sh/@preact/signals';
```

## Content Structure

### Primary Flow (for new readers)

1. **QA Manager Procedure** - START HERE. The 13-step SOP.
2. **Team Performance Analysis** - Current state. What's working, what's not.
3. **QA Workflow Analysis** - Mapping to Monday.com. Gap analysis.
4. **Next Steps Roadmap** - What we're doing about it.

### Reference (for specific lookups)

- **Ideal Candidate Profile** - Hiring: who we need, interview questions

## Monday.com Integration

| Board | ID | Purpose |
|-------|-----|---------|
| Production | 9304930311 | Main tracking. QA DOCS column lives here. |
| BBT | 8768285252 | Bulk batch QA |
| Finalization | 8887010257 | Product templates |
| EPOs - Materials | 9387127195 | Materials purchasing |
| Prod Deals | 9384243852 | Sales/deals |

Key column: `QA DOCS` (`file_mktcs58s`) - where QA inspection reports attach.

## Development

```bash
# Serve locally (any static server works)
python -m http.server 8080 -d docs
# or
npx serve docs

# Open in browser
open http://localhost:8080
```

## Deployment

Deployed to Fly.io as a static nginx container.

```bash
fly deploy
fly logs
```

Live at: https://jen-qa-monday.fly.dev

## Environment Variables

For Monday.com API scripts (not needed for the static site):

```
MONDAY_API_TOKEN=your_token
PRODUCTION_BOARD_ID=9304930311
```

## The Job To Be Done

> "I need everyone aligned on QA process and hiring needs - without having 10 different conversations."

This site is that conversation, written down, made shareable, made clear.
