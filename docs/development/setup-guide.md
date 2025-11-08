# Project Buddie - Developer Setup Guide

## Prerequisites

### Required Software

- **Node.js**: 20.x or higher
- **Python**: 3.11 or higher
- **AWS CLI**: Latest version
- **AWS CDK**: `npm install -g aws-cdk`
- **Git**: Latest version

### Recommended Tools

- **Visual Studio Code**: With recommended extensions
- **Docker**: For local testing
- **Postman**: For API testing
- **AWS SAM CLI**: For local Lambda testing

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/project-buddie.git
cd project-buddie
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install infrastructure dependencies
cd infrastructure && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install Python backend dependencies
cd backend/shared/python && pip install -r requirements.txt && cd ../../..

# Install Node.js backend dependencies
cd backend/shared/nodejs && npm install && cd ../../..
```

### 3. Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter default region: us-east-1
# Enter default output format: json
```

### 4. Configure Environment

```bash
# Copy example config
cp config/environments/dev.json config/environments/local.json

# Edit local.json with your AWS account ID and preferences
```

### 5. Bootstrap CDK

```bash
cd infrastructure
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

### 6. Deploy Infrastructure (Optional for local dev)

```bash
cd infrastructure
npm run deploy
```

## Development Workflow

### Backend Development

#### Python Functions

```bash
cd backend/functions/summarize-call-handler

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/

# Run function locally (with SAM)
sam local invoke -e tests/fixtures/sample-event.json
```

#### Node.js Functions

```bash
cd backend/functions/salesforce-sync-handler

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Frontend Development

```bash
cd frontend

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with API endpoints

# Run development server
npm run dev

# Open http://localhost:3000
```

### Infrastructure Development

```bash
cd infrastructure

# Build
npm run build

# Run tests
npm test

# Synth CloudFormation
npm run synth

# View diff
npm run diff

# Deploy
npm run deploy
```

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend

# Run infrastructure tests
npm run test:infra
```

### Integration Tests

```bash
npm run test:e2e
```

### Manual Testing

Use the provided Postman collection in `docs/api/postman-collection.json`.

## Troubleshooting

### Common Issues

**Issue**: CDK bootstrap fails
```bash
# Solution: Ensure AWS credentials are correct
aws sts get-caller-identity

# Re-bootstrap with explicit account/region
cdk bootstrap aws://123456789012/us-east-1
```

**Issue**: Lambda function timeout
```bash
# Solution: Increase timeout in infrastructure stack
# Edit infrastructure/lib/stacks/lambda-stack.ts
timeout: cdk.Duration.seconds(120)
```

**Issue**: DynamoDB permission denied
```bash
# Solution: Verify IAM permissions in Lambda execution role
# Check CloudWatch Logs for specific error
```

## VS Code Setup

Install recommended extensions:
1. Open project in VS Code
2. VS Code will prompt to install recommended extensions
3. Click "Install All"

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## Next Steps

- Read [Architecture Overview](../architecture/system-overview.md)
- Review [API Documentation](../api/rest-api.md)
- Check [Testing Strategy](testing-strategy.md)
- Join Slack channel #project-buddie
