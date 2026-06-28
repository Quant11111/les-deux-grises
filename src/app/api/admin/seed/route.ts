import { NextResponse } from "next/server";
import { guardAdmin } from "@/server/adminAuth";
import { countHorses, seedFromJson } from "@/horses/horsesRepository";

export const dynamic = "force-dynamic";

// One-click import / re-sync of the table from the bundled horses.json.
// Upserts by name, so it is safe to run more than once.
export async function POST() {
  const denied = guardAdmin();
  if (denied) return denied;

  try {
    const count = await seedFromJson();
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("Erreur lors de l'import des chevaux:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'import depuis horses.json" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const denied = guardAdmin();
  if (denied) return denied;

  const count = await countHorses();
  return NextResponse.json({ count });
}
