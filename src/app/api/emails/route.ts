import prisma from "@/app/db";
import { NextResponse } from "next/server";

// POST: Create a new horse
export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    const newEmail = await prisma.email.create({
      data: {
        email,
      },
    });
    return NextResponse.json(newEmail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "err adding email" }, { status: 500 });
  }
}

// GET: Get details of a horse by name
export async function GET(request: Request) {
  const emails = await prisma.email.findMany();
  //transforme le résultat en liste
  const emailsList = emails.map((email) => email.email);
  return NextResponse.json(emailsList, { status: 200 });
}

// DELETE: Remove an email from the database
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const deletedEmail = await prisma.email.delete({
      where: {
        email: email,
      },
    });

    return NextResponse.json(
      { message: "Email supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'email:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'email" },
      { status: 500 }
    );
  }
}
