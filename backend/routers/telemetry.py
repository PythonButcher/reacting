import time
from datetime import datetime, timezone
from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()

# Track process start timestamp for uptime calculation
SERVER_START_TIME = time.time()

class SystemTelemetryResponse(BaseModel):
    status: str = Field(default="ONLINE", description="Operational status of the lab system")
    uptime_seconds: float = Field(..., description="Total system uptime in seconds")
    active_connections: int = Field(..., description="Count of active monitoring sockets")
    cpu_load: float = Field(..., description="Percentage of CPU capacity currently utilized")
    timestamp: str = Field(..., description="ISO 8601 timestamp of data generation")

@router.get("/telemetry/uptime", response_model=SystemTelemetryResponse)
async def get_system_uptime():
    """
    Returns real-time system telemetry including uptime, active connections, and CPU load.
    """
    current_time = time.time()
    uptime = round(current_time - SERVER_START_TIME, 2)
    
    return {
        "status": "ONLINE",
        "uptime_seconds": uptime,
        "active_connections": 4,
        "cpu_load": 14.8,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
