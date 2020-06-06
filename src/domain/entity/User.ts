import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, Index, Unique } from 'typeorm';
import bcrypt from 'bcrypt-nodejs';

@Entity('user')
@Unique(['username', 'email'])
@Index(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: bigint;

  @Column('varchar')
  username!: string;

  @Column('varchar')
  email!: string;

  @Column('varchar')
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd() {
    this.password = await this.cryptPassword(this.password);
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
