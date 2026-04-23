import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Database,
  FileText,
  Lock,
  RefreshCw,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react'

function App() {
  const stats = [
    { label: 'FHIR Resources', value: '12,480', icon: Database },
    { label: 'Active Patients', value: '3,204', icon: Users },
    { label: 'Secure Uploads', value: '98.7%', icon: Upload },
    { label: 'System Status', value: 'Healthy', icon: CheckCircle2 },
  ]

  const workflow = [
    {
      title: 'Upload Clinical Data',
      description:
        'Import NDJSON, JSON bundles, CCDAs, or mapped source files into the portal.',
      icon: Upload,
    },
    {
      title: 'Validate FHIR Structure',
      description:
        'Run schema and profile validation to catch issues before processing.',
      icon: ShieldCheck,
    },
    {
      title: 'Sync to Backend',
      description:
        'Send approved resources to your FastAPI service for storage and workflow automation.',
      icon: RefreshCw,
    },
  ]

  const securityItems = [
    'HIPAA-aware workflow design',
    'Role-based access patterns',
    'Audit-friendly event tracking',
    'Encrypted clinical data handling',
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              <Activity className="h-4 w-4" />
              Connected Healthcare Interoperability Platform
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              MedStream FHIR Portal
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
              Securely ingest, validate, and manage medical data across modern
              healthcare systems using FHIR-first workflows, real-time status
              monitoring, and backend-ready integration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[420px]">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-cyan-950/20"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-emerald-500/10 p-6 shadow-2xl shadow-cyan-950/20">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live Integration Ready
                </span>
                <span className="rounded-full bg-slate-700/70 px-3 py-1 text-xs font-medium text-slate-300">
                  React + Vite + Tailwind
                </span>
                <span className="rounded-full bg-slate-700/70 px-3 py-1 text-xs font-medium text-slate-300">
                  FastAPI Backend Target
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h2 className="text-2xl font-semibold text-white md:text-3xl">
                    Build a secure pipeline for clinical uploads and FHIR processing
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                    This portal is designed for healthcare teams managing patient,
                    encounter, observation, and document resources. Use it as the
                    entry point for validated uploads, interoperability checks,
                    and downstream backend orchestration.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                      <Upload className="h-4 w-4" />
                      Start Upload
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                      <FileText className="h-4 w-4" />
                      View API Docs
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-emerald-300" />
                    <h3 className="text-sm font-semibold text-white">
                      Security & Compliance Focus
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {securityItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {workflow.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Quick Upload</h3>
              <p className="mt-2 text-sm text-slate-400">
                Prepare the frontend flow for secure file intake and backend
                submission.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Dataset Name
                  </label>
                  <input
                    type="text"
                    placeholder="Patient batch - March"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none ring-0 transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Resource Type
                  </label>
                  <select className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400">
                    <option>Bundle</option>
                    <option>Patient</option>
                    <option>Observation</option>
                    <option>Encounter</option>
                    <option>DocumentReference</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Upload File
                  </label>
                  <div className="rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-400/5 p-6 text-center">
                    <Upload className="mx-auto h-6 w-6 text-cyan-300" />
                    <p className="mt-3 text-sm font-medium text-white">
                      Drag and drop medical data files
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Supports JSON, NDJSON, CSV mapping inputs
                    </p>
                  </div>
                </div>

                <button className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                  Upload to Pipeline
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Next Development Step</h3>
              <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                <p className="text-sm leading-6 text-amber-100">
                  Connect this upload panel to your FastAPI backend using a multipart
                  file endpoint, then display validation results, processing status,
                  and submission history in the dashboard.
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default App