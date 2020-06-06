import glob from 'glob';
import Mali, { Context } from 'mali';
// import maliLogger from '@seoulstore/mali-logger';
import addController from '@web/grpc';
import config from '@common/config';
import { AwilixContainer } from 'awilix';

export default (container: AwilixContainer): void => {
  const { host, port } = config;

  let app: Mali = new Mali();

  glob.sync('idl/user.proto').forEach(file => app.addService(file, ''));

  // app.use(maliLogger());

  app = addController(app, container);

  app.start(`${host}:${port}`);

  // eslint-disable-next-line no-console
  console.log('grpc server listening on %s, in %s port', host, port);

  app.on('error', (err: Error, ctx: Context) => {
    // eslint-disable-next-line no-console
    console.error('server error for call %s of type %s', ctx.name, ctx.type, err);
  });
};
