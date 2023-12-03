import {
  IsNotEmpty,
  IsString,
  validate,
  ValidationError,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'El nombre debe de ser texto' })
  @IsNotEmpty({ message: 'El nombre es necesario' })
  name?: string;
  private constructor(name: string) {
    this.name = name;
  }

  static async create(object: {
    [key: string]: any;
  }): Promise<[ValidationError[]?, CreateCategoryDto?]> {
    const { name } = object;
    const newDto = new CreateCategoryDto(name);

    const errors = await validate(newDto);
    const dtoErrors = errors?.length > 0 ? errors : undefined;

    return [dtoErrors, newDto];
  }
}
