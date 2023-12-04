import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../../services/auth.service';
import { dataSourceDB } from '../../app';
import { UserEntity } from '../../data/postgresql/databaseEntities/user.entity';

export class Authroutes {
  static get routes(): Router {
    const router = Router();

    const userRepository = dataSourceDB.getRepository(UserEntity);

    const authService = new AuthService(userRepository);

    const controller = new AuthController(authService);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.get('/author', controller.getAll);

    return router;
  }
}
