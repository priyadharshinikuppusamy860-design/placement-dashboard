import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePlacement } from "../context/PlacementContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications } = usePlacement();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <nav className="navbar">
      <strong className="brand">🎓 PlacementHub</strong>
      <div className="links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/applications">Applications</NavLink>
        <NavLink to="/notifications">Alerts ({notifications.length})</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
      </div>
    </nav>
  );
}
