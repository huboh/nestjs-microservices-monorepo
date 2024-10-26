import { AppModule } from "@app/modules/App/app.module";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AllExceptionsFilter } from "@packages/shared/filters/allException.filter";
import { CustomValidationPipe } from "@packages/shared/pipes/customValidation.pipe";

const createApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configs = app.get(ConfigService);

  app.enable("trust proxy");
  app.disable("x-powered-by");
  app.enableShutdownHooks();

  app.enableCors();
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(configs));

  return {
    configs,
    app
  };
};

(async function main() {
  const { app, configs } = await createApp();

  await (
    app.listen(
      configs.getOrThrow("PORT"),
      configs.getOrThrow("HOST"),
    )
  );

  console.log(
    `server started ⚡⚡, listening on ${await app.getUrl()}`
  );
})();