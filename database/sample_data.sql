USE attendance_system;

INSERT INTO users (username, email, password, role)
VALUES ('username','user@gmail.com','123456','STUDENT');

INSERT INTO classes (class_name)
VALUES ('CSE-A');

INSERT INTO students (user_id, class_id)
VALUES (1,1);

INSERT INTO subjects (subject_name, faculty_id)
VALUES ('Math',1);

INSERT INTO attendance (student_id, subject_id, date, status)
VALUES (1,1,'2026-04-05','PRESENT');