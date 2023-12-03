import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { PublicationEntity } from './publication.entity';

@Entity({ name: 'users' })
export class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  img!: string;

  @Column({ type: 'varchar', length: 255, default: '12345' })
  password!: string;

  @OneToMany(() => PublicationEntity, (publication) => publication.author)
  publications!: PublicationEntity[];
}
