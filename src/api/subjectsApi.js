import { apiRequest } from "./client";

export function createSubject(payload, token) {
  return apiRequest("/api/subjects", {
    method: "POST",
    body: payload,
    token
  });
}

export function getSubjects(token) {
  return apiRequest("/api/subjects", {
    token
  });
}
