import { Prisma } from "@prisma/client";
import { JsonService } from "@packages/nestjs/providers/json/json.service";
import { ConfigService } from "@nestjs/config";
import { ExceptionFilter, Catch, ArgumentsHost, ForbiddenException, NotFoundException, HttpStatus, Logger } from "@nestjs/common";

@Catch(
  Prisma.NotFoundError,
  Prisma.PrismaClientKnownRequestError
)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name, { timestamp: true });

  constructor(
    private readonly json: JsonService,
    private readonly configs: ConfigService
  ) { }

  public catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    let error = null;
    let target = null;
    let statusCode = null;

    const code = exception.code;
    const contextType = host.getType();

    switch (code) {
      case "P2002": {
        statusCode = HttpStatus.FORBIDDEN;
        target = (exception.meta as any).target;
        error = new ForbiddenException({ message: `${typeof target === "string" ? target : target[0]} already exists` });
        break;
      }

      case "P2016": {
        // 1. connecting a resource to another that does not exists
        statusCode = HttpStatus.NOT_FOUND;
        error = new NotFoundException({ message: `required record(s) not found` });
        break;
      }

      case "P2025": {
        statusCode = HttpStatus.NOT_FOUND;
        error = new NotFoundException({ message: `required record(s) not found` });
        break;
      }

      default: {
        statusCode = 500;
        error = exception;
        break;
      }
    }

    switch (contextType) {
      case "ws":
        this.logger.error("unhandled ws exception", exception);
        break;

      case "rpc":
        this.logger.error("unhandled rpc exception", exception);
        break;

      case "http":
        this.handleHttpException(error, statusCode, host);
        break;
    }
  }

  private formatError(error: Partial<Error>) {
    const isProd = (
      this.configs.get("NODE_ENV") === "production"
    );

    return {
      name: error.name,
      stack: isProd ? undefined : error.stack,
      cause: isProd ? undefined : (error as any).cause,
      message: error.message,
    };
  }

  private handleHttpException(error: Error, statusCode: number, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    this.json.send(response, {
      statusCode: statusCode,
      status: "error",
      error: error,
    });
  }
}