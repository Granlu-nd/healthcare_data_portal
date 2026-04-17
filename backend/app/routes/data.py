import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import AuditLog, FHIRResource, IngestionJob, ObservationFact

router = APIRouter()


@router.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(IngestionJob).order_by(IngestionJob.id.desc()).all()

    return [
        {
            "id": job.id,
            "filename": job.filename,
            "total_rows": job.total_rows,
            "success_rows": job.success_rows,
            "failed_rows": job.failed_rows,
            "status": job.status,
            "created_at": job.created_at,
        }
        for job in jobs
    ]


@router.get("/jobs/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(IngestionJob).filter(IngestionJob.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return {
        "id": job.id,
        "filename": job.filename,
        "total_rows": job.total_rows,
        "success_rows": job.success_rows,
        "failed_rows": job.failed_rows,
        "status": job.status,
        "created_at": job.created_at,
    }


@router.get("/audit-logs")
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.query(AuditLog).order_by(AuditLog.id.desc()).all()

    return [
        {
            "id": log.id,
            "job_id": log.job_id,
            "row_number": log.row_number,
            "source_data": json.loads(log.source_data),
            "error_message": log.error_message,
            "created_at": log.created_at,
        }
        for log in logs
    ]


@router.get("/resources")
def get_resources(db: Session = Depends(get_db)):
    resources = db.query(FHIRResource).order_by(FHIRResource.id.desc()).all()

    return [
        {
            "id": resource.id,
            "job_id": resource.job_id,
            "resource_type": resource.resource_type,
            "resource_id": resource.resource_id,
            "patient_id": resource.patient_id,
            "resource_json": json.loads(resource.resource_json),
            "created_at": resource.created_at,
        }
        for resource in resources
    ]


@router.get("/observation-facts")
def get_observation_facts(db: Session = Depends(get_db)):
    facts = db.query(ObservationFact).order_by(ObservationFact.id.desc()).all()

    return [
        {
            "id": fact.id,
            "job_id": fact.job_id,
            "patient_id": fact.patient_id,
            "observation_type": fact.observation_type,
            "value_num": float(fact.value_num),
            "unit": fact.unit,
            "effective_datetime": fact.effective_datetime,
            "created_at": fact.created_at,
        }
        for fact in facts
    ]