import { validateOrReject, IsString, IsEmail, IsDefined } from 'class-validator';
import { User } from '@domain/entity/User';

export default class CreateUserDto {
  @IsDefined({ message: 'email은 undefined가 될 수 없습니다.' })
  @IsEmail({}, { message: 'email은 email 형식을 유지해야 합니다.' })
  private email: string = '';

  @IsDefined({ message: 'password는 undefined가 될 수 없습니다.' })
  @IsString({ message: 'password는 string값이어야 합니다.' })
  private password: string = '';

  @IsDefined({ message: 'username은 undefined가 될 수 없습니다.' })
  @IsString({ message: 'username은 string값이어야 합니다.' })
  private username: string = '';

  public setEmail(email: string): CreateUserDto {
    this.email = email;
    return this;
  }

  public setPassword(password: string): CreateUserDto {
    this.password = password;
    return this;
  }

  public setUsername(username: string): CreateUserDto {
    this.username = username;
    return this;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getUsername(): string {
    return this.username;
  }

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }

  public static toEntity(createUserDto: CreateUserDto): User {
    const user: User = new User();

    user.email = createUserDto.getEmail();
    user.password = createUserDto.getPassword();
    user.username = createUserDto.getUsername();

    return user;
  }
}
