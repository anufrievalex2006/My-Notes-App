import { NextRequest, NextResponse } from "next/server";

const publics = ["/login", "/register"];

export default function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublic = publics.includes(path);

    const token = req.cookies.get("token")?.value;

    if (!isPublic && !token)
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    if (isPublic && token)
        return NextResponse.redirect(new URL("/", req.nextUrl));
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};