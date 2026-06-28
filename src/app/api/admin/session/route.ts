import { NextResponse } from "next/server";
import { isAuthenticated } from "@/server/adminAuth";

// Lets the admin page restore its authenticated state after a reload without
// ever exposing the httpOnly session cookie to client JavaScript.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ authenticated: isAuthenticated() });
}
