import { DataTypes } from "sequelize"
import sequelize from "../database"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "./base.model"

/**
 * ClassModel represents the "classes" table in the database.
 * It extends BaseModel to inherit common functionalities.
 */
class ClassModel extends BaseModel {
  id!: string // Unique identifier for the class
  name!: string // Name of the class
  createdAt!: Date // Timestamp for when the class was created
  updatedAt!: Date // Timestamp for when the class was last updated
}

/**
 * Initializes the ClassModel with schema definition and table configurations.
 */
ClassModel.init(
  {
    id: {
      type: DataTypes.UUID, // Universally Unique Identifier (UUID)
      primaryKey: true, // Marks this field as the primary key
      allowNull: false, // Cannot be null
      unique: true, // Ensures unique values
      defaultValue: uuidv4, // Generates a UUID automatically
    },
    name: {
      type: DataTypes.STRING, // Class name as a string
      allowNull: false, // Required field
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
    tableName: "classes", // Explicitly sets the table name
  }
)

export default ClassModel
