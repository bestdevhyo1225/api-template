import Mali from 'mali';
import { AwilixContainer } from 'awilix';
import UserController from '@web/grpc/UserController';

export default (app: Mali, container: AwilixContainer) => {
  const userController: UserController = container.resolve('userController');

  app.use('FindUsers', userController.list);

  return app;
};
