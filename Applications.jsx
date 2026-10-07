import { usePlacement } from "../context/PlacementContext";
import Loader from "../components/Loader";

const STATUSES = ["Applied", "Interview", "Selected", "Rejected"];

export default function Applications() {
  const { applications, setStatus, loading } = usePlacement();
  if (loading) return <Loader />;
  return (
    <main>
      <h2>My Applications</h2>
      {applications.length === 0 ? <p className="muted">You haven't applied to any jobs yet.</p> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Company</th><th>Role</th><th>Applied</th><th>Interview</th><th>Status</th></tr></thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id}>
                  <td>{a.company}</td><td>{a.role}</td><td>{a.appliedOn}</td>
                  <td>{a.interview || "—"}</td>
                  <td>
                    <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted">Status is editable here for demo purposes (a real system would be updated by the placement cell).</p>
    </main>
  );
}
