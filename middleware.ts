import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/session-cookie";

function getSecret() {
  return new TextEncoder().encode(process.env.SESSION_SECRET ?? "");
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      await jwtVerify(token, getSecret());
      return NextResponse.next();
    } catch {
      // invalid/expired token — fall through to redirect
    }
  }

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
