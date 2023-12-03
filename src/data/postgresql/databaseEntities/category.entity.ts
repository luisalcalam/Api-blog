import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  // @OneToMany(() => Publication, (publication) => publication.category)
  // publications: Publication[];
}
