"""
Lambda handler for AI call summarization using Amazon Bedrock
"""

import json
import os
from typing import Dict, Any
from clients import DynamoDBClient, S3Client, BedrockClient
from utils import get_logger

logger = get_logger(__name__)

# Initialize clients
dynamodb = DynamoDBClient()
s3 = S3Client()
bedrock = BedrockClient()


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Process transcription completion event and generate AI summary.

    Args:
        event: EventBridge event from Amazon Transcribe
        context: Lambda context

    Returns:
        Response dict with status code and body
    """
    try:
        logger.info("Processing call summarization event", event=event)

        # Parse event
        detail = event.get('detail', {})
        contact_id = detail.get('contactId')
        transcript_s3_uri = detail.get('transcriptFileUri')

        if not contact_id or not transcript_s3_uri:
            raise ValueError("Missing required fields in event")

        # Fetch transcript from S3
        logger.info("Fetching transcript", s3_uri=transcript_s3_uri)
        transcript_text = s3.get_object_text(transcript_s3_uri)

        # Generate summary using Bedrock
        logger.info("Generating AI summary", contact_id=contact_id)
        prompt = build_summarization_prompt(transcript_text)
        raw_summary = bedrock.invoke_model(prompt, max_tokens=4096)

        # Parse summary
        summary_data = parse_summary_response(raw_summary)

        # Save to DynamoDB
        table_name = os.environ['SUMMARIES_TABLE']
        item = {
            'contactId': contact_id,
            'timestamp': event.get('time'),
            'summary': summary_data,
            'transcript': transcript_text,
            'status': 'COMPLETED'
        }

        logger.info("Saving summary to DynamoDB", contact_id=contact_id)
        dynamodb.put_item(table_name, item)

        logger.info("Call summarization completed successfully", contact_id=contact_id)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'contactId': contact_id,
                'status': 'success'
            })
        }

    except Exception as e:
        logger.error("Error processing call summarization", error=str(e), exc_info=True)
        raise


def build_summarization_prompt(transcript: str) -> str:
    """Build prompt for Bedrock AI summarization"""
    return f"""You are an expert call center analyst. Analyze this call transcript and provide a structured summary.

Call Transcript:
{transcript}

Please provide a JSON response with the following structure:
{{
    "issue": "Main issue or reason for the call",
    "resolution": "How the issue was resolved or handled",
    "sentiment": "positive, neutral, or negative",
    "category": "billing, technical, account, or other category",
    "nextSteps": "Any follow-up actions required (optional)"
}}

Only respond with the JSON object, no additional text."""


def parse_summary_response(raw_response: str) -> Dict[str, Any]:
    """Parse and validate Bedrock response"""
    try:
        # Extract JSON from response
        # Bedrock may wrap JSON in markdown code blocks
        if '```json' in raw_response:
            json_str = raw_response.split('```json')[1].split('```')[0].strip()
        elif '```' in raw_response:
            json_str = raw_response.split('```')[1].split('```')[0].strip()
        else:
            json_str = raw_response.strip()

        summary = json.loads(json_str)

        # Validate required fields
        required_fields = ['issue', 'resolution', 'sentiment', 'category']
        for field in required_fields:
            if field not in summary:
                raise ValueError(f"Missing required field: {field}")

        return summary

    except json.JSONDecodeError as e:
        logger.error("Failed to parse JSON response", error=str(e), response=raw_response)
        raise ValueError(f"Invalid JSON response from Bedrock: {e}")
