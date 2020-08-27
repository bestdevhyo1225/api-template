import { Connection } from 'typeorm';

import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';
import TypeOrmUserTransactionRepository from '@data/user/TypeOrmUserTransactionRepository';

import { User } from '@domain/entity/User';
import { Project } from '@domain/entity/Project';
import CreateUserDto from '@web/http/dto/CreateUserDto';
import UpdateUserDto from '@web/http/dto/UpdateUserDto';

export default class CommandService {
  private readonly typeOrmConnection: Connection;
  // private readonly ioRedisConnection: Commands;
  private readonly userRepository: TypeOrmUserRepository;
  private readonly userTransactionRepository: TypeOrmUserTransactionRepository;

  constructor(
    typeOrmConnection: Connection,
    // ioRedisConnection: Commands,
    typeOrmUserRepository: TypeOrmUserRepository,
    typeOrmUserTransactionRepository: TypeOrmUserTransactionRepository,
  ) {
    this.typeOrmConnection = typeOrmConnection;
    // this.ioRedisConnection = ioRedisConnection;
    this.userRepository = typeOrmUserRepository;
    this.userTransactionRepository = typeOrmUserTransactionRepository;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<number> {
    const projects: Array<Project> = Project.createProjects(createUserDto.getProjects());

    const user: User = User.createUser(createUserDto, projects);

    const { id }: Partial<User> = await this.userRepository.createOrUpdate(user);

    return id;
  }

  public async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();

    user.id = updateUserDto.getId();
    user.email = updateUserDto.getEmail();
    user.password = updateUserDto.getPassword();
    user.username = updateUserDto.getUsername();

    return this.userRepository.createOrUpdate(user);
  }

  // public async createUserOfRedis(user: ViewUserDto): Promise<Ok | null> {
  //   return this.ioRedisConnection.setex(user.getId().toString(), 60, JSON.stringify(user));
  // }
}
