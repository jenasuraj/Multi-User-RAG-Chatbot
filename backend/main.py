from fastapi import FastAPI
from routes.GraphRouter import router as graph_router
from routes.Auth import router as auth_router
from routes.UploadRouter import router as upload_router
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware


origins = ["http://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(graph_router, prefix="/graph")
app.include_router(auth_router, prefix="/auth")
app.include_router(upload_router, prefix="/upload")