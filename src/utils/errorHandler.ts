import chalk from "chalk"

/**
 * Base class for all CLI errors.
 */
export class CLIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CLIError"
  }
}

/**
 * Thrown when validation fails (e.g., missing required fields).
 */
export class ValidationError extends CLIError {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

/**
 * Thrown when there is a database-related issue.
 */
export class DatabaseError extends CLIError {
  constructor(message: string) {
    super(message)
    this.name = "DatabaseError"
  }
}

/**
 * Centralized error-handling function for CLI applications.
 */
export function handleError(error: unknown): void {
  if (error instanceof ValidationError) {
    console.error(
      chalk.red.bold("Validation Error: ") + chalk.yellow(error.message)
    )
  } else if (error instanceof DatabaseError) {
    console.error(
      chalk.red.bold("Database Error: ") + chalk.yellow(error.message)
    )
  } else if (error instanceof CLIError) {
    console.error(chalk.red.bold("CLI Error: ") + chalk.yellow(error.message))
  } else {
    console.error(
      chalk.red.bold("Unknown Error: ") + chalk.yellow(String(error))
    )
  }

  process.exit(1) // Exit the CLI with an error code
}
