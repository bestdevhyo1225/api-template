import { Commands } from 'ioredis';
import { Connection } from 'typeorm';
import { AwilixContainer } from 'awilix';

import { initContainer } from './container';
import { initDB } from '@infrastructure/typeorm';
import { initRedis } from '@infrastructure/ioredis';
import initKoa from '@infrastructure/koa';

const startDatabase = async (): Promise<AwilixContainer> => {
  try {
    const dbConnection: Connection = await initDB();
    const redisConnection: Commands = await initRedis();

    return initContainer(dbConnection, redisConnection);
  } catch (error) {
    return error;
  }
};

startDatabase()
  .then((container: AwilixContainer) => initKoa(container))
  .catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error('Server failed to start due to error: %s', err);
  });
