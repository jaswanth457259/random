import { useState } from "react";
import {
  getClassAttendance,
  getStudentAttendance
} from "../api/attendanceApi";
import Panel from "../components/Panel";

export default function ReportsPage({ token }) {
  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const [classResults, setClassResults] = useState([]);
  const [feedback, setFeedback] = useState("");

  async function loadStudentReport() {
    setFeedback("");

    try {
      const response = await getStudentAttendance(studentId, token);
      setStudentResults(Array.isArray(response) ? response : [response]);
    } catch (error) {
      setFeedback(error.message);
    }
  }

  async function loadClassReport() {
    setFeedback("");

    try {
      const response = await getClassAttendance(classId, token);
      setClassResults(Array.isArray(response) ? response : [response]);
    } catch (error) {
      setFeedback(error.message);
    }
  }

  return (
    <div className="page-stack">
      <Panel
        title="Reports and analytics"
        description="Fetch student-wise and class-wise attendance using the final endpoint contract."
      >
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <span className="label">Student-wise attendance</span>
            <div className="inline-form">
              <input
                type="number"
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
                placeholder="studentId"
              />
              <button
                type="button"
                className="primary-button"
                onClick={loadStudentReport}
                disabled={!studentId}
              >
                Load
              </button>
            </div>
          </div>

          <div className="dashboard-card">
            <span className="label">Class-wise attendance</span>
            <div className="inline-form">
              <input
                type="number"
                value={classId}
                onChange={(event) => setClassId(event.target.value)}
                placeholder="classId"
              />
              <button
                type="button"
                className="primary-button"
                onClick={loadClassReport}
                disabled={!classId}
              >
                Load
              </button>
            </div>
          </div>
        </div>

        {feedback ? <p className="feedback-text">{feedback}</p> : null}
      </Panel>

      <Panel title="Student report response">
        <pre className="json-block">
          {studentResults.length > 0
            ? JSON.stringify(studentResults, null, 2)
            : "No student report loaded yet."}
        </pre>
      </Panel>

      <Panel title="Class report response">
        <pre className="json-block">
          {classResults.length > 0
            ? JSON.stringify(classResults, null, 2)
            : "No class report loaded yet."}
        </pre>
      </Panel>
    </div>
  );
}
