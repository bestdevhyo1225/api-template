export interface ConfigAll {
  readonly env: string | number;
  readonly port: number;
  readonly host: string;
  readonly syncForce: string | boolean;
  readonly jwtSecret: string | undefined;
  readonly db?: object;
}
