"""S3 client wrapper"""

import boto3
from typing import Optional
from botocore.exceptions import ClientError


class S3Client:
    """Wrapper for S3 operations"""

    def __init__(self):
        self.s3 = boto3.client('s3')

    def get_object_text(self, s3_uri: str) -> str:
        """Get object from S3 as text"""
        try:
            # Parse s3://bucket/key
            parts = s3_uri.replace('s3://', '').split('/', 1)
            bucket = parts[0]
            key = parts[1] if len(parts) > 1 else ''

            response = self.s3.get_object(Bucket=bucket, Key=key)
            return response['Body'].read().decode('utf-8')
        except ClientError as e:
            raise Exception(f"Error reading from S3: {e}")

    def put_object(self, bucket: str, key: str, body: str, content_type: str = 'text/plain') -> None:
        """Put object to S3"""
        try:
            self.s3.put_object(
                Bucket=bucket,
                Key=key,
                Body=body,
                ContentType=content_type
            )
        except ClientError as e:
            raise Exception(f"Error writing to S3: {e}")

    def generate_presigned_url(self, bucket: str, key: str, expiration: int = 3600) -> str:
        """Generate presigned URL for S3 object"""
        try:
            url = self.s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket, 'Key': key},
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            raise Exception(f"Error generating presigned URL: {e}")
