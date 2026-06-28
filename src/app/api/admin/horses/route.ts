import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { guardAdmin } from "@/server/adminAuth";
import { createHorse, listHorsesForAdmin } from "@/horses/horsesRepository";
import type { Horse } from "@/horses/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const denied = guardAdmin();
  if (denied) return denied;

  const horses = await listHorsesForAdmin();
  return NextResponse.json(horses);
}

export async function POST(request: Request) {
  const denied = guardAdmin();
  if (denied) return denied;

  try {
    const data = (await request.json()) as Horse;
    if (!data?.name || typeof data.name !== "string" || !data.name.trim()) {
      return NextResponse.json(
        { error: "Le nom du cheval est requis" },
        { status: 400 }
      );
    }
    data.name = data.name.trim();

    const created = await createHorse(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Un cheval avec ce nom existe déjà" },
        { status: 409 }
      );
    }
    console.error("Erreur lors de la création du cheval:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du cheval" },
      { status: 500 }
    );
  }
}
