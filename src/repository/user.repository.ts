import { FindOptions } from "sequelize"
import UserModel from "../models/user.model"

/**
 * UserRepository handles database operations related to user records.
 * It provides methods for creating, retrieving, updating, and deleting user entries.
 */
export class UserRepository {
  /**
   * Creates a new user record in the database.
   * @param user - Partial data containing user details.
   * @returns A promise resolving to an object containing the user's id, firstName, and lastName.
   */
  async create(
    user: Partial<UserModel>
  ): Promise<Pick<UserModel, "id" | "firstName" | "lastName">> {
    const newUser = await UserModel.create(user)

    // Extract relevant fields from the created user record
    const { id, firstName, lastName } = newUser.toJSON()

    return {
      id: id,
      firstName: firstName,
      lastName: lastName,
    }
  }

  /**
   * Finds a user by their unique ID.
   * @param id - The user ID to search for.
   * @returns A promise resolving to the user record or null if not found.
   */
  async find(id: string): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        id,
      },
    })
  }

  /**
   * Retrieves all user records based on optional filtering criteria.
   * @param options - (Optional) Filtering options for retrieving user records.
   * @returns A promise resolving to an array of user records.
   */
  async findAll(options?: FindOptions<UserModel>): Promise<UserModel[]> {
    return await UserModel.findAll(options)
  }

  /**
   * Finds a user by their ID and updates specified fields.
   * @param id - The user ID to update.
   * @param values - Partial object containing fields to update (e.g., firstName, lastName, age).
   * @returns A promise resolving to the number of affected rows or null if no update occurred.
   */
  async findAndUpdateById(
    id: string,
    values: Partial<Pick<UserModel, "firstName" | "lastName" | "age">>
  ): Promise<number | null> {
    const [count] = await UserModel.update(values, { where: { id } })

    if (count === 0) return null // No record was updated

    return count // Return the number of updated rows
  }

  /**
   * Deletes a user record by their ID.
   * @param id - The user ID to delete.
   * @returns A promise resolving to true if deletion was successful, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    const user = await UserModel.destroy({ where: { id } })

    if (user === 0) return false // Return false if no record was deleted
    return true // Return true if deletion was successful
  }
}
