// src/models/associations.ts
// This file defines and sets up model associations (relationships) in Sequelize.

import StudentModel from "./student.model"
import UserModel from "./user.model"
import ClassModel from "./class.model"
import StaffModel from "./staff.model"

/**
 * Sets up the relationships (associations) between different models.
 * This ensures proper data integrity and cascading behavior when modifying records.
 */
export function setupAssociations() {
  // A User can have one associated Student profile
  UserModel.hasOne(StudentModel, { foreignKey: "userId", onDelete: "CASCADE" })

  // A User can have one associated Staff profile
  UserModel.hasOne(StaffModel, { foreignKey: "userId", onDelete: "CASCADE" })

  // A Class can have multiple Students enrolled
  ClassModel.hasMany(StudentModel, {
    foreignKey: "classId",
    onDelete: "CASCADE", // Deleting a class removes all its students
  })

  // A Class can have multiple Staff members assigned
  ClassModel.hasMany(StaffModel, {
    foreignKey: "classId",
    onDelete: "CASCADE", // Deleting a class removes all associated staff members
  })

  // A Student belongs to a single User
  StudentModel.belongsTo(UserModel, {
    foreignKey: "userId",
    onDelete: "CASCADE", // Deleting the user removes their student record
  })

  // A Student belongs to a single Class
  StudentModel.belongsTo(ClassModel, {
    foreignKey: "classId",
    onDelete: "CASCADE", // Deleting the class removes all associated students
  })

  // A Staff member belongs to a single User
  StaffModel.belongsTo(UserModel, {
    foreignKey: "userId",
    onDelete: "CASCADE", // Deleting the user removes their staff record
  })

  // A Staff member belongs to a single Class
  StaffModel.belongsTo(ClassModel, {
    foreignKey: "classId",
    onDelete: "CASCADE", // Deleting the class removes all assigned staff members
  })
}
