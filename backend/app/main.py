from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import Base, engine
from app.routes.data import router as data_router
from app.routes.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MedStream FHIR Portal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(data_router)


@app.get("/")
def root():
    return {"message": "MedStream backend is running"}