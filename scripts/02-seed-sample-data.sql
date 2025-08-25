-- Sample data for College Management System
-- This script populates the database with sample data for testing

-- Insert Departments
INSERT INTO departments (name, code, description) VALUES
('Computer Science', 'CS', 'Department of Computer Science and Engineering'),
('Mathematics', 'MATH', 'Department of Mathematics and Statistics'),
('Physics', 'PHYS', 'Department of Physics and Astronomy'),
('English', 'ENG', 'Department of English Literature and Writing'),
('Business', 'BUS', 'School of Business Administration');

-- Insert sample semester
INSERT INTO semesters (name, year, start_date, end_date, is_current) VALUES
('Fall', 2024, '2024-08-15', '2024-12-15', TRUE),
('Spring', 2024, '2024-01-15', '2024-05-15', FALSE),
('Summer', 2024, '2024-06-01', '2024-07-31', FALSE);

-- Insert Users (password_hash would be properly hashed in real implementation)
INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, role) VALUES
-- Students
('john.doe@university.edu', '$2b$10$hashedpassword1', 'John', 'Doe', '+1-555-0101', '1999-05-15', 'student'),
('alice.johnson@university.edu', '$2b$10$hashedpassword2', 'Alice', 'Johnson', '+1-555-0102', '2000-03-22', 'student'),
('bob.smith@university.edu', '$2b$10$hashedpassword3', 'Bob', 'Smith', '+1-555-0103', '1999-11-08', 'student'),
('carol.davis@university.edu', '$2b$10$hashedpassword4', 'Carol', 'Davis', '+1-555-0104', '2001-01-12', 'student'),
('david.wilson@university.edu', '$2b$10$hashedpassword5', 'David', 'Wilson', '+1-555-0105', '1998-09-30', 'student'),

-- Teachers
('dr.smith@university.edu', '$2b$10$hashedpassword6', 'Robert', 'Smith', '+1-555-0201', '1975-04-10', 'teacher'),
('prof.johnson@university.edu', '$2b$10$hashedpassword7', 'Emily', 'Johnson', '+1-555-0202', '1980-07-25', 'teacher'),
('dr.wilson@university.edu', '$2b$10$hashedpassword8', 'Michael', 'Wilson', '+1-555-0203', '1978-12-03', 'teacher'),
('prof.davis@university.edu', '$2b$10$hashedpassword9', 'Sarah', 'Davis', '+1-555-0204', '1982-06-18', 'teacher'),

-- Admin
('admin@university.edu', '$2b$10$hashedpassword10', 'System', 'Administrator', '+1-555-0301', '1970-01-01', 'admin');

-- Insert Student Profiles
INSERT INTO student_profiles (user_id, student_id, major, minor, academic_year, gpa, expected_graduation, department_id) VALUES
(1, 'STU001234', 'Computer Science', 'Mathematics', 'Junior', 3.85, '2025-05-15', 1),
(2, 'STU001235', 'Mathematics', 'Physics', 'Senior', 3.92, '2024-12-15', 2),
(3, 'STU001236', 'Computer Science', NULL, 'Sophomore', 3.45, '2026-05-15', 1),
(4, 'STU001237', 'Physics', 'Mathematics', 'Junior', 3.78, '2025-05-15', 3),
(5, 'STU001238', 'Business', 'English', 'Freshman', 3.23, '2027-05-15', 5);

-- Insert Teacher Profiles
INSERT INTO teacher_profiles (user_id, employee_id, department_id, position, office, office_hours, research_interests, education, hire_date) VALUES
(6, 'EMP005678', 2, 'Associate Professor', 'Math Building, Room 205', 'MWF 2:00-4:00 PM', 'Applied Mathematics, Numerical Analysis', 'Ph.D. in Mathematics, MIT (2005)', '2010-08-15'),
(7, 'EMP005679', 3, 'Professor', 'Physics Building, Room 301', 'TTh 1:00-3:00 PM', 'Quantum Physics, Particle Physics', 'Ph.D. in Physics, Stanford (2000)', '2005-08-15'),
(8, 'EMP005680', 1, 'Assistant Professor', 'CS Building, Room 150', 'MWF 10:00-12:00 PM', 'Machine Learning, Data Science', 'Ph.D. in Computer Science, CMU (2015)', '2018-08-15'),
(9, 'EMP005681', 4, 'Associate Professor', 'Liberal Arts, Room 220', 'TTh 3:00-5:00 PM', 'Modern Literature, Creative Writing', 'Ph.D. in English Literature, Harvard (2008)', '2012-08-15');

-- Insert Courses
INSERT INTO courses (code, title, description, credits, department_id) VALUES
('MATH301', 'Advanced Mathematics', 'Advanced topics in calculus and linear algebra', 3, 2),
('MATH101', 'Calculus I', 'Introduction to differential and integral calculus', 4, 2),
('CS101', 'Computer Science Fundamentals', 'Introduction to programming and computer science concepts', 4, 1),
('CS201', 'Data Structures and Algorithms', 'Fundamental data structures and algorithmic techniques', 3, 1),
('PHYS205', 'Physics Laboratory', 'Hands-on physics experiments and data analysis', 2, 3),
('PHYS101', 'General Physics I', 'Mechanics, waves, and thermodynamics', 4, 3),
('ENG201', 'English Literature', 'Survey of English literature from medieval to modern times', 3, 4),
('BUS101', 'Introduction to Business', 'Fundamentals of business operations and management', 3, 5);

-- Insert Course Sections
INSERT INTO course_sections (course_id, semester_id, instructor_id, section_number, schedule, location, capacity) VALUES
(1, 1, 6, '001', 'MWF 9:00-10:00 AM', 'Math Building 101', 50),
(2, 1, 6, '001', 'MWF 11:00-12:00 PM', 'Math Building 102', 100),
(3, 1, 8, '001', 'TTh 10:00-11:30 AM', 'CS Building 201', 150),
(4, 1, 8, '001', 'TTh 2:00-3:30 PM', 'CS Building 202', 80),
(5, 1, 7, '001', 'T 2:00-5:00 PM', 'Physics Lab 205', 32),
(6, 1, 7, '001', 'MWF 1:00-2:00 PM', 'Physics Building 101', 120),
(7, 1, 9, '001', 'TTh 11:00-12:30 PM', 'Liberal Arts 150', 60),
(8, 1, 9, '001', 'MWF 3:00-4:00 PM', 'Business Building 101', 80);

-- Insert Enrollments
INSERT INTO enrollments (student_id, course_section_id, enrollment_date, status) VALUES
-- John Doe enrollments
(1, 1, '2024-08-15', 'enrolled'), -- MATH301
(1, 3, '2024-08-15', 'enrolled'), -- CS101
(1, 5, '2024-08-15', 'enrolled'), -- PHYS205

-- Alice Johnson enrollments
(2, 1, '2024-08-15', 'enrolled'), -- MATH301
(2, 2, '2024-08-15', 'enrolled'), -- MATH101
(2, 4, '2024-08-15', 'enrolled'), -- CS201

-- Bob Smith enrollments
(3, 2, '2024-08-15', 'enrolled'), -- MATH101
(3, 3, '2024-08-15', 'enrolled'), -- CS101
(3, 7, '2024-08-15', 'enrolled'), -- ENG201

-- Carol Davis enrollments
(4, 1, '2024-08-15', 'enrolled'), -- MATH301
(4, 5, '2024-08-15', 'enrolled'), -- PHYS205
(4, 6, '2024-08-15', 'enrolled'), -- PHYS101

-- David Wilson enrollments
(5, 2, '2024-08-15', 'enrolled'), -- MATH101
(5, 8, '2024-08-15', 'enrolled'); -- BUS101

-- Insert Assignments
INSERT INTO assignments (course_section_id, title, description, points, due_date, assignment_type) VALUES
-- MATH301 assignments
(1, 'Calculus Problem Set #3', 'Complete problems 1-20 from Chapter 5', 100, '2024-01-15 23:59:00', 'homework'),
(1, 'Midterm Exam', 'Comprehensive exam covering chapters 1-5', 200, '2024-01-20 14:00:00', 'exam'),

-- CS101 assignments
(3, 'Programming Assignment #1', 'Implement basic sorting algorithms', 150, '2024-01-10 23:59:00', 'homework'),
(3, 'Programming Assignment #2', 'Implement a binary search algorithm', 150, '2024-01-17 23:59:00', 'homework'),

-- PHYS205 assignments
(5, 'Lab Report: Pendulum Motion', 'Analyze pendulum motion data and write a comprehensive report', 75, '2024-01-18 17:00:00', 'lab'),

-- ENG201 assignments
(7, 'Essay: Modern Literature', 'Write a 1500-word essay on modern literary themes', 100, '2024-01-05 23:59:00', 'homework');

-- Insert Assignment Submissions
INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, submitted_at, status, grade, feedback, graded_at, graded_by) VALUES
(3, 1, 'Here is my implementation of sorting algorithms...', '2024-01-09 20:30:00', 'graded', 142, 'Excellent work! Clean implementation and good documentation.', '2024-01-12 10:00:00', 8),
(6, 3, 'Modern literature essay submission...', '2024-01-04 22:15:00', 'graded', 88, 'Good analysis, but could use more supporting evidence.', '2024-01-08 14:30:00', 9),
(1, 1, 'Problem set solutions attached...', '2024-01-14 19:45:00', 'submitted', NULL, NULL, NULL, NULL),
(1, 2, 'Completed problem set...', '2024-01-15 21:30:00', 'submitted', NULL, NULL, NULL, NULL);

-- Insert sample Notifications
INSERT INTO notifications (user_id, title, message, type, priority, is_read, course_section_id) VALUES
(1, 'Assignment Graded', 'Your Programming Assignment #1 has been graded. Grade: 142/150', 'grade', 'high', FALSE, 3),
(1, 'New Course Material', 'New lecture notes have been uploaded for Advanced Mathematics', 'announcement', 'medium', FALSE, 1),
(1, 'Assignment Due Reminder', 'Calculus Problem Set #3 is due tomorrow at 11:59 PM', 'reminder', 'high', TRUE, 1),
(2, 'Class Cancelled', 'Tomorrow\'s Advanced Mathematics class has been cancelled', 'announcement', 'medium', FALSE, 1),
(3, 'Grade Updated', 'Your essay grade has been updated in English Literature', 'grade', 'high', FALSE, 7);

-- Insert sample Announcements
INSERT INTO announcements (course_section_id, author_id, title, content, priority) VALUES
(1, 6, 'Midterm Exam Schedule', 'The midterm exam will be held on January 20th at 2:00 PM in the usual classroom. Please bring a calculator and photo ID.', 'high'),
(3, 8, 'New Programming Resources', 'I have uploaded additional programming examples and tutorials to help with the upcoming assignments. Check the course materials section.', 'medium'),
(5, 7, 'Lab Safety Reminder', 'Please remember to wear safety goggles and follow all lab protocols during tomorrow\'s experiment.', 'high');

-- Insert sample Attendance records
INSERT INTO attendance (course_section_id, student_id, date, status, recorded_by) VALUES
(1, 1, '2024-01-15', 'present', 6),
(1, 2, '2024-01-15', 'present', 6),
(1, 4, '2024-01-15', 'absent', 6),
(3, 1, '2024-01-16', 'present', 8),
(3, 3, '2024-01-16', 'late', 8),
(5, 1, '2024-01-16', 'present', 7),
(5, 4, '2024-01-16', 'present', 7);

-- Insert sample Grades
INSERT INTO grades (enrollment_id, assignment_id, points_earned, points_possible, percentage, letter_grade) VALUES
(1, 1, NULL, 100, NULL, NULL), -- John's MATH301 assignment (not graded yet)
(3, 3, 142, 150, 94.67, 'A'), -- John's CS101 assignment
(7, 6, 88, 100, 88.00, 'B+'); -- Bob's ENG201 assignment
