from fastapi import FastAPI

from app.db import Base, engine
from app.routes.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MedStream FHIR Portal API")

app.include_router(upload_router)


@app.get("/")
def root():
    return {"message": "MedStream backend is running"}