import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { RedisOptions } from 'ioredis';

export interface ConfigDevelopment {
  readonly syncForce?: boolean;
  readonly db?: {
    readonly database?: string;
    readonly uri?: string;
    readonly replication?: {
      readonly master: MysqlConnectionCredentialsOptions;
      readonly slaves: MysqlConnectionCredentialsOptions[];
    };
  };
  readonly redis?: RedisOptions;
}
