import { Context, Next } from 'koa';
import CreateUserDto from '@web/http/dto/CreateUserDto';
import UpdateUserDto from '@web/http/dto/UpdateUserDto';
import LoginUserDto from '@web/http/dto/LoginUserDto';

export const validCreateUserDto = async (ctx: Context, next: Next) => {
  const { email, password, username, projects } = ctx.request.body;

  try {
    const createUserDto: CreateUserDto = new CreateUserDto()
      .setEmail(email)
      .setPassword(password)
      .setUsername(username)
      .setProjects(projects);

    await createUserDto.validate();

    ctx.request.body = { createUserDto };

    return next();
  } catch (error) {
    const messages = error.map(({ constraints, children }) => {
      if (constraints) return constraints;
      return children[0].children[0].constraints;
    });
    return ctx.throw(400, JSON.stringify({ status: 'error', messages }));
  }
};

export const validUpdateUserDto = async (ctx: Context, next: Next) => {
  const { id, email, password, username } = ctx.request.body;

  try {
    const updateUserDto = new UpdateUserDto().setId(id).setEmail(email).setPassword(password).setUsername(username);

    await updateUserDto.validate();

    ctx.request.body = { updateUserDto };

    return next();
  } catch (error) {
    const messages = error.map(({ constraints }) => constraints);
    return ctx.throw(400, JSON.stringify({ status: 'error', messages }));
  }
};

export const validLoginUserDto = async (ctx: Context, next: Next) => {
  const { email, password } = ctx.request.body;

  try {
    const loginUserDto = new LoginUserDto().setEmail(email).setPassword(password);

    await loginUserDto.validate();

    ctx.request.body = { loginUserDto };

    return next();
  } catch (error) {
    const messages = error.map(({ constraints }) => constraints);
    return ctx.throw(400, JSON.stringify({ status: 'error', messages }));
  }
};
