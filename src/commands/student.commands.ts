import inquirer from "inquirer" // Library for interactive CLI prompts
import { StudentRepository } from "../repository/student.repository" // Service for staff-related business logic
import { StudentService } from "../services/students/student.service" // Repository for staff-related database operations

// Initialize repository and service for student operations
const studentRepository = new StudentRepository() // Creates a new instance of StaffRepository
const studentService = new StudentService(studentRepository) // Creates a new instance of StaffService, injecting the repository

// Define a class to handle student-related CLI commands
export class StudentCommands {
  /**
   * Prompts the user for student details and creates a new student record.
   */
  async createStudent() {
    // Prompt the user for required student details
    const { userId, classId } = await inquirer.prompt([
      { type: "input", name: "userId", message: "User ID:" },
      { type: "input", name: "classId", message: "Class ID:" },
    ])

    // Call the service to create a student and display the result
    const result = await studentService.create({ userId, classId })
    console.log("Student created successfully:", result)
  }

  /**
   * Retrieves and displays a list of all students.
   */
  async listStudents() {
    const result = await studentService.findAll()
    console.log("Students:", result)
  }

  /**
   * Prompts the user for a student ID and retrieves the corresponding student details.
   */
  async getStudent() {
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "Student ID:" },
    ])

    // Fetch student details by ID
    const result = await studentService.findByPk(id)

    if (!result) {
      console.log("Student not found")
      return
    }
    console.log("Student:", result)
  }

  /**
   * Prompts the user for a student ID and updates the student's class.
   */
  async updateStudent() {
    const { id, classId } = await inquirer.prompt([
      { type: "input", name: "id", message: "Student ID:" },
      { type: "input", name: "classId", message: "New Class ID:" },
    ])

    // Update the student's class information
    const result = await studentService.findAndUpdateById(id, { classId })

    if (!result) {
      console.log("Student not found")
      return
    }
    console.log("Student updated:", result)
  }

  /**
   * Prompts the user for a student ID and deletes the student record.
   */
  async deleteStudent() {
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "Student ID:" },
    ])

    // Attempt to delete the student
    const result = await studentService.delete(id)

    if (!result) {
      console.log("Could not delete student")
      return
    }
    console.log("Student deleted successfully")
  }
}
