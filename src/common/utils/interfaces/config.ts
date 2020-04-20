export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncModels: string | boolean;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
}

export interface ConfigTest {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly uri: string;
  };
}

export interface ConfigDevelopment {
  readonly syncModels: boolean;
  readonly syncForce: boolean;
  readonly db: {
    readonly options: {
      readonly replication: string;
    };
  };
}

export interface ConfigIndex {
  [key: string]: object;
  readonly all: ConfigAll;
  readonly test: ConfigTest;
  readonly development: ConfigDevelopment;
}
