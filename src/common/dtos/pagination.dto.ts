export class PaginationDto {
  // @IsOptional()
  // @IsString({ message: 'La busqueda debe ser texto' })
  // @ApiProperty({ description: `Text to search` })
  readonly search?: string;

  // @IsOptional()
  // @IsNumber()
  // @IsPositive()
  // @ApiProperty({ description: `Number of rows per page`, default: 15 })
  readonly perPage: number = 15;

  // @IsOptional()
  // @IsNumber()
  // @IsPositive()
  // @ApiProperty({ description: `Number of current page`, default: 1 })
  readonly currentPage: number = 1;

  // @IsOptional()
  // @IsNumber()
  // @ApiProperty({ description: `Skip data`, default: 1 })
  readonly skip?: number;
}
