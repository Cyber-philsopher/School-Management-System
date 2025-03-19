import { FindOptions } from "sequelize"
import StudentModel from "../models/student.model"

/**
 * StudentRepository handles database operations related to student records.
 * It provides methods for creating, retrieving, updating, and deleting student entries.
 */
export class StudentRepository {
  /**
   * Creates a new student record in the database.
   * @param student - Partial data containing student details.
   * @returns A promise resolving to an object containing studentId, userId, and classId.
   */
  async create(
    student: Partial<StudentModel>
  ): Promise<Pick<StudentModel, "studentId" | "userId" | "classId">> {
    const newStudent = await StudentModel.create(student)

    // Extract relevant fields from the created student record
    const { studentId, userId, classId } = newStudent.toJSON()

    return {
      studentId: studentId,
      userId: userId,
      classId: classId, // Can be null if the student is not assigned to a class
    }
  }

  /**
   * Finds a student by their unique student ID.
   * @param id - The student ID to search for.
   * @returns A promise resolving to the student record or null if not found.
   */
  async find(id: string): Promise<StudentModel | null> {
    return await StudentModel.findOne({
      where: { id },
    })
  }

  /**
   * Retrieves all student records based on optional filtering criteria.
   * @param options - (Optional) Filtering options for retrieving student records.
   * @returns A promise resolving to an array of student records.
   */
  async findAll(options?: FindOptions<StudentModel>): Promise<StudentModel[]> {
    return await StudentModel.findAll(options)
  }

  /**
   * Finds a student by their ID and updates specified fields.
   * @param id - The student ID to update.
   * @param values - Partial object containing fields to update (e.g., classId).
   * @returns A promise resolving to the number of affected rows or null if no update occurred.
   */
  async findAndUpdateById(
    id: string,
    values: Partial<Pick<StudentModel, "classId">>
  ): Promise<number | null> {
    const [count] = await StudentModel.update(values, { where: { id } })

    if (count === 0) return null // No record was updated

    return count // Return the number of updated rows
  }

  /**
   * Deletes a student record by their ID.
   * @param id - The student ID to delete.
   * @returns A promise resolving to true if deletion was successful, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    const student = await StudentModel.destroy({ where: { id } })

    if (student === 0) return false // Return false if no record was deleted
    return true // Return true if deletion was successful
  }
}
