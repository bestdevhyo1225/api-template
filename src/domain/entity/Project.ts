import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@domain/entity/User';

@Entity('project')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'project_id', type: 'bigint' })
  id!: number;

  @Column('varchar')
  name!: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  private static createProject(name: string): Project {
    const project: Project = new Project();

    project.name = name;

    return project;
  }

  public static createProjects(projects: Array<{ name: string }>): Array<Project> {
    return projects.map(({ name }: { name: string }) => this.createProject(name));
  }
}
