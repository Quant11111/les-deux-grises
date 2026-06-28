/**
 * Server-only S3 upload helper used by the admin image uploads.
 *
 * Images are stored in S3 under a key prefix and served back through the CDN
 * (see `src/utils/cdn.ts`). Only the S3 *key* is persisted on the horse, exactly
 * like the legacy data (e.g. "ldgexportsquentin/horse/nikita/nikitaprofilepic.png").
 *
 * Required environment variables (the owner adds these and tests the upload):
 *   - S3_REGION             e.g. "eu-west-3"
 *   - S3_BUCKET             the bucket name
 *   - S3_ACCESS_KEY_ID      IAM access key with PutObject/DeleteObject rights
 *   - S3_SECRET_ACCESS_KEY  matching secret
 * Optional:
 *   - S3_KEY_PREFIX         default "ldgexportsquentin/horse"
 *   - S3_ENDPOINT           custom endpoint (S3-compatible providers)
 *   - NEXT_PUBLIC_CDN_URL   CDN base for reads (defaults to the current CloudFront)
 */
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export const S3_KEY_PREFIX = (
  process.env.S3_KEY_PREFIX || "ldgexportsquentin/horse"
).replace(/\/+$/, "");

export function isS3Configured(): boolean {
  return Boolean(
    process.env.S3_REGION &&
      process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY
  );
}

let cachedClient: S3Client | null = null;

function getClient(): S3Client {
  if (!cachedClient) {
    cachedClient = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
      ...(process.env.S3_ENDPOINT
        ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true }
        : {}),
    });
  }
  return cachedClient;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "horse"
  );
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

/** Build a unique, collision-resistant S3 key for a horse image. */
export function buildHorseImageKey(
  horseName: string,
  kind: "profile" | "gallery",
  contentType: string,
  unique: string
): string {
  const ext = EXT_BY_TYPE[contentType] || "jpg";
  return `${S3_KEY_PREFIX}/${slugify(horseName)}/${kind}-${unique}.${ext}`;
}

export async function uploadToS3(
  key: string,
  body: Buffer,
  contentType: string
): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

export async function deleteFromS3(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key })
  );
}
