import inquirer from "inquirer"
import { UserRepository } from "../repository/user.repository"
import { UserService } from "../services/users/user.service"

// Initialize repository and service for user operations
const userRepository = new UserRepository()
const userService = new UserService(userRepository)

// Define a class to handle user-related CLI commands
export class UserCommands {
  /**
   * Prompts the user for details and creates a new user record.
   */
  async createUser() {
    // Prompt the user for required information
    const { firstName, lastName, age } = await inquirer.prompt([
      { type: "input", name: "firstName", message: "First name:" },
      { type: "input", name: "lastName", message: "Last name:" },
      { type: "number", name: "age", message: "Age:", required: false }, // Age is optional
    ])

    // Call the service to create a user and display the result
    const result = await userService.create({ firstName, lastName, age })
    console.log("User created successfully:", result)
  }

  /**
   * Retrieves and displays a list of all users.
   */
  async listUsers() {
    const result = await userService.findAll()
    console.log("Users:", result)
  }

  /**
   * Prompts the user for a user ID and retrieves the corresponding user details.
   */
  async getUser() {
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "User ID:" },
    ])

    // Fetch user details by ID
    const result = await userService.findByPk(id)

    if (!result) {
      console.log("User not found")
      return
    }
    console.log("User:", result)
  }

  /**
   * Prompts the user for a user ID and updates the user's details.
   */
  async updateUser() {
    // Prompt for the user ID and new details
    const { id, firstName, lastName, age } = await inquirer.prompt([
      { type: "input", name: "id", message: "User ID:" },
      { type: "input", name: "firstName", message: "First name:" },
      { type: "input", name: "lastName", message: "Last name:" },
      { type: "number", name: "age", message: "Age:" },
    ])

    // Update the user information
    const result = await userService.findAndUpdateById(id, {
      firstName,
      lastName,
      age,
    })

    if (!result) {
      console.log("User not found")
      return
    }
    console.log(`${result} users updated successfully`)
  }

  /**
   * Prompts the user for a user ID and deletes the user record.
   */
  async deleteUser() {
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "User ID:" },
    ])

    // Attempt to delete the user
    const result = await userService.delete(id)

    if (!result) {
      console.log("Could not delete user")
      return
    }
    console.log("User deleted successfully")
  }
}
