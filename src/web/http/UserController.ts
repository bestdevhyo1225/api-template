import { Context } from 'koa';
import { before, GET, PATCH, POST, route } from 'awilix-koa';

import ViewUserDto from '@web/http/dto/ViewUserDto';

import { User } from '@domain/entity/User';
import GetService from '@domain/usecase/user/GetService';
import CommandService from '@domain/usecase/user/CommandService';

import { validCreateUserDto, validLoginUserDto, validUpdateUserDto } from '@infrastructure/koa/Middleware';
import LoginUserDto from '@web/http/dto/LoginUserDto';
import ViewUserDetailDto from '@web/http/dto/ViewUserDetailDto';
// import UpdateUserDto from '@web/http/dto/UpdateUserDto';

@route('/users')
export default class UserController {
  private readonly getService: GetService;
  private readonly commandService: CommandService;

  constructor(getService: GetService, commandService: CommandService) {
    this.getService = getService;
    this.commandService = commandService;
  }

  @GET()
  public async findUsers(ctx: Context): Promise<Context> {
    const findUsers: Array<User> = await this.getService.findUsers();

    const users: Array<ViewUserDto> = findUsers.map((user: User) => {
      return ViewUserDto.of(user);
    });

    return ctx.success({ items: users });
  }

  @GET()
  @route('/:id')
  public async findUser(ctx: Context): Promise<Context> {
    const { id } = ctx.params;

    // const strFindUser: string | null = await this.getService.findUserByRedis(id);
    //
    // if (strFindUser && strFindUser.length > 0) {
    //   return ctx.success({ ...JSON.parse(strFindUser) });
    // }

    const findUser: User | undefined = await this.getService.findUser(id);

    if (!findUser) {
      ctx.status = 404;
      return ctx.error('해당 유저를 찾을 수 없습니다.');
    }

    const user: ViewUserDetailDto = await ViewUserDetailDto.of(findUser);

    // await this.commandService.createUserOfRedis(user);

    return ctx.success({ ...user });
  }

  @POST()
  @route('/sign-up')
  @before(validCreateUserDto)
  public async signUp(ctx: Context): Promise<Context> {
    const { createUserDto } = ctx.request.body;

    try {
      const createdUserId: number = await this.commandService.createUser(createUserDto);

      return ctx.success({ createdUserId });
    } catch (error) {
      ctx.status = 500;
      return ctx.error('Internal Server Error');
    }
  }

  @POST()
  @route('/login')
  @before(validLoginUserDto)
  public async login(ctx: Context): Promise<Context> {
    const { loginUserDto } = ctx.request.body;

    try {
      const isLogin = await this.getService.login(LoginUserDto.toEntity(loginUserDto));

      return ctx.success({ isLogin });
    } catch (error) {
      if (error.message === 'Not Found User') {
        ctx.status = 404;
        return ctx.error('해당 유저를 찾을 수 없습니다.');
      }

      ctx.status = 500;
      return ctx.error('Internal Server Error');
    }
  }

  @PATCH()
  @before(validUpdateUserDto)
  public async updateUser(ctx: Context): Promise<Context> {
    const { updateUserDto } = ctx.request.body;

    try {
      const isUpdated: boolean = await this.commandService.updateUser(updateUserDto);

      return ctx.success({ isUpdated });
    } catch (error) {
      ctx.status = 500;
      return ctx.error('Internal Server Error');
    }
  }
}
