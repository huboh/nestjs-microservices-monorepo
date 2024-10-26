import { Injectable } from "@nestjs/common";
import { ClientService } from "@app/modules/Client/client.service";

@Injectable()
export class UserService {
  constructor(
    private readonly clients: ClientService
  ) { }
}
