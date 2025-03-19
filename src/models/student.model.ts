import { DataTypes } from "sequelize"
import sequelize from "../database"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "./base.model"

/**
 * StudentModel represents the "students" table in the database.
 * It extends BaseModel to inherit shared functionalities.
 */
class StudentModel extends BaseModel {
  studentId!: string // Unique identifier for the student
  userId!: string // Reference to the associated user
  classId?: string // Optional reference to the class the student is enrolled in
  createdAt!: Date // Timestamp for when the student record was created
  updatedAt!: Date // Timestamp for when the student record was last updated
}

/**
 * Initializes the StudentModel with schema definition and table configurations.
 */
StudentModel.init(
  {
    studentId: {
      type: DataTypes.UUID, // Universally Unique Identifier (UUID) for student
      primaryKey: true, // Marks this field as the primary key
      allowNull: false, // Required field
      unique: true, // Ensures unique values
      defaultValue: uuidv4, // Automatically generates a UUID
    },
    userId: {
      type: DataTypes.UUID, // Foreign key reference to UserModel
      allowNull: false, // Required field
    },
    classId: {
      type: DataTypes.UUID, // Foreign key reference to ClassModel (optional)
      allowNull: true, // This field can be null (not all students belong to a class)
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
    tableName: "students", // Explicitly sets the table name
  }
)

export default StudentModel
