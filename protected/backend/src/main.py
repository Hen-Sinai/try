from controllers import (
    anomalies_controller,
    posts_controller,
    summary_controller,
)
from fastapi import (
    FastAPI,
)
from starlette.middleware.cors import (
    CORSMiddleware,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(posts_controller.router, prefix="/posts", tags=["Posts"])
app.include_router(anomalies_controller.router, prefix="/anomalies", tags=["Anomalies"])
app.include_router(summary_controller.router, prefix="/summary", tags=["Summary"])
