import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { PublicationEntity } from './publication.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @OneToMany(() => PublicationEntity, (publication) => publication.category)
  publications!: PublicationEntity[];
}
