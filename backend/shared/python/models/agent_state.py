"""Agent State data model"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class AgentState(BaseModel):
    """Agent state tracking data model"""

    agent_id: str = Field(..., description="Agent ID")
    timestamp: str = Field(..., description="ISO 8601 timestamp")
    current_state: str = Field(..., description="Current agent state")
    previous_state: Optional[str] = Field(None, description="Previous agent state")
    state_start_time: str = Field(..., description="When the current state started")
    duration: int = Field(..., description="Duration in seconds")
    supervisor_id: Optional[str] = Field(None, description="Supervisor ID")
    alert_sent: bool = Field(False, description="Whether an alert was sent")
    contact_id: Optional[str] = Field(None, description="Contact ID if on call")
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    ttl: Optional[int] = Field(None, description="TTL for DynamoDB (30 days)")

    class Config:
        json_schema_extra = {
            "example": {
                "agent_id": "agent-001",
                "timestamp": "2025-11-08T10:00:00Z",
                "current_state": "ACW",
                "previous_state": "ON_CALL",
                "state_start_time": "2025-11-08T09:55:00Z",
                "duration": 300,
                "alert_sent": False
            }
        }
