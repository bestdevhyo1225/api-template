import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { RedisOptions } from 'ioredis';

export interface ConfigProduction {
  readonly db?: {
    readonly database?: string;
    readonly replication?: {
      readonly master: MysqlConnectionCredentialsOptions;
      readonly slaves: MysqlConnectionCredentialsOptions[];
    };
  };
  readonly redis?: RedisOptions;
}
