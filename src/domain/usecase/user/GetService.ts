import { Connection } from 'typeorm';

import { User } from '@domain/entity/User';

import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';

export default class GetService {
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

  public async findUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findUser(userId: number): Promise<User | undefined> {
    return this.userRepository.findOneById(userId);
  }

  // public async findUserByRedis(userId: bigint): Promise<string | null> {
  //   return this.ioRedisConnection.get(userId.toString());
  // }

  public async login(user: User): Promise<boolean> {
    const findUser: User = (await this.userRepository.findOneByEmail(user.email)) as User;

    if (!findUser) {
      throw new Error('Not Found User');
    }

    return findUser.checkLoginProcess(user);
  }
}
