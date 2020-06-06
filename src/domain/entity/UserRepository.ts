import { User } from '@domain/entity/User';

export interface UserRepository {
  findAll(): Promise<User[]>;
}
