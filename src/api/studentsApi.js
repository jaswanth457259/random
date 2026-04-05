import { apiRequest } from "./client";

export function createStudent(payload, token) {
  return apiRequest("/api/students", {
    method: "POST",
    body: payload,
    token
  });
}

export function getStudents(token) {
  return apiRequest("/api/students", {
    token
  });
}
