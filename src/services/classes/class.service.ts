import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"
import { CreateClassDto } from "./dto/create-class.dto"
import { UpdateClassDto } from "./dto/update-class.dto"
import { ClassRepository } from "../../repository/class.repository"
import { handleError, ValidationError } from "../../utils/errorHandler"

/**
 * ClassService handles business logic related to class management.
 * It provides methods for creating, retrieving, updating, and deleting class records
 * while ensuring proper validation and error handling.
 */
export class ClassService {
  constructor(private classRepository: ClassRepository) {}

  /**
   * Creates a new class record after validating the input data.
   * @param classData - The data required to create a class.
   * @returns A promise resolving to the created class data or throws a validation error.
   */
  async create(classData: CreateClassDto) {
    // Convert plain object to an instance of CreateClassDto and validate it
    const createClassDto = plainToInstance(CreateClassDto, classData)
    const errors = await validate(createClassDto)

    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      // Persist the new class in the database
      return await this.classRepository.create(createClassDto)
    } catch (error) {
      handleError(error) // Handle any unexpected errors
    }
  }

  /**
   * Retrieves all class records from the database.
   * @returns A promise resolving to an array of class records.
   */
  async findAll() {
    return await this.classRepository.findAll()
  }

  /**
   * Finds a class by its primary key (ID).
   * @param id - The unique class ID.
   * @returns A promise resolving to the class record or null if not found.
   */
  async findByPk(id: string) {
    return await this.classRepository.find(id)
  }

  /**
   * Finds a class by ID and updates the specified fields after validation.
   * @param id - The class ID to update.
   * @param values - The new values to update in the class record.
   * @returns A promise resolving to the updated class record or throws a validation error.
   */
  async findAndUpdateById(id: string, values: UpdateClassDto) {
    // Convert plain object to an instance of UpdateClassDto and validate it
    const updateClassDto = plainToInstance(UpdateClassDto, values)
    const errors = await validate(updateClassDto)

    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      // Update the class record in the database
      return await this.classRepository.findAndUpdateById(id, values)
    } catch (error) {
      handleError(error) // Handle potential errors
    }
  }

  /**
   * Deletes a class record by its ID.
   * @param id - The class ID to delete.
   * @returns A promise resolving to a boolean indicating success or failure.
   */
  async delete(id: string) {
    if (!id) throw new ValidationError(`Class ID is required`)

    try {
      // Attempt to delete the class by ID
      return await this.classRepository.delete({ where: { id } })
    } catch (error) {
      handleError(error) // Handle any potential errors
    }
  }
}
