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
import CreateUserDto from '@web/http/dto/CreateUserDto';

@Entity('user')
@Unique(['email'])
@Index(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'user_id', type: 'bigint' })
  id!: number;

  @Column('varchar')
  email!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar')
  username!: string;

  // Promise를 사용하면, Default Loading은 Lazy가 됨
  @OneToMany(() => Project, (project: Project) => project.user, { cascade: true })
  projects!: Promise<Array<Project>>;

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

  public static createUser(createUserDto: CreateUserDto, projects: Array<Project>): User {
    const user: User = new User();

    user.email = createUserDto.getEmail();
    user.password = createUserDto.getPassword();
    user.username = createUserDto.getUsername();
    // JPA와 다르게 '연관 관계 편의 메소드'가 필요없고, 아래와 같이 구현하면 됨
    user.projects = Promise.resolve(projects);

    return user;
  }
}
