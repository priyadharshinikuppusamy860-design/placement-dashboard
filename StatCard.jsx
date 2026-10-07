export default function StatCard({ label, value }) {
  return <div className="stat"><div className="stat-value">{value}</div><div className="muted">{label}</div></div>;
}
