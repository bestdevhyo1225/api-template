import { EntityRepository, Repository } from 'typeorm';
import { UserRepository } from '@domain/entity/UserRepository';
import { User } from '@domain/entity/User';

@EntityRepository(User)
export default class TypeOrmUserRepository extends Repository<User> implements UserRepository {
  public async findAll(): Promise<User[]> {
    return this.find();
  }
}
