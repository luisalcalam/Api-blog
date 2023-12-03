import {
  IsNumber,
  IsOptional,
  IsUUID,
  validate,
  ValidationError,
} from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
export class PublicationParamsDto extends PaginationDto {
  constructor(
    q: string,
    perPage: string | number = 15,
    currentPage: string | number = 1,
    skip: number,
    categoryId: number,
    authorId: string
  ) {
    super(q, perPage, currentPage, skip);
    this.categoryId = categoryId;
    this.authorId = authorId;
  }

  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 6,
    },
    { message: 'El category Id debe ser numero' }
  )
  readonly categoryId?: number;

  @IsOptional()
  @IsUUID(undefined, { message: 'El author Id debe ser valido' })
  readonly authorId?: string;

  public static override async create(object: {
    [key: string]: any;
  }): Promise<[PaginationDto, ValidationError[]?]> {
    const { q, perPage, skip, currentPage, categoryId, authorId } = object;
    const newDto = new PublicationParamsDto(
      q,
      perPage,
      currentPage,
      skip,
      categoryId,
      authorId
    );

    const errors = await validate(newDto);
    const dtoErrors = errors?.length > 0 ? errors : undefined;

    return [newDto, dtoErrors];
  }
}
