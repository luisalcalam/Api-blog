import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  validate,
  ValidationError,
} from 'class-validator';

export class PaginationDto {
  private constructor(
    q: string,
    perPage: string | number = 15,
    currentPage: string | number = 1,
    skip: number
  ) {
    this.q = q;
    this.perPage = Number(perPage);
    this.currentPage = Number(currentPage);
    this.skip = skip;
  }

  @IsOptional()
  @IsString({ message: 'La busqueda debe ser texto' })
  readonly q?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly perPage: number = 15;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly currentPage: number = 1;

  @IsOptional()
  @IsNumber()
  readonly skip?: number;

  static async create(object: {
    [key: string]: any;
  }): Promise<[PaginationDto, ValidationError[]?]> {
    const { q, perPage, skip, currentPage } = object;
    const newDto = new PaginationDto(q, perPage, currentPage, skip);

    const errors = await validate(newDto);
    const dtoErrors = errors?.length > 0 ? errors : undefined;

    return [newDto, dtoErrors];
  }
}
