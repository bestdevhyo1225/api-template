import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { DatabaseType } from 'typeorm';

export interface DatabaseInfo {
  readonly database?: string;
  readonly uri?: string;
  readonly type: DatabaseType;
  readonly timezone: string;
  readonly entitiesPath: string;
  readonly logging: LoggerOptions;
}

export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
  readonly db: DatabaseInfo;
}
