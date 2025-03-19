import { DataTypes } from "sequelize"
import sequelize from "../database"
import { v4 as uuidv4 } from "uuid"
import { BaseModel } from "./base.model"

/**
 * StaffModel represents the "staff" table in the database.
 * It extends BaseModel to inherit common functionalities.
 */
class StaffModel extends BaseModel {
  staffId!: string // Unique identifier for the staff member
  userId!: string // Reference to the associated user
  classId?: string // Optional reference to the class the staff is assigned to
  createdAt!: Date // Timestamp for when the staff record was created
  updatedAt!: Date // Timestamp for when the staff record was last updated
}

/**
 * Initializes the StaffModel with schema definition and table configurations.
 */
StaffModel.init(
  {
    staffId: {
      type: DataTypes.UUID, // Universally Unique Identifier (UUID) for staff
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
      allowNull: true, // This field can be null (not all staff members belong to a class)
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
    tableName: "staff", // Explicitly sets the table name
  }
)

export default StaffModel
