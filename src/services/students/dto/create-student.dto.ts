import { IsUUID } from "class-validator"

/**
 * Data Transfer Object (DTO) for creating a student.
 * Ensures that the provided data meets validation requirements before processing.
 */
export class CreateStudentDto {
  /**
   * The unique identifier for the user associated with the student.
   * Must be a valid UUID.
   */
  @IsUUID()
  userId!: string

  /**
   * The unique identifier for the class the student is being assigned to.
   * Must be a valid UUID.
   */
  @IsUUID()
  classId!: string
}
