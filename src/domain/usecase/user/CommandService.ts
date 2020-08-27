import { Connection, UpdateResult } from 'typeorm';

import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';

import { User } from '@domain/entity/User';
import { Project } from '@domain/entity/Project';
import CreateUserDto from '@web/http/dto/CreateUserDto';
import UpdateUserDto from '@web/http/dto/UpdateUserDto';

export default class CommandService {
  private readonly typeOrmConnection: Connection;
  // private readonly ioRedisConnection: Commands;
  private readonly userRepository: TypeOrmUserRepository;

  constructor(
    typeOrmConnection: Connection,
    // ioRedisConnection: Commands,
    typeOrmUserRepository: TypeOrmUserRepository,
  ) {
    this.typeOrmConnection = typeOrmConnection;
    // this.ioRedisConnection = ioRedisConnection;
    this.userRepository = typeOrmUserRepository;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<number> {
    const projects: Array<Project> = Project.createProjects(createUserDto.getProjects());

    const user: User = User.createUser(createUserDto, projects);

    const { id }: User = await this.userRepository.createOne(user);

    return id;
  }

  public async updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
    const user: User = new User();

    user.changeUser(updateUserDto);

    const { raw }: UpdateResult = await this.userRepository.updateOne(user.id, user);

    return !!raw.changedRows;
  }

  // public async createUserOfRedis(user: ViewUserDto): Promise<Ok | null> {
  //   return this.ioRedisConnection.setex(user.getId().toString(), 60, JSON.stringify(user));
  // }
}
