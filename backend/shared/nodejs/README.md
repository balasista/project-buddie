# Project Buddie - Shared Node.js Libraries

Shared TypeScript/Node.js libraries for Lambda functions.

## Overview

This directory contains reusable TypeScript code used across multiple Node.js Lambda functions in Project Buddie.

## Structure

```
nodejs/
├── src/
│   ├── models/      # TypeScript interfaces and types
│   ├── clients/     # AWS service wrappers
│   ├── utils/       # Utility functions
│   └── index.ts     # Main export file
├── package.json
└── tsconfig.json
```

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Usage

### Data Models

```typescript
import { CallSummary } from '@project-buddie/shared';

const summary: CallSummary = {
  contactId: 'abc123',
  timestamp: '2025-11-08T10:00:00Z',
  agentId: 'agent-001',
  customerPhone: '+15555551234',
  issue: 'Payment issue',
  resolution: 'Resolved',
  sentiment: 'positive',
  category: 'billing',
  cost: 0.05,
  status: 'completed',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
```

### Logging

```typescript
import logger from '@project-buddie/shared/utils/logger';

logger.info('Processing call', { contactId: 'abc123' });
logger.error('Error occurred', { error: err.message });
```

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## Deployment

This directory is packaged as a Lambda layer by the CDK infrastructure code.
