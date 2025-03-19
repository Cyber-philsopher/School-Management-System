import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"
import { CreateStudentDto } from "./dto/create-student.dto"
import { UpdateStudentDto } from "./dto/update-student.dto"
import { StudentRepository } from "../../repository/student.repository"
import { handleError, ValidationError } from "../../utils/errorHandler"

/**
 * Service class for managing student-related operations.
 * Handles business logic and validation before interacting with the repository.
 */
export class StudentService {
  private studentRepository: StudentRepository

  /**
   * Constructor to initialize the StudentRepository instance.
   * @param studentRepository - The repository responsible for database operations.
   */
  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository
  }

  /**
   * Creates a new student record after validating the input data.
   * @param student - Data transfer object containing student details.
   * @returns The newly created student record.
   * @throws ValidationError if validation fails.
   */
  async create(student: CreateStudentDto) {
    const createStudentDto = plainToInstance(CreateStudentDto, student)

    const errors = await validate(createStudentDto)
    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      return await this.studentRepository.create(createStudentDto)
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Retrieves all students from the database.
   * @returns An array of student records.
   */
  async findAll() {
    return await this.studentRepository.findAll()
  }

  /**
   * Finds a student by their unique identifier.
   * @param id - The unique ID of the student.
   * @returns The student record if found, otherwise null.
   */
  async findByPk(id: string) {
    return await this.studentRepository.find(id)
  }

  /**
   * Updates a student's details based on the provided ID.
   * Validates input data before updating.
   * @param id - The unique ID of the student.
   * @param values - Data transfer object containing updated values.
   * @returns The number of affected rows or null if no updates were made.
   * @throws ValidationError if validation fails.
   */
  async findAndUpdateById(id: string, values: UpdateStudentDto) {
    const updateStudentDto = plainToInstance(UpdateStudentDto, values)

    const errors = await validate(updateStudentDto)
    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      return await this.studentRepository.findAndUpdateById(id, values)
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Deletes a student record by ID.
   * @param id - The unique ID of the student.
   * @returns True if deletion was successful, otherwise false.
   * @throws ValidationError if ID is not provided.
   */
  async delete(id: string) {
    if (!id) throw new ValidationError("Student ID is required")

    try {
      return await this.studentRepository.delete(id)
    } catch (error) {
      handleError(error)
    }
  }
}
