import { Model, FindOptions } from "sequelize"

/**
 * BaseModel extends Sequelize's Model class to provide a customized `findAll` method.
 * This ensures that all retrieved records are returned in raw format by default.
 */
export class BaseModel extends Model {
  /**
   * Overrides the default `findAll` method to always return raw results.
   *
   * @param options - Optional query parameters to customize the data retrieval.
   * @returns A promise that resolves to an array of records with raw data format.
   */
  static async findAll<T extends Model>(
    this: { new (): T } & typeof Model, // Ensures proper type inference for subclasses
    options?: FindOptions<T> // Allows passing additional query options
  ): Promise<T[]> {
    return super.findAll({ ...options, raw: true }) as Promise<T[]>
  }
}
