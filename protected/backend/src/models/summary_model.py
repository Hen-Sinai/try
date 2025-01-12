from typing import (
    List,
)

from pydantic import (
    BaseModel,
)


class TopUser(BaseModel):
    userId: int
    unique_words: int


class TopWord(BaseModel):
    word: str
    count: int


class SummaryModel(BaseModel):
    top_users: List[TopUser]
    top_words: List[TopWord]
