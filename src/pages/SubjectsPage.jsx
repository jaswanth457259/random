import { useEffect, useState } from "react";
import { createSubject, getSubjects } from "../api/subjectsApi";
import Panel from "../components/Panel";

const initialSubjectForm = {
  subjectName: "",
  facultyId: ""
};

export default function SubjectsPage({ token }) {
  const [subjectForm, setSubjectForm] = useState(initialSubjectForm);
  const [subjects, setSubjects] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSubjects() {
    setLoading(true);
    setFeedback("");

    try {
      const response = await getSubjects(token);
      setSubjects(Array.isArray(response) ? response : []);
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjects();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    try {
      await createSubject(
        {
          subjectName: subjectForm.subjectName,
          facultyId: Number(subjectForm.facultyId)
        },
        token
      );
      setSubjectForm(initialSubjectForm);
      setFeedback("Subject created successfully.");
      loadSubjects();
    } catch (error) {
      setFeedback(error.message);
    }
  }

  return (
    <div className="page-stack">
      <Panel
        title="Subjects"
        description="Add subjects with the same backend property names used by your Java service."
        actions={
          <button type="button" className="secondary-button" onClick={loadSubjects}>
            Refresh
          </button>
        }
      >
        <form className="form-grid two-column" onSubmit={handleSubmit}>
          <label>
            <span>Subject Name</span>
            <input
              type="text"
              value={subjectForm.subjectName}
              onChange={(event) =>
                setSubjectForm((currentValue) => ({
                  ...currentValue,
                  subjectName: event.target.value
                }))
              }
              placeholder="Mathematics"
              required
            />
          </label>

          <label>
            <span>Faculty ID</span>
            <input
              type="number"
              value={subjectForm.facultyId}
              onChange={(event) =>
                setSubjectForm((currentValue) => ({
                  ...currentValue,
                  facultyId: event.target.value
                }))
              }
              placeholder="12"
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Create subject
          </button>
        </form>

        {feedback ? <p className="feedback-text">{feedback}</p> : null}
      </Panel>

      <Panel title="Subject list" description="Current data returned from `GET /api/subjects`.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>subjectId</th>
                <th>subjectName</th>
                <th>facultyId</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length === 0 ? (
                <tr>
                  <td colSpan="3">{loading ? "Loading..." : "No subjects found yet."}</td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject.subjectId ?? `${subject.subjectName}-${subject.facultyId}`}>
                    <td>{subject.subjectId ?? "-"}</td>
                    <td>{subject.subjectName ?? "-"}</td>
                    <td>{subject.facultyId ?? "-"}</td>
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
