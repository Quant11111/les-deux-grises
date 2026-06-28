import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { guardAdmin } from "@/server/adminAuth";
import { deleteHorse, updateHorse } from "@/horses/horsesRepository";
import type { Horse } from "@/horses/types";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const updated = await updateHorse(params.id, data);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Un cheval avec ce nom existe déjà" },
          { status: 409 }
        );
      }
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Cheval introuvable" },
          { status: 404 }
        );
      }
    }
    console.error("Erreur lors de la mise à jour du cheval:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du cheval" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const denied = guardAdmin();
  if (denied) return denied;

  try {
    await deleteHorse(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Cheval introuvable" }, { status: 404 });
    }
    console.error("Erreur lors de la suppression du cheval:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du cheval" },
      { status: 500 }
    );
  }
}
