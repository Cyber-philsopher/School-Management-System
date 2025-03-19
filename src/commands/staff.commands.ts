import inquirer from "inquirer" // Library for interactive CLI prompts
import { StaffService } from "../services/staff/staff.service" // Service for staff-related business logic
import { StaffRepository } from "../repository/staff.repository" // Repository for staff-related database operations

// Initialize repository and service instances
const staffRepository = new StaffRepository() // Creates a new instance of StaffRepository
const staffService = new StaffService(staffRepository) // Creates a new instance of StaffService, injecting the repository

// Define a class to handle staff-related CLI commands
export class StaffCommands {
  /**
   * Creates a new staff member by prompting the user for input and calling the staff service.
   */
  async createStaff() {
    // Prompt the user for the user ID and class ID
    const { userId, classId } = await inquirer.prompt([
      { type: "input", name: "userId", message: "User ID:" },
      { type: "input", name: "classId", message: "Class ID:" },
    ])

    // Call the service to create the staff member
    const result = await staffService.create({ userId, classId })
    console.log("Staff created successfully:", result) // Log the result
  }

  /**
   * Lists all staff members by calling the staff service.
   */
  async listStaff() {
    // Fetch all staff members from the database
    const result = await staffService.findAll()
    console.log("Staff:", result) // Log the list of staff members
  }

  /**
   * Retrieves a specific staff member by their ID by prompting the user for input and calling the staff service.
   */
  async getStaff() {
    // Prompt the user for the staff ID
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "Staff ID:" },
    ])

    // Fetch the staff member by their primary key (ID)
    const result = await staffService.findByPk(id)
    if (!result) {
      console.log("Staff not found") // Handle case where staff member is not found
      return
    }
    console.log("Staff:", result) // Log the retrieved staff member
  }

  /**
   * Updates a staff member by prompting the user for input and calling the staff service.
   */
  async updateStaff() {
    // Prompt the user for the staff ID and new class ID
    const { id, classId } = await inquirer.prompt([
      { type: "input", name: "id", message: "Staff ID:" },
      { type: "input", name: "classId", message: "New Class ID:" },
    ])

    // Call the service to update the staff member
    const result = await staffService.findAndUpdateById(id, { classId })

    if (!result) {
      console.log("Staff not found") // Handle case where staff member is not found
      return
    }
    console.log("Staff updated:", result) // Log the updated staff member
  }

  /**
   * Deletes a staff member by prompting the user for input and calling the staff service.
   */
  async deleteStaff() {
    // Prompt the user for the staff ID
    const { id } = await inquirer.prompt([
      { type: "input", name: "id", message: "Staff ID:" },
    ])

    // Call the service to delete the staff member
    const result = await staffService.delete(id)

    if (!result) {
      console.log("Could not delete staff") // Handle case where deletion fails
      return
    }
    console.log("Staff deleted successfully") // Log success message
  }
}
