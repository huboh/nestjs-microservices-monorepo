import { RpcException } from "@nestjs/microservices";
import { Injectable, BadRequestException, ValidationPipe } from "@nestjs/common";

// types
import type { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import type { ValidationPipeOptions, ValidationError } from "@nestjs/common";

export const validationPipeOptions = {
  disableErrorMessages: false,
  whitelist: true,
  transform: true
} satisfies ValidationPipeOptions;

/**
 * Custom validation pipe that returns an object containing fields with error messages instead of a flattened array of error messages
 */
@Injectable({})
export class CustomValidationPipe extends ValidationPipe {
  constructor(opts: ValidationPipeOptions = {}) {
    super(
      Object.assign(validationPipeOptions, opts)
    );
  }

  formatErr(error: ValidationError) {
    if (!error.children?.length) {
      return (
        Object
          .values(error.constraints || {})
          .join(". ")
          .trim()
      );

    } else {
      return (
        error.children.map(
          (err): string | string[] => (
            (err.children?.length ? this.formatErr(err) : (Object.values(err.constraints || {}).join(". ").trim())) as any
          )
        )
      );
    }
  }

  createExceptionFactory() {
    return (
      (validationErrors?: ValidationError[], contextHost?: ExecutionContextHost) => {
        type Errors = Record<string, ReturnType<typeof this.formatErr>>;
        const vErrors = validationErrors ?? [];
        const refinedErrors = vErrors.reduce(
          (errors, error) => Object.assign(errors, { [error.property]: this.formatErr(error) }), ({} as Errors)
        );

        if (contextHost?.getType?.() === "rpc") {
          return (
            new RpcException({ message: refinedErrors })
          );

        } else {
          return (
            new BadRequestException({ message: refinedErrors })
          );
        }
      }
    );
  }
}