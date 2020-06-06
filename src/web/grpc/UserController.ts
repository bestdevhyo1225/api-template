import { Context } from 'mali';
import GetUser from '@domain/usecase/user/GetUser';

export default class UserController {
  private readonly getUser: GetUser;

  constructor(getUser: GetUser) {
    this.getUser = getUser;
  }

  public list = async (ctx: Context): Promise<Context> => {
    ctx.res = await this.getUser.findAll();
    return ctx;
  };
}
