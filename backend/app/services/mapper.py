OBSERVATION_MAPPINGS = {
    "body_weight": {
        "loinc_code": "29463-7",
        "display": "Body Weight",
        "category_code": "vital-signs",
        "category_display": "Vital Signs",
        "ucum_code": "kg",
    },
    "glucose": {
        "loinc_code": "2339-0",
        "display": "Glucose",
        "category_code": "laboratory",
        "category_display": "Laboratory",
        "ucum_code": "mg/dL",
    },
}


def map_patient_resource(row):
    patient_id = str(row["patient_id"]).strip()
    first_name = str(row["first_name"]).strip()
    last_name = str(row["last_name"]).strip()
    gender = str(row["gender"]).strip().lower()
    birth_date = str(row["birth_date"]).strip()

    return {
        "resourceType": "Patient",
        "id": patient_id,
        "identifier": [
            {
                "system": "http://medstream.local/patients",
                "value": patient_id,
            }
        ],
        "name": [
            {
                "family": last_name,
                "given": [first_name],
            }
        ],
        "gender": gender,
        "birthDate": birth_date,
    }


def map_observation_resource(row):
    patient_id = str(row["patient_id"]).strip()
    observation_type = str(row["observation_type"]).strip().lower()
    value = float(row["value"])
    unit = str(row["unit"]).strip()
    effective_datetime = str(row["effective_datetime"]).strip()

    mapping = OBSERVATION_MAPPINGS[observation_type]

    return {
        "resourceType": "Observation",
        "status": "final",
        "category": [
            {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/observation-category",
                        "code": mapping["category_code"],
                        "display": mapping["category_display"],
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://loinc.org",
                    "code": mapping["loinc_code"],
                    "display": mapping["display"],
                }
            ],
            "text": mapping["display"],
        },
        "subject": {
            "reference": f"Patient/{patient_id}",
        },
        "effectiveDateTime": effective_datetime,
        "valueQuantity": {
            "value": value,
            "unit": unit,
            "system": "http://unitsofmeasure.org",
            "code": mapping["ucum_code"],
        },
    }