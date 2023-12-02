import 'reflect-metadata';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { DataSource } from 'typeorm';
import { User } from './data/postgresql/models/user.model';

export const dataSourceDB = new DataSource({
  type: 'postgres',
  url: envs.POSTGRES_URL,
  database: envs.POSTGRES_DB,
  synchronize: true,
  // logging: true,
  entities: [User],
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
