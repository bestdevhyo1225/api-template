import path from 'path';
import dotenv from 'dotenv-safe';
import merge from 'lodash/merge';
import { ConfigIndex } from '@common/types/config';

const requireProcessEnv = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }

  return process.env[name] || '';
};

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.join(__dirname, '../../../.env'),
    example: path.join(__dirname, '../../../.env.sample'),
    allowEmptyValues: true,
  });
}

const index: ConfigIndex = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '9000', 10),
    host: process.env.HOST || '0.0.0.0',
    syncForce: process.env.SYNC_FORCE || false,
    jwtSecret: process.env.JWT_SECRET || undefined,
    db: {
      type: 'mysql',
      timezone: '+09:00',
      entitiesPath: path.join(__dirname, '../../domain/entity/*.{js,ts}'),
      logging: false,
    },
    redis: {
      role: 'master',
    },
    tempApiGrpcServer: process.env.tempApiGrpcServer || 'localhost:9100',
  },
  test: {
    syncForce: true,
    db: {
      database: 'api_dev',
      uri: requireProcessEnv('DB_TEST_URI'),
    },
    redis: {
      host: requireProcessEnv('REDIS_TEST_URI'),
    },
  },
  development: {
    syncForce: true,
    db: {
      database: 'api_dev',
      uri: requireProcessEnv('DB_TEST_URI'),
    },
    redis: {
      host: 'redis://:password1234@localhost:6379',
      password: 'password1234',
      preferredSlaves: [
        { ip: '127.0.0.1', port: '6380', prio: 1 },
        { ip: '127.0.0.1', port: '6381', prio: 2 },
      ],
    },
  },
  production: {
    db: {
      replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
    },
    redis: {},
  },
};

const { env } = index.all;
module.exports = merge(index.all, index[env]);
export default module.exports;
