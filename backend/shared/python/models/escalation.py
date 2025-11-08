"""Escalation data model"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class Escalation(BaseModel):
    """Escalation task data model"""

    contact_id: str = Field(..., description="Amazon Connect contact ID")
    escalation_id: str = Field(..., description="Unique escalation ID")
    salesforce_task_id: Optional[str] = Field(None, description="Salesforce Task ID")
    escalation_type: str = Field(..., description="Type of escalation")
    priority: str = Field(..., description="Priority level (URGENT, HIGH, MEDIUM, LOW)")
    sla_deadline: str = Field(..., description="SLA deadline ISO 8601")
    status: str = Field(default="OPEN", description="Status (OPEN, IN_PROGRESS, RESOLVED, CLOSED)")
    assigned_queue: Optional[str] = Field(None, description="Queue assigned to")
    customer_id: Optional[str] = Field(None, description="Customer ID")
    journey_link: Optional[str] = Field(None, description="Link to journey details")
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    resolved_at: Optional[str] = Field(None, description="When escalation was resolved")

    class Config:
        json_schema_extra = {
            "example": {
                "contact_id": "abc123",
                "escalation_id": "esc-001",
                "escalation_type": "PAYMENT_FAILURE",
                "priority": "HIGH",
                "sla_deadline": "2025-11-08T18:00:00Z",
                "status": "OPEN",
                "assigned_queue": "billing-escalations"
            }
        }
