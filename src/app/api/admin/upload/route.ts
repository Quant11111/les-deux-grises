import { NextResponse } from "next/server";
import crypto from "crypto";
import { guardAdmin } from "@/server/adminAuth";
import { buildHorseImageKey, isS3Configured, uploadToS3 } from "@/server/s3";
import { cdnUrl } from "@/utils/cdn";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

export async function POST(request: Request) {
  const denied = guardAdmin();
  if (denied) return denied;

  if (!isS3Configured()) {
    return NextResponse.json(
      {
        error:
          "Upload S3 non configuré. Variables requises : S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY.",
      },
      { status: 503 }
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const horseName = (form.get("horse") as string) || "horse";
    const kind = (form.get("kind") as string) === "gallery" ? "gallery" : "profile";

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }
    const type = file.type || "image/jpeg";
    if (!ALLOWED_TYPES.has(type)) {
      return NextResponse.json(
        { error: "Format d'image non supporté" },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image trop volumineuse (max 12 Mo)" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const unique = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const key = buildHorseImageKey(horseName, kind, type, unique);
    await uploadToS3(key, buffer, type);

    return NextResponse.json({ key, url: cdnUrl(key) }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'upload S3:", error);
    return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
  }
}
