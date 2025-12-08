#!/bin/bash
# fetch_board_structure.sh
# Fetches the complete structure of a Monday.com board using GraphQL API
#
# Usage: ./fetch_board_structure.sh [BOARD_ID]
# If no BOARD_ID provided, uses PRODUCTION_BOARD_ID from .env

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load environment variables
if [ -f "$PROJECT_ROOT/.env" ]; then
    source "$PROJECT_ROOT/.env"
else
    echo "Error: .env file not found at $PROJECT_ROOT/.env"
    exit 1
fi

# Use provided board ID or default from .env
BOARD_ID="${1:-$PRODUCTION_BOARD_ID}"

if [ -z "$MONDAY_API_TOKEN" ]; then
    echo "Error: MONDAY_API_TOKEN not set in .env"
    exit 1
fi

if [ -z "$BOARD_ID" ]; then
    echo "Error: No board ID provided and PRODUCTION_BOARD_ID not set in .env"
    exit 1
fi

echo "Fetching board structure for board ID: $BOARD_ID"

# GraphQL query to fetch complete board structure
QUERY=$(cat <<'EOF'
{
  "query": "query GetBoardStructure($boardId: [ID!]) { boards(ids: $boardId) { id name description state board_kind items_count url updated_at workspace { id name } groups { id title color position } columns { id title type description } views { id name type settings_str } owners { id name email } } }",
  "variables": {
    "boardId": ["BOARD_ID_PLACEHOLDER"]
  }
}
EOF
)

# Replace placeholder with actual board ID
QUERY=$(echo "$QUERY" | sed "s/BOARD_ID_PLACEHOLDER/$BOARD_ID/")

# Make the API call
RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: $MONDAY_API_TOKEN" \
    -H "API-Version: 2024-10" \
    -d "$QUERY" \
    "https://api.monday.com/v2")

# Output results
echo ""
echo "=== API Response ==="
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"

# Save to file with timestamp
OUTPUT_DIR="$PROJECT_ROOT/data"
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="$OUTPUT_DIR/board_${BOARD_ID}_${TIMESTAMP}.json"
echo "$RESPONSE" > "$OUTPUT_FILE"
echo ""
echo "Response saved to: $OUTPUT_FILE"
