import { Connection } from 'typeorm';
import { Commands, Ok } from 'ioredis';

import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';
import TypeOrmUserTransactionRepository from '@data/user/TypeOrmUserTransactionRepository';

import { User } from '@domain/entity/User';
import ViewUserDto from '@web/http/dto/ViewUserDto';

export default class CommandService {
  private readonly typeOrmConnection: Connection;
  private readonly ioRedisConnection: Commands;
  private readonly userRepository: TypeOrmUserRepository;
  private readonly userTransactionRepository: TypeOrmUserTransactionRepository;

  constructor(
    typeOrmConnection: Connection,
    ioRedisConnection: Commands,
    typeOrmUserRepository: TypeOrmUserRepository,
    typeOrmUserTransactionRepository: TypeOrmUserTransactionRepository,
  ) {
    this.typeOrmConnection = typeOrmConnection;
    this.ioRedisConnection = ioRedisConnection;
    this.userRepository = typeOrmUserRepository;
    this.userTransactionRepository = typeOrmUserTransactionRepository;
  }

  public async createOrUpdateUser(user: User): Promise<bigint> {
    const { id }: Partial<User> = await this.userRepository.createOrUpdateOf(user);
    return id;
  }

  public async createUserOfRedis(user: ViewUserDto): Promise<Ok | null> {
    return this.ioRedisConnection.setex(user.getId().toString(), 60, JSON.stringify(user));
  }
}
