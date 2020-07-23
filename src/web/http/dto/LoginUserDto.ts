import { IsDefined, IsEmail, IsString, validateOrReject } from 'class-validator';
import { User } from '@domain/entity/User';

export default class LoginUserDto {
  @IsDefined({ message: 'email은 undefined가 될 수 없습니다.' })
  @IsEmail({}, { message: 'email은 email 형식을 유지해야 합니다.' })
  private email: string = '';

  @IsDefined({ message: 'password는 undefined가 될 수 없습니다.' })
  @IsString({ message: 'password는 string값이어야 합니다.' })
  private password: string = '';

  public setEmail(email: string): LoginUserDto {
    this.email = email;
    return this;
  }

  public setPassword(password: string): LoginUserDto {
    this.password = password;
    return this;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }

  public static toEntity(loginUserDto: LoginUserDto): User {
    const user: User = new User();

    user.email = loginUserDto.getEmail();
    user.password = loginUserDto.getPassword();

    return user;
  }
}
