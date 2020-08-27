import { IsString } from 'class-validator';

export class CreateProjectDtos {
  @IsString({ message: 'project name은 string 값이어야 합니다.' })
  private name: string = '';

  public setName(name: string): CreateProjectDtos {
    this.name = name;
    return this;
  }

  public getName(): string {
    return this.name;
  }
}
