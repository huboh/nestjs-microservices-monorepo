import { AppModule } from "@app/modules/App/app.module";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";

(async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configs = app.get(ConfigService);

  app.enable("trust proxy");
  app.disable("x-powered-by");
  app.enableCors();
  app.enableShutdownHooks();

  await (
    app.listen(
      configs.getOrThrow("PORT"),
      configs.getOrThrow("HOST"),
    )
  );

  console.log(
    `gateway service started ⚡⚡, listening on ${await app.getUrl()}`
  );
})();