import { FindOptions } from "sequelize"
import StaffModel from "../models/staff.model"

/**
 * StaffRepository handles database operations related to staff records.
 * It provides methods for creating, retrieving, updating, and deleting staff entries.
 */
export class StaffRepository {
  /**
   * Creates a new staff record in the database.
   * @param staff - Partial data containing staff details.
   * @returns A promise resolving to an object with staffId, userId, and classId.
   */
  async create(
    staff: Partial<StaffModel>
  ): Promise<Pick<StaffModel, "staffId" | "userId" | "classId">> {
    const newStaff = await StaffModel.create(staff)

    const { staffId, userId, classId } = newStaff.toJSON()

    return {
      staffId,
      userId,
      classId,
    }
  }

  /**
   * Finds a staff member by their unique staff ID.
   * @param staffId - The ID of the staff member to find.
   * @returns A promise resolving to the staff record or null if not found.
   */
  async find(staffId: string): Promise<StaffModel | null> {
    return await StaffModel.findOne({ where: { staffId } })
  }

  /**
   * Retrieves all staff records based on optional filtering criteria.
   * @param options - (Optional) Filtering options for retrieving staff records.
   * @returns A promise resolving to an array of staff members.
   */
  async findAll(options?: FindOptions<StaffModel>): Promise<StaffModel[]> {
    return await StaffModel.findAll(options)
  }

  /**
   * Finds a staff member by their ID and updates specified fields.
   * @param staffId - The ID of the staff member to update.
   * @param values - Partial object containing fields to update (e.g., classId).
   * @returns A promise resolving to the updated staff record or null if not found.
   */
  async findAndUpdateById(
    staffId: string,
    values: Partial<Pick<StaffModel, "classId">>
  ): Promise<StaffModel | null> {
    const staff = await StaffModel.findByPk(staffId)

    if (!staff) return null // Return null if staff record doesn't exist

    await staff.update(values) // Update staff record with new values
    return staff // Return the updated staff record
  }

  /**
   * Finds and deletes a staff record based on filtering options.
   * @param options - Filtering options to locate the staff record.
   * @returns A promise resolving to true if deletion was successful, false otherwise.
   */
  async delete(options: FindOptions<StaffModel>): Promise<boolean> {
    const staff = await StaffModel.findOne(options)

    if (!staff) return false // Return false if staff record doesn't exist

    await staff.destroy() // Delete the staff record
    return true // Return true to indicate successful deletion
  }
}
