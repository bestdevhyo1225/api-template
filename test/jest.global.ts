import 'ts-node/register';
import 'tsconfig-paths/register';
import { UserAppGlobal } from '@common/types/global';
import { initDB } from '@infrastructure/typeorm';

declare const global: UserAppGlobal;

export default async (): Promise<void> => {
  global.typeOrmConnection = await initDB();
};
