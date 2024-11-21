import prisma from "@/app/db";
import { NextResponse } from "next/server";

// POST: Create a new horse
export async function POST(request: Request) {
  const {
    name,
    birthday,
    frenchDescription,
    englishDescription,
    images,
    keywords,
    links,
    adminPassword,
  } = await request.json();

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newHorse = await prisma.horse.create({
      data: {
        name,
        birthday,
        frenchDescription,
        englishDescription,
        images,
        keywords,
        links,
      },
    });
    return NextResponse.json(newHorse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating horse" },
      { status: 500 }
    );
  }
}

// GET: Get details of a horse by name
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const horseName = searchParams.get("name");
  const horseId = searchParams.get("id");
  const take = searchParams.get("take");
  const searchParam = searchParams.get("searchParam");

  if (horseId) {
    try {
      const horse = await prisma.horse.findUnique({
        where: { id: horseId },
      });

      if (!horse) {
        return NextResponse.json(
          { error: `Horse with id ${horseId} not found` },
          { status: 404 }
        );
      }
      return NextResponse.json(horse, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching horse details" },
        { status: 500 }
      );
    }
  } else if (horseName) {
    try {
      const horse = await prisma.horse.findFirst({
        where: { name: horseName },
      });

      if (!horse) {
        return NextResponse.json(
          { error: `Horse with name ${horseName} not found` },
          { status: 404 }
        );
      }
      return NextResponse.json(horse, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching horse details" },
        { status: 500 }
      );
    }
  } else if (searchParam) {
    try {
      const horses = await prisma.horse.findMany({
        where: {
          OR: [
            { name: { contains: searchParam } },
            { frenchDescription: { contains: searchParam } },
            { englishDescription: { contains: searchParam } },
          ],
        },
        take: take ? parseInt(take) : 10,
      });

      return NextResponse.json(horses, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching horses from provided search param" },
        { status: 500 }
      );
    }
  } else {
    try {
      const horses = await prisma.horse.findMany({
        take: take ? parseInt(take) : 10,
      });

      return NextResponse.json(horses, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching horses" },
        { status: 500 }
      );
    }
  }
}
