import { Dialect, Sequelize } from "sequelize"
import config from "../../config/config.json"

// Retrieve the database configuration for the development environment
const dbConfig = config["development"]

// Initialize a new Sequelize instance with the specified configuration
const sequelize = new Sequelize({
  dialect: dbConfig.dialect as Dialect, // Define the database dialect (e.g., sqlite, postgres, mysql)
  storage: dbConfig.storage, // Specify storage location (relevant for SQLite)
  logging: false, // Disable logging for cleaner output
})

// Export the Sequelize instance for use in other parts of the application
export default sequelize
