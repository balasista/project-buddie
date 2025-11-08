# Escalation Task Creator

Creates Salesforce tasks for failed IVR journeys.

## Trigger
DynamoDB Stream from ivr-journeys table

## Purpose
- Detect failed/abandoned journeys
- Apply escalation rules
- Create Salesforce task
- Calculate SLA deadline
- Route to appropriate queue
