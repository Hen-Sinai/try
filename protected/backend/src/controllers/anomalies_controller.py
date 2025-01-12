from fastapi import (
    APIRouter,
)
from services.anomalies_service import (
    detect_anomalies,
)

router = APIRouter()


@router.get("/")
async def get_anomalies():
    return await detect_anomalies()
