import { Injectable } from "@nestjs/common";
import { ClientService } from "@app/modules/Client/client.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly clients: ClientService
  ) { }
}
