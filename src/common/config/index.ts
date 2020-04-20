import { ConfigIndex } from 'common/utils/interfaces/config';

const requireProcessEnv = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name] as string;
};

const index: ConfigIndex = {
  all: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT as string, 10) || 9000,
    host: process.env.HOST || '0.0.0.0',
    syncModels: process.env.SYNC_MODELS || false,
    syncForce: process.env.SYNC_FORCE || false,
    jwtSecret: process.env.JWT_SECRET || undefined,
  },
  test: {
    syncModels: true,
    syncForce: true,
    db: {
      uri: requireProcessEnv('DB_TEST_URI'),
    },
  },
  development: {
    syncModels: false,
    syncForce: false,
    db: {
      options: {
        replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
      },
    },
  },
};

const { env } = index.all;
export default { ...index.all, ...index[env] };
