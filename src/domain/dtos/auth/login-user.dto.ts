import {
  IsNotEmpty,
  IsString,
  validate,
  ValidationError,
} from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'El nombre de usuario debe de ser texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es necesario' })
  username?: string;

  @IsString({ message: 'El password debe de ser texto' })
  @IsNotEmpty({ message: 'El password es necesario' })
  password?: string;
  private constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  static async create(object: {
    [key: string]: any;
  }): Promise<[ValidationError[]?, LoginUserDto?]> {
    const { username, password } = object;
    const newDto = new LoginUserDto(username, password);

    const errors = await validate(newDto);
    const dtoErrors = errors?.length > 0 ? errors : undefined;

    return [dtoErrors, newDto];
  }
}
