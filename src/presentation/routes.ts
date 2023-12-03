import { Router } from 'express';

import { Authroutes } from './auth/routes';
import { CategoryRoutes } from './categories/routes';
// import { ProductRoutes } from './products/routes';
// import { FileUploadRoutes } from './file-upload/routes';
// import { ImageRoutes } from './images/routes';
import { PublicationsRoutes } from './publications/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', Authroutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/publications', PublicationsRoutes.routes);

    return router;
  }
}
