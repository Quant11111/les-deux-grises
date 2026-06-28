import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from "@/server/adminAuth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Configuration de sécurité incorrecte" },
        { status: 500 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion admin:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification du mot de passe" },
      { status: 500 }
    );
  }
}
