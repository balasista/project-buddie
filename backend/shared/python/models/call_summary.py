"""Call Summary data model"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class CallSummary(BaseModel):
    """Call summary data model"""

    contact_id: str = Field(..., description="Amazon Connect contact ID")
    timestamp: str = Field(..., description="ISO 8601 timestamp")
    agent_id: str = Field(..., description="Agent ID")
    customer_id: Optional[str] = Field(None, description="Customer ID")
    customer_phone: str = Field(..., description="Customer phone number")

    # AI-generated summary
    issue: str = Field(..., description="Main issue or reason for call")
    resolution: str = Field(..., description="How the issue was resolved")
    next_steps: Optional[str] = Field(None, description="Next steps or follow-up")
    sentiment: str = Field(..., description="Customer sentiment (positive/neutral/negative)")
    category: str = Field(..., description="Call category")

    # Metadata
    transcript: Optional[str] = Field(None, description="Full call transcript")
    recording_url: Optional[str] = Field(None, description="S3 URL to recording")
    salesforce_id: Optional[str] = Field(None, description="Salesforce Case ID")
    cost: float = Field(0.0, description="AI processing cost")
    status: str = Field("pending", description="Processing status")
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    class Config:
        json_schema_extra = {
            "example": {
                "contact_id": "abc123",
                "timestamp": "2025-11-08T10:00:00Z",
                "agent_id": "agent-001",
                "customer_phone": "+15555551234",
                "issue": "Payment not processing",
                "resolution": "Reset payment method and processed successfully",
                "sentiment": "positive",
                "category": "billing",
                "status": "completed"
            }
        }
