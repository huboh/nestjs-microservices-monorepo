// import { AuthUser } from "@/types";
// import { TokenService } from "./token.service";
// import { ConfigService } from "@nestjs/config";
// import { Injectable, Type } from "@nestjs/common";
// import { AuthTokenPayload } from "./token.types";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { IdTokenStrategyName, AccessTokenStrategyName, RefreshTokenStrategyName } from "./token.constants";

// export const IdTokenStrategy = getAuthStrategy(IdTokenStrategyName, "JWT_ID_TOKEN_SECRET");
// export const AccessTokenStrategy = getAuthStrategy(AccessTokenStrategyName, "JWT_ACCESS_TOKEN_SECRET");
// export const RefreshTokenStrategy = getAuthStrategy(RefreshTokenStrategyName, "JWT_REFRESH_TOKEN_SECRET");

// function getAuthStrategy(strategyName: string, strategySecretKey: string): Type {
//   @Injectable({})
//   class BaseStrategy extends PassportStrategy(Strategy, strategyName) {
//     constructor(
//       public readonly tokens: TokenService,
//       public readonly configs: ConfigService
//     ) {
//       super({
//         secretOrKey: configs.get(strategySecretKey),
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         ignoreExpiration: false,
//       });
//     }

//     async validate(payload: AuthTokenPayload): Promise<AuthUser | null> {
//       return (
//         this.tokens.getUser(payload)
//       );
//     }
//   }

//   return (
//     BaseStrategy
//   );
// };