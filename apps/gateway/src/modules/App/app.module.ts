// utils
import { Module, Provider } from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { DefaultConfigModuleOptions } from "@packages/nestjs/configs/config";

// modules
import { AuthModule } from "@app/modules/Auth/auth.module";
import { UserModule } from "@app/modules/User/user.module";
import { ConfigModule } from "@nestjs/config";
import { ClientModule } from "@app/modules/Client/client.module";
import { GlobalModule } from "@app/modules/Global/global.module";

// providers
import { AllExceptionsFilter } from "@packages/nestjs/filters/allException.filter";
import { CustomValidationPipe } from "@packages/nestjs/pipes/customValidation.pipe";

const modules = [
  // ! called first so environment variables are loaded
  ConfigModule.forRoot(DefaultConfigModuleOptions),
  ClientModule,
  GlobalModule,
  AuthModule,
  UserModule
];

const providers: Provider[] = [
  {
    provide: APP_PIPE,
    useClass: CustomValidationPipe
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }
];

@Module({
  imports: modules,
  providers: providers
})
export class AppModule { }
