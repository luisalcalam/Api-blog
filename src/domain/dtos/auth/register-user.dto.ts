import {
  IsNotEmpty,
  IsString,
  validate,
  ValidationError,
} from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'El nombre debe de ser texto' })
  @IsNotEmpty({ message: 'El nombre es necesario' })
  name?: string;

  @IsString({ message: 'El nombre de usuario debe de ser texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es necesario' })
  username?: string;

  @IsString({ message: 'El password debe de ser texto' })
  @IsNotEmpty({ message: 'El password es necesario' })
  password?: string;
  private constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  static async create(object: {
    [key: string]: any;
  }): Promise<[ValidationError[]?, RegisterUserDto?]> {
    const { name, username, password } = object;
    const newDto = new RegisterUserDto(name, username, password);

    const errors = await validate(newDto);
    const dtoErrors = errors?.length > 0 ? errors : undefined;

    return [dtoErrors, newDto];
  }
}
