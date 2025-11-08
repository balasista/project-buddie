"""IVR Journey data model"""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class JourneyStep(BaseModel):
    """Individual step in IVR journey"""
    timestamp: str = Field(..., description="ISO 8601 timestamp")
    step_type: str = Field(..., description="Type of step (IVR_MENU, AUTH_ATTEMPT, PAYMENT, etc.)")
    description: str = Field(..., description="Description of the step")
    success: bool = Field(..., description="Whether the step was successful")


class IVRJourney(BaseModel):
    """IVR journey data model"""

    contact_id: str = Field(..., description="Amazon Connect contact ID")
    sk: str = Field(default="METADATA", description="Sort key (always METADATA)")
    customer_phone: str = Field(..., description="Customer phone number")
    account_number: Optional[str] = Field(None, description="Customer account number")
    outcome: str = Field(..., description="Journey outcome")
    steps: List[JourneyStep] = Field(default_factory=list, description="Journey steps")
    dropoff_point: Optional[str] = Field(None, description="Where customer dropped off")
    total_duration: int = Field(..., description="Total journey duration in seconds")
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    class Config:
        json_schema_extra = {
            "example": {
                "contact_id": "abc123",
                "sk": "METADATA",
                "customer_phone": "+15555551234",
                "account_number": "ACC-12345",
                "outcome": "SUCCESS",
                "steps": [
                    {
                        "timestamp": "2025-11-08T10:00:00Z",
                        "step_type": "IVR_MENU",
                        "description": "Selected billing option",
                        "success": True
                    }
                ],
                "total_duration": 180
            }
        }
