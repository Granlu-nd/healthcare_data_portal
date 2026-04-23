import { Link } from "react-router-dom";

function HomePage() {
  const features = [
    {
      title: "CSV Ingestion",
      description:
        "Upload legacy healthcare source data through a simple portal interface.",
    },
    {
      title: "FHIR Transformation",
      description:
        "Transform valid source rows into FHIR Patient and Observation resources.",
    },
    {
      title: "Audit Logging",
      description:
        "Track failed rows and validation issues for data quality review.",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
            Healthcare Data Ingestion Portal
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            MedStream FHIR Portal
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            MedStream is a healthcare interoperability project that ingests source
            CSV data, validates records, transforms valid rows into FHIR resources,
            and stores analytics-ready observation data for downstream reporting.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/upload"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Go to Upload
            </Link>

            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              View API Docs
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">How it works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-slate-500">Step 1</p>
            <p className="mt-2 font-medium text-slate-900">Upload source data</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Submit a CSV file through the upload portal.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Step 2</p>
            <p className="mt-2 font-medium text-slate-900">Validate and process</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The backend validates rows and routes failed records into the audit log.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Step 3</p>
            <p className="mt-2 font-medium text-slate-900">Store outputs</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Valid records are transformed into FHIR resources and flattened for analytics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;