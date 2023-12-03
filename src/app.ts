import 'reflect-metadata';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { DataSource } from 'typeorm';
import { UserEntity } from './data/postgresql/databaseEntities/user.entity';
import { CategoryEntity } from './data/postgresql/databaseEntities/category.entity';
import { PublicationEntity } from './data/postgresql/databaseEntities/publication.entity';

export const dataSourceDB = new DataSource({
  type: 'postgres',
  url: envs.POSTGRES_URL,
  database: envs.POSTGRES_DB,
  synchronize: true,
  // logging: true,
  entities: [UserEntity, CategoryEntity, PublicationEntity],
});

(async () => {
  main();
})();

async function main() {
  try {
    const server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });

    dataSourceDB.initialize().then(() => {
      console.log(`Database conected`);
    });

    server.start();
  } catch (error) {
    console.log(error);
  }
}
