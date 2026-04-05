import { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import SubjectsPage from "./pages/SubjectsPage";
import AttendancePage from "./pages/AttendancePage";
import ReportsPage from "./pages/ReportsPage";

const SESSION_KEY = "attendance-system-session";

function readSession() {
  const rawValue = window.localStorage.getItem(SESSION_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export default function App() {
  const [session, setSession] = useState(() => readSession());
  const [activeView, setActiveView] = useState(() =>
    readSession() ? "dashboard" : "auth"
  );

  useEffect(() => {
    if (!session) {
      window.localStorage.removeItem(SESSION_KEY);
      setActiveView("auth");
      return;
    }

    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, [session]);

  function handleAuthenticated(nextSession) {
    setSession(nextSession);
    setActiveView("dashboard");
  }

  function handleLogout() {
    setSession(null);
  }

  if (!session) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  const views = {
    dashboard: (
      <DashboardPage
        session={session}
        onNavigate={setActiveView}
      />
    ),
    students: <StudentsPage token={session.token} />,
    subjects: <SubjectsPage token={session.token} />,
    attendance: <AttendancePage token={session.token} />,
    reports: <ReportsPage token={session.token} />
  };

  return (
    <AppShell
      activeView={activeView}
      onNavigate={setActiveView}
      onLogout={handleLogout}
      role={session.role}
      username={session.username}
    >
      {views[activeView] ?? views.dashboard}
    </AppShell>
  );
}
