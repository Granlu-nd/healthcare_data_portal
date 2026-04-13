import io
import json

import pandas as pd
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import AuditLog, IngestionJob
from app.services.validator import validate_row

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
        status="processing"
    )
    db.add(job)
    db.commit()
    db.refresh(job)

    success_count = 0
    failed_count = 0

    for index, row in df.iterrows():
        row_data = row.fillna("").to_dict()
        errors = validate_row(row_data)

        if errors:
            failed_count += 1

            audit_entry = AuditLog(
                job_id=job.id,
                row_number=index + 2,
                source_data=json.dumps(row_data),
                error_message="; ".join(errors)
            )
            db.add(audit_entry)
        else:
            success_count += 1

    job.success_rows = success_count
    job.failed_rows = failed_count
    job.status = "completed"

    db.commit()

    return {
        "message": "File processed successfully",
        "job_id": job.id,
        "filename": job.filename,
        "total_rows": job.total_rows,
        "success_rows": job.success_rows,
        "failed_rows": job.failed_rows,
    }