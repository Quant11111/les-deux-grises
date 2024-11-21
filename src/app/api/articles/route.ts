import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    title,
    content,
    language,
    keywords,
    links,
    images,
    horseNames,
    adminPassword,
  } = await request.json();

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let horseIds: string[] = [];

  try {
    for (const horseName of horseNames) {
      const horse = await prisma.horse.findFirst({
        where: { name: horseName },
      });
      if (!horse) {
        return NextResponse.json(
          { error: `Horse with name ${horseName} not found` },
          { status: 404 }
        );
      } else {
        horseIds.push(horse.id);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching horses from provided names" },
      { status: 500 }
    );
  }

  try {
    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        language,
        keywords,
        links,
        images,
        horseIds,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating article" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("articleId");
  const articleTitle = searchParams.get("articleTitle");
  const language = searchParams.get("language");
  const take = searchParams.get("take");
  const queryParam = searchParams.get("queryParam");
  if (articleId) {
    try {
      const article = await prisma.article.findUnique({
        where: { id: articleId },
      });
      if (!article) {
        return NextResponse.json(
          { error: `Article with id ${articleId} not found` },
          { status: 404 }
        );
      }
      return NextResponse.json(article, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching article" },
        { status: 511 }
      );
    }
  } else if (articleTitle) {
    try {
      const article = await prisma.article.findUnique({
        where: { title: articleTitle },
      });
      if (!article) {
        return NextResponse.json(
          { error: `Article with name ${articleTitle} not found` },
          { status: 404 }
        );
      }
      return NextResponse.json(article, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching article" },
        { status: 510 }
      );
    }
  } else {
    // case where no specific article is requested
    if (queryParam) {
      try {
        const articles = await prisma.article.findMany({
          where: {
            AND: [
              { language: language ? language : "en" },
              {
                OR: [
                  { title: { contains: queryParam } },
                  { content: { contains: queryParam } },
                  { keywords: { has: queryParam } },
                ],
              },
            ],
          },
          orderBy: { createdAt: "desc" },
          take: take ? parseInt(take) : 5,
        });
        return NextResponse.json(articles, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { error: "Error fetching articles" },
          { status: 512 }
        );
      }
    } else {
      try {
        const articles = await prisma.article.findMany({
          where: { language: language ? language : "en" },
          orderBy: { createdAt: "desc" },
          take: take ? parseInt(take) : 5,
        });
        return NextResponse.json(articles, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { error: "Error fetching articles" },
          { status: 513 }
        );
      }
    }
  }
}
