import type { PrismaClient } from "@prisma/client";
import type { OnModuleInit, OnModuleDestroy, INestApplication, INestMicroservice } from "@nestjs/common";

type BasePrismaClient = new (...args: any[]) => (
  Pick<PrismaClient, "$on" | "$connect" | "$disconnect">
);

export const PrismaDatabaseServiceFactory = <T extends BasePrismaClient>(Client: T) => {
  return (
    class extends Client implements OnModuleInit, OnModuleDestroy {
      constructor(...args: any[]) {
        super(...args);
      }

      async onModuleInit(this: PrismaClient<any>) {
        // connect to the database when the module is initialized by nestjs
        await this.$connect();

        // test connection by initiating a transaction since connect call doesn't throw any error when it fails
        await this.$transaction(async (_: any) => { });
      }

      async onModuleDestroy(this: PrismaClient<any>) {
        await this.$disconnect();
      }

      async enableShutdownHooks(this: PrismaClient<any>, app: (INestApplication | INestMicroservice)) {
        this.$on(
          "beforeExit", async () => await app.close()
        );
      }
    }
  );
};