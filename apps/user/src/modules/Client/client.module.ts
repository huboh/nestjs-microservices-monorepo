import { ClientService } from "./client.service";
import { ConfigService } from "@nestjs/config";
import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_CLIENT_SERVICE, NOTIFICATION_CLIENT_SERVICE } from "./client.constants";

const modules = [
  ClientsModule.registerAsync([
    {
      name: AUTH_CLIENT_SERVICE,
      inject: [ConfigService],
      useFactory: (configs: ConfigService) => {
        return {
          transport: Transport.RMQ,
          options: {
            urls: [configs.getOrThrow<string>("RABBITMQ_URL")],
            queue: configs.getOrThrow<string>("RABBITMQ_AUTH_CLIENT_QUEUE"),
            queueOptions: {
              durable: true
            }
          }
        };
      }
    },
    {
      name: NOTIFICATION_CLIENT_SERVICE,
      inject: [ConfigService],
      useFactory: (configs: ConfigService) => {
        return {
          transport: Transport.RMQ,
          options: {
            urls: [configs.getOrThrow<string>("RABBITMQ_URL")],
            queue: configs.getOrThrow<string>("RABBITMQ_NOTIFICATION_CLIENT_QUEUE"),
            queueOptions: {
              durable: true
            }
          }
        };
      }
    }
  ])
];

@Global()
@Module({
  imports: modules,
  exports: [ClientService],
  providers: [ClientService]
})
export class ClientModule { }
