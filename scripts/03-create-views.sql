-- Useful views for the College Management System

-- Student Dashboard View
CREATE OR REPLACE VIEW student_dashboard_view AS
SELECT 
    u.id as user_id,
    u.first_name,
    u.last_name,
    sp.student_id,
    sp.major,
    sp.gpa,
    COUNT(DISTINCT e.id) as enrolled_courses,
    COUNT(DISTINCT CASE WHEN a.due_date > CURRENT_TIMESTAMP AND asub.id IS NULL THEN a.id END) as pending_assignments,
    AVG(CASE WHEN g.percentage IS NOT NULL THEN g.percentage END) as current_average
FROM users u
JOIN student_profiles sp ON u.id = sp.user_id
LEFT JOIN enrollments e ON u.id = e.student_id AND e.status = 'enrolled'
LEFT JOIN course_sections cs ON e.course_section_id = cs.id
LEFT JOIN assignments a ON cs.id = a.course_section_id AND a.status = 'active'
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND u.id = asub.student_id
LEFT JOIN grades g ON e.id = g.enrollment_id
WHERE u.role = 'student'
GROUP BY u.id, u.first_name, u.last_name, sp.student_id, sp.major, sp.gpa;

-- Teacher Dashboard View
CREATE OR REPLACE VIEW teacher_dashboard_view AS
SELECT 
    u.id as user_id,
    u.first_name,
    u.last_name,
    tp.employee_id,
    tp.department_id,
    d.name as department_name,
    COUNT(DISTINCT cs.id) as teaching_courses,
    COUNT(DISTINCT e.student_id) as total_students,
    COUNT(DISTINCT CASE WHEN asub.status = 'submitted' THEN asub.id END) as pending_grades
FROM users u
JOIN teacher_profiles tp ON u.id = tp.user_id
LEFT JOIN departments d ON tp.department_id = d.id
LEFT JOIN course_sections cs ON u.id = cs.instructor_id AND cs.status = 'active'
LEFT JOIN enrollments e ON cs.id = e.course_section_id AND e.status = 'enrolled'
LEFT JOIN assignments a ON cs.id = a.course_section_id
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id
WHERE u.role = 'teacher'
GROUP BY u.id, u.first_name, u.last_name, tp.employee_id, tp.department_id, d.name;

-- Course Enrollment Summary View
CREATE OR REPLACE VIEW course_enrollment_summary AS
SELECT 
    cs.id as course_section_id,
    c.code,
    c.title,
    cs.section_number,
    s.name as semester,
    s.year,
    CONCAT(u.first_name, ' ', u.last_name) as instructor_name,
    cs.capacity,
    COUNT(e.id) as enrolled_count,
    (cs.capacity - COUNT(e.id)) as available_spots,
    ROUND((COUNT(e.id)::DECIMAL / cs.capacity * 100), 2) as enrollment_percentage
FROM course_sections cs
JOIN courses c ON cs.course_id = c.id
JOIN semesters s ON cs.semester_id = s.id
JOIN users u ON cs.instructor_id = u.id
LEFT JOIN enrollments e ON cs.id = e.course_section_id AND e.status = 'enrolled'
GROUP BY cs.id, c.code, c.title, cs.section_number, s.name, s.year, u.first_name, u.last_name, cs.capacity;

-- Student Grade Report View
CREATE OR REPLACE VIEW student_grade_report AS
SELECT 
    u.id as student_id,
    CONCAT(u.first_name, ' ', u.last_name) as student_name,
    sp.student_id,
    c.code as course_code,
    c.title as course_title,
    c.credits,
    e.final_grade,
    e.grade_points,
    s.name as semester,
    s.year
FROM users u
JOIN student_profiles sp ON u.id = sp.user_id
JOIN enrollments e ON u.id = e.student_id
JOIN course_sections cs ON e.course_section_id = cs.id
JOIN courses c ON cs.course_id = c.id
JOIN semesters s ON cs.semester_id = s.id
WHERE u.role = 'student'
ORDER BY u.id, s.year DESC, s.name;

-- Assignment Status View
CREATE OR REPLACE VIEW assignment_status_view AS
SELECT 
    a.id as assignment_id,
    a.title,
    c.code as course_code,
    c.title as course_title,
    a.due_date,
    a.points,
    COUNT(e.student_id) as total_students,
    COUNT(asub.id) as submissions_count,
    COUNT(CASE WHEN asub.status = 'graded' THEN 1 END) as graded_count,
    ROUND(AVG(CASE WHEN asub.grade IS NOT NULL THEN (asub.grade::DECIMAL / a.points * 100) END), 2) as average_percentage
FROM assignments a
JOIN course_sections cs ON a.course_section_id = cs.id
JOIN courses c ON cs.course_id = c.id
LEFT JOIN enrollments e ON cs.id = e.course_section_id AND e.status = 'enrolled'
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND e.student_id = asub.student_id
GROUP BY a.id, a.title, c.code, c.title, a.due_date, a.points
ORDER BY a.due_date DESC;
