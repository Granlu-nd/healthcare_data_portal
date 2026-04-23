import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const linkBase = "text-sm font-medium transition";
  const activeLink = "text-slate-900";
  const inactiveLink = "text-slate-500 hover:text-slate-900";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900">
          MedStream FHIR Portal
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            Upload
          </NavLink>

          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            API Docs
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;