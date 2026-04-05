import { useEffect, useState } from "react";
import { createStudent, getStudents } from "../api/studentsApi";
import Panel from "../components/Panel";

const initialStudentForm = {
  userId: "",
  classId: ""
};

export default function StudentsPage({ token }) {
  const [studentForm, setStudentForm] = useState(initialStudentForm);
  const [students, setStudents] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadStudents() {
    setLoading(true);
    setFeedback("");

    try {
      const response = await getStudents(token);
      setStudents(Array.isArray(response) ? response : []);
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    try {
      await createStudent(
        {
          userId: Number(studentForm.userId),
          classId: Number(studentForm.classId)
        },
        token
      );
      setStudentForm(initialStudentForm);
      setFeedback("Student created successfully.");
      loadStudents();
    } catch (error) {
      setFeedback(error.message);
    }
  }

  return (
    <div className="page-stack">
      <Panel
        title="Students"
        description="Create and list student records using `userId` and `classId`."
        actions={
          <button type="button" className="secondary-button" onClick={loadStudents}>
            Refresh
          </button>
        }
      >
        <form className="form-grid two-column" onSubmit={handleSubmit}>
          <label>
            <span>User ID</span>
            <input
              type="number"
              value={studentForm.userId}
              onChange={(event) =>
                setStudentForm((currentValue) => ({
                  ...currentValue,
                  userId: event.target.value
                }))
              }
              placeholder="1"
              required
            />
          </label>

          <label>
            <span>Class ID</span>
            <input
              type="number"
              value={studentForm.classId}
              onChange={(event) =>
                setStudentForm((currentValue) => ({
                  ...currentValue,
                  classId: event.target.value
                }))
              }
              placeholder="101"
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Create student
          </button>
        </form>

        {feedback ? <p className="feedback-text">{feedback}</p> : null}
      </Panel>

      <Panel title="Student list" description="Current data returned from `GET /api/students`.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>studentId</th>
                <th>userId</th>
                <th>classId</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="3">{loading ? "Loading..." : "No students found yet."}</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.studentId ?? `${student.userId}-${student.classId}`}>
                    <td>{student.studentId ?? "-"}</td>
                    <td>{student.userId ?? "-"}</td>
                    <td>{student.classId ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
