declare module 'mali-logger' {
  function logger(): Promise<void | Error>;

  export default logger;
}
