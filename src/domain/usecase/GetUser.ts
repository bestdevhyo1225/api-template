import { UserRepository } from '@domain/entity/UserRepository';
import { User } from '@domain/entity/User';

export default class GetEventPromotion {
  private readonly userRepository: UserRepository;

  constructor(typeOrmUserRepository: UserRepository) {
    this.userRepository = typeOrmUserRepository;
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
