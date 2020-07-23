import Redis, { Commands } from 'ioredis';
import config from '@common/config';

export const initRedis = async (): Promise<Commands> => {
  const { env, redis } = config;
  const { host, password, preferredSlaves } = redis;

  if (env === 'test') return new Redis(host);

  return new Redis(host, { password, preferredSlaves });
};
