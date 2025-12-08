# Jen QA Monday

## Purpose
QA workflow documentation and analysis for Pure Earth Labs' Monday.com Production board. Maps Jen's 13-step QA process to Monday.com fields and identifies gaps.

## Live Site
- **URL**: https://jen-qa-monday.fly.dev
- **GitHub**: https://github.com/pel-sites/jen-qa-monday

## Project Structure
```
jen-qa-monday/
├── docs/                    # Static HTML documentation
│   ├── index.html           # Landing page / navigation
│   ├── qa_workflow_analysis.html    # Jen's 13-step workflow analysis
│   └── production_board_structure.html  # Board technical docs
├── scripts/
│   └── fetch_board_structure.sh  # GraphQL API script
├── Dockerfile               # nginx static site
├── nginx.conf               # Server config
└── fly.toml                 # Fly.io deployment config
```

## Monday.com Boards
| Board | ID | Purpose |
|-------|-----|---------|
| Production | 9304930311 | Main production tracking (QA DOCS column here) |
| BBT (Bulk Batch Traceability) | 8768285252 | Bulk batch QA (COAs, batch records) |
| Finalization | 8887010257 | Product templates |
| EPOs - Materials | 9387127195 | Materials purchasing |
| Prod Deals | 9384243852 | Sales/deals linked to production |

## Key Findings
- **QA DOCS column exists** (`file_mktcs58s`) but is empty across all 7 QA items
- **Spec Sheet column** (`file_mks9gxp7`) mostly empty
- **No QA Inspection Report template** linked in Monday.com
- Jen's workflow Step 13 requires attaching docs but nobody is doing it

## Deployment
```bash
# Deploy to fly.io
fly deploy

# View logs
fly logs
```

## Environment
Configuration in `.env`:
- `MONDAY_API_TOKEN` - API authentication
- `PRODUCTION_WORKSPACE_ID` - 519072
- `PRODUCTION_BOARD_ID` - 9304930311

## GraphQL API
Use `scripts/fetch_board_structure.sh` or raw queries:
```graphql
query {
  boards(ids: [9304930311]) {
    views { id name type }
    columns { id title type }
    groups { id title }
  }
}
```

## User Story
Jen (QA Manager) needs to:
1. Find today's run in Sprint/Bulk weekly sheet
2. Access correct spec sheet
3. Open QA Inspection Report template
4. Complete 13-step QA process
5. Attach final docs to Monday.com ticket (QA DOCS column)
