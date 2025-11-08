#!/bin/bash
# Bootstrap AWS accounts for CDK deployment

set -e

echo "Bootstrapping AWS accounts for Project Buddie..."

# Read environment
ENV=${1:-dev}

# Load config
CONFIG_FILE="../../config/environments/${ENV}.json"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Config file not found: $CONFIG_FILE"
  exit 1
fi

ACCOUNT_ID=$(jq -r '.accountId' "$CONFIG_FILE")
REGION=$(jq -r '.region' "$CONFIG_FILE")

echo "Environment: $ENV"
echo "Account ID: $ACCOUNT_ID"
echo "Region: $REGION"

# Bootstrap CDK
echo "Bootstrapping CDK..."
cdk bootstrap aws://${ACCOUNT_ID}/${REGION}

echo "Bootstrap complete!"
