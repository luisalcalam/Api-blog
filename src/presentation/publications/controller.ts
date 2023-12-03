import { Request, Response, response } from 'express';
import { PublicationService } from '../../services/publication.service';
import { CreatePublicationDto } from '../../domain/dtos/publication/createPublication.dto';
import { DeepPartial } from '../../common/types/common.types';
import { PublicationEntity } from '../../data/postgresql/databaseEntities/publication.entity';
import { Publication } from '../../domain/entities/publication';
import { dataSourceDB } from '../../app';
import { CategoryEntity } from '../../data/postgresql/databaseEntities/category.entity';
import { CategoryService } from '../../services/category.service';
import { UserEntity } from '../../data/postgresql/databaseEntities/user.entity';
import { AuthService } from '../../services/auth.service';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { PublicationParamsDto } from '../../domain/dtos/publication/publicationsParams.dto';

export class PublicationController {
  categoryRepo = dataSourceDB.getRepository(CategoryEntity);
  categoryService = new CategoryService(this.categoryRepo);
  userRepo = dataSourceDB.getRepository(UserEntity);
  userService = new AuthService(this.userRepo);
  constructor(public readonly publicatonService: PublicationService) {}

  getAll = async (req: Request, res: Response) => {
    // const [paginationDto, _] = await PaginationDto.create(req.query);
    // const response = await this.publicatonService.findAll(paginationDto);
    const [publicationParamsDto, _] = await PublicationParamsDto.create(
      req.query
    );
    const response = await this.publicatonService.findAllWithRelations(
      publicationParamsDto
    );
    res.json({ response });
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.publicatonService.findOne(id);
    res.json({ response });
  };

  post = async (req: Request, res: Response) => {
    const [createPublicationDto, errors] = await CreatePublicationDto.create(
      req.body
    );
    if (errors) return res.status(400).json({ errors });
    const respCategory = await this.categoryService.findOne(
      createPublicationDto.categoryId
    );
    const respUser = await this.userService.findOne(
      createPublicationDto.authorId
    );
    const newPublication = Publication.fromObject(createPublicationDto);
    newPublication.category = respCategory.content;
    newPublication.author = respUser.content;
    const response = await this.publicatonService.create(
      newPublication as DeepPartial<PublicationEntity>
    );
    res.json({ response });
  };

  patch = async (req: Request, res: Response) => {
    // const { id } = req.params;
    // const [errors, updateCategoryDto] = await CreateCategoryDto.create(
    //   req.body
    // );
    // if (errors) return res.status(400).json({ errors });
    // const response = await this.categoryService.update(
    //   +id,
    //   updateCategoryDto as DeepPartial<CategoryEntity>
    // );
    // res.json({ response });
    res.json({ msg: 'patch' });
  };

  delete = async (req: Request, res: Response) => {
    // const { id } = req.params;
    // const response = await this.categoryService.delete(+id);
    // res.json({ response });
    res.json({ msg: 'Delete' });
  };
}
