import Sidebar from "../components/Sidebar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ── Icons (inline SVG) ──────────────────────────────────────────────────────
const Icon = ({ d, color = "currentColor", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  resume: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  interview: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  roadmap: "M3 3h18v18H3z M3 9h18 M3 15h18 M9 3v18 M15 3v18",
  human: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  profile: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  trend: "M23 6l-9.5 9.5-5-5L1 18",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  code: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  play: "M5 3l14 9-14 9V3z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
};

// ── Color palette ───────────────────────────────────────────────────────────
const C = {
  primary: "#6C63FF",
  primaryDark: "#4B44D6",
  primaryLight: "#EEF0FF",
  bg: "#F4F5FF",
  sidebar: "#1A1D2E",
  sidebarHover: "#252842",
  white: "#FFFFFF",
  text: "#1A1D2E",
  muted: "#8B8FA8",
  green: "#22C55E",
  orange: "#F97316",
  teal: "#06B6D4",
  pink: "#EC4899",
  card: "#FFFFFF",
  border: "#E8EAFF",
};

// ── Data ────────────────────────────────────────────────────────────────────
const progressData = [
  { date: "May 1", ats: 28, interview: 15 },
  { date: "May 7", ats: 34, interview: 22 },
  { date: "May 14", ats: 40, interview: 30 },
  { date: "May 21", ats: 45, interview: 38 },
  { date: "May 28", ats: 50, interview: 44 },
  { date: "Jun 4", ats: 50, interview: 48 },
];

// ── Activities ──────────────────────────────────────────────────────────────
const activities = [
  { icon: "resume", label: "Resume Analyzed", sub: "ATS score improved", time: "2h ago", color: C.primary },
  { icon: "interview", label: "AI Mock Interview", sub: "Java Developer", time: "1d ago", color: C.green },
  { icon: "roadmap", label: "Roadmap Updated", sub: "Backend Developer", time: "2d ago", color: C.orange },
  { icon: "human", label: "Human Interview Booked", sub: "With SDE Expert", time: "3d ago", color: C.teal },
];

// ── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, iconPath, iconBg, trend }) {
  return (
    <div style={{
      background: C.white, borderRadius: 16, padding: "20px 24px",
      flex: 1, minWidth: 180, boxShadow: "0 2px 12px rgba(108,99,255,.08)",
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>{title}</span>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon d={iconPath} color={C.primary} size={18} />
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: C.text }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.green }}>
        <Icon d={icons.trend} color={C.green} size={13} />
        <span>{trend}</span>
      </div>
    </div>
  );
}

// ── Pages ───────────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stat cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard title="ATS Score" value="85 /100" trend="12% this week" iconPath={icons.resume} iconBg="#EEF0FF" />
        <StatCard title="Interviews Taken" value="12" trend="3 this week" iconPath={icons.interview} iconBg="#F0FFFE" />
        <StatCard title="Average Score" value="76%" trend="9% this week" iconPath={icons.award} iconBg="#FFF7ED" />
        <StatCard title="Roadmap Progress" value="60%" trend="15% this week" iconPath={icons.roadmap} iconBg="#F0FFFE" />
      </div>

      {/* Charts row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {/* Progress chart */}
        <div style={{ background: C.white, borderRadius: 16, padding: 24, flex: 2, minWidth: 320, boxShadow: "0 2px 12px rgba(108,99,255,.08)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: C.text }}>Your Progress Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="ats" name="ATS Score" stroke={C.primary} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="interview" name="Interview Score" stroke={C.teal} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div style={{ background: C.white, borderRadius: 16, padding: 24, flex: 1, minWidth: 260, boxShadow: "0 2px 12px rgba(108,99,255,.08)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: C.text }}>Recent Activities</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: a.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon d={icons[a.icon]} color={a.color} size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{a.label}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{a.sub}</div>
                </div>
                <span style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>{a.time}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <span style={{ color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View All</span>
          </div>
        </div>
      </div>

      {/* Recommended */}
      <div>
        <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: C.text }}>Recommended for You</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { icon: "resume", title: "Improve ATS Score", desc: "Optimize your resume for better results", btn: "Go", color: C.primary },
            { icon: "interview", title: "Practice Interview", desc: "Start a mock interview with AI", btn: "Start", color: C.teal },
            { icon: "roadmap", title: "Continue Roadmap", desc: "Become a full stack developer", btn: "Continue", color: C.orange },
          ].map((r, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 14, padding: "18px 20px", flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(108,99,255,.08)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: r.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={icons[r.icon]} color={r.color} size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.title}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{r.desc}</div>
              </div>
              <button style={{ background: "none", border: "none", color: r.color, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0 }}>{r.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Header copy ─────────────────────────────────────────────────────────────
const pageTitle = { title: "Welcome back, Ankit! 👋", sub: "Track your progress and keep improving." };

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const { title, sub } = pageTitle;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar />

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ background: C.white, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>{title}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{sub}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 24, padding: "8px 16px", cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${C.primary}, ${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={icons.profile} color="#fff" size={15} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Ankit Kumar</span>
            <Icon d="M6 9l6 6 6-6" color={C.muted} size={14} />
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: 28, flex: 1 }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
