import { Authority } from "@/domain/auth/store/authStore";
import { getAuthorityFromToken } from "@/domain/auth/utils/getAuthorityFromToken";
import { teacherRoutes, authRoutes, routes } from "@/utils/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const requestPathname = request.nextUrl.pathname;

  if (
    (requestPathname === "/" ||
      requestPathname.includes("teacher") ||
      requestPathname.includes("student")) &&
    !token
  ) {
    const response = NextResponse.redirect(
      new URL(routes.auth.login.make(), request.url)
    );

    return response;
  }

  if (token) {
    const authority = getAuthorityFromToken(token.value);

    if (
      authority === Authority.student &&
      (requestPathname.includes("teacher") ||
        authRoutes.includes(requestPathname))
    ) {
      return NextResponse.redirect(
        new URL(routes.student.main.make(), request.url)
      );
    }

    if (
      authority === Authority.teacher &&
      (requestPathname.includes("student") ||
        authRoutes.includes(requestPathname))
    ) {
      return NextResponse.redirect(
        new URL(routes.teacher.main.make(), request.url)
      );
    }
  }

  return NextResponse.next();
}
