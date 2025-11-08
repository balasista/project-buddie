"""Amazon Bedrock client wrapper"""

import boto3
import json
from typing import Dict, Any


class BedrockClient:
    """Wrapper for Amazon Bedrock operations"""

    def __init__(self, model_id: str = "anthropic.claude-3-5-sonnet-20241022-v2:0"):
        self.bedrock = boto3.client('bedrock-runtime')
        self.model_id = model_id

    def invoke_model(self, prompt: str, max_tokens: int = 4096,
                     temperature: float = 0.7) -> str:
        """Invoke Bedrock model with prompt"""
        try:
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": max_tokens,
                "temperature": temperature,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            })

            response = self.bedrock.invoke_model(
                modelId=self.model_id,
                body=body
            )

            response_body = json.loads(response['body'].read())
            return response_body['content'][0]['text']

        except Exception as e:
            raise Exception(f"Error invoking Bedrock model: {e}")

    def invoke_with_system_prompt(self, system_prompt: str, user_prompt: str,
                                   max_tokens: int = 4096) -> str:
        """Invoke model with system prompt"""
        try:
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": max_tokens,
                "system": system_prompt,
                "messages": [
                    {
                        "role": "user",
                        "content": user_prompt
                    }
                ]
            })

            response = self.bedrock.invoke_model(
                modelId=self.model_id,
                body=body
            )

            response_body = json.loads(response['body'].read())
            return response_body['content'][0]['text']

        except Exception as e:
            raise Exception(f"Error invoking Bedrock model: {e}")
