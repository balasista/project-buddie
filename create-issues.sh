#!/bin/bash
# Script to create GitHub issues from github-issues.json

set -e

ISSUES_FILE="../project-buddie/github-issues.json"
REPO="balasista/project-buddie"

echo "Creating GitHub issues for Project Buddie..."
echo "Repository: $REPO"
echo ""

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Installing via homebrew..."
    brew install jq
fi

# Count total issues
TOTAL=$(jq length "$ISSUES_FILE")
echo "Total issues to create: $TOTAL"
echo ""

# Create each issue
COUNTER=0
jq -c '.[]' "$ISSUES_FILE" | while read -r issue; do
    COUNTER=$((COUNTER + 1))

    title=$(echo "$issue" | jq -r '.title')
    body=$(echo "$issue" | jq -r '.body')
    labels=$(echo "$issue" | jq -r '.labels | join(",")')
    milestone=$(echo "$issue" | jq -r '.milestone')

    echo "[$COUNTER/$TOTAL] Creating: $title"

    # Create the issue
    gh issue create \
        --repo "$REPO" \
        --title "$title" \
        --body "$body" \
        --label "$labels" \
        2>&1 | head -1

    # Small delay to avoid rate limiting
    sleep 0.5
done

echo ""
echo "✅ All issues created successfully!"
echo "View them at: https://github.com/$REPO/issues"
