import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { UserRepository } from '@domain/entity/UserRepository';
import { User } from '@domain/entity/User';

@EntityRepository(User)
export default class TypeOrmUserRepository extends Repository<User> implements UserRepository {
  public async findAll(): Promise<User[]> {
    return this.find();
  }

  public async findOneById(userId: number): Promise<User | undefined> {
    return this.findOne(userId.toString());
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  public async createOne(user: User): Promise<User> {
    return this.save(user);
  }

  public async updateOne(userId: number, user: Partial<User>): Promise<UpdateResult> {
    return this.update(userId, user);
  }
}
