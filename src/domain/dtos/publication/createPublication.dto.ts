import {
  IsNotEmpty,
  IsString,
  validate,
  ValidationError,
  IsUrl,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString({ message: 'El título debe ser texto' })
  @IsNotEmpty({ message: 'El título es necesario' })
  title?: string;

  @IsString({ message: 'El contenido debe ser texto' })
  @IsUUID(undefined, { message: 'El contenido debe ser uuid' })
  @IsNotEmpty({ message: 'El contenido es necesario' })
  authorId: string;

  @IsNumber(undefined, { message: 'El contenido debe ser número' })
  @IsNotEmpty({ message: 'El contenido es necesario' })
  categoryId: number;

  @IsString({ message: 'El contenido debe ser texto' })
  @IsNotEmpty({ message: 'El contenido es necesario' })
  content?: string;

  @IsOptional()
  @IsUrl(undefined, { message: 'La URL de la imagen debe ser valida' })
  imgUrl?: string;

  private constructor(
    title: string,
    content: string,
    imgUrl: string,
    authorId: string,
    categoryId: number
  ) {
    this.title = title;
    this.content = content;
    this.imgUrl = imgUrl;
    this.authorId = authorId;
    this.categoryId = categoryId;
  }

  static async create(object: {
    [key: string]: any;
  }): Promise<[CreatePublicationDto, ValidationError[]?]> {
    const { title, content, imgUrl, authorId, categoryId } = object;
    const newDto = new CreatePublicationDto(
      title,
      content,
      imgUrl,
      authorId,
      categoryId
    );

    const errors = await validate(newDto);
    const dtoErrors = errors?.length > 0 ? errors : undefined;

    return [newDto, dtoErrors];
  }
}
