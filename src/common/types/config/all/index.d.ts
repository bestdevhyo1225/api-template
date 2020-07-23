import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { DatabaseType } from 'typeorm';
import { RedisOptions } from 'ioredis';

export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
  readonly db: {
    readonly database?: string;
    readonly uri?: string;
    readonly type?: DatabaseType;
    readonly timezone?: string;
    readonly entitiesPath?: string;
    readonly logging?: LoggerOptions;
    readonly replication?: {
      readonly master: MysqlConnectionCredentialsOptions;
      readonly slaves: MysqlConnectionCredentialsOptions[];
    };
  };
  readonly redis: RedisOptions;
  readonly tempApiGrpcServer: string;
}
