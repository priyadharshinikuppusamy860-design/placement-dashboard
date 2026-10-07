// Simulated backend. Replace these functions with fetch() calls to a real API later.
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const SEED_JOBS = [
  { id: 1, company: "TechNova", role: "Software Engineer", package: 8.5, location: "Bengaluru", type: "Full-time", deadline: "2026-11-15", minCgpa: 7.0 },
  { id: 2, company: "DataWave", role: "Data Analyst", package: 6.0, location: "Chennai", type: "Full-time", deadline: "2026-11-05", minCgpa: 6.5 },
  { id: 3, company: "CloudSphere", role: "DevOps Engineer", package: 9.0, location: "Hyderabad", type: "Full-time", deadline: "2026-11-20", minCgpa: 7.5 },
  { id: 4, company: "PixelCraft", role: "Frontend Developer Intern", package: 3.6, location: "Remote", type: "Internship", deadline: "2026-10-30", minCgpa: 6.0 },
  { id: 5, company: "FinEdge", role: "Backend Developer", package: 10.0, location: "Pune", type: "Full-time", deadline: "2026-12-01", minCgpa: 8.0 },
  { id: 6, company: "InnoSoft", role: "QA Engineer", package: 5.0, location: "Coimbatore", type: "Full-time", deadline: "2026-11-25", minCgpa: 6.0 },
];

const SEED_ANNOUNCEMENTS = [
  { id: 1, type: "Company Update", text: "TechNova will conduct an on-campus drive on 12 Nov.", date: "2026-10-05" },
  { id: 2, type: "Placement Announcement", text: "Resume submission closes on 31 Oct.", date: "2026-10-04" },
  { id: 3, type: "Company Update", text: "FinEdge added a new Backend Developer opening.", date: "2026-10-02" },
];

const TRENDS = [
  { label: "2021", value: 62 }, { label: "2022", value: 68 }, { label: "2023", value: 74 },
  { label: "2024", value: 79 }, { label: "2025", value: 83 },
];

export const api = {
  async register({ name, email, password, branch, cgpa }) {
    await delay();
    const users = load("pd_users", []);
    if (users.some((u) => u.email === email)) throw new Error("Email already registered.");
    const user = { id: Date.now(), name, email, password, branch, cgpa: Number(cgpa), skills: "" };
    save("pd_users", [...users, user]);
    const { password: _p, ...safe } = user;
    return safe;
  },
  async login({ email, password }) {
    await delay();
    const user = load("pd_users", []).find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password.");
    const { password: _p, ...safe } = user;
    return safe;
  },
  async updateProfile(id, data) {
    await delay(300);
    const users = load("pd_users", []).map((u) => (u.id === id ? { ...u, ...data, cgpa: Number(data.cgpa) } : u));
    save("pd_users", users);
    const { password: _p, ...safe } = users.find((u) => u.id === id);
    return safe;
  },
  async getJobs() { await delay(); return SEED_JOBS; },
  async getAnnouncements() { await delay(200); return SEED_ANNOUNCEMENTS; },
  async getTrends() { await delay(200); return TRENDS; },
  async getApplications(userId) { await delay(300); return load(`pd_apps_${userId}`, []); },
  async apply(userId, job) {
    await delay(300);
    const apps = load(`pd_apps_${userId}`, []);
    if (apps.some((a) => a.jobId === job.id)) throw new Error("You already applied to this job.");
    const app = { id: Date.now(), jobId: job.id, company: job.company, role: job.role, deadline: job.deadline,
      status: "Applied", appliedOn: new Date().toISOString().slice(0, 10),
      interview: job.id % 2 === 0 ? "2026-11-18 10:00 AM" : null };
    save(`pd_apps_${userId}`, [...apps, app]);
    return app;
  },
  async setStatus(userId, appId, status) {
    await delay(200);
    const apps = load(`pd_apps_${userId}`, []).map((a) => (a.id === appId ? { ...a, status } : a));
    save(`pd_apps_${userId}`, apps);
    return apps;
  },
};
