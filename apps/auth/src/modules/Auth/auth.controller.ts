import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(
    private readonly auth: AuthService
  ) { }

  @MessagePattern("sds")
  async signin(@Payload() credentials: any) {

  }

  @MessagePattern("sds")
  async signup(@Payload() credentials: any) {

  }

  async oAuthSigninGoogle() {

  }

  async oAuthSigninGoogleCallback() {

  }
}
