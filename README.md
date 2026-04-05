# Attendance Frontend

A React + Vite frontend scaffold for the attendance system defined in the project contract.

## What is included

- Authentication screens for `register` and `login`
- Dashboard with session summary and API contract reminders
- Students screen using `userId` and `classId`
- Subjects screen using `subjectName` and `facultyId`
- Attendance screen for single and bulk attendance entry
- Reports screen for student-wise and class-wise attendance lookups
- Shared API client wired to the backend endpoints

## Standard variables used

- `username`
- `studentId`
- `subjectId`
- `date`
- `status`

## API base URL

Create a `.env` file from `.env.example` and set:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Run locally

```bash
npm install
npm run dev
```

## Backend endpoints expected

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
