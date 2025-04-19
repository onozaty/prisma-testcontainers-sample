/*
console.log(
  `setup.ts 起動: PID:${process.pid} process.env.VITEST_POOL_ID:${process.env.VITEST_POOL_ID}`
);
*/

// 各Worker用のDB接続情報へ切り替え
process.env.DATABASE_URL =
  process.env[`DATABASE_URL_TEST_${process.env.VITEST_POOL_ID}`];
