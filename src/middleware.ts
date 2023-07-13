import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware, useAuth, redirectToSignIn } from "@clerk/nextjs";

// import clerkMiddleware from "./middlewares/clerkMiddleware";
// import authCheck from "./middlewares/authCheck";

// const middlewares = [clerkMiddleware, authCheck];

// export default stackMiddleware(middlewares);

export default authMiddleware({
  publicRoutes: ["/", "/buy", "/success", "/error", "/about", "/contact"],

  // afterAuth(auth, req, evt) {
  //   console.log("🔥");

  //   console.log(auth);
  //   console.log(auth.isPublicRoute);

  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  // },
});

// export function middleware(request: NextRequest) {
//   // Store current request url in a custom header, which you can read later

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-invoke-path", request.url);

//   if (
//     request.nextUrl.pathname.startsWith("/api/art") &&
//     request.method == "POST"
//   ) {
//     // console.log("ADMIN ROUTTTEEE");
//   }
//   return NextResponse.next({
//     request: {
//       // Apply new request headers
//       headers: requestHeaders,
//     },
//   });

//   // if (request.nextUrl.pathname.startsWith("/a")) {
//   //   return request;
//   // }
// }

// export const config = {
//   matcher: ["/api/:path*"],
// };

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
