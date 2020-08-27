import { validateOrReject, IsString, IsEmail, IsDefined, IsArray, ValidateNested } from 'class-validator';
import { CreateProjectDtos } from '@web/http/dto/CreateProjectDtos';
import { Type } from 'class-transformer';

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

  @IsDefined({ message: 'projects은 undefined가 될 수 없습니다.' })
  @IsArray({ message: 'projects는 Array 형식을 유지해야 합니다.' })
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDtos)
  private projects: Array<CreateProjectDtos> = [];

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

  public setProjects(projects: Array<{ name: string }>): CreateUserDto {
    this.projects = projects.map(({ name }: { name: string }) => new CreateProjectDtos().setName(name));
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

  public getProjects(): Array<{ name: string }> {
    return this.projects.map((project: CreateProjectDtos) => {
      return { name: project.getName() };
    });
  }

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
