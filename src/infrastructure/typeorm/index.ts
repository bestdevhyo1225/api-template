import { Connection, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '@common/config';

export const initDB = async (): Promise<Connection> => {
  const { syncForce, db } = config;
  const { type, timezone, entitiesPath, database, uri, replication } = db;

  return createConnection({
    type,
    timezone,
    database,
    url: uri,
    synchronize: syncForce,
    extra: { charset: 'utf8mb4_general_ci' },
    entities: [entitiesPath],
    replication: replication ? { ...replication } : null,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
  });
};
