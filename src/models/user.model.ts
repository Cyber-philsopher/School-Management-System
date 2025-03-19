import { DataTypes } from "sequelize"
import sequelize from "../database"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "./base.model"

/**
 * UserModel represents the "users" table in the database.
 * It extends BaseModel to inherit shared functionalities.
 */
class UserModel extends BaseModel {
  id!: string // Unique identifier for the user
  firstName!: string // User's first name
  lastName!: string // User's last name
  age?: number // Optional field for user's age
  createdAt!: Date // Timestamp for when the user record was created
  updatedAt!: Date // Timestamp for when the user record was last updated
}

/**
 * Initializes the UserModel with schema definition and table configurations.
 */
UserModel.init(
  {
    id: {
      type: DataTypes.UUID, // Universally Unique Identifier (UUID) for user
      primaryKey: true, // Marks this field as the primary key
      allowNull: false, // Required field
      unique: true, // Ensures unique values
      defaultValue: uuidv4, // Automatically generates a UUID
    },
    firstName: {
      type: DataTypes.STRING, // Stores the user's first name
      allowNull: false, // Required field
    },
    lastName: {
      type: DataTypes.STRING, // Stores the user's last name
      allowNull: false, // Required field
    },
    age: {
      type: DataTypes.INTEGER, // Stores the user's age
      allowNull: true, // Optional field (can be null)
    },
    createdAt: {
      type: DataTypes.DATE, // Timestamp for creation
      allowNull: false, // Required field
      field: "created_at", // Maps to "created_at" column in the database
      defaultValue: DataTypes.NOW, // Default value set to current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE, // Timestamp for last update
      allowNull: false, // Required field
      field: "updated_at", // Maps to "updated_at" column in the database
    },
  },
  {
    sequelize, // Database connection instance
    tableName: "users", // Explicitly sets the table name
  }
)

export default UserModel
