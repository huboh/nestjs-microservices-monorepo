import { Response } from "express";
// import { sendJson } from "@/lib/utils/sendJson";
import { ExceptionFilter, WsExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";

type Exception = (HttpException) & {
  cause?: Error;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter, WsExceptionFilter {
  private readonly logger = new Logger(
    AllExceptionsFilter.name, { timestamp: true }
  );

  constructor(
    private readonly configs: ConfigService
  ) { }

  catch(exception: Exception, host: ArgumentsHost) {
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

  getError(exception: Exception | HttpException, error: Partial<Error>) {
    const isProd = (
      this.configs.get("NODE_ENV") === "production"
    );

    return {
      name: error.name || exception.name,
      stack: !isProd ? exception.stack : undefined,
      cause: !isProd ? exception.cause : undefined,
      message: error.message || exception.message,
    };
  }

  handleHttpException(exception: HttpException, host: ArgumentsHost) {
    const error = exception.getResponse?.() ?? exception;
    const response = host.switchToHttp().getResponse<Response>();
    const errorObj = this.getError(exception, (typeof error === "string" ? { message: error } : error));
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // sendJson(response, {
    //   statusCode: httpStatus,
    //   status: "error",
    //   error: errorObj
    // });
  }
}
