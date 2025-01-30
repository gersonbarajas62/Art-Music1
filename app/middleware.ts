import { NextResponse } from "next/server";

export function middleware(req: { cookies: { get: (arg0: string) => any; }; nextUrl: { clone: () => any; }; }) {
  const token = req.cookies.get("user");
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
