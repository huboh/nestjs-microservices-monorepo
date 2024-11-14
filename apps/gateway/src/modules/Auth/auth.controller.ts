import type { Response } from "express";

import { AuthService } from "./auth.service";
import { JsonService } from "@packages/nestjs/providers/json/json.service";
import { ClientService } from "@app/modules/Client/client.service";
import { Controller, Post, Res } from "@nestjs/common";

@Controller({ path: "/auth" })
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly json: JsonService,
    private readonly clients: ClientService
  ) { }

  @Post("/signup")
  async signup(@Res() response: Response) {
    this.json.send(response, {
      statusCode: 200,
      data: await this.clients.auth.send("", {})
    });
  }

  @Post("/signin")
  async signin(@Res() response: Response) {
    this.json.send(response, {
      statusCode: 200,
      data: await this.clients.auth.send("", {})
    });
  }

  @Post("/signin/oauth/google")
  async oAuthSigninGoogle(@Res() response: Response) {
    this.json.send(response, {
      statusCode: 200,
      data: await this.clients.auth.send("", {})
    });
  }

  @Post("/signin/oauth/google/callback")
  async oAuthSigninGoogleCallback(@Res() response: Response) {
    this.json.send(response, {
      statusCode: 200,
      data: await this.clients.auth.send("", {})
    });
  }
}
