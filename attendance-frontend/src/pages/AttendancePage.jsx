import { useState } from "react";
import { bulkAttendance, markAttendance } from "../api/attendanceApi";
import Panel from "../components/Panel";

const initialAttendanceForm = {
  studentId: "",
  subjectId: "",
  date: new Date().toISOString().slice(0, 10),
  status: "PRESENT"
};

function createBulkRow() {
  return {
    studentId: "",
    status: "PRESENT"
  };
}

export default function AttendancePage({ token }) {
  const [attendanceForm, setAttendanceForm] = useState(initialAttendanceForm);
  const [bulkForm, setBulkForm] = useState({
    subjectId: "",
    date: new Date().toISOString().slice(0, 10),
    attendanceList: [createBulkRow()]
  });
  const [feedback, setFeedback] = useState("");
  const [bulkFeedback, setBulkFeedback] = useState("");

  async function handleAttendanceSubmit(event) {
    event.preventDefault();
    setFeedback("");

    try {
      await markAttendance(
        {
          studentId: Number(attendanceForm.studentId),
          subjectId: Number(attendanceForm.subjectId),
          date: attendanceForm.date,
          status: attendanceForm.status
        },
        token
      );
      setAttendanceForm(initialAttendanceForm);
      setFeedback("Attendance marked successfully.");
    } catch (error) {
      setFeedback(error.message);
    }
  }

  async function handleBulkSubmit(event) {
    event.preventDefault();
    setBulkFeedback("");

    try {
      await bulkAttendance(
        {
          subjectId: Number(bulkForm.subjectId),
          date: bulkForm.date,
          attendanceList: bulkForm.attendanceList.map((attendanceItem) => ({
            studentId: Number(attendanceItem.studentId),
            status: attendanceItem.status
          }))
        },
        token
      );
      setBulkForm({
        subjectId: "",
        date: new Date().toISOString().slice(0, 10),
        attendanceList: [createBulkRow()]
      });
      setBulkFeedback("Bulk attendance submitted successfully.");
    } catch (error) {
      setBulkFeedback(error.message);
    }
  }

  function updateBulkRow(index, fieldName, fieldValue) {
    setBulkForm((currentValue) => ({
      ...currentValue,
      attendanceList: currentValue.attendanceList.map((attendanceItem, itemIndex) =>
        itemIndex === index
          ? {
              ...attendanceItem,
              [fieldName]: fieldValue
            }
          : attendanceItem
      )
    }));
  }

  function addBulkRow() {
    setBulkForm((currentValue) => ({
      ...currentValue,
      attendanceList: [...currentValue.attendanceList, createBulkRow()]
    }));
  }

  function removeBulkRow(index) {
    setBulkForm((currentValue) => ({
      ...currentValue,
      attendanceList:
        currentValue.attendanceList.length === 1
          ? [createBulkRow()]
          : currentValue.attendanceList.filter((_, itemIndex) => itemIndex !== index)
    }));
  }

  return (
    <div className="page-stack">
      <Panel
        title="Mark single attendance"
        description="This payload maps directly to `POST /api/attendance/mark`."
      >
        <form className="form-grid two-column" onSubmit={handleAttendanceSubmit}>
          <label>
            <span>Student ID</span>
            <input
              type="number"
              value={attendanceForm.studentId}
              onChange={(event) =>
                setAttendanceForm((currentValue) => ({
                  ...currentValue,
                  studentId: event.target.value
                }))
              }
              placeholder="1"
              required
            />
          </label>

          <label>
            <span>Subject ID</span>
            <input
              type="number"
              value={attendanceForm.subjectId}
              onChange={(event) =>
                setAttendanceForm((currentValue) => ({
                  ...currentValue,
                  subjectId: event.target.value
                }))
              }
              placeholder="2"
              required
            />
          </label>

          <label>
            <span>Date</span>
            <input
              type="date"
              value={attendanceForm.date}
              onChange={(event) =>
                setAttendanceForm((currentValue) => ({
                  ...currentValue,
                  date: event.target.value
                }))
              }
              required
            />
          </label>

          <label>
            <span>Status</span>
            <select
              value={attendanceForm.status}
              onChange={(event) =>
                setAttendanceForm((currentValue) => ({
                  ...currentValue,
                  status: event.target.value
                }))
              }
            >
              <option value="PRESENT">PRESENT</option>
              <option value="ABSENT">ABSENT</option>
            </select>
          </label>

          <button type="submit" className="primary-button">
            Submit attendance
          </button>
        </form>

        {feedback ? <p className="feedback-text">{feedback}</p> : null}
      </Panel>

      <Panel
        title="Bulk attendance"
        description="Use the same request contract defined for `attendanceList`."
        actions={
          <button type="button" className="secondary-button" onClick={addBulkRow}>
            Add row
          </button>
        }
      >
        <form className="form-grid" onSubmit={handleBulkSubmit}>
          <div className="form-grid two-column">
            <label>
              <span>Subject ID</span>
              <input
                type="number"
                value={bulkForm.subjectId}
                onChange={(event) =>
                  setBulkForm((currentValue) => ({
                    ...currentValue,
                    subjectId: event.target.value
                  }))
                }
                placeholder="2"
                required
              />
            </label>

            <label>
              <span>Date</span>
              <input
                type="date"
                value={bulkForm.date}
                onChange={(event) =>
                  setBulkForm((currentValue) => ({
                    ...currentValue,
                    date: event.target.value
                  }))
                }
                required
              />
            </label>
          </div>

          <div className="bulk-list">
            {bulkForm.attendanceList.map((attendanceItem, index) => (
              <div key={`${index}-${attendanceItem.studentId}`} className="bulk-row">
                <label>
                  <span>Student ID</span>
                  <input
                    type="number"
                    value={attendanceItem.studentId}
                    onChange={(event) =>
                      updateBulkRow(index, "studentId", event.target.value)
                    }
                    placeholder="1"
                    required
                  />
                </label>

                <label>
                  <span>Status</span>
                  <select
                    value={attendanceItem.status}
                    onChange={(event) =>
                      updateBulkRow(index, "status", event.target.value)
                    }
                  >
                    <option value="PRESENT">PRESENT</option>
                    <option value="ABSENT">ABSENT</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => removeBulkRow(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="primary-button">
            Submit bulk attendance
          </button>
        </form>

        {bulkFeedback ? <p className="feedback-text">{bulkFeedback}</p> : null}
      </Panel>
    </div>
  );
}
