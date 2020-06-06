declare module '@seoulstore/mali-logger' {
  function logger(): Promise<void | Error>;

  export default logger;
}
