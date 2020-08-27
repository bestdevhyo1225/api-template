import { User } from '@domain/entity/User';
import { UpdateResult } from 'typeorm';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findOneById(userId: number): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  createOne(user: User): Promise<User>;
  updateOne(userId: number, user: Partial<User>): Promise<UpdateResult>;
}
