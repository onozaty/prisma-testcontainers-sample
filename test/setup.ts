import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "child_process";

const container = await new PostgreSqlContainer("postgres:latest").start();

// DATABASE_URLを作成
const databaseUrl = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getMappedPort(
  5432
)}/${container.getDatabase()}`;

process.env.DATABASE_URL = databaseUrl;
console.log(`Testcontainer起動完了 DATABASE_URL: ${databaseUrl}`);

execSync(`npx prisma migrate deploy`);
