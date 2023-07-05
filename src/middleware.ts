import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Store current request url in a custom header, which you can read later

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-invoke-path", request.url);

  if (
    request.nextUrl.pathname.startsWith("/api/art") &&
    request.method == "POST"
  ) {
    // console.log("ADMIN ROUTTTEEE");
  }
  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });

  // if (request.nextUrl.pathname.startsWith("/a")) {
  //   return request;
  // }
}

// export const config = {
//   matcher: ["/api/:path*"],
// };
