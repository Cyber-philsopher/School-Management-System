import { IsUUID } from "class-validator"

/**
 * Data Transfer Object (DTO) for creating a staff record.
 * Ensures that the provided data meets validation requirements before processing.
 */
export class CreateStaffDto {
  /**
   * The unique identifier of the user associated with the staff.
   * Must be a valid UUID, enforced by class-validator.
   */
  @IsUUID()
  userId!: string

  /**
   * The unique identifier of the class assigned to the staff.
   * Must be a valid UUID, enforced by class-validator.
   */
  @IsUUID()
  classId!: string
}
