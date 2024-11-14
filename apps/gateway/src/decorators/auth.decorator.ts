// // import { User } from "@/types";
// import { SetMetadata } from "@nestjs/common";
// import { PUBLIC_ROUTE } from "@app/constants/auth.constants";
// import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// /**
//  * Param decorator to get the currently authenticated user from the `request` object.
//  * 
//  * The user is automatically attach to the request object by `JWTAuthGuard`
//  */
// export const AuthUser = createParamDecorator(
//   (data?: keyof User, context?: ExecutionContext) => {
//     return (
//       data ? (context?.switchToHttp?.().getRequest?.().user?.[data]) : (context?.switchToHttp?.().getRequest?.().user)
//     );
//   }
// );

// export type PublicRouteMetaData = boolean;

// /**
//  * Decorator to mark a class or endpoint handler as publicly accessible and bypass AccessAuthGuard.
//  */
// export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE, (true satisfies PublicRouteMetaData));
