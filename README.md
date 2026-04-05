# Attendance Management System

This repository now has a clean split between frontend and backend code.

## Project structure

```text
random/
  attendance-frontend/
  attendance-backend/
```

## Frontend

Location: `attendance-frontend`

- React + Vite application
- Authentication UI
- Students, subjects, attendance, and reports pages
- Uses standardized variables such as `username`, `studentId`, `subjectId`, `date`, and `status`

Frontend setup:

```bash
cd attendance-frontend
npm install
npm run dev
```

Frontend environment:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Backend

Location: `attendance-backend/attendance-management-system`

- Spring Boot application
- Maven project
- Attendance and auth APIs

Backend setup:

```bash
cd attendance-backend/attendance-management-system
mvn spring-boot:run
```

## Backend endpoints expected by the frontend

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/students`
- `GET /api/students`
- `POST /api/subjects`
- `GET /api/subjects`
- `POST /api/attendance/mark`
- `POST /api/attendance/bulk`
- `GET /api/attendance/student/{studentId}`
- `GET /api/attendance/class/{classId}`
