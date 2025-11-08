# Summarize Call Handler

Lambda function that generates AI-powered call summaries using Amazon Bedrock.

## Overview

This function is triggered by EventBridge when a call transcription is completed. It:
1. Fetches the transcript from S3
2. Sends it to Amazon Bedrock (Claude 3.5 Sonnet) for summarization
3. Parses the AI response
4. Saves the structured summary to DynamoDB

## Event Source

- **Source**: Amazon EventBridge
- **Trigger**: Transcription completion event
- **Event Pattern**:
  ```json
  {
    "source": ["aws.transcribe"],
    "detail-type": ["Transcribe Job State Change"],
    "detail": {
      "TranscriptionJobStatus": ["COMPLETED"]
    }
  }
  ```

## Environment Variables

- `SUMMARIES_TABLE`: DynamoDB table name for call summaries
- `TRANSCRIPTS_BUCKET`: S3 bucket containing transcripts
- `ENVIRONMENT`: Deployment environment (dev/staging/prod)

## Dependencies

- boto3: AWS SDK
- structlog: Structured logging
- pydantic: Data validation

## Testing

```bash
pytest tests/
```

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run tests
pytest
```

## Deployment

Deployed automatically via CDK as part of the LambdaStack.
