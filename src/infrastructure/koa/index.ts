import { loadControllers, scopePerRequest } from 'awilix-koa';
import Router from 'koa-router';
import Koa from 'koa';

import { ConfigAll } from '../../common/utils/type-interface';
import config from '../../common/config';
import container from '../../container';
import middlewares from './middlewares';

export default () => {
  const { env, port, host }: ConfigAll = config;

  const app = new Koa();
  const router = new Router();

  app.use(scopePerRequest(container));
  app.use(loadControllers('../../web/http/**/controller.ts', { cwd: __dirname }));

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(port, host, () =>
    // eslint-disable-next-line no-console
    console.log(`Express server listening on ${host}:${port}, in ${env} mode`),
  );

  router.get('/health-check', middlewares.checkHealth);

  return app;
};
