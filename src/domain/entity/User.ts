import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
  Unique,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Project } from '@domain/entity/Project';

@Entity('user')
@Unique(['email'])
@Index(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'user_id', type: 'bigint' })
  id!: bigint;

  @Column('varchar')
  email!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar')
  username!: string;

  @OneToMany(() => Project, (project: Project) => project.user, { cascade: true })
  projects!: Array<Project>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd() {
    this.password = await this.cryptPassword(this.password);
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async checkLoginProcess(user: User): Promise<boolean> {
    return bcrypt.compare(user.password, this.password);
  }
}
