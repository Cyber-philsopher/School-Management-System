import { IsString } from "class-validator"

/**
 * Data Transfer Object (DTO) for creating a class.
 * Ensures that the provided data meets validation requirements before processing.
 */
export class CreateClassDto {
  /**
   * The name of the class.
   * Must be a string, enforced by class-validator.
   */
  @IsString()
  name!: string
}
