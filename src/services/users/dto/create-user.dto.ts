import { IsInt, IsOptional, IsString, Max, Min } from "class-validator"

/**
 * DTO (Data Transfer Object) for creating a new user.
 * Ensures data validation before processing.
 */
export class CreateUserDto {
  /**
   * The first name of the user.
   * Must be a string and is required.
   */
  @IsString()
  firstName!: string

  /**
   * The last name of the user.
   * Must be a string and is required.
   */
  @IsString()
  lastName!: string

  /**
   * The optional age of the user.
   * Must be an integer between 0 and 25 (inclusive).
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(25)
  age?: number
}
