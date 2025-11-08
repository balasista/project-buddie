# Project Buddie - Quick Start Guide

Get up and running with Project Buddie in 15 minutes.

## Prerequisites

Ensure you have installed:
- Node.js 20.x: `node --version`
- Python 3.11: `python --version`
- AWS CLI: `aws --version`
- AWS CDK: `npm install -g aws-cdk`

## Step 1: Configure AWS Credentials (2 minutes)

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Region: us-east-1
# Output format: json
```

Verify:
```bash
aws sts get-caller-identity
```

## Step 2: Update Configuration (1 minute)

```bash
cd project-buddie-repo
cp config/environments/dev.json config/environments/local.json

# Edit local.json and update:
# - accountId: YOUR_AWS_ACCOUNT_ID
# - alertEmail: YOUR_EMAIL
```

## Step 3: Install Dependencies (5 minutes)

```bash
# Root dependencies
npm install

# Infrastructure
cd infrastructure && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..

# Python backend
cd backend/shared/python && pip install -r requirements.txt && cd ../../..

# Node.js backend
cd backend/shared/nodejs && npm install && cd ../../..
```

## Step 4: Bootstrap CDK (2 minutes)

```bash
cd infrastructure
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

## Step 5: Deploy Infrastructure (5 minutes)

```bash
# Still in infrastructure directory
npm run deploy
```

This will create:
- VPC and networking
- DynamoDB tables
- S3 buckets
- Lambda functions
- API Gateway
- CloudWatch dashboards
- CloudFront distribution

## Step 6: Start Frontend Locally (1 minute)

```bash
cd ../frontend
cp .env.example .env.local

# Edit .env.local and add the API URL from CDK outputs

npm run dev
```

Open http://localhost:3000

## Step 7: Verify Deployment (2 minutes)

1. **Check AWS Console**:
   - CloudFormation: Verify stacks deployed
   - Lambda: Verify functions created
   - DynamoDB: Verify tables created
   - API Gateway: Note API endpoint

2. **Check CloudWatch Dashboard**:
   - Open CloudWatch Console
   - Navigate to Dashboards
   - Find "project-buddie-dev" dashboard

3. **Test API** (optional):
   ```bash
   curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev/api/v1/summaries
   ```

## What You Have Now

✅ Full serverless infrastructure on AWS
✅ Frontend running locally
✅ Backend Lambda functions deployed
✅ API Gateway endpoints ready
✅ CloudWatch monitoring active
✅ CI/CD pipelines configured (GitHub Actions)

## Next Steps

### For Backend Development
```bash
cd backend/functions/summarize-call-handler
# Implement business logic in src/handler.py
# Run tests: pytest tests/
```

### For Frontend Development
```bash
cd frontend
# Implement components in src/components/
# Run tests: npm test
```

### For Infrastructure Updates
```bash
cd infrastructure
# Modify stacks in lib/stacks/
# Preview changes: npm run diff
# Deploy changes: npm run deploy
```

## Common Commands

```bash
# Deploy all stacks
cd infrastructure && npm run deploy

# Deploy specific stack
cd infrastructure && cdk deploy ProjectBuddieStack-dev/LambdaStack

# View infrastructure changes
cd infrastructure && npm run diff

# Run all tests
npm test

# Run frontend locally
cd frontend && npm run dev

# Run backend tests
cd backend/functions/summarize-call-handler && pytest

# Format code
npm run format

# Lint code
npm run lint
```

## Troubleshooting

### Issue: CDK deploy fails with "No stack named..."
**Solution**: Run `cdk bootstrap` first

### Issue: Frontend can't connect to API
**Solution**: Check `.env.local` has correct `NEXT_PUBLIC_API_URL`

### Issue: Lambda function errors
**Solution**: Check CloudWatch Logs for specific error messages

### Issue: Permission denied errors
**Solution**: Verify IAM permissions and Lambda execution roles

## Getting Help

- 📚 [Full Documentation](docs/)
- 🏗️ [Architecture Overview](docs/architecture/system-overview.md)
- 🛠️ [Development Guide](docs/development/setup-guide.md)
- 🐛 [Report Issues](https://github.com/your-org/project-buddie/issues)
- 💬 Slack: #project-buddie

## Clean Up

To remove all AWS resources:

```bash
cd infrastructure
cdk destroy --all
```

⚠️ **Warning**: This deletes all data. Use with caution!

---

**You're all set! Start building amazing features! 🚀**
