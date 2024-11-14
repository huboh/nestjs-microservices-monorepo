// types
import type { ClientProxy } from "@nestjs/microservices";

// utils
import { Injectable, Inject } from "@nestjs/common";
import { AUTH_CLIENT_SERVICE, NOTIFICATION_CLIENT_SERVICE, USER_CLIENT_SERVICE } from "./client.constants";

@Injectable({})
export class ClientService {
  constructor(
    @Inject(AUTH_CLIENT_SERVICE) public readonly auth: ClientProxy,
    @Inject(USER_CLIENT_SERVICE) public readonly user: ClientProxy,
    @Inject(NOTIFICATION_CLIENT_SERVICE) public readonly notification: ClientProxy
  ) { }
}