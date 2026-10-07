// Lightweight CSS bar chart (no chart library needed)
export default function BarChart({ data, unit = "" }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="chart">
      {data.map((d) => (
        <div className="bar-col" key={d.label}>
          <span className="bar-val">{d.value}{unit}</span>
          <div className="bar" style={{ height: `${(d.value / max) * 100}%` }} />
          <span className="bar-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
