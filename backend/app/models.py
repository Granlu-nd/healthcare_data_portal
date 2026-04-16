from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.db import Base


class IngestionJob(Base):
    __tablename__ = "ingestion_jobs"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    total_rows = Column(Integer, default=0)
    success_rows = Column(Integer, default=0)
    failed_rows = Column(Integer, default=0)
    status = Column(String, default="uploaded")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class AuditLog(Base):
    __tablename__ = "audit_log"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, nullable=False)
    row_number = Column(Integer, nullable=False)
    source_data = Column(Text, nullable=False)
    error_message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class FHIRResource(Base):
    __tablename__ = "fhir_resources"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, nullable=False)
    resource_type = Column(String, nullable=False)
    resource_id = Column(String, nullable=False)
    patient_id = Column(String, nullable=False)
    resource_json = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())