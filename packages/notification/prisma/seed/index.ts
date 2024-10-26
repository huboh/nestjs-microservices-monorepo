// seeder script is run with ts-node. this import helps resolve path aliases
import "module-alias/register";
import { PrismaClient } from "@prisma/notification-service/client";

const prisma = new PrismaClient({});

(async function seeder(prisma: PrismaClient) {

})(prisma)
  .then(console.log)
  .catch(
    (e) => {
      console.error(e);
      process.exit(1);
    }
  )
  .finally(async () => await prisma.$disconnect());