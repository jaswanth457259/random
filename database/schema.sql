-- Create Database
CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','FACULTY','STUDENT') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
    class_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    class_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE SET NULL
);

CREATE TABLE subjects (
    subject_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    faculty_id BIGINT,
    FOREIGN KEY (faculty_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE attendance (
    attendance_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    date DATE NOT NULL,
    status ENUM('PRESENT','ABSENT') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE,
    UNIQUE(student_id, subject_id, date)
);