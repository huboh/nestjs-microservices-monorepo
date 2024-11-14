import { Response } from "express";
import { Injectable } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { ConfigService } from "@nestjs/config";
import { SendJsonProps } from "./json.types";

/**
 * Provides several utility function for working with JSON
 */
@Injectable({})
export class JsonService {
  constructor(
    private readonly configs: ConfigService
  ) { }

  /**
   * Sends properly formatted JSON(that meets our response interface) back to clients
   * @param response an object that meets the `Response` interface exposed by express
   * @param jsonData an object containing meta data for out JSON response
   */
  public send(response: Response, jsonData: SendJsonProps) {
    const json = this.format(jsonData);
    const statusCode = json.statusCode;

    response.status(statusCode);
    response.json(json);

    return (
      json
    );
  }

  /**
   * formats JSON(that meets our response interface) back to clients
   * @param jsonData an object containing meta data for out JSON response
   */
  public format(jsonData: SendJsonProps) {
    const code = jsonData.statusCode || 200;
    const message = jsonData.message || STATUS_CODES[code];
    const isProd = this.configs.getOrThrow("NODE_ENV") === "production";
    const status = jsonData.status || (code >= 500 ? "error" : "success");

    return {
      status: status,
      message: message,
      statusCode: code,
      data: jsonData.data,
      error: !jsonData.error ? undefined : {
        name: jsonData.error.name,
        stack: isProd ? undefined : jsonData.error.stack,
        cause: isProd ? undefined : jsonData.error.cause,
        message: jsonData.error.message
      }
    };
  }
}