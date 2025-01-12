from typing import (
    List,
)

from pydantic import (
    BaseModel,
)


class Anomaly(BaseModel):
    userId: int
    id: int
    title: str
    reasons: List[str]
