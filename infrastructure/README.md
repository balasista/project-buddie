# Project Buddie Infrastructure

AWS CDK infrastructure code for Project Buddie.

## Overview

This directory contains the AWS CDK infrastructure as code (IaC) for deploying Project Buddie to AWS. The infrastructure is organized into modular stacks for easier management and deployment.

## Architecture

### Stacks

1. **NetworkStack**: VPC, subnets, security groups, NAT gateways
2. **DatabaseStack**: DynamoDB tables for call summaries, agent states, IVR journeys, escalations
3. **StorageStack**: S3 buckets for call recordings and transcripts
4. **SecretsStack**: Secrets Manager for Salesforce credentials, API keys
5. **EventStack**: EventBridge event bus, SQS queues
6. **LambdaStack**: All Lambda functions with layers and permissions
7. **ApiStack**: API Gateway REST API and WebSocket API
8. **MonitoringStack**: CloudWatch dashboards, alarms, SNS topics
9. **FrontendStack**: S3 + CloudFront for Next.js frontend

### Constructs

Reusable CDK constructs for common patterns:
- `lambda-function.ts`: Standardized Lambda function with logging and tracing
- `dynamodb-table.ts`: DynamoDB table with standard configuration
- `event-rule.ts`: EventBridge rule with Lambda targets
- `api-endpoint.ts`: API Gateway endpoint with Lambda integration

## Prerequisites

- Node.js 20.x or higher
- AWS CLI configured with appropriate credentials
- AWS CDK CLI: `npm install -g aws-cdk`

## Installation

```bash
npm install
```

## Configuration

Edit `cdk.context.json` to set your AWS account IDs for each environment:

```json
{
  "project-buddie:dev:account": "123456789012",
  "project-buddie:staging:account": "123456789012",
  "project-buddie:prod:account": "123456789012"
}
```

## Building

```bash
npm run build
```

## Testing

```bash
npm test
```

## Deployment

### Bootstrap CDK (first time only)

```bash
cdk bootstrap aws://ACCOUNT_ID/REGION
```

### Deploy to Development

```bash
npm run deploy
```

### Deploy to Specific Environment

```bash
cdk deploy --all --context project-buddie:environment=dev
cdk deploy --all --context project-buddie:environment=staging
cdk deploy --all --context project-buddie:environment=prod
```

### View Differences

```bash
npm run diff
```

### Synthesize CloudFormation

```bash
npm run synth
```

## Stack Dependencies

```
SecretsStack (independent)
NetworkStack (independent)
StorageStack (independent)
EventStack (independent)
  ↓
DatabaseStack (requires: NetworkStack)
  ↓
LambdaStack (requires: NetworkStack, DatabaseStack, StorageStack, SecretsStack, EventStack)
  ↓
ApiStack (requires: LambdaStack)
  ↓
MonitoringStack (requires: LambdaStack, ApiStack, DatabaseStack)
FrontendStack (requires: ApiStack)
```

## Useful CDK Commands

- `cdk ls` - List all stacks
- `cdk synth` - Synthesize CloudFormation templates
- `cdk diff` - Compare deployed stack with current state
- `cdk deploy` - Deploy stacks to AWS
- `cdk destroy` - Destroy stacks (use with caution!)
- `cdk watch` - Watch for changes and auto-deploy

## Environment Variables

The following context variables can be set:

- `project-buddie:environment` - Deployment environment (dev/staging/prod)
- `project-buddie:region` - AWS region (default: us-east-1)

## Cost Estimation

To estimate costs before deployment:

```bash
cdk synth > template.yaml
# Use AWS Pricing Calculator with the generated template
```

## Outputs

After deployment, the following outputs are available:

- **VpcId**: VPC ID for the environment
- **ApiUrl**: REST API endpoint URL
- **CloudFrontUrl**: Frontend distribution URL
- **DashboardUrl**: CloudWatch dashboard URL
- **AlertTopicArn**: SNS topic ARN for alerts

## Troubleshooting

### Common Issues

**Issue**: CDK bootstrap error
```bash
cdk bootstrap aws://ACCOUNT_ID/REGION
```

**Issue**: Permission denied
- Ensure your AWS credentials have sufficient permissions
- Check IAM policies for CDK deployment permissions

**Issue**: Stack rollback
- Check CloudFormation console for specific error
- Review CloudWatch Logs for Lambda errors
- Use `cdk diff` to identify changes

## Security

- All S3 buckets have encryption enabled
- VPC flow logs are enabled
- Lambda functions use AWS X-Ray for tracing
- Secrets are stored in AWS Secrets Manager
- No hardcoded credentials

## Monitoring

After deployment, access monitoring:

1. **CloudWatch Dashboard**: Check stack outputs for URL
2. **CloudWatch Alarms**: Configured for Lambda errors, API errors
3. **X-Ray Traces**: Enabled for all Lambda functions

## Clean Up

To remove all resources:

```bash
cdk destroy --all
```

**Warning**: This will delete all data. Use with caution in production!

## Support

For issues or questions:
- Check the main project README
- Review AWS CDK documentation
- Open an issue on GitHub
