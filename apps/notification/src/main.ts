import { AppModule } from "@app/modules/App/app.module";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { DefaultConfigModuleOptions } from "@packages/nestjs/configs/config";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";

(async function main() {
  const configs = new ConfigService(DefaultConfigModuleOptions);
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configs.getOrThrow<string>("RABBITMQ_URL")],
      queue: configs.getOrThrow<string>("RABBITMQ_NOTIFICATION_CLIENT_QUEUE"),
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  });

  await (
    microservice.listen().then(
      () => {
        console.log("notification service started ⚡⚡");
      }
    )
  );
})();