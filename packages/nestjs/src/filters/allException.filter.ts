import { Response } from "express";
import { JsonService } from "@packages/nestjs/providers/json/json.service";
import { ConfigService } from "@nestjs/config";
import { ExceptionFilter, WsExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";

type Exception = (HttpException) & {
  cause?: Error;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter, WsExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name, { timestamp: true });

  constructor(
    private readonly json: JsonService,
    private readonly configs: ConfigService
  ) { }

  public catch(exception: Exception, host: ArgumentsHost) {
    switch (host.getType()) {
      case "ws": {
        this.logger.error("unhandled ws exception", exception);
        break;
      }

      case "rpc": {
        this.logger.error("unhandled rpc exception", exception);
        break;
      }

      case "http": {
        this.handleHttpException(exception as HttpException, host);
        break;
      };
    }
  }

  private getError(exception: Exception | HttpException, error: Partial<Error>) {
    const isProd = (
      this.configs.get("NODE_ENV") === "production"
    );

    return {
      name: error.name || exception.name,
      stack: isProd ? undefined : exception.stack,
      cause: isProd ? undefined : exception.cause,
      message: error.message || exception.message,
    };
  }

  private handleHttpException(exception: HttpException, host: ArgumentsHost) {
    const error = exception.getResponse?.() ?? exception;
    const response = host.switchToHttp().getResponse<Response>();
    const errorObj = this.getError(exception, (typeof error === "string" ? { message: error } : error));
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    this.json.send(response, {
      statusCode: httpStatus,
      status: "error",
      error: errorObj
    });
  }
}
