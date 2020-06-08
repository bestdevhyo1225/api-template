import { User } from '@domain/entity/User';
import { UserRepository } from '@domain/entity/UserRepository';
import TempServiceCaller from '@infrastructure/grpc-caller/TempServiceCaller';
import { GrpcCaller } from 'grpc-caller';

export default class GetUser {
  private readonly userRepository: UserRepository;
  private readonly tempGrpcCaller: GrpcCaller;

  constructor(typeOrmUserRepository: UserRepository, tempServiceCaller: TempServiceCaller) {
    this.userRepository = typeOrmUserRepository;
    this.tempGrpcCaller = tempServiceCaller.getCaller();
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
