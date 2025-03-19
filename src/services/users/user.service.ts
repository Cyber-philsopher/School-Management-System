import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserRepository } from "../../repository/user.repository"
import { handleError, ValidationError } from "../../utils/errorHandler"

/**
 * Service class for handling user-related operations.
 * This class provides methods for creating, retrieving, updating, and deleting users.
 */
export class UserService {
  /**
   * User repository instance for database operations.
   */
  private userRepostiory: UserRepository

  /**
   * Initializes the UserService with the provided UserRepository instance.
   * @param userRepostiory - The repository for user data.
   */
  constructor(userRepostiory: UserRepository) {
    this.userRepostiory = userRepostiory
  }

  /**
   * Creates a new user.
   * @param user - The data transfer object containing user details.
   * @returns The created user or an error if validation fails.
   */
  async create(user: CreateUserDto) {
    const createUserDto = plainToInstance(CreateUserDto, user)

    const errors = await validate(createUserDto)
    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      const newUser = await this.userRepostiory.create(createUserDto)
      return newUser
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns A list of all users.
   */
  async findAll() {
    return await this.userRepostiory.findAll()
  }

  /**
   * Finds a user by their unique identifier.
   * @param id - The unique ID of the user.
   * @returns The user details if found.
   */
  async findByPk(id: string) {
    return await this.userRepostiory.find(id)
  }

  /**
   * Updates a user’s details by their unique identifier.
   * @param id - The unique ID of the user.
   * @param values - The data transfer object containing updated user details.
   * @returns The updated user or an error if validation fails.
   */
  async findAndUpdateById(id: string, values: UpdateUserDto) {
    const updateUserDto = plainToInstance(UpdateUserDto, values)

    const errors = await validate(updateUserDto)
    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      return await this.userRepostiory.findAndUpdateById(id, values)
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Deletes a user by their unique identifier.
   * @param id - The unique ID of the user.
   * @returns The result of the deletion operation or an error if the ID is missing.
   */
  async delete(id: string) {
    if (!id) throw new ValidationError(`User ID is required`)

    try {
      return await this.userRepostiory.delete(id)
    } catch (error) {
      handleError(error)
    }
  }
}
