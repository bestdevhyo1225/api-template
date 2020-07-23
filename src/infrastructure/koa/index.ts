import Koa from 'koa';
import body from 'koa-body';
import jsend from 'koa-jsend';
import morgan from 'koa-morgan';
import health from 'koa-simple-healthcheck';
import { AwilixContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import { ConfigAll } from '@common/types/config/all';
import config from '@common/config';

export default (container: AwilixContainer): void => {
  const { host, port, env }: ConfigAll = config;

  const app = new Koa();

  app.use(morgan('dev'));
  app.use(jsend());
  app.use(body({ jsonLimit: '100mb', parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'] }));

  app.use(scopePerRequest(container));
  app.use(loadControllers('../../web/http/**/*Controller.{js,ts}', { cwd: __dirname }));

  app.use(
    health({
      healthy() {
        return { healthy: true };
      },
    }),
  );

  app.on('error', (err: Error) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

  app.listen(port, host, () =>
    // eslint-disable-next-line no-console
    console.log(`Koa server listening on ${host}:${port}, in ${env} mode`),
  );
};
