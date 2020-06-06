export interface ConfigProduction {
  readonly db?: {
    readonly database?: string;
    readonly options?: {
      readonly replication?: string;
    };
  };
}
