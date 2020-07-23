import path from 'path';
import { Commands } from 'ioredis';
import { Connection } from 'typeorm';
import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer, asFunction } from 'awilix';
import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';

export const initContainer = async (dbConnection: Connection, redisConnection: Commands): Promise<AwilixContainer> => {
  const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.loadModules(
    ['./web/http/**/*Controller.{js,ts}', './domain/usecase/**/*.{js,ts}', './data/**/*Repository.{js,ts}'],
    {
      formatName: 'camelCase',
      cwd: path.resolve(__dirname),
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
      },
    },
  );

  // TypeOrm Connection Injection
  container.register({
    typeOrmConnection: asFunction(() => dbConnection, { lifetime: Lifetime.TRANSIENT }),
  });

  // Redis Connection Injection
  container.register({
    ioRedisConnection: asFunction(() => redisConnection, { lifetime: Lifetime.TRANSIENT }),
  });

  // Custom Repository
  container.register({
    typeOrmUserRepository: asFunction(() => dbConnection.getCustomRepository(TypeOrmUserRepository), {
      lifetime: Lifetime.TRANSIENT,
    }),
  });

  // eslint-disable-next-line no-console
  console.log(container);

  return container;
};
