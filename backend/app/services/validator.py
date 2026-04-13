from datetime import datetime


ALLOWED_GENDERS = {"male", "female", "other", "unknown"}
ALLOWED_OBSERVATION_TYPES = {"body_weight", "glucose"}


def validate_row(row):
    errors = []

    patient_id = str(row.get("patient_id", "")).strip()
    first_name = str(row.get("first_name", "")).strip()
    last_name = str(row.get("last_name", "")).strip()
    birth_date = str(row.get("birth_date", "")).strip()
    gender = str(row.get("gender", "")).strip().lower()
    observation_type = str(row.get("observation_type", "")).strip().lower()
    value = row.get("value", "")
    unit = str(row.get("unit", "")).strip()
    effective_datetime = str(row.get("effective_datetime", "")).strip()

    if not patient_id:
        errors.append("Missing patient_id")

    if not first_name:
        errors.append("Missing first_name")

    if not last_name:
        errors.append("Missing last_name")

    if not birth_date:
        errors.append("Missing birth_date")
    else:
        try:
            datetime.strptime(birth_date, "%Y-%m-%d")
        except ValueError:
            errors.append("Invalid birth_date format, expected YYYY-MM-DD")

    if not gender:
        errors.append("Missing gender")
    elif gender not in ALLOWED_GENDERS:
        errors.append(f"Invalid gender: {gender}")

    if not observation_type:
        errors.append("Missing observation_type")
    elif observation_type not in ALLOWED_OBSERVATION_TYPES:
        errors.append(f"Unsupported observation_type: {observation_type}")

    if value == "" or value is None:
        errors.append("Missing value")
    else:
        try:
            float(value)
        except (TypeError, ValueError):
            errors.append("Value must be numeric")

    if not unit:
        errors.append("Missing unit")

    if not effective_datetime:
        errors.append("Missing effective_datetime")
    else:
        try:
            datetime.fromisoformat(effective_datetime)
        except ValueError:
            errors.append("Invalid effective_datetime format, expected ISO datetime")

    return errors