"""Custom exception classes"""


class BuddieError(Exception):
    """Base exception for Project Buddie"""
    pass


class ValidationError(BuddieError):
    """Raised when input validation fails"""
    pass


class DatabaseError(BuddieError):
    """Raised when database operation fails"""
    pass


class ExternalServiceError(BuddieError):
    """Raised when external service call fails"""
    pass


class BedrockError(BuddieError):
    """Raised when Bedrock API call fails"""
    pass


class SalesforceError(BuddieError):
    """Raised when Salesforce API call fails"""
    pass
