import { resetDb } from "../test/testdb";
import { prisma } from "./db";

beforeEach(async () => {
  await resetDb();
});

test("test1-1", async () => {
  const created = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });

  const finded = await prisma.customer.findUnique({
    where: {
      customerId: created.customerId,
    },
  });

  expect(finded).toEqual(created);
  expect(finded?.name).toBe("John Doe");
});

test("test1-2", async () => {
  const created = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });

  const finded = await prisma.customer.findUnique({
    where: {
      customerId: created.customerId,
    },
  });

  expect(finded).toEqual(created);
  expect(finded?.name).toBe("John Doe");
});
