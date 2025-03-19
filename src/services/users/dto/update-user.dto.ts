import { IsInt, IsOptional, IsString, Max, Min } from "class-validator"

/**
 * DTO (Data Transfer Object) for updating user details.
 * Ensures that only valid and optional fields are updated.
 */
export class UpdateUserDto {
  /**
   * The optional first name of the user.
   * Must be a string if provided.
   */
  @IsOptional()
  @IsString()
  firstName?: string

  /**
   * The optional last name of the user.
   * Must be a string if provided.
   */
  @IsOptional()
  @IsString()
  lastName?: string

  /**
   * The optional age of the user.
   * Must be an integer between 0 and 25 (inclusive) if provided.
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(25)
  age?: number
}
