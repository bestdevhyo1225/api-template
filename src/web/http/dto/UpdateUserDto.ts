import { IsDefined, IsEmail, IsOptional, IsPositive, IsString, validateOrReject } from 'class-validator';

export default class UpdateUserDto {
  @IsDefined({ message: 'id는 undefined가 될 수 없습니다.' })
  @IsPositive({ message: 'id는 양수 값이어야 합니다.' })
  private id: number = 1;

  @IsOptional()
  @IsEmail({}, { message: 'email은 email 형식을 유지해야 합니다.' })
  private email: string = '';

  @IsOptional()
  @IsString({ message: 'password는 string값이어야 합니다.' })
  private password: string = '';

  @IsOptional()
  @IsString({ message: 'username은 string값이어야 합니다.' })
  private username: string = '';

  public setId(id: number): UpdateUserDto {
    this.id = id;
    return this;
  }

  public setEmail(email: string): UpdateUserDto {
    this.email = email;
    return this;
  }

  public setPassword(password: string): UpdateUserDto {
    this.password = password;
    return this;
  }

  public setUsername(username: string): UpdateUserDto {
    this.username = username;
    return this;
  }

  public getId(): number {
    return this.id;
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
}
