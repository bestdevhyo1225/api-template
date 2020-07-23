import { Context } from 'mali';
import { User } from '@domain/entity/User';
import GetService from '@domain/usecase/user/GetService';

export default class UserController {
  private readonly getService: GetService;

  constructor(getService: GetService) {
    this.getService = getService;
  }

  public list = async (ctx: Context): Promise<Context> => {
    const users: Array<User> = await this.getService.findUsers();
    ctx.res = { items: users };
    return ctx;
  };
}
