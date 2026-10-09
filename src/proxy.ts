import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lowerPathname = pathname.toLowerCase();

  if (pathname !== lowerPathname) {
    const url = request.nextUrl.clone();
    url.pathname = lowerPathname;

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
