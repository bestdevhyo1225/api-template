import { Connection, createConnection } from 'typeorm';
import config from '@common/config';

export const initDB = async (): Promise<Connection> => {
  const { syncForce, db } = config;
  const { database, uri } = db;

  return createConnection({
    type: 'mysql',
    database,
    url: uri,
    synchronize: syncForce,
    extra: {
      charset: 'utf8mb4_general_ci',
    },
    entities: ['src/domain/entity/*.ts'],
  });
};
