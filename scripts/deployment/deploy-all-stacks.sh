#!/bin/bash
# Deploy all CDK stacks

set -e

echo "Deploying Project Buddie infrastructure..."

# Read environment
ENV=${1:-dev}

echo "Environment: $ENV"

# Navigate to infrastructure directory
cd "$(dirname "$0")/../../infrastructure"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build
echo "Building..."
npm run build

# Deploy
echo "Deploying to $ENV..."
npm run deploy

echo "Deployment complete!"
