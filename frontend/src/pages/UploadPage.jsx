import { useState } from "react";

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setError("");
      setUploadResult(null);

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Upload failed.");
      }

      setUploadResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Upload
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Upload source data
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Submit a CSV file to the MedStream ingestion pipeline. Valid rows will be
          transformed into FHIR resources, and invalid rows will be captured in the
          audit log.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Select CSV file
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700"
            />
          </div>

          {selectedFile && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Selected file
              </p>
              <p className="mt-1 text-sm text-slate-800">{selectedFile.name}</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">Upload error</p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        )}
      </section>

      <aside className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload summary
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Immediate processing feedback from the backend pipeline.
          </p>

          {!uploadResult && (
            <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              No upload processed yet.
            </div>
          )}

          {uploadResult && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Job ID
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {uploadResult.job_id}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Filename
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 break-all">
                  {uploadResult.filename}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Rows
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {uploadResult.total_rows}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Success Rows
                </p>
                <p className="mt-1 text-lg font-semibold text-emerald-600">
                  {uploadResult.success_rows}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Failed Rows
                </p>
                <p className="mt-1 text-lg font-semibold text-amber-600">
                  {uploadResult.failed_rows}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Pipeline scope
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>CSV upload through React frontend</li>
            <li>Validation and audit logging in FastAPI</li>
            <li>FHIR Patient and Observation generation</li>
            <li>Observation fact storage for analytics</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default UploadPage;