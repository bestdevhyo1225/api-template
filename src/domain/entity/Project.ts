import { BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@domain/entity/User';

export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'project_id', type: 'bigint' })
  id!: bigint;

  @Column('varchar')
  name!: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
