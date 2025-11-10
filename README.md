# Project Buddie

**AI-powered contact center intelligence platform with multi-platform support**

[![Platform Agnostic](https://img.shields.io/badge/Platform-Agnostic-blue.svg)](docs/architecture/multi-platform.md)
[![SME Feedback Integrated](https://img.shields.io/badge/SME%20Feedback-Integrated-green.svg)](SME_FEEDBACK_ANALYSIS_EXECUTIVE_SUMMARY.md)
[![GitHub Issues](https://img.shields.io/badge/Issues-79-orange.svg)](https://github.com/balasista/project-buddie/issues)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 SME Feedback Fully Integrated

**This project has been comprehensively updated based on Subject Matter Expert (SME) feedback.**

All three critical SME requirements have been incorporated into the implementation plan:

✅ **Multi-Platform Support** - Platform abstraction layer designed from Day 1
✅ **Agent Direct Notifications** - EOD summaries and morning task reminders for agents
✅ **Loan Officer Workflow** - Intelligent handling when LO is unavailable

**For detailed analysis:** See [SME Feedback Analysis Report](SME_FEEDBACK_ANALYSIS_EXECUTIVE_SUMMARY.md)

**GitHub Issues:** [79 implementation issues](https://github.com/balasista/project-buddie/issues) (69 original + 10 new for SME feedback)

---

## Overview

Project Buddie transforms contact center operations with AI-powered intelligence and automation. Built with a **platform-agnostic architecture**, it works with leading contact center platforms including Amazon Connect (MVP), with Genesys Cloud CX and Cisco UCCE/CVP support planned.

### Core Capabilities

#### 🤖 AI-Powered Intelligence
- **Automated Call Summarization** - AI-generated summaries using Claude 3.5 Sonnet
- **Sentiment Analysis** - Real-time customer sentiment tracking
- **IVR Journey Mapping** - Visualize customer paths and identify friction points
- **Predictive Insights** - Identify patterns and prevent escalations

#### 👥 Agent Productivity (✨ SME Enhanced)
- **Real-time Performance Monitoring** - Track agent states, ACW durations, handle time
- **Smart Alerts for Supervisors** - Automated alerts for extended ACW times
- **✨ NEW: Agent Direct Notifications** - EOD summaries and morning task reminders sent directly to agents
- **✨ NEW: Personalized Task Lists** - Agents receive prioritized daily tasks from Salesforce and Buddie

#### 🏦 Loan Officer Workflow (✨ SME Enhanced)
- **✨ NEW: Intelligent LO Unavailability Handling** - IVR collects loan inquiry details when LO is busy
- **✨ NEW: Auto-Case Creation** - Automatically creates and routes cases to specific loan officers
- **✨ NEW: Manager Visibility** - LO managers receive notifications and workload dashboards
- **✨ NEW: Time Tracking** - Track response times and workload distribution across LOs

#### 🔄 CRM Integration
- **Salesforce Sync** - Automatic sync of call summaries to Cases/Contacts
- **Task Automation** - Auto-create follow-up tasks for escalations
- **Custom Fields** - Rich metadata for reporting and analytics

#### 📊 Reporting & Analytics
- **Daily Intelligence Reports** - Comprehensive metrics for managers
- **Real-time Dashboards** - Live agent status, queue metrics, SLA tracking
- **Custom Analytics** - IVR drop-off analysis, journey success rates

---

## 🏗️ Platform-Agnostic Architecture

Project Buddie is designed with **multi-platform support** as a core principle:

### Supported Platforms

| Platform | Status | Timeline |
|----------|--------|----------|
| **Amazon Connect** | ✅ MVP (Current) | Month 1-4 |
| **Genesys Cloud CX** | 📋 Planned | Phase 2 (Month 5-6) |
| **Cisco UCCE/CVP** | 📋 Planned | Phase 2 (Month 6-7) |

### Provider Abstraction Layer

All contact center integrations use a unified provider interface:

```typescript
interface ITelephonyProvider {
  getCallData(contactId: string): Promise<Call>;
  getAgentStates(): Promise<AgentState[]>;
  getIVRJourney(contactId: string): Promise<Journey>;
  subscribeToEvents(): EventStream;
}
```

This ensures:
- ✅ Core business logic is platform-independent
- ✅ Easy addition of new platforms
- ✅ Consistent data models across providers
- ✅ Future-proof architecture

**Implementation Details:** See [Provider Architecture](backend/providers/README.md)

---

## Tech Stack

### Backend (Platform-Agnostic)
- **Runtime**: Serverless functions (AWS Lambda for MVP)
- **AI/ML**: Amazon Bedrock (Claude 3.5 Sonnet), Amazon Transcribe
- **Database**: DynamoDB (NoSQL), RDS PostgreSQL (Relational)
- **Event Processing**: EventBridge, SQS, Kinesis
- **Storage**: S3 for recordings and archives

### Frontend
- **Framework**: Next.js 14 (React 18, TypeScript)
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand, TanStack Query
- **Real-time**: WebSocket API for live updates

### Infrastructure
- **IaC**: AWS CDK (TypeScript) - cloud-agnostic approach
- **CI/CD**: GitHub Actions
- **Monitoring**: CloudWatch, Datadog (optional)

### Integrations
- **Contact Centers**:
  - Amazon Connect (MVP)
  - Genesys Cloud (Phase 2)
  - Cisco UCCE/CVP (Phase 2)
- **CRM**: Salesforce (OAuth JWT authentication)
- **Notifications**: Slack, Amazon SES
- **✨ Agent Channels**: Email, Slack DM, SMS (optional)

---

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- Python 3.11 or higher
- Cloud provider CLI configured (AWS CLI for MVP)
- CDK CLI: `npm install -g aws-cdk`
- Git

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/balasista/project-buddie.git
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
# Edit local.json with your cloud account details and contact center settings
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

---

## Project Structure

```
project-buddie/
├── infrastructure/           # Cloud infrastructure code (CDK)
├── backend/
│   ├── shared/              # Shared libraries (Node.js, Python)
│   ├── functions/           # Serverless functions
│   │   ├── transcribe-call-handler/
│   │   ├── summarize-call-handler/
│   │   ├── agent-state-monitor/
│   │   ├── daily-report-generator/
│   │   └── ... (15 functions total)
│   └── providers/           # ⭐ Platform abstraction layer
│       ├── amazon-connect/  # Amazon Connect implementation
│       ├── genesys/         # Genesys placeholder
│       └── cisco/           # Cisco placeholder
├── frontend/                # Next.js application
├── docs/                    # Documentation
│   ├── architecture/
│   ├── api/
│   ├── development/
│   └── integrations/
├── config/                  # Environment configurations
├── scripts/                 # Utility scripts
└── e2e-tests/              # End-to-end tests
```

**Complete Structure:** See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## Implementation Plan

### Total Implementation Issues: 79

The project is organized into 11 sprints + 6 half-sprints for SME features:

- **Sprint 0**: Infrastructure & Setup (6 issues)
- **Sprint 1**: AI Call Summarization (6 issues)
- **Sprint 2**: Salesforce Integration (4 issues)
- **Sprint 3**: Agent Monitoring (6 issues)
- **✨ Sprint 3.5**: Agent Task Backend (1 issue) - **SME Feedback**
- **Sprint 4**: Dashboard UI (6 issues)
- **✨ Sprint 4.5**: Agent Preferences UI (1 issue) - **SME Feedback**
- **Sprint 5**: IVR Journey Parsing (5 issues)
- **✨ Sprint 5.5**: LO IVR & Tracking (3 issues) - **SME Feedback**
- **Sprint 6**: Journey Visualization (5 issues)
- **✨ Sprint 6.5**: LO Dashboard (1 issue) - **SME Feedback**
- **Sprint 7**: Escalation Automation (6 issues)
- **✨ Sprint 7.5**: LO Case Management (2 issues) - **SME Feedback**
- **Sprint 8**: Reporting System (5 issues)
- **✨ Sprint 8.5**: Agent Notifications (2 issues) - **SME Feedback**
- **Sprint 9**: Performance & Security (5 issues)
- **Sprint 10**: Beta Deployment (3 issues)
- **Sprint 11**: GA Launch (6 issues)
- **Platform Abstraction**: Multi-platform prep (4 issues)

**View All Issues:** https://github.com/balasista/project-buddie/issues

---

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

# Type checking
npm run typecheck
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

---

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

---

## Documentation

### Architecture
- [System Overview](docs/architecture/system-overview.md)
- [Multi-Platform Architecture](docs/architecture/multi-platform.md)
- [Data Models](docs/architecture/data-models.md)
- [Provider Abstraction Layer](backend/providers/README.md)
- [Architecture Decision Records](docs/adr/)

### API
- [REST API Documentation](docs/api/rest-api.md)
- [WebSocket API](docs/api/websocket-api.md)
- [Salesforce Integration API](docs/api/salesforce-integration.md)

### Development
- [Setup Guide](docs/development/setup-guide.md)
- [Local Development](docs/development/local-development.md)
- [Testing Strategy](docs/development/testing-strategy.md)
- [Deployment Guide](docs/development/deployment.md)

### Integrations
- [Amazon Connect Setup](docs/integrations/amazon-connect-setup.md)
- [Genesys Cloud Setup](docs/integrations/genesys-setup.md) (Phase 2)
- [Cisco UCCE Setup](docs/integrations/cisco-setup.md) (Phase 2)
- [Salesforce Setup](docs/integrations/salesforce-setup.md)
- [Slack Integration](docs/integrations/slack-integration.md)

### Operations
- [Monitoring Strategy](docs/operations/monitoring.md)
- [Runbooks](docs/operations/runbooks/)
- [Disaster Recovery](docs/operations/disaster-recovery.md)

---

## SME Feedback Implementation

### What Was Added

The implementation plan was enhanced with three critical workflows based on SME feedback:

#### 1. Multi-Platform Support (✅ Already in Plan)
- Platform abstraction layer from Day 1
- Genesys and Cisco research issues
- Provider interface design
- **Issues**: #97, #98, #99

#### 2. Agent Direct Notifications (✨ New Feature)
- End-of-day task summaries sent to agents
- Morning reminders with daily task lists
- Agent notification preference management
- Email and Slack DM delivery
- **New Issues**: #104, #105, #106, #107
- **Updated Issues**: #76, #78

#### 3. Loan Officer Unavailability Workflow (✨ New Feature)
- IVR workflow for collecting loan inquiry details
- Auto-case creation and LO routing
- Manager notifications
- Time tracking and workload dashboards
- **New Issues**: #108, #109, #110, #111, #112, #113
- **Updated Issues**: #70, #71, #61, #62

**Complete Analysis:** [SME_FEEDBACK_ANALYSIS_EXECUTIVE_SUMMARY.md](SME_FEEDBACK_ANALYSIS_EXECUTIVE_SUMMARY.md)

---

## Roadmap

### Phase 1: MVP (4.5 months) - Current
- ✅ AI Call Summarization
- ✅ Agent Productivity Monitoring
- ✅ **Agent Direct Notifications** (SME Feedback)
- ✅ IVR Journey Intelligence
- ✅ **Loan Officer Workflow** (SME Feedback)
- ✅ Escalation Automation
- ✅ Daily Reports
- ✅ Platform Abstraction Layer

### Phase 2: Multi-Platform (4 months)
- 🔄 Genesys Cloud CX integration
- 🔄 Cisco UCCE/CVP integration
- 🔄 Advanced analytics dashboard
- 🔄 Predictive agent scheduling
- 🔄 Voice of Customer sentiment trends

### Phase 3: Advanced Features
- 📋 Machine learning for call routing
- 📋 Real-time coaching recommendations
- 📋 Workforce management integration
- 📋 Mobile applications
- 📋 Custom reporting builder

**Timeline:** 8.5 months to multi-platform GA

---

## Performance Targets

- Average call summary generation: **< 5 seconds**
- Real-time agent state updates: **< 1 second**
- Dashboard load time: **< 2 seconds**
- API response time (p95): **< 300ms**
- WebSocket message latency: **< 500ms**

---

## Cost Model

### MVP Development Cost
- **Original Estimate**: $293K (4 months)
- **With SME Feedback**: $330.5K (4.5 months)
- **Savings vs Traditional**: 31% ($149.5K)

### Operational Cost (per 50 agents/month)
- Compute (serverless functions): $200-300
- AI/ML (Bedrock): $150-200
- Database (DynamoDB + RDS): $100-150
- Storage (S3): $50-100
- **Total**: $500-750/month

**Cost scales linearly with usage due to serverless architecture**

---

## FAQ

### Platform & Integration

**Q: What contact center platforms are supported?**
A: Amazon Connect (MVP), with Genesys Cloud CX and Cisco UCCE/CVP planned for Phase 2. The architecture is platform-agnostic.

**Q: Can I use this without Salesforce?**
A: Yes, Salesforce integration is optional. Core features work standalone.

**Q: How long does it take to add a new contact center platform?**
A: Approximately 2-3 months per platform due to the provider abstraction layer.

### Features

**Q: Do agents receive notifications directly?**
A: Yes! Based on SME feedback, agents receive EOD summaries and morning task reminders via email or Slack DM.

**Q: How does the Loan Officer workflow work?**
A: When an LO is unavailable, the IVR intelligently collects loan inquiry details, creates a case, routes it to the LO, and notifies their manager.

**Q: What AI model is used for summaries?**
A: Claude 3.5 Sonnet via Amazon Bedrock, providing high-quality, context-aware summaries.

### Deployment

**Q: How long does initial deployment take?**
A: Approximately 15-20 minutes for infrastructure deployment.

**Q: What cloud platforms are supported?**
A: Currently AWS (all regions with Bedrock support). Architecture designed for multi-cloud future.

**Q: Can this be deployed on-premises?**
A: Not in MVP. Phase 3 may include hybrid cloud/on-premises options.

---

## Security

Security is a top priority:

- **Data Encryption**: At rest (DynamoDB, S3, RDS) and in transit (TLS 1.2+)
- **Secrets Management**: AWS Secrets Manager for credentials
- **IAM**: Least privilege access for all services
- **Authentication**: OAuth JWT for Salesforce, API keys for internal APIs
- **Compliance**: SOC 2 Type II preparation (Sprint 11)
- **Audit Logging**: CloudTrail enabled for all environments

**For details:** See [SECURITY.md](SECURITY.md)

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Create feature branch from `develop`
2. Make changes following code style
3. Write tests (>90% coverage required)
4. Ensure all tests pass
5. Update documentation
6. Submit pull request

### Code Review Requirements

- ✅ Passing CI/CD checks
- ✅ Code review approval
- ✅ Test coverage >90%
- ✅ Documentation updated

---

## Support & Community

- **Documentation**: https://docs.projectbuddie.com
- **GitHub Issues**: https://github.com/balasista/project-buddie/issues
- **Email**: support@projectbuddie.com
- **Slack Community**: [Join #project-buddie](https://slack.projectbuddie.com)

---

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built with:
- **AI Assistance**: Claude Code, GitHub Copilot, Cursor
- **AI Platform**: Amazon Bedrock (Claude 3.5 Sonnet)
- **Contact Center**: Amazon Connect (MVP)
- **CRM Integration**: Salesforce
- **SME Expertise**: Comprehensive feedback integration

**SME Feedback Analysis**: [View Complete Report](SME_FEEDBACK_ANALYSIS_EXECUTIVE_SUMMARY.md)

---

**🎯 Platform-Agnostic Design | ✨ SME Feedback Integrated | 🚀 79 GitHub Issues Ready**

*Last Updated: November 8, 2025*
