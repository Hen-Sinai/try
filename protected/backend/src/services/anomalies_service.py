from collections import (
    defaultdict,
)
from typing import (
    List,
)

from models.anomaly_model import (
    Anomaly,
)
from models.post_model import (
    Post,
)
from services.posts_service import (
    fetch_posts,
)


async def detect_anomalies() -> List[Anomaly]:
    posts = await fetch_posts()
    anomalies = []
    user_titles = defaultdict(list)

    for post in posts:
        user_titles[post.userId].append(post.title)

    for post in posts:
        reasons = []
        if len(post.title) < 15:
            reasons.append("Title shorter than 15 characters")
        if user_titles[post.userId].count(post.title) > 1:
            reasons.append("Duplicate title by the same user")
        if len([t for t in user_titles[post.userId] if post.title in t]) > 5:
            reasons.append("User has more than 5 similar titles")

        if reasons:
            anomalies.append(Anomaly(userId=post.userId, id=post.id, title=post.title, reasons=reasons))

    return anomalies
