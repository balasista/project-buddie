#!/bin/bash
set -e
echo "Testing backend functions..."
echo "Running Python function tests..."
PYTHON_FUNCTIONS=$(find functions -name "handler.py" -o -name "index.py" 2>/dev/null | grep -v __pycache__ | xargs -I {} dirname {} | sort -u)
if [ -n "$PYTHON_FUNCTIONS" ]; then
  for func in $PYTHON_FUNCTIONS; do
    if [ -f "$func/requirements.txt" ]; then
      echo "Skipping $func (no test files yet)"
    fi
  done
fi
echo "Running Node.js function tests..."
NODE_FUNCTIONS=$(find functions -name "package.json" -exec dirname {} \; 2>/dev/null)
if [ -n "$NODE_FUNCTIONS" ]; then
  for func in $NODE_FUNCTIONS; do
    if [ -f "$func/package.json" ]; then
      echo "Skipping $func (no test files yet)"
    fi
  done
fi
echo "✅ Backend tests complete (placeholder)"
exit 0
