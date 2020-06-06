import { UserAppGlobal } from '@common/types/global';

declare const global: UserAppGlobal;

export default async (): Promise<void> => {
  // await global.typeOrmConnection.close()
  process.exit();
};
