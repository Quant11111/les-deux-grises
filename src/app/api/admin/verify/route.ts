import { NextResponse } from "next/server";
import crypto from "crypto";

// Fonction pour vérifier si le mot de passe fourni correspond au hash stocké
function verifyPassword(password: string, storedHash: string): boolean {
  // Si le hash stocké est simplement le mot de passe en clair (pour le développement)
  if (process.env.NODE_ENV === "development" && storedHash === password) {
    return true;
  }

  try {
    // Dans un environnement de production, on comparerait avec un hash
    // Pour cet exemple, nous utilisons une simple comparaison
    // Dans un cas réel, il faudrait utiliser bcrypt ou un autre algorithme de hashage sécurisé
    return storedHash === password;
  } catch (error) {
    console.error("Erreur lors de la vérification du mot de passe:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Récupérer le mot de passe admin depuis les variables d'environnement
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Configuration de sécurité incorrecte" },
        { status: 500 }
      );
    }

    // Vérifier si le mot de passe est correct
    if (verifyPassword(password, adminPassword)) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la vérification du mot de passe admin:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la vérification du mot de passe" },
      { status: 500 }
    );
  }
}
