import { JsonService } from "@packages/nestjs/providers/json/json.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [],
  exports: [JsonService],
  providers: [JsonService],
  controllers: []
})
export class GlobalModule { }
