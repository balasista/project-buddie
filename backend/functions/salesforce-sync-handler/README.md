# Salesforce Sync Handler

Lambda function that syncs call summaries to Salesforce.

## Overview

This function is triggered by DynamoDB Streams when a new call summary is created or updated. It:
1. Receives the DynamoDB stream event
2. Extracts the call summary data
3. Authenticates with Salesforce
4. Creates or updates Salesforce Case with AI summary
5. Updates custom fields with metadata

## Event Source

- **Source**: DynamoDB Streams
- **Trigger**: INSERT or MODIFY events on call-summaries table
- **Batch Size**: 10 records

## Environment Variables

- `SUMMARIES_TABLE`: DynamoDB table name
- `SALESFORCE_SECRET_ARN`: ARN of Salesforce credentials in Secrets Manager
- `ENVIRONMENT`: Deployment environment

## Salesforce Integration

### Required Salesforce Setup

1. Create Connected App in Salesforce
2. Store OAuth credentials in AWS Secrets Manager
3. Create custom fields on Case object:
   - `AI_Summary__c` (Long Text Area)
   - `AI_Sentiment__c` (Picklist: Positive, Neutral, Negative)
   - `Buddie_Contact_ID__c` (Text)
   - `Call_Category__c` (Text)

### API Calls

- `POST /services/data/v59.0/sobjects/Case` - Create Case
- `PATCH /services/data/v59.0/sobjects/Case/{Id}` - Update Case
- `POST /services/data/v59.0/sobjects/CaseComment` - Create Case Comment

## Error Handling

- Failed syncs are logged but don't block other records
- Implements exponential backoff for rate limiting
- Dead letter queue captures failed records

## Testing

```bash
npm test
```

## Deployment

Deployed automatically via CDK as part of the LambdaStack.
