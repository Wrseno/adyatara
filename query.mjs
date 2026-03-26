import { PrismaClient } from './src/generated/prisma/index.js';
const db = new PrismaClient();
async function main() {
  const users = await db.user.findMany();
  console.log(users);
}
main();
