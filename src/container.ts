import { createContainer, asClass, InjectionMode, Lifetime, GlobWithOptions } from 'awilix';
import path from 'path';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

const globPatterns: Array<string | GlobWithOptions> = [
  'web/http/**/controller.js',
  'domain/usecase/**/service.js',
  'data/**/repository.js',
];

container.loadModules(globPatterns, {
  formatName: 'camelCase',
  cwd: path.resolve(__dirname),
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
});

export default container;
