import { EmailService } from "./email.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [],
  exports: [EmailService],
  providers: [EmailService],
  controllers: []
})
export class EmailModule { }
