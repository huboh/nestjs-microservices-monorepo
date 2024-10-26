import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientModule } from "@app/modules/Client/client.module";
import { DefaultConfigModuleOptions } from "@packages/shared/configs/config";

const modules = [
  // ! called first so environment variables are loaded
  ConfigModule.forRoot(DefaultConfigModuleOptions),
  ClientModule
];

@Module({
  imports: modules,
  providers: [],
  controllers: []
})
export class AppModule { }
