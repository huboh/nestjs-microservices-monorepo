import { Module } from "@nestjs/common";
import { SmsModule } from "@app/modules/Sms/sms.module";
import { EmailModule } from "@app/modules/Email/email.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/modules/Database/database.module";
import { DefaultConfigModuleOptions } from "@packages/nestjs/configs/config";

const modules = [
  // ! called first so environment variables are loaded
  ConfigModule.forRoot(DefaultConfigModuleOptions),
  DatabaseModule,
  EmailModule,
  SmsModule
];

@Module({
  imports: modules,
  providers: [],
  controllers: []
})
export class AppModule { }
