// import { Module } from "@nestjs/common";
// import { APP_GUARD } from "@nestjs/core";
// import { JwtModule } from "@nestjs/jwt";
// import { TokenService } from "./token.service";
// import { PassportModule } from "@nestjs/passport";
// import { AccessTokenGuard } from "./token.guard";
// import { AccessTokenStrategyName } from "./token.constants";
// import { IdTokenStrategy, AccessTokenStrategy, RefreshTokenStrategy } from "./token.strategy";

// @Module({
//   imports: [
//     JwtModule.register({}),
//     PassportModule.register({ defaultStrategy: AccessTokenStrategyName })
//   ],
//   providers: [
//     // Enable Access Token Guard Globally
//     { provide: APP_GUARD, useClass: AccessTokenGuard },
//     IdTokenStrategy,
//     AccessTokenStrategy,
//     RefreshTokenStrategy,
//     TokenService
//   ],
//   exports: [
//     TokenService
//   ]
// })
// export class TokenModule { }