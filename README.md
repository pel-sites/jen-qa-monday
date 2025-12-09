# Jen QA Monday

**Jen's alignment tool for Pure Earth Labs QA.**

One place where stakeholders, staff, and new hires can understand the QA process, see what's working, and know what kind of person we need to hire.

## Live Site

**https://jen-qa-monday.fly.dev**

## What's Here

| Page | Purpose |
|------|---------|
| [QA Manager Procedure](https://jen-qa-monday.fly.dev/qa_manager_procedure.html) | The 14-step SOP. Start here. |
| [Team Performance](https://jen-qa-monday.fly.dev/team_performance_analysis.html) | Current metrics and gaps |
| [Workflow Analysis](https://jen-qa-monday.fly.dev/qa_workflow_analysis.html) | How it maps to Monday.com |
| [Next Steps](https://jen-qa-monday.fly.dev/next_steps_roadmap.html) | Action plan |
| [Board Structure](https://jen-qa-monday.fly.dev/production_board_structure.html) | Technical reference |
| [Ideal Candidate](https://jen-qa-monday.fly.dev/ideal_candidate_profile.html) | Who we're hiring |

## Quick Start

```bash
# Clone
git clone https://github.com/pel-sites/jen-qa-monday.git
cd jen-qa-monday

# Serve locally
python -m http.server 8080 -d docs

# Open
open http://localhost:8080
```

## Deploy

```bash
fly deploy
```

## Design Philosophy

**Extravagantly practical.** Content-first, delightful to use, never distracting.

- Skimmable for stakeholders, deep for doers
- Clear hierarchy, you always know where you are
- Breathing room, proper typography
- No build step, just HTML/CSS/JS

See [CLAUDE.md](./CLAUDE.md) for full details.

## Tech

- Static HTML/CSS/JS (no build)
- Mermaid.js for diagrams
- Deployed on Fly.io (nginx container)
- Monday.com integration via GraphQL API

## Contact

Questions? Contact the QA team at Pure Earth Labs.
