import io

import pandas as pd
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import IngestionJob

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported right now.")

    contents = await file.read()

    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV: {str(e)}")

    job = IngestionJob(
        filename=file.filename,
        total_rows=len(df),
        success_rows=0,
        failed_rows=0,
        status="uploaded"
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    preview = df.head(5).fillna("").to_dict(orient="records")

    return {
        "message": "File uploaded successfully",
        "job_id": job.id,
        "filename": job.filename,
        "total_rows": len(df),
        "columns": list(df.columns),
        "preview": preview
    }