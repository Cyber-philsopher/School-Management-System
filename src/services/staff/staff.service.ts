import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"
import { CreateStaffDto } from "./dto/create-staff.dto"
import { UpdateStaffDto } from "./dto/update-staff.dto"
import { StaffRepository } from "../../repository/staff.repository"
import { handleError, ValidationError } from "../../utils/errorHandler"

/**
 * Service class for handling staff-related operations.
 * This class interacts with the StaffRepository to perform database operations.
 */
export class StaffService {
  private staffRepository: StaffRepository

  /**
   * Initializes the StaffService with a StaffRepository instance.
   * @param staffRepository - The repository instance for handling staff data.
   */
  constructor(staffRepository: StaffRepository) {
    this.staffRepository = staffRepository
  }

  /**
   * Creates a new staff record after validating the input data.
   * @param staff - The staff data to be created.
   * @returns The newly created staff record.
   * @throws ValidationError if the input data is invalid.
   */
  async create(staff: CreateStaffDto) {
    const createStaffDto = plainToInstance(CreateStaffDto, staff)

    const errors = await validate(createStaffDto)
    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      return await this.staffRepository.create(createStaffDto)
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Retrieves all staff records.
   * @returns A list of staff members.
   */
  async findAll() {
    return await this.staffRepository.findAll()
  }

  /**
   * Retrieves a staff record by its unique staff ID.
   * @param staffId - The unique identifier of the staff.
   * @returns The staff record if found, otherwise null.
   */
  async findByPk(staffId: string) {
    return await this.staffRepository.find(staffId)
  }

  /**
   * Updates a staff record by its unique staff ID after validating the update data.
   * @param staffId - The unique identifier of the staff.
   * @param values - The fields to update.
   * @returns The updated staff record if successful, otherwise null.
   * @throws ValidationError if the input data is invalid.
   */
  async findAndUpdateById(staffId: string, values: UpdateStaffDto) {
    const updateStaffDto = plainToInstance(UpdateStaffDto, values)

    const errors = await validate(updateStaffDto)
    if (errors.length > 0) {
      throw new ValidationError(`Validation failed: ${JSON.stringify(errors)}`)
    }

    try {
      return await this.staffRepository.findAndUpdateById(staffId, values)
    } catch (error) {
      handleError(error)
    }
  }

  /**
   * Deletes a staff record by its unique staff ID.
   * @param staffId - The unique identifier of the staff.
   * @returns True if the deletion was successful, otherwise false.
   * @throws ValidationError if no staff ID is provided.
   */
  async delete(staffId: string) {
    if (!staffId) throw new ValidationError("Staff ID is required")

    try {
      return await this.staffRepository.delete({
        where: { staffId },
      })
    } catch (error) {
      handleError(error)
    }
  }
}
