import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../users.constants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 240 })
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
}
