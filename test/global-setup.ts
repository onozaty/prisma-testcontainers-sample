import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { execSync } from "child_process";
import type { TestProject } from "vitest/node";

let containers: StartedPostgreSqlContainer[] = [];

export const setup = async (project: TestProject) => {
  // Worker数分Testcontainerを立ち上げる
  const promises: Promise<StartedPostgreSqlContainer>[] = [];

  for (let i = 1; i <= project.config.maxWorkers; i++) {
    // 1から振っていく(process.env.VITEST_POOL_ID と一致するように)
    promises.push(setupTestDatabaseContainer(i));
  }

  containers = await Promise.all(promises);
};

export const teardown = () => {
  console.log("Testcontainer停止");
  // Testcontainerを停止する
  for (const container of containers) {
    container.stop();
  }
};

const setupTestDatabaseContainer = async (workerId: number) => {
  const container = await new PostgreSqlContainer("postgres:latest")
    .withTmpFs({ "/var/lib/postgresql/data": "rw" })
    .start();

  // DATABASE_URLを作成
  const databaseUrl = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getMappedPort(
    5432
  )}/${container.getDatabase()}`;

  execSync(`DATABASE_URL=${databaseUrl} npx prisma migrate deploy`);
  console.log(
    `Testcontainer起動完了(workerId:${workerId}) DATABASE_URL: ${databaseUrl}`
  );

  process.env[`DATABASE_URL_TEST_${workerId}`] = databaseUrl;

  return container;
};
