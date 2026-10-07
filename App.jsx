import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

export default function App() {
  const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;
  return (
    <>
      <Navbar />
      <div className="page">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={guard(<Dashboard />)} />
          <Route path="/jobs" element={guard(<Jobs />)} />
          <Route path="/applications" element={guard(<Applications />)} />
          <Route path="/notifications" element={guard(<Notifications />)} />
          <Route path="/profile" element={guard(<Profile />)} />
          <Route path="*" element={<p className="error">Page not found.</p>} />
        </Routes>
      </div>
    </>
  );
}
