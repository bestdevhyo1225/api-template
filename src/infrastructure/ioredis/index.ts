import Redis, { Commands } from 'ioredis';
import config from '@common/config';

export const initRedis = async (): Promise<Commands> => {
  const { env, redis } = config;

  if (env === 'test' || env === 'development') {
    const { host } = redis;
    return new Redis(host);
  }

  return new Redis({ ...redis });
};
