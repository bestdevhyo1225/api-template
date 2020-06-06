import { Connection } from 'typeorm';

export interface UserAppGlobal extends NodeJS.Global {
  typeOrmConnection: Connection;
}
