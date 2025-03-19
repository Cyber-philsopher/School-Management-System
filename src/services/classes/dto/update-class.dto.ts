import { IsString } from "class-validator"

/**
 * Data Transfer Object (DTO) for creating a class.
 * This DTO is used to validate the input data before creating a class entity.
 */
export class UpdateClassDto {
  /**
   * The name of the class.
   * It must be a non-empty string, validated using class-validator.
   */
  @IsString()
  name!: string
}
