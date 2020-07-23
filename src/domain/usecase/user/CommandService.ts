import { Connection } from 'typeorm';

import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';
import TypeOrmUserTransactionRepository from '@data/user/TypeOrmUserTransactionRepository';

import { User } from '@domain/entity/User';

export default class CommandService {
  private readonly typeOrmConnection: Connection;
  private readonly userRepository: TypeOrmUserRepository;
  private readonly userTransactionRepository: TypeOrmUserTransactionRepository;

  constructor(
    typeOrmConnection: Connection,
    typeOrmUserRepository: TypeOrmUserRepository,
    typeOrmUserTransactionRepository: TypeOrmUserTransactionRepository,
  ) {
    this.typeOrmConnection = typeOrmConnection;
    this.userRepository = typeOrmUserRepository;
    this.userTransactionRepository = typeOrmUserTransactionRepository;
  }

  public async createOrUpdateUser(user: User): Promise<bigint> {
    const { id }: Partial<User> = await this.userRepository.createOrUpdateOf(user);
    return id;
  }
}
