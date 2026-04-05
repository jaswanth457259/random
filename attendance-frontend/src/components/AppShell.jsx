const navigationItems = [
  { id: "dashboard", label: "Overview" },
  { id: "students", label: "Students" },
  { id: "subjects", label: "Subjects" },
  { id: "attendance", label: "Attendance" },
  { id: "reports", label: "Reports" }
];

export default function AppShell({
  activeView,
  children,
  onLogout,
  onNavigate,
  role,
  username
}) {
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div className="brand-block">
          <span className="brand-kicker">Attendance System</span>
          <h1>Frontend Console</h1>
          <p>Built with shared variable names so API integration stays predictable.</p>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${activeView === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="profile-card">
          <div>
            <span className="label">Signed in as</span>
            <strong>{username || "User"}</strong>
          </div>
          <span className="role-badge">{role}</span>
          <button type="button" className="secondary-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="workspace">{children}</main>
    </div>
  );
}
