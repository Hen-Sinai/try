from fastapi import (
    APIRouter,
)
from services.summary_service import (
    generate_summary,
)

router = APIRouter()


@router.get("/")
async def get_summary():
    return await generate_summary()
