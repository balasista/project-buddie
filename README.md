# Project Buddie

AI-powered contact center intelligence platform for Amazon Connect + Salesforce.

## Overview

Project Buddie provides real-time intelligence and automation for contact centers, transforming how supervisors monitor agent performance and how customer interactions are documented.

### Key Features

- **AI Call Summarization**: Automatic call summaries using Amazon Bedrock (Claude 3.5 Sonnet)
- **Real-time Agent Productivity Monitoring**: Track agent states and ACW durations with smart alerts
- **IVR Journey Intelligence**: Visualize customer IVR paths and identify drop-off points
- **Automated Escalation Management**: Auto-create Salesforce tasks for failed journeys
- **Daily Intelligence Reports**: Comprehensive daily metrics and insights

## Tech Stack

### Backend
- **Runtime**: AWS Lambda (Python 3.11, Node.js 20.x)
- **AI/ML**: Amazon Bedrock (Claude 3.5 Sonnet), Amazon Transcribe
- **Database**: Amazon DynamoDB, Amazon RDS PostgreSQL
- **Event Bus**: Amazon EventBridge, Amazon SQS, Amazon Kinesis
- **Storage**: Amazon S3

### Frontend
- **Framework**: Next.js 14 (React 18, TypeScript)
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand, TanStack Query
- **Real-time**: WebSocket API

### Infrastructure
- **IaC**: AWS CDK (TypeScript)
- **CI/CD**: GitHub Actions
- **Monitoring**: Amazon CloudWatch

### Integrations
- **Telephony**: Amazon Connect
- **CRM**: Salesforce
- **Notifications**: Slack, Amazon SES

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- Python 3.11 or higher
- AWS CLI configured with appropriate credentials
- AWS CDK CLI: `npm install -g aws-cdk`
- Git

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-org/project-buddie.git
cd project-buddie
```

2. **Install dependencies**:
```bash
npm run bootstrap
```

3. **Configure environment**:
```bash
# Copy and edit environment configuration
cp config/environments/dev.json config/environments/local.json
# Edit local.json with your AWS account details
```

4. **Deploy infrastructure**:
```bash
cd infrastructure
npm install
npm run deploy
```

5. **Run frontend locally**:
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your API endpoints
npm run dev
```

6. **Access the application**:
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
project-buddie-repo/
├── infrastructure/        # AWS CDK infrastructure code
├── backend/              # Lambda functions and shared libraries
│   ├── shared/          # Shared Python/Node.js libraries
│   ├── functions/       # Individual Lambda functions
│   └── providers/       # Platform abstraction layer
├── frontend/            # Next.js frontend application
├── docs/                # Documentation
├── scripts/             # Utility scripts
├── config/              # Environment configurations
└── e2e-tests/           # End-to-end tests
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for complete directory tree.

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:backend
npm run test:frontend
npm run test:infra
npm run test:e2e
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

### Building

```bash
# Build all components
npm run build

# Build specific components
npm run build:backend
npm run build:frontend
npm run build:infra
```

## Deployment

### Development Environment

```bash
npm run deploy:dev
```

### Staging Environment

```bash
npm run deploy:staging
```

### Production Environment

```bash
npm run deploy:prod
```

## Documentation

- [Architecture Overview](docs/architecture/system-overview.md)
- [Data Models](docs/architecture/data-models.md)
- [API Documentation](docs/api/rest-api.md)
- [Development Setup Guide](docs/development/setup-guide.md)
- [Local Development](docs/development/local-development.md)
- [Testing Strategy](docs/development/testing-strategy.md)
- [Deployment Guide](docs/development/deployment.md)
- [Architecture Decision Records](docs/adr/)

## Integrations

### Amazon Connect Setup

See [Amazon Connect Setup Guide](docs/integrations/amazon-connect-setup.md)

### Salesforce Setup

See [Salesforce Setup Guide](docs/integrations/salesforce-setup.md)

### Slack Integration

See [Slack Integration Guide](docs/integrations/slack-integration.md)

## Monitoring & Operations

- [Monitoring Strategy](docs/operations/monitoring.md)
- [Runbooks](docs/operations/runbooks/)
- [Disaster Recovery](docs/operations/disaster-recovery.md)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Create a feature branch from `develop`
2. Make your changes
3. Write tests
4. Ensure all tests pass
5. Submit a pull request

### Code Review Process

All pull requests require:
- Passing CI/CD checks
- Code review approval
- Documentation updates (if applicable)

## Security

Security is a top priority. Please see [SECURITY.md](SECURITY.md) for:
- Security policies
- Vulnerability reporting
- Security best practices

## Versioning

We use [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: https://docs.projectbuddie.com
- **Issues**: https://github.com/your-org/project-buddie/issues
- **Email**: support@projectbuddie.com
- **Slack**: #project-buddie channel

## Acknowledgments

- AWS Bedrock team for Claude 3.5 Sonnet
- Amazon Connect team
- Salesforce developer community

## Roadmap

### Phase 1 (MVP) - Completed
- AI Call Summarization
- Agent Productivity Monitoring
- IVR Journey Intelligence
- Escalation Automation
- Daily Reports

### Phase 2 - Planned
- Multi-platform support (Genesys, Cisco)
- Advanced analytics dashboard
- Predictive agent scheduling
- Voice of Customer sentiment trends
- Custom reporting builder

### Phase 3 - Future
- Machine learning for call routing optimization
- Real-time coaching recommendations
- Integration with workforce management systems
- Mobile applications

## Technology Decisions

Key architectural decisions are documented in [Architecture Decision Records](docs/adr/).

## Performance

- Average call summary generation: < 5 seconds
- Real-time agent state updates: < 1 second
- Dashboard load time: < 2 seconds
- API response time (p95): < 300ms

## Cost Optimization

The platform is designed for cost efficiency:
- Serverless architecture (pay per use)
- DynamoDB on-demand billing
- S3 lifecycle policies for recordings
- CloudWatch Logs retention policies

Estimated monthly cost for 50 agents: $500-800

## FAQ

**Q: Can I use this without Salesforce?**
A: Yes, the platform can work standalone. Salesforce integration is optional.

**Q: Does this work with contact centers other than Amazon Connect?**
A: Currently MVP supports Amazon Connect. Phase 2 will add Genesys and Cisco support.

**Q: How long does it take to deploy?**
A: Initial deployment takes approximately 15-20 minutes.

**Q: What AWS regions are supported?**
A: All regions where Amazon Bedrock and Amazon Connect are available.

---

**Built with AI assistance | Powered by AWS | Integrated with Salesforce**
