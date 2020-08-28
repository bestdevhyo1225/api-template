import { User } from '@domain/entity/User';
import { Project } from '@domain/entity/Project';

interface ProjectView {
  id: number;
  name: string;
}

export default class ViewUserDetailDto {
  private id: number = 0;

  private email: string = '';

  private username: string = '';

  private projects: Array<ProjectView> | undefined = [];

  private setId(id: number): ViewUserDetailDto {
    this.id = id;
    return this;
  }

  private setEmail(email: string): ViewUserDetailDto {
    this.email = email;
    return this;
  }

  private setUsername(username: string): ViewUserDetailDto {
    this.username = username;
    return this;
  }

  private setProjects(projects: Array<Project>): ViewUserDetailDto {
    this.projects = projects.map(({ id, name }: Project) => {
      return { id, name };
    });
    return this;
  }

  public getId(): number {
    return this.id;
  }

  public static async of(user: User): Promise<ViewUserDetailDto> {
    return new ViewUserDetailDto()
      .setId(user.id)
      .setEmail(user.email)
      .setUsername(user.username)
      .setProjects(await user.projects);
  }
}
