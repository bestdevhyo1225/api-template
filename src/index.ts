import initKoa from '@infrastructure/koa';
import { initDB } from '@infrastructure/typeorm';
import { initContainer } from './container';
import { Connection } from 'typeorm';
import { AwilixContainer } from 'awilix';

initDB()
  .then((dbConnection: Connection) => initContainer(dbConnection))
  .then((container: AwilixContainer) => initKoa(container))
  .catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error('Server failed to start due to error: %s', err);
  });
