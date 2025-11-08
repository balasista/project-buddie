"""DynamoDB client wrapper"""

import boto3
from typing import Dict, Any, Optional, List
from botocore.exceptions import ClientError


class DynamoDBClient:
    """Wrapper for DynamoDB operations"""

    def __init__(self, table_name: Optional[str] = None):
        self.dynamodb = boto3.resource('dynamodb')
        self.table_name = table_name
        self.table = self.dynamodb.Table(table_name) if table_name else None

    def put_item(self, table_name: str, item: Dict[str, Any]) -> Dict[str, Any]:
        """Put an item into DynamoDB table"""
        try:
            table = self.dynamodb.Table(table_name)
            response = table.put_item(Item=item)
            return response
        except ClientError as e:
            raise Exception(f"Error putting item: {e}")

    def get_item(self, table_name: str, key: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Get an item from DynamoDB table"""
        try:
            table = self.dynamodb.Table(table_name)
            response = table.get_item(Key=key)
            return response.get('Item')
        except ClientError as e:
            raise Exception(f"Error getting item: {e}")

    def query(self, table_name: str, key_condition: str, expression_values: Dict[str, Any],
              index_name: Optional[str] = None) -> List[Dict[str, Any]]:
        """Query DynamoDB table"""
        try:
            table = self.dynamodb.Table(table_name)
            kwargs = {
                'KeyConditionExpression': key_condition,
                'ExpressionAttributeValues': expression_values
            }
            if index_name:
                kwargs['IndexName'] = index_name

            response = table.query(**kwargs)
            return response.get('Items', [])
        except ClientError as e:
            raise Exception(f"Error querying table: {e}")

    def update_item(self, table_name: str, key: Dict[str, Any],
                    update_expression: str, expression_values: Dict[str, Any]) -> Dict[str, Any]:
        """Update an item in DynamoDB table"""
        try:
            table = self.dynamodb.Table(table_name)
            response = table.update_item(
                Key=key,
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_values,
                ReturnValues='ALL_NEW'
            )
            return response.get('Attributes', {})
        except ClientError as e:
            raise Exception(f"Error updating item: {e}")
