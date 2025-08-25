// Database connection and utility functions
// This would typically use a database connection pool in production

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

// Mock database connection for development
// In production, this would use a real database connection
export class DatabaseConnection {
  private config: DatabaseConfig

  constructor(config: DatabaseConfig) {
    this.config = config
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    // Mock implementation - in production, this would execute real SQL queries
    console.log("[v0] Database Query:", sql, params)

    // Return mock data based on the query type
    if (sql.includes("SELECT") && sql.includes("users")) {
      return [
        {
          id: 1,
          email: "john.doe@university.edu",
          first_name: "John",
          last_name: "Doe",
          role: "student",
        },
      ]
    }

    if (sql.includes("INSERT")) {
      return [{ id: Date.now(), affected_rows: 1 }]
    }

    if (sql.includes("UPDATE")) {
      return [{ affected_rows: 1 }]
    }

    return []
  }

  async transaction<T>(callback: (connection: DatabaseConnection) => Promise<T>): Promise<T> {
    // Mock transaction implementation
    console.log("[v0] Starting database transaction")
    try {
      const result = await callback(this)
      console.log("[v0] Transaction committed")
      return result
    } catch (error) {
      console.log("[v0] Transaction rolled back:", error)
      throw error
    }
  }

  async close(): Promise<void> {
    console.log("[v0] Database connection closed")
  }
}

// Database utility functions
export const db = new DatabaseConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "college_management",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
})

// Common database operations
export const dbOperations = {
  // User operations
  async getUserById(id: number) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id])
    return result[0]
  },

  async getUserByEmail(email: string) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email])
    return result[0]
  },

  async createUser(userData: any) {
    const { email, password_hash, first_name, last_name, phone, date_of_birth, role } = userData
    const result = await db.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [email, password_hash, first_name, last_name, phone, date_of_birth, role],
    )
    return result[0]
  },

  // Course operations
  async getCoursesByStudent(studentId: number) {
    const result = await db.query(
      `
      SELECT c.*, cs.section_number, cs.schedule, cs.location,
             CONCAT(u.first_name, ' ', u.last_name) as instructor_name
      FROM courses c
      JOIN course_sections cs ON c.id = cs.course_id
      JOIN enrollments e ON cs.id = e.course_section_id
      JOIN users u ON cs.instructor_id = u.id
      WHERE e.student_id = $1 AND e.status = 'enrolled'
    `,
      [studentId],
    )
    return result
  },

  async getCoursesByTeacher(teacherId: number) {
    const result = await db.query(
      `
      SELECT c.*, cs.section_number, cs.schedule, cs.location, cs.capacity,
             COUNT(e.id) as enrolled_count
      FROM courses c
      JOIN course_sections cs ON c.id = cs.course_id
      LEFT JOIN enrollments e ON cs.id = e.course_section_id AND e.status = 'enrolled'
      WHERE cs.instructor_id = $1 AND cs.status = 'active'
      GROUP BY c.id, cs.id
    `,
      [teacherId],
    )
    return result
  },

  // Assignment operations
  async getAssignmentsByStudent(studentId: number) {
    const result = await db.query(
      `
      SELECT a.*, c.code as course_code, c.title as course_title,
             asub.submitted_at, asub.grade, asub.status as submission_status
      FROM assignments a
      JOIN course_sections cs ON a.course_section_id = cs.id
      JOIN courses c ON cs.course_id = c.id
      JOIN enrollments e ON cs.id = e.course_section_id
      LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.student_id = $1
      WHERE e.student_id = $1 AND e.status = 'enrolled'
      ORDER BY a.due_date ASC
    `,
      [studentId],
    )
    return result
  },

  async getAssignmentsByTeacher(teacherId: number) {
    const result = await db.query(
      `
      SELECT a.*, c.code as course_code, c.title as course_title,
             COUNT(e.student_id) as total_students,
             COUNT(asub.id) as submissions_count,
             COUNT(CASE WHEN asub.status = 'graded' THEN 1 END) as graded_count
      FROM assignments a
      JOIN course_sections cs ON a.course_section_id = cs.id
      JOIN courses c ON cs.course_id = c.id
      LEFT JOIN enrollments e ON cs.id = e.course_section_id AND e.status = 'enrolled'
      LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id
      WHERE cs.instructor_id = $1
      GROUP BY a.id, c.code, c.title
      ORDER BY a.due_date DESC
    `,
      [teacherId],
    )
    return result
  },

  // Notification operations
  async getNotificationsByUser(userId: number, limit = 50) {
    const result = await db.query(
      `
      SELECT * FROM notifications 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2
    `,
      [userId, limit],
    )
    return result
  },

  async createNotification(notificationData: any) {
    const { user_id, title, message, type, priority, course_section_id } = notificationData
    const result = await db.query(
      `
      INSERT INTO notifications (user_id, title, message, type, priority, course_section_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `,
      [user_id, title, message, type, priority, course_section_id],
    )
    return result[0]
  },

  async markNotificationAsRead(notificationId: number) {
    const result = await db.query(
      `
      UPDATE notifications 
      SET is_read = TRUE, read_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `,
      [notificationId],
    )
    return result[0]
  },
}
