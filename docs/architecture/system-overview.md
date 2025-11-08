# Project Buddie - System Architecture Overview

## High-Level Architecture

Project Buddie is a serverless, event-driven architecture built on AWS.

```
┌─────────────┐
│   Amazon    │
│   Connect   │
└──────┬──────┘
       │ CTR Events
       ▼
┌─────────────────┐
│  EventBridge    │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌──────────────┐    ┌──────────────┐
│ Transcribe   │    │ IVR Journey  │
│   Lambda     │    │   Lambda     │
└──────┬───────┘    └──────┬───────┘
       │                   │
       ▼                   ▼
┌──────────────┐    ┌──────────────┐
│ Summarize    │    │  DynamoDB    │
│   Lambda     │    │   Tables     │
│ (Bedrock AI) │    └──────────────┘
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Salesforce  │
│    Sync      │
│   Lambda     │
└──────────────┘
```

## Core Components

### 1. Data Ingestion Layer
- **Amazon Connect**: Source of call data (CTR events)
- **EventBridge**: Central event bus for all events
- **Kinesis**: Real-time agent state streams

### 2. Processing Layer
- **Lambda Functions**: Serverless compute for all business logic
- **Amazon Bedrock**: AI summarization using Claude 3.5 Sonnet
- **Amazon Transcribe**: Speech-to-text conversion

### 3. Data Layer
- **DynamoDB**: Primary data store (call summaries, agent states, journeys, escalations)
- **S3**: Object storage (recordings, transcripts, reports)
- **RDS PostgreSQL**: Analytics data warehouse (future)

### 4. Integration Layer
- **API Gateway**: REST API for frontend
- **WebSocket API**: Real-time updates
- **Salesforce**: CRM integration for task creation

### 5. Presentation Layer
- **Next.js Frontend**: React-based web application
- **CloudFront + S3**: Global content delivery

### 6. Observability Layer
- **CloudWatch**: Metrics, logs, dashboards
- **X-Ray**: Distributed tracing
- **SNS**: Alerting

## Event Flow

### Call Summarization Flow
1. Call ends in Amazon Connect
2. CTR event published to EventBridge
3. Transcribe Lambda starts Amazon Transcribe job
4. Transcribe completion triggers Summarize Lambda
5. Bedrock generates AI summary
6. Summary saved to DynamoDB
7. DynamoDB Stream triggers Salesforce Sync Lambda
8. Summary synced to Salesforce Case

### Agent Monitoring Flow
1. Agent state change in Amazon Connect
2. Event published to EventBridge
3. Agent State Monitor Lambda processes event
4. State duration calculated
5. Alert sent if threshold exceeded
6. State saved to DynamoDB
7. WebSocket API pushes update to frontend

### IVR Journey Flow
1. Customer completes IVR journey
2. CTR event contains journey steps
3. IVR Journey Parser Lambda processes CTR
4. Journey saved to DynamoDB
5. If failure detected, Escalation Lambda triggered
6. Salesforce task created
7. Frontend displays journey timeline

## Scaling Strategy

### Horizontal Scaling
- Lambda auto-scales to 1000 concurrent executions
- API Gateway auto-scales
- DynamoDB on-demand scaling

### Performance Optimization
- CloudFront caching for frontend
- DynamoDB GSI for query optimization
- Lambda layers for shared code
- Connection pooling for Salesforce

## Security Architecture

### Network Security
- VPC with private subnets for Lambda
- Security groups restricting access
- VPC Flow Logs enabled

### Data Security
- Encryption at rest (S3, DynamoDB, CloudWatch Logs)
- Encryption in transit (TLS 1.2+)
- Secrets Manager for credentials

### Access Control
- IAM least privilege policies
- API Gateway API key authentication
- Lambda execution roles scoped to requirements

## Disaster Recovery

- **RTO**: 4 hours
- **RPO**: 1 hour
- **Backup Strategy**:
  - DynamoDB point-in-time recovery (prod)
  - S3 versioning enabled
  - Infrastructure as Code for quick rebuilds

## Cost Optimization

- Serverless architecture (pay-per-use)
- DynamoDB on-demand billing
- S3 lifecycle policies
- CloudWatch Logs retention policies
- Lambda memory optimization

## Future Enhancements

- Multi-region deployment
- Read replicas for analytics
- Caching layer (ElastiCache)
- Machine learning models for predictions
