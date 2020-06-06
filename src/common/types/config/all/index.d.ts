export interface DatabaseInfo {
  readonly database?: string;
  readonly uri?: string;
  readonly entities?: string;
  readonly options?: {
    readonly type: string;
    readonly timezone: string;
    readonly logging: boolean | null;
  };
}

export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
  readonly db: DatabaseInfo;
}
