import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class UserController {
  constructor(
    private readonly users: UserService
  ) { }

  @MessagePattern()
  create() {

  }

  @MessagePattern()
  update() {

  }

  @MessagePattern()
  delete() {

  }
}
