import { User } from '@domain/entity/User';

export default class ViewUserDto {
  private id: bigint = 0n;

  private email: string = '';

  private username: string = '';

  private setId(id: bigint): ViewUserDto {
    this.id = id;
    return this;
  }

  private setEmail(email: string): ViewUserDto {
    this.email = email;
    return this;
  }

  private setUsername(username: string): ViewUserDto {
    this.username = username;
    return this;
  }

  public getId(): bigint {
    return this.id;
  }

  public static of(user: User): ViewUserDto {
    return new ViewUserDto().setId(user.id).setEmail(user.email).setUsername(user.username);
  }
}
