import { QueryRunner } from 'typeorm';
import { User } from '@domain/entity/User';

export default class TypeOrmUserTransactionRepository {
  public async create(queryRunner: QueryRunner, user: User): Promise<User> {
    return queryRunner.manager.save(user);
  }
}
