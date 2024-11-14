import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  exports: [],
  providers: [],
  controllers: [UserController]
})
export class UserModule { }
