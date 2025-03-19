import { FindOptions } from "sequelize"
import ClassModel from "../models/class.model"

/**
 * ClassRepository is responsible for handling database operations
 * related to the "ClassModel". It provides methods to create,
 * retrieve, update, and delete class records.
 */
export class ClassRepository {
  /**
   * Creates a new class record in the database.
   * @param classData - Partial data to create a class.
   * @returns A promise resolving to an object containing the class ID and name.
   */
  async create(
    classData: Partial<ClassModel>
  ): Promise<Pick<ClassModel, "id" | "name">> {
    const newClass = await ClassModel.create(classData)

    // Extracting only the required fields to return
    const { id, name } = newClass.toJSON()

    return { id, name }
  }

  /**
   * Finds a class record by its unique ID.
   * @param id - The ID of the class to find.
   * @returns A promise resolving to the found class record or null if not found.
   */
  async find(id: string): Promise<ClassModel | null> {
    return await ClassModel.findOne({ where: { id } })
  }

  /**
   * Retrieves all class records based on optional filtering options.
   * @param options - (Optional) Filtering options for retrieving classes.
   * @returns A promise resolving to an array of class records.
   */
  async findAll(options?: FindOptions<ClassModel>): Promise<ClassModel[]> {
    return await ClassModel.findAll(options)
  }

  /**
   * Finds a class by its ID and updates specified fields.
   * @param id - The ID of the class to update.
   * @param values - Partial object containing fields to update (only "name").
   * @returns A promise resolving to the updated class record or null if not found.
   */
  async findAndUpdateById(
    id: string,
    values: Partial<Pick<ClassModel, "name">>
  ): Promise<ClassModel | null> {
    const classInstance = await ClassModel.findByPk(id)

    if (!classInstance) return null // Return null if the class doesn't exist

    await classInstance.update(values) // Update the class with new values
    return classInstance // Return the updated class
  }

  /**
   * Finds and deletes a class record based on filtering options.
   * @param options - Filtering options to locate the class.
   * @returns A promise resolving to true if deletion was successful, false otherwise.
   */
  async delete(options: FindOptions<ClassModel>): Promise<boolean> {
    const classInstance = await ClassModel.findOne(options)

    if (!classInstance) return false // Return false if the class doesn't exist

    await classInstance.destroy() // Delete the class record
    return true // Return true to indicate successful deletion
  }
}
