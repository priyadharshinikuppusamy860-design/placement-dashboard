import { useMemo, useState } from "react";
import { usePlacement } from "../context/PlacementContext";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Jobs() {
  const { user } = useAuth();
  const { jobs, applications, apply, loading, error } = usePlacement();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => jobs.filter((j) =>
    (type === "All" || j.type === type) &&
    `${j.company} ${j.role} ${j.location}`.toLowerCase().includes(search.toLowerCase())
  ), [jobs, search, type]);

  const handleApply = async (job) => {
    try { await apply(job); setMsg(`Applied to ${job.company}!`); }
    catch (e) { setMsg(e.message); }
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  return (
    <main>
      <h2>Job Openings</h2>
      <div className="toolbar">
        <input placeholder="Search company, role, location..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>All</option><option>Full-time</option><option>Internship</option>
        </select>
      </div>
      {msg && <p className="notice">{msg}</p>}
      <div className="grid">
        {filtered.map((j) => {
          const applied = applications.some((a) => a.jobId === j.id);
          const eligible = user.cgpa >= j.minCgpa;
          return (
            <article className="panel" key={j.id}>
              <h3>{j.role}</h3>
              <p><strong>{j.company}</strong> · {j.location}</p>
              <p>{j.type} · ₹{j.package} LPA</p>
              <p className="muted">Min CGPA {j.minCgpa} · Deadline {j.deadline}</p>
              <button disabled={applied || !eligible} onClick={() => handleApply(j)}>
                {applied ? "Applied ✓" : eligible ? "Apply" : "Not eligible"}
              </button>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="muted">No matching jobs.</p>}
    </main>
  );
}
