import { Connection } from 'typeorm';
import { User } from '@domain/entity/User';

import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';

export default class GetService {
  private readonly typeOrmConnection: Connection;
  private readonly userRepository: TypeOrmUserRepository;

  constructor(typeOrmConnection: Connection, typeOrmUserRepository: TypeOrmUserRepository) {
    this.typeOrmConnection = typeOrmConnection;
    this.userRepository = typeOrmUserRepository;
  }

  public async findUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findUser(userId: bigint): Promise<User | undefined> {
    return this.userRepository.findOneById(userId);
  }

  public async login(user: User): Promise<boolean> {
    const findUser: User = (await this.userRepository.findOneByEmail(user.email)) as User;

    if (!findUser) {
      throw new Error('Not Found User');
    }

    return findUser.checkLoginProcess(user);
  }
}
