import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionCookieOptions } from "@/server/adminAuth";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set(ADMIN_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
