export interface ConfigAll {
  env: string | number;
  port: number;
  host: string;
  syncModels: string | boolean;
  syncForce: string | boolean;
  jwtSecret: string | undefined;
}

export interface ConfigTest {
  syncModels: boolean;
  syncForce: boolean;
  db: { uri: string };
}

export interface ConfigDevelopment {
  syncModels: boolean;
  syncForce: boolean;
  db: { options: { replication: string } };
}

export interface ConfigIndex {
  [key: string]: object;
  all: ConfigAll;
  test: ConfigTest;
  development: ConfigDevelopment;
}
