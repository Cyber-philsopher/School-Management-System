import { IsUUID } from "class-validator"

/**
 * Data Transfer Object (DTO) for updating a student's details.
 * Ensures that the provided data meets validation requirements before processing.
 */
export class UpdateStudentDto {
  /**
   * The unique identifier for the new class the student is being assigned to.
   * Must be a valid UUID.
   */
  @IsUUID()
  classId!: string
}
