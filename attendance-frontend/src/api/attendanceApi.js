import { apiRequest } from "./client";

export function markAttendance(payload, token) {
  return apiRequest("/api/attendance/mark", {
    method: "POST",
    body: payload,
    token
  });
}

export function bulkAttendance(payload, token) {
  return apiRequest("/api/attendance/bulk", {
    method: "POST",
    body: payload,
    token
  });
}

export function getStudentAttendance(studentId, token) {
  return apiRequest(`/api/attendance/student/${studentId}`, {
    token
  });
}

export function getClassAttendance(classId, token) {
  return apiRequest(`/api/attendance/class/${classId}`, {
    token
  });
}
