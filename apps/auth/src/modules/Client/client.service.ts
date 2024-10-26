// types
import type { ClientProxy } from "@nestjs/microservices";

// utils
import { Injectable, Inject } from "@nestjs/common";
import { NOTIFICATION_CLIENT_SERVICE, USER_CLIENT_SERVICE } from "./client.constants";

@Injectable({})
export class ClientService {
  constructor(
    @Inject(USER_CLIENT_SERVICE) public readonly user: ClientProxy,
    @Inject(NOTIFICATION_CLIENT_SERVICE) public readonly notification: ClientProxy
  ) { }
}