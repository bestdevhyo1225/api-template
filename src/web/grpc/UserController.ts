import { Context } from 'mali';
import GetUser from '@domain/usecase/GetUser';

export default class EventPromotionController {
  private readonly getUser: GetUser;

  constructor(getUser: GetUser) {
    this.getUser = getUser;
  }

  public async list(ctx: Context): Promise<Context> {
    ctx.res = await this.getUser.findAll();
    return ctx;
  }
}
