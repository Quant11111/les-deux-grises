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
