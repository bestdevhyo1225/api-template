import path from 'path';
import { Connection } from 'typeorm';
import { createContainer, asClass, InjectionMode, Lifetime, AwilixContainer, asValue } from 'awilix';
import TypeOrmUserRepository from '@data/user/TypeOrmUserRepository';

export const initContainer = async (dbConnection: Connection): Promise<AwilixContainer> => {
  const container: AwilixContainer = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.loadModules(
    ['./web/grpc/*Controller.{js,ts}', './domain/usecase/**/*.{js,ts}', './data/**/*Repository.{js,ts}'],
    {
      formatName: 'camelCase',
      cwd: path.resolve(__dirname),
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
      },
    },
  );

  // repository
  container.register({
    typeOrmUserRepository: asValue(dbConnection.getCustomRepository(TypeOrmUserRepository)),
  });

  // eslint-disable-next-line no-console
  console.log(container);

  return container;
};
