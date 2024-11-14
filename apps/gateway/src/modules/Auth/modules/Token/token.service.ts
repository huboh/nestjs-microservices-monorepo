// import { AuthUser } from "@/types";
// import { JwtService } from "@nestjs/jwt";
// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { DatabaseService } from "@/modules/Database/database.service";
// import { IdToken, AuthTokens, DefaultTokenPayload, AuthTokenPayload, CreateAuthTokensProps, CreateAuthTokenProps, VerifyAuthTokenProps } from "./token.types";

// /**
//  * Service responsible for managing authentication tokens.
//  */
// @Injectable({})
// export class TokenService {
//   private readonly issuer: string;
//   private readonly idTokenSecret: string;
//   private readonly idTokenExpiration: string;
//   private readonly accessTokenSecret: string;
//   private readonly accessTokenExpiration: string;
//   private readonly refreshTokenSecret: string;
//   private readonly refreshTokenExpiration: string;

//   constructor(
//     private readonly jwt: JwtService,
//     private readonly configs: ConfigService,
//     private readonly database: DatabaseService
//   ) {
//     this.issuer = this.configs.getOrThrow<string>("JWT_ISSUER");
//     this.idTokenSecret = this.configs.getOrThrow<string>("JWT_ID_TOKEN_SECRET");
//     this.accessTokenSecret = this.configs.getOrThrow<string>("JWT_ACCESS_TOKEN_SECRET");
//     this.refreshTokenSecret = this.configs.getOrThrow<string>("JWT_REFRESH_TOKEN_SECRET");
//     this.idTokenExpiration = this.configs.getOrThrow<string>("JWT_ID_TOKEN_EXPIRATION");
//     this.accessTokenExpiration = this.configs.getOrThrow<string>("JWT_ACCESS_TOKEN_EXPIRATION");
//     this.refreshTokenExpiration = this.configs.getOrThrow<string>("JWT_REFRESH_TOKEN_EXPIRATION");
//   }

//   /**
//    * Converts Unix timestamps to milliseconds
//    */
//   public unixToMs(unix: number) {
//     return unix * 1000;
//   }

//   /**
//    * Retrieves user information based on the provided payload's sub (id).
//    */
//   public async getUser(payload: AuthTokenPayload) {
//     const user = this.database.user.findUnique({
//       where: {
//         id: payload.sub
//       },
//       include: {
//         role: true,
//         email: true
//       }
//     });

//     return (
//       user satisfies Promise<AuthUser | null>
//     );
//   }

//   /**
//    * Decodes a JWT token.
//    */
//   public async decodeJwtToken<T extends DefaultTokenPayload>(token: string) {
//     return (
//       this.jwt.decode<T>(token)
//     );
//   }

//   /**
//    * Creates a JWT token based on the provided properties.
//    */
//   public async createJwtToken(props: CreateAuthTokensProps) {
//     const secret = props.secret;
//     const issuer = this.issuer;
//     const expiresIn = props.exp;

//     return (
//       this.jwt.signAsync(props.payload, { secret, issuer, expiresIn })
//     );
//   }

//   /**
//    * Verifies the provided JWT token using the given secret.
//    */
//   public async verifyJwtToken<T extends object = AuthTokenPayload>(token: string, secret: string) {
//     return (
//       this.jwt.verifyAsync<T>(token, { secret })
//     );
//   }

//   /**
//    * Creates an authentication token (ID, access, or refresh token) based on the provided type and payload.
//    */
//   public async createAuthToken(props: CreateAuthTokenProps) {
//     let exp: string;
//     let secret: string;
//     const type = props.type;
//     const payload = Object.assign(props.payload, { type });

//     switch (type) {
//       case "id": {
//         secret = this.idTokenSecret;
//         exp = this.idTokenExpiration;
//         break;
//       }

//       case "access": {
//         secret = this.accessTokenSecret;
//         exp = this.accessTokenExpiration;
//         break;
//       }

//       case "refresh": {
//         secret = this.refreshTokenSecret;
//         exp = this.refreshTokenExpiration;
//         break;
//       }

//       default: {
//         throw new Error(`unrecognized auth token type: ${type}`);
//       }
//     }

//     return (
//       this.createJwtToken({
//         payload,
//         secret,
//         exp
//       })
//     );
//   }

//   /**
//    * Verifies an authentication token (ID, access, or refresh token) based on the provided type and token.
//    */
//   public async verifyAuthToken<T extends object = AuthTokenPayload>(props: VerifyAuthTokenProps) {
//     let secret: string;
//     const type = props.type;
//     const token = props.token;

//     switch (type) {
//       case "id": {
//         secret = this.idTokenSecret;
//         break;
//       }

//       case "access": {
//         secret = this.accessTokenSecret;
//         break;
//       }

//       case "refresh": {
//         secret = this.refreshTokenSecret;
//         break;
//       }

//       default: {
//         throw new Error(`unrecognized auth token type: ${type}`);
//       }
//     }

//     return (
//       this.jwt.verifyAsync<T>(token, { secret })
//     );
//   }

//   /**
//    * Creates `id` token for the provided payload.
//    */
//   public async createIdToken(payload: AuthTokenPayload): Promise<IdToken> {
//     const idToken = await this.createAuthToken({ type: "id", payload: payload });
//     const idTokenExpiresAt = (await this.decodeJwtToken(idToken)).exp;

//     return {
//       idToken,
//       idTokenExpiresAt
//     };
//   }

//   /**
//    * Creates both `access` and `refresh` tokens for the provided payload.
//    */
//   public async createAuthTokens(payload: AuthTokenPayload): Promise<AuthTokens> {
//     /**
//      * When using `Promise.all()` to generate both tokens simultaneously, there's an issue
//      * in the resulting payload. The `type` field for both access and refresh tokens
//      * becomes `refresh` when decoded, causing ambiguity.
//      *
//      * By awaiting each `createAuthToken` call individually, it ensures distinct creation
//      * of each token, correctly setting their respective `type` fields as `access` and `refresh`.
//      *
//      * This approach resolves the potential issue related to token generation and their associated types
//      * during decoding.
//      */

//     const accessToken = await this.createAuthToken({ type: "access", payload: payload });
//     const accessTokenExpiresAt = (await this.decodeJwtToken(accessToken)).exp;

//     //
//     const refreshToken = await this.createAuthToken({ type: "refresh", payload: payload });
//     const refreshTokenExpiresAt = (await this.decodeJwtToken(refreshToken)).exp;

//     return {
//       accessToken,
//       accessTokenExpiresAt,
//       refreshToken,
//       refreshTokenExpiresAt
//     };
//   }
// }