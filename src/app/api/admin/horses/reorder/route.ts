import { NextResponse } from "next/server";
import { guardAdmin } from "@/server/adminAuth";
import { reorderHorses } from "@/horses/horsesRepository";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const denied = guardAdmin();
  if (denied) return denied;

  try {
    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds) || orderedIds.some((id) => typeof id !== "string")) {
      return NextResponse.json(
        { error: "Liste d'identifiants invalide" },
        { status: 400 }
      );
    }
    await reorderHorses(orderedIds);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors du réordonnancement des chevaux:", error);
    return NextResponse.json(
      { error: "Erreur lors du réordonnancement" },
      { status: 500 }
    );
  }
}
