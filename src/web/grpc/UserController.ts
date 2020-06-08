import { Context } from 'mali';
import GetUser from '@domain/usecase/user/GetUser';
import { User } from '@domain/entity/User';

export default class UserController {
  private readonly getUser: GetUser;

  constructor(getUser: GetUser) {
    this.getUser = getUser;
  }

  public list = async (ctx: Context): Promise<Context> => {
    const users: User[] = await this.getUser.findAll();
    ctx.res = { items: users };
    return ctx;
  };
}
