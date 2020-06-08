import config from '@common/config';
import { Connection, createConnection } from 'typeorm';

export const initDB = async (): Promise<Connection> => {
  const { syncForce, db } = config;
  const { type, timezone, entitiesPath, database, uri } = db;

  return createConnection({
    type,
    timezone,
    database,
    url: uri,
    synchronize: syncForce,
    extra: { charset: 'utf8mb4_general_ci' },
    entities: [entitiesPath],
  });
};
