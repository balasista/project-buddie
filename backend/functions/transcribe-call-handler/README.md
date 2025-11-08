# Transcribe Call Handler

Initiates call transcription using Amazon Transcribe.

## Trigger
Amazon Connect CTR (Contact Trace Record) event

## Purpose
- Receives CTR event when call ends
- Starts Amazon Transcribe job for call recording
- Stores transcription metadata in DynamoDB
