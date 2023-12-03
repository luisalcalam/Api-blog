import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BasicEntity } from './basic.entity';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'publications' })
@Unique(['slug'])
export class PublicationEntity extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'varchar', length: 255 })
  summary!: string;

  @Column({ type: 'integer' })
  wordCount!: number;

  @Column({ type: 'jsonb', nullable: true })
  readingTime!: { text: string; minutes: number; time: number; words: number };

  @ManyToOne(() => UserEntity, (user) => user.publications)
  @JoinColumn({ name: 'author_id' })
  author!: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.publications)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgUrl!: string;
}
