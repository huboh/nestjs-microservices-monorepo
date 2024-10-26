import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@packages/notification/database";
import { ConfigService } from "@nestjs/config";
import { PrismaDatabaseServiceFactory } from "@packages/shared/providers/database.service";

@Injectable({})
export class DatabaseService extends PrismaDatabaseServiceFactory(PrismaClient) {
  constructor(
    private readonly configs: ConfigService
  ) {
    super({
      datasourceUrl: configs.getOrThrow("DATABASE_URL")
    });
  }
}