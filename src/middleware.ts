import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("MIDDLEWARE 🔥");
  // console.log(request.method);
  // console.log(request.url);
  // console.log(request.headers);
  // const origin = request.headers.get("origin");
  // console.log(origin);

  if (
    request.nextUrl.pathname.startsWith("/api/art") &&
    request.method == "POST"
  ) {
    // console.log("ADMIN ROUTTTEEE");
  }
  return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/a")) {
    return request;
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
