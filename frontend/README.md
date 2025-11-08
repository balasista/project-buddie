# Project Buddie Frontend

Next.js 14 frontend application for Project Buddie.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand, TanStack Query
- **Charts**: Recharts
- **Real-time**: WebSocket API

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your API endpoints
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── stores/         # Zustand stores
│   └── types/          # TypeScript types
└── tests/              # Jest tests
```

## Features

### Module 1: AI Call Summarization
- View call summaries
- Search and filter summaries
- Sentiment analysis

### Module 2: Agent Productivity Monitoring
- Real-time agent state grid
- ACW duration tracking
- Agent performance metrics

### Module 3: IVR Journey Intelligence
- Visual journey timelines
- Drop-off point identification
- Journey outcome analysis

### Module 4: Escalation Automation
- Escalation task list
- SLA tracking
- Priority indicators

### Module 5: Daily Intelligence Reports
- View daily reports
- Export to CSV
- Email scheduling

## Building

```bash
npm run build
```

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## Linting

```bash
npm run lint
```

## Deployment

The frontend is deployed to S3 + CloudFront via the CDK infrastructure.

See deployment scripts in `../infrastructure/`.

## API Integration

The frontend communicates with the backend via:
- **REST API**: `/api/v1/*` endpoints
- **WebSocket**: Real-time updates for agent states and alerts

## Authentication

Currently uses API key authentication. Future releases will add:
- SSO (SAML/OIDC)
- Role-based access control
- MFA support
