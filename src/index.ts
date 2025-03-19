import chalk from "chalk"
import { Command } from "commander"
import { UserCommands } from "./commands/user.commands"
import { StudentCommands } from "./commands/student.commands"
import { StaffCommands } from "./commands/staff.commands"
import { ClassCommands } from "./commands/class.commands"
import sequelize from "./database"
import "./models/user.model"
import "./models/student.model"
import "./models/staff.model"
import "./models/class.model"
import { setupAssociations } from "./models/associations"

// Initialize the CLI program using Commander.js
const program = new Command()

// Instantiate command handlers for different entities
const userCommands = new UserCommands()
const studentCommands = new StudentCommands()
const staffCommands = new StaffCommands()
const classCommands = new ClassCommands()

// Set up database model associations
setupAssociations()

/**
 * Asynchronously synchronizes the database models.
 * If synchronization fails, it logs an error and terminates the process.
 */
const setupDatabase = async () => {
  try {
    await sequelize.sync()
  } catch (error) {
    console.error(chalk.bgRed.white("Database sync failed:"), error)
    process.exit(1) // Exit process with failure code
  }
}

setupDatabase()

// Set program metadata
program
  .version("1.0.0")
  .description("CLI program for managing users, students, staff, and classes")

/**
 * User Management Commands
 */
program
  .command("create-user")
  .description("Create a new user")
  .action(userCommands.createUser)

program
  .command("list-users")
  .description("List all users")
  .action(userCommands.listUsers)

program
  .command("get-user")
  .description("Get a specific user by ID")
  .action(userCommands.getUser)

program
  .command("update-user")
  .description("Update user details")
  .action(userCommands.updateUser)

program
  .command("delete-user")
  .description("Delete a user")
  .action(userCommands.deleteUser)

/**
 * Student Management Commands
 */
program
  .command("add-student")
  .description("Add a new student")
  .action(studentCommands.createStudent)

program
  .command("list-students")
  .description("List all students")
  .action(studentCommands.listStudents)

program
  .command("delete-student")
  .description("Delete a student")
  .action(studentCommands.deleteStudent)

/**
 * Staff Management Commands
 */
program
  .command("add-staff")
  .description("Add a new staff member")
  .action(staffCommands.createStaff)

program
  .command("list-staff")
  .description("List all staff members")
  .action(staffCommands.listStaff)

program
  .command("delete-staff")
  .description("Delete a staff member")
  .action(staffCommands.deleteStaff)

/**
 * Class Management Commands
 */
program
  .command("add-class")
  .description("Add a new class")
  .action(classCommands.createClass)

program
  .command("list-classes")
  .description("List all classes")
  .action(classCommands.listClasses)

// Parse the CLI arguments
program.parse(process.argv)

/**
 * Handle uncaught exceptions and prevent the application from crashing abruptly.
 */
process.on("uncaughtException", (error) => {
  console.error(chalk.red("Uncaught exception:"), error)
  process.exit(1) // Exit process with failure code
})

/**
 * Handle unhandled promise rejections gracefully.
 */
process.on("unhandledRejection", (reason) => {
  console.error(chalk.red("Unhandled rejection:"), reason)
  process.exit(1) // Exit process with failure code
})
