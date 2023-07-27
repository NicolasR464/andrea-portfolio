import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/buy",
    "/success",
    "/error",
    "/about",
    "/contact",
    "/api/art",
    "/api/art/[id]",
    "/api/shop",
    "/api/stripe",
    "/api/stripe-hooks",
    "/api/orders",
    "/api/order",
    "/api/about",
  ],

  // ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)", "/api/shop", "/api/art"],

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
