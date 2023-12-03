import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { PublicationEntity } from '../data/postgresql/databaseEntities/publication.entity';
import { GenericService } from './generic.service';
import {
  CustomResponse,
  Pagination,
} from '../common/interfaces/common.interfaces';
import { PublicationParamsDto } from '../domain/dtos/publication/publicationsParams.dto';
import { CustomError } from '../common/utilities/custom.error';
export class PublicationService extends GenericService<
  PublicationEntity,
  string
> {
  constructor(private publicationRepo: Repository<PublicationEntity>) {
    super(publicationRepo, 'la publicación');
  }

  async findAllWithRelations(
    params: PublicationParamsDto
  ): Promise<CustomResponse<PublicationEntity[]>> {
    const { perPage, currentPage } = params;
    const queryBuilder: SelectQueryBuilder<PublicationEntity> =
      this.publicationRepo.createQueryBuilder('publication');
    queryBuilder
      .leftJoinAndSelect('publication.author', 'author')
      .leftJoinAndSelect('publication.category', 'category')
      .select([
        'publication',
        'author.id',
        'author.name',
        'category.id',
        'category.name',
      ]);

    if (params.authorId) {
      queryBuilder.where('publication.author_id = :id', {
        id: params.authorId,
      });
    }

    if (params.categoryId) {
      queryBuilder.andWhere('publication.category_id = :id', {
        id: params.categoryId,
      });
    }

    if (params.q) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('publication.title ILIKE :title', {
            title: `%${params.q}%`,
          }).orWhere('publication.content ILIKE :content', {
            content: `%${params.q}%`,
          });
        })
      );
    }

    let skip;
    if (!params.skip) {
      skip = (params.currentPage - 1) * params.perPage;
    } else {
      skip = params.skip;
    }

    queryBuilder.skip(skip).take(params.perPage);
    const data = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(data[1] / perPage);

    const pagination: Pagination = {
      perPage,
      currentPage,
      totalPages,
      totalRows: data[1],
    };
    return {
      content: data[0],
      pagination,
    };
  }

  async findOneBySlug(slug: string): Promise<PublicationEntity> {
    try {
      const queryBuilder: SelectQueryBuilder<PublicationEntity> =
        this.publicationRepo.createQueryBuilder('publication');

      queryBuilder
        .leftJoinAndSelect('publication.author', 'author')
        .leftJoinAndSelect('publication.category', 'category')
        .select([
          'publication',
          'author.id',
          'author.name',
          'category.id',
          'category.name',
        ]);

      queryBuilder.where('publication.slug = :slug', {
        slug: slug,
      });

      const publication = await queryBuilder.getOne();
      if (!publication) throw CustomError.notFound('Articulo no encontrado');
      return publication;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }
}
