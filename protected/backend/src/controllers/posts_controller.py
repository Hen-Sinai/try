from fastapi import (
    APIRouter,
)
from services.posts_service import (
    fetch_posts,
)

router = APIRouter()


@router.get("/")
async def get_posts():
    return await fetch_posts()
