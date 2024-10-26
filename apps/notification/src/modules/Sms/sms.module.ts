import { SmsService } from "./sms.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [],
  exports: [SmsService],
  providers: [SmsService],
  controllers: []
})
export class SmsModule { }
