import { Router } from 'express';
import { CategoryController } from './controller';
import { CategoryService } from '../../services/category.service';
import { dataSourceDB } from '../../app';
import { CategoryEntity } from '../../data/postgresql/databaseEntities/category.entity';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryRepo = dataSourceDB.getRepository(CategoryEntity);

    const categoryService = new CategoryService(categoryRepo);

    const controller = new CategoryController(categoryService);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getOne);
    router.post('/', controller.post);
    router.patch('/:id', controller.patch);
    router.delete('/:id', controller.delete);

    return router;
  }
}
