import { Module } from "@nestjs/common";
import { DefaultConfigModuleOptions } from "@packages/nestjs/configs/config";

// modules
import { AuthModule } from "@app/modules/User/user.module";
import { ClientModule } from "@app/modules/Client/client.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/modules/Database/database.module";

const modules = [
  // ! called first so environment variables are loaded
  ConfigModule.forRoot(DefaultConfigModuleOptions),
  DatabaseModule,
  ClientModule,
  AuthModule
];

@Module({
  imports: modules,
  providers: [],
  controllers: []
})
export class AppModule { }
