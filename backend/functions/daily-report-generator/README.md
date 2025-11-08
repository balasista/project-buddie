# Daily Report Generator

Generates daily intelligence reports.

## Trigger
EventBridge scheduled rule (daily at 8 AM)

## Purpose
- Aggregate daily metrics from DynamoDB
- Generate HTML report
- Export raw data to CSV
- Send via Amazon SES
- Store report in S3
