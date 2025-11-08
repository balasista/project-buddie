#!/bin/bash
# Run integration tests

set -e

echo "Running integration tests..."

# Backend tests
echo "Testing backend..."
cd backend/shared/python && pytest
cd ../../shared/nodejs && npm test

# Frontend tests
echo "Testing frontend..."
cd ../../../frontend && npm test

# Infrastructure tests
echo "Testing infrastructure..."
cd ../infrastructure && npm test

echo "All tests passed!"
