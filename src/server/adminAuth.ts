/**
 * Server-only admin authentication helpers.
 *
 * The admin area is protected by a signed, httpOnly session cookie. There is no
 * link to it anywhere on the site (you must know the path), and every admin API
 * route validates the session server-side — so knowing the URL is not enough,
 * and the password is never trusted from the client beyond the login step.
 */
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "ldg_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

/**
 * Secret used to sign session tokens. Prefer a dedicated secret; fall back to
 * the admin password so the feature works out of the box with the existing env.
 */
function sessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update(value)
    .digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/** Mint a fresh signed session token (value = `<expiry>.<hmac>`). */
export function createSessionToken(): string {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !sessionSecret()) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (!safeEqual(signature, sign(expiry))) return false;
  return Number(expiry) > Date.now();
}

/** True when the current request carries a valid admin session cookie. */
export function isAuthenticated(): boolean {
  return verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);
}

/** Constant-time check of a submitted password against ADMIN_PASSWORD. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || typeof input !== "string") return false;
  return safeEqual(input, expected);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};

/** Standard 401 response for unauthenticated admin API calls. */
export function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

/**
 * Guard for admin API routes. Returns a 401 response when the caller is not an
 * authenticated admin, otherwise `null` (continue handling the request).
 */
export function guardAdmin(): NextResponse | null {
  return isAuthenticated() ? null : unauthorized();
}
