const checkHealth = async (ctx: any) => {
  ctx.body = { healthy: true };
  return ctx;
};

export default {
  checkHealth,
};
