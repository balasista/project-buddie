# Project Buddie - Shared Python Libraries

Shared Python libraries for Lambda functions.

## Overview

This directory contains reusable Python code used across multiple Lambda functions in Project Buddie.

## Structure

```
python/
├── models/          # Pydantic data models
├── clients/         # AWS service wrappers
├── utils/           # Utility functions
└── requirements.txt # Python dependencies
```

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Data Models

```python
from models import CallSummary, AgentState

summary = CallSummary(
    contact_id="abc123",
    timestamp="2025-11-08T10:00:00Z",
    agent_id="agent-001",
    customer_phone="+15555551234",
    issue="Payment issue",
    resolution="Resolved",
    sentiment="positive",
    category="billing"
)
```

### AWS Clients

```python
from clients import DynamoDBClient, S3Client, BedrockClient

# DynamoDB
dynamodb = DynamoDBClient()
dynamodb.put_item('my-table', {'id': '123', 'data': 'value'})

# S3
s3 = S3Client()
content = s3.get_object_text('s3://bucket/key')

# Bedrock
bedrock = BedrockClient()
response = bedrock.invoke_model("Summarize this call...")
```

### Logging

```python
from utils import get_logger

logger = get_logger(__name__)
logger.info("Processing call", contact_id="abc123")
logger.error("Error occurred", error=str(e))
```

## Testing

```bash
pytest
```

## Linting

```bash
black .
pylint **/*.py
mypy .
```

## Deployment

This directory is packaged as a Lambda layer by the CDK infrastructure code.
