import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Global()
@Module({
  imports: [],
  exports: [DatabaseService],
  providers: [DatabaseService],
  controllers: []
})
export class DatabaseModule { }
