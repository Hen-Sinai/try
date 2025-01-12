from collections import (
    Counter,
    defaultdict,
)

from models.summary_model import (
    SummaryModel,
    TopUser,
    TopWord,
)
from services.posts_service import (
    fetch_posts,
)


async def generate_summary() -> SummaryModel:
    posts = await fetch_posts()
    unique_word_counts = defaultdict(int)
    word_frequencies = Counter()

    for post in posts:
        words = set(post.title.split())
        unique_word_counts[post.userId] += len(words)
        word_frequencies.update(words)

    top_users = sorted(unique_word_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    top_words = word_frequencies.most_common(10)

    top_user_models = [TopUser(userId=user, unique_words=count) for user, count in top_users]
    top_word_models = [TopWord(word=word, count=count) for word, count in top_words]

    return SummaryModel(top_users=top_user_models, top_words=top_word_models)
