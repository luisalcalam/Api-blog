import { Request, Response } from 'express';
import { CustomError } from '../../common/utilities/custom.error';
import { CategoryService } from '../../services/category.service';
import { CreateCategoryDto } from '../../domain/dtos/category/createCategory.dto';
import { DeepPartial } from '../../common/types/common.types';
import { CategoryEntity } from '../../data/postgresql/databaseEntities/category.entity';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class CategoryController {
  constructor(public readonly categoryService: CategoryService) {}

  // private handleError = (error: unknown, res: Response) => {
  //   if (error instanceof CustomError) {
  //     return res.status(error.statusCode).json({ error: error.message });
  //   }

  //   console.log(`${error}`);
  //   return res.status(500).json({ error: 'Internal server error' });
  // };

  getAll = async (req: Request, res: Response) => {
    console.log(req.query);
    const [paginationDto, _] = await PaginationDto.create(req.query);
    const response = await this.categoryService.findAll(paginationDto);
    res.json({ response });
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.categoryService.findOne(+id);
    res.json({ response });
  };

  post = async (req: Request, res: Response) => {
    const [errors, createCategoryDto] = await CreateCategoryDto.create(
      req.body
    );
    if (errors) return res.status(400).json({ errors });
    const response = await this.categoryService.create(
      createCategoryDto as DeepPartial<CategoryEntity>
    );
    res.json({ response });
  };

  patch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [errors, updateCategoryDto] = await CreateCategoryDto.create(
      req.body
    );
    if (errors) return res.status(400).json({ errors });
    const response = await this.categoryService.update(
      +id,
      updateCategoryDto as DeepPartial<CategoryEntity>
    );
    res.json({ response });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.categoryService.delete(+id);
    res.json({ response });
  };
}
