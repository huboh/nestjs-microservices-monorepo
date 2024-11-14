// import { Reflector } from "@nestjs/core";
// import { AuthGuard } from "@nestjs/passport";
// import { PublicKey, PublicKeyMetaData } from "@/lib/nest/Decorators/Public";
// import { ExecutionContext, Injectable, Type } from "@nestjs/common";
// import { IdTokenStrategyName, AccessTokenStrategyName, RefreshTokenStrategyName } from "./token.constants";

// export const IdTokenGuard = getAuthGuard(IdTokenStrategyName, false);
// export const AccessTokenGuard = getAuthGuard(AccessTokenStrategyName, true);
// export const RefreshTokenGuard = getAuthGuard(RefreshTokenStrategyName, false);

// function getAuthGuard(strategyName: string, respectsPublicHandlers = false): Type {
//   @Injectable({})
//   class BaseAuthGuard extends AuthGuard(strategyName) {
//     constructor(
//       private readonly reflector: Reflector
//     ) {
//       super();
//     }

//     canActivate(context: ExecutionContext) {
//       if (!respectsPublicHandlers) {
//         return (
//           super.canActivate(context)
//         );

//       } else {
//         const handlers = [context.getHandler(), context.getClass()];
//         const isPublic = this.reflector.getAllAndOverride<PublicKeyMetaData>(PublicKey, handlers);

//         return (
//           isPublic || super.canActivate(context)
//         );
//       }
//     }
//   }

//   return (
//     BaseAuthGuard
//   );
// };