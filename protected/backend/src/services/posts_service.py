from typing import (
    List,
)

import requests
from models.post_model import (
    Post,
)

API_URL = "https://jsonplaceholder.typicode.com/posts"


async def fetch_posts() -> List[Post]:
    response = requests.get(API_URL)
    response.raise_for_status()
    return [Post(**post) for post in response.json()]
