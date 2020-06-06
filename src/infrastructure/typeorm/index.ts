import config from '@common/config';
import { Connection, createConnection } from 'typeorm';

export const initDB = async (): Promise<Connection> => {
  const { syncForce, db } = config;
  const { database, uri, entities } = db;

  return createConnection({
    type: 'mysql',
    database,
    url: uri,
    synchronize: syncForce,
    extra: {
      charset: 'utf8mb4_general_ci',
    },
    entities: [entities],
  });
};
