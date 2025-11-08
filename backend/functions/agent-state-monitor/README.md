# Agent State Monitor

Monitors agent states and sends alerts for prolonged ACW durations.

## Trigger
Amazon Connect agent state change events

## Purpose
- Track agent state transitions
- Calculate duration in each state
- Send Slack alerts for ACW > threshold
- Store state history in DynamoDB
