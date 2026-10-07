import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../data/mockApi";
import { useAuth } from "./AuthContext";

const PlacementContext = createContext(null);
export const usePlacement = () => useContext(PlacementContext);

export function PlacementProvider({ children }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const [j, a, n, t] = await Promise.all([
        api.getJobs(), api.getApplications(user.id), api.getAnnouncements(), api.getTrends(),
      ]);
      setJobs(j); setApplications(a); setAnnouncements(n); setTrends(t);
    } catch (e) {
      setError(e.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const apply = async (job) => {
    const app = await api.apply(user.id, job);
    setApplications((prev) => [...prev, app]);
  };
  const setStatus = async (appId, status) => setApplications(await api.setStatus(user.id, appId, status));

  // Notifications are derived from applications + announcements
  const notifications = [
    ...applications.filter((a) => a.interview).map((a) => ({
      id: `i${a.id}`, kind: "Interview Alert", text: `Interview with ${a.company} on ${a.interview}` })),
    ...announcements.map((a) => ({ id: `a${a.id}`, kind: a.type, text: a.text })),
  ];

  return (
    <PlacementContext.Provider value={{ jobs, applications, announcements, trends, notifications, loading, error, apply, setStatus, refresh }}>
      {children}
    </PlacementContext.Provider>
  );
}
