import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });

  const { pathname } = request.nextUrl;

  if (!session && pathname === "/logout") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  if (session && pathname === "/signup") {
    return NextResponse.redirect(new URL("/logout", request.url));
  }

  if (!session && pathname === "/profile") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
