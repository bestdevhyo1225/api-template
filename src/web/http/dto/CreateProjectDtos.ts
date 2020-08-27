import { IsString } from 'class-validator';

export default class CreateProjectDto {
  @IsString({ message: 'project name은 string 값이어야 합니다.' })
  private name: string = '';

  public setName(name: string): CreateProjectDto {
    this.name = name;
    return this;
  }

  public getName(): string {
    return this.name;
  }
}
