import { usePlacement } from "../context/PlacementContext";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import BarChart from "../components/BarChart";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { user } = useAuth();
  const { jobs, applications, trends, loading, error } = usePlacement();
  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  const count = (s) => applications.filter((a) => a.status === s).length;
  const statusData = ["Applied", "Interview", "Selected", "Rejected"].map((s) => ({ label: s, value: count(s) }));
  const upcoming = [...jobs].sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 4);

  return (
    <main>
      <h2>Welcome, {user.name} 👋</h2>
      <div className="stats">
        <StatCard label="Open Jobs" value={jobs.length} />
        <StatCard label="Applications" value={applications.length} />
        <StatCard label="Interviews" value={count("Interview")} />
        <StatCard label="Selected" value={count("Selected")} />
      </div>
      <div className="two-col">
        <section className="panel"><h3>My Application Statistics</h3><BarChart data={statusData} /></section>
        <section className="panel"><h3>Placement Trends (% placed)</h3><BarChart data={trends} unit="%" /></section>
      </div>
      <section className="panel">
        <h3>Upcoming Deadlines</h3>
        <ul>{upcoming.map((j) => <li key={j.id}><strong>{j.company}</strong> – {j.role} <span className="muted">(by {j.deadline})</span></li>)}</ul>
      </section>
    </main>
  );
}
