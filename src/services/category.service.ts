import { Category } from '../domain/entities/category';
import { GenericService } from './generic.service';
import { CategoryEntity } from '../data/postgresql/databaseEntities/category.entity';
import { dataSourceDB } from '../app';
import { Repository } from 'typeorm';

export class CategoryService extends GenericService<CategoryEntity, number> {
  constructor(private categoryRepo: Repository<CategoryEntity>) {
    super(categoryRepo, 'la categoría');
  }
}
