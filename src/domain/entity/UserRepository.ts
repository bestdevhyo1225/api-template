import { User } from '@domain/entity/User';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findOneById(userId: bigint): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  createOrUpdateOf(user: User): Promise<User>;
}
