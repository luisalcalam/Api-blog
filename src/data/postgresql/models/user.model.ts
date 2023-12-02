import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from './basic.model';

@Entity({ name: 'users' })
export class User extends BasicEntity {
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
}
