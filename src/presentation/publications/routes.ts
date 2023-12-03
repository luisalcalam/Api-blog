import { Router } from 'express';
import { dataSourceDB } from '../../app';
import { PublicationController } from './controller';
import { PublicationEntity } from '../../data/postgresql/databaseEntities/publication.entity';
import { PublicationService } from '../../services/publication.service';

export class PublicationsRoutes {
  static get routes(): Router {
    const router = Router();

    const publicationRepo = dataSourceDB.getRepository(PublicationEntity);

    const publicationService = new PublicationService(publicationRepo);

    // const controller = new CategoryController(categoryService);
    const controller = new PublicationController(publicationService);

    router.get('/', controller.getAll);
    router.get('/:id', controller.getOne);
    router.get('/slug/:url', controller.getOneBySlug);
    router.post('/', controller.post);
    router.patch('/:id', controller.patch);
    router.delete('/:id', controller.delete);

    return router;
  }
}
