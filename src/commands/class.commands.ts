import inquirer from "inquirer"; // Library for interactive CLI prompts
import { ClassRepository } from "../repository/class.repository"; // Repository for class-related database operations
import { ClassService } from "../services/classes/class.service"; // Service for class-related business logic

// Initialize repository and service instances
const classRepository = new ClassRepository(); // Creates a new instance of ClassRepository
const classService = new ClassService(classRepository); // Creates a new instance of ClassService, injecting the repository

/**
 * ClassCommands encapsulates all command-line operations related to "Class".
 * It provides methods to create, list, retrieve, update, and delete classes.
 */
export class ClassCommands {
  /**
   * Creates a new class by prompting the user for input and calling the class service.
   */
  async createClass() {
    // Prompt the user for the class name
    const { name } = await inquirer.prompt([
      { type: "input", name: "name", message: "Class name:" },
    ]);

    // Call the service to create the class
    const result = await classService.create({ name });
    console.log("Class created successfully:", result); // Log the result
  }

  /**
   * Lists all classes by calling the class service.
   */
  async listClasses() {
    // Fetch all classes from the database
    const result = await classService.findAll();
    console.log("Classes:", result); // Log the list of classes
  }

  /**
   * Retrieves a specific class by its ID by prompting the user for input and calling the class service.
   */
  async getClass() {
    // Prompt the user for the class ID
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "Class ID:" },
    ]);

    // Fetch the class by its primary key (ID)
    const result = await classService.findByPk(id);
    if (!result) {
      console.log("Class not found"); // Handle case where class is not found
      return;
    }
    console.log("Class:", result); // Log the retrieved class
  }

  /**
   * Updates a class by prompting the user for input and calling the class service.
   */
  async updateClass() {
    // Prompt the user for the class ID and new name
    const { id, name } = await inquirer.prompt([
      { type: "input", name: "id", message: "Class ID:" },
      { type: "input", name: "name", message: "New Class name:" },
    ]);

    // Call the service to update the class
    const result = await classService.findAndUpdateById(id, { name });

    if (!result) {
      console.log("Class not found"); // Handle case where class is not found
      return;
    }
    console.log("Class updated:", result); // Log the updated class
  }

  /**
   * Deletes a class by prompting the user for input and calling the class service.
   */
  async deleteClass() {
    // Prompt the user for the class ID
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "Class ID:" },
    ]);

    // Call the service to delete the class
    const result = await classService.delete(id);

    if (!result) {
      console.log("Could not delete class"); // Handle case where deletion fails
      return;
    }
    console.log("Class deleted successfully"); // Log success message
  }
}