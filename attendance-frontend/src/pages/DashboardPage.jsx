import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { API_BASE_URL } from "../api/client";
import Panel from "../components/Panel";
import StatTile from "../components/StatTile";

export default function DashboardPage({ onNavigate, session }) {
  const [profile, setProfile] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        const response = await getProfile(session.token);
        if (!ignore) {
          setProfile(response);
        }
      } catch (error) {
        if (!ignore) {
          setFeedback(error.message);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [session.token]);

  return (
    <div className="page-stack">
      <Panel
        title="Frontend handoff-friendly dashboard"
        description="This scaffold keeps your API payload keys consistent with the backend contract and gives each module its own focused workspace."
        actions={
          <button
            type="button"
            className="primary-button"
            onClick={() => onNavigate("attendance")}
          >
            Mark attendance
          </button>
        }
      >
        <div className="stats-grid">
          <StatTile label="Signed in role" value={session.role} tone="teal" />
          <StatTile label="Current userId" value={session.userId} tone="gold" />
          <StatTile label="API base URL" value={API_BASE_URL} tone="rose" />
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <span className="label">Profile check</span>
            <h3>Protected route status</h3>
            <p>
              {profile
                ? "Profile endpoint responded successfully."
                : feedback || "Login first, then connect your backend to confirm /api/auth/profile."}
            </p>
          </div>

          <div className="dashboard-card">
            <span className="label">Frontend rules</span>
            <h3>Use the same names everywhere</h3>
            <ul className="inline-list">
              <li>`username` not `name`</li>
              <li>`studentId` not `student_id`</li>
              <li>`status` must be `PRESENT` or `ABSENT`</li>
            </ul>
          </div>
        </div>
      </Panel>

      <Panel
        title="Backend endpoints this UI expects"
        description="These are the exact routes wired in the API layer."
      >
        <div className="endpoint-grid">
          <code>POST /api/auth/register</code>
          <code>POST /api/auth/login</code>
          <code>GET /api/auth/profile</code>
          <code>POST /api/students</code>
          <code>GET /api/students</code>
          <code>POST /api/subjects</code>
          <code>GET /api/subjects</code>
          <code>POST /api/attendance/mark</code>
          <code>POST /api/attendance/bulk</code>
          <code>GET /api/attendance/student/{"{studentId}"}</code>
          <code>GET /api/attendance/class/{"{classId}"}</code>
        </div>
      </Panel>
    </div>
  );
}
