import { useState } from "react";

function App() {
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
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          MedStream FHIR Portal
        </h1>
        <p className="text-slate-600 mb-8">
          Upload a healthcare CSV file for validation, transformation, and analytics.
        </p>

        <div className="border rounded-xl p-6 bg-slate-50">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select CSV File
          </label>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-700 mb-4"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-slate-800 text-white px-5 py-2 rounded-xl hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {selectedFile && !uploadResult && !error && (
          <div className="mt-6 text-sm text-slate-600">
            Selected file: <span className="font-medium">{selectedFile.name}</span>
          </div>
        )}

        {error && (
          <div className="mt-6 border border-red-200 bg-red-50 text-red-700 rounded-xl p-4">
            <p className="font-semibold mb-1">Upload Error</p>
            <p>{error}</p>
          </div>
        )}

        {uploadResult && (
          <div className="mt-6 border border-green-200 bg-green-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Upload Complete
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-slate-500">Filename</p>
                <p className="font-medium text-slate-800">{uploadResult.filename}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <p className="text-slate-500">Job ID</p>
                <p className="font-medium text-slate-800">{uploadResult.job_id}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <p className="text-slate-500">Total Rows</p>
                <p className="font-medium text-slate-800">{uploadResult.total_rows}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <p className="text-slate-500">Success Rows</p>
                <p className="font-medium text-slate-800">{uploadResult.success_rows}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border sm:col-span-2">
                <p className="text-slate-500">Failed Rows</p>
                <p className="font-medium text-slate-800">{uploadResult.failed_rows}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;