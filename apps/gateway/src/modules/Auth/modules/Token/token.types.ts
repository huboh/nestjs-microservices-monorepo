export type TokenType = (
  | "id"
  | "access"
  | "refresh"
);

export type IdToken = {
  idToken: string;
  /**
   * in unix timestamp
   */
  idTokenExpiresAt?: number;
};

export type AuthTokens = {
  accessToken: string;
  /**
   * in unix timestamp
   */
  accessTokenExpiresAt?: number;
  refreshToken: string;
  /**
   * in unix timestamp
   */
  refreshTokenExpiresAt?: number;
};

export type TokenPayload = {
  sub?: string;
  iss?: string;
  iat?: number;
  exp?: number;
};

export type AuthTokenPayload = TokenPayload & {
  sub: string;
  type?: TokenType;
};

export type CreateAuthTokensProps<T extends object = AuthTokenPayload> = {
  exp: string;
  secret: string;
  payload: T;
};

export type CreateAuthTokenProps<T extends object = AuthTokenPayload> = {
  type: TokenType;
  payload: T;
};

export type VerifyAuthTokenProps = {
  type: TokenType;
  token: string;
};