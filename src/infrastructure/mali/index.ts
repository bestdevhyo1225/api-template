import glob from 'glob';
import logger from '@seoulstore/mali-logger';
import Mali, { Context } from 'mali';
import { AwilixContainer } from 'awilix';
import { ConfigAll } from '@common/types/config/all';
import addController from '@web/grpc';
import config from '@common/config';

export default (container: AwilixContainer): void => {
  const { host, port }: ConfigAll = config;

  let app: Mali = new Mali();

  glob.sync('idl/*.proto').forEach(file => app.addService(file, ''));

  app.use(logger());

  app = addController(app, container);

  app.start(`${host}:${port}`);

  // eslint-disable-next-line no-console
  console.log('grpc server listening on %s, in %s port', host, port);

  app.on('error', (err: Error, ctx: Context) => {
    // eslint-disable-next-line no-console
    console.error('server error for call %s of type %s', ctx.name, ctx.type, err);
  });
};
