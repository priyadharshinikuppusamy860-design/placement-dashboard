import { usePlacement } from "../context/PlacementContext";
import Loader from "../components/Loader";

export default function Notifications() {
  const { notifications, loading } = usePlacement();
  if (loading) return <Loader />;
  return (
    <main>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p className="muted">No notifications.</p>}
      <ul className="notif-list">
        {notifications.map((n) => (
          <li key={n.id} className="panel"><span className="tag">{n.kind}</span> {n.text}</li>
        ))}
      </ul>
    </main>
  );
}
