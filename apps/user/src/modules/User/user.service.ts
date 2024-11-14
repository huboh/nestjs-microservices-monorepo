import { Injectable } from "@nestjs/common";
import { ClientService } from "@app/modules/Client/client.service";
import { DatabaseService } from "@app/modules/Database/database.service";

@Injectable()
export class UserService {
  constructor(
    private readonly clients: ClientService,
    private readonly database: DatabaseService
  ) { }

  public async createUser() {
    const user = await this.database.user.create({
      data: {
        email: {},
        phone: {},
        password: {}
      }
    });

    return user;
  }
}
