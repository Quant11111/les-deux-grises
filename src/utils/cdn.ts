/**
 * Resolve a stored image key (e.g. "ldgexportsquentin/horse/nikita/x.png")
 * into a full URL served through the CDN.
 *
 * The historical CloudFront host is kept as the default so existing data and
 * rendering are unchanged. It can be overridden with NEXT_PUBLIC_CDN_URL once
 * a different distribution / bucket is in use.
 */
const DEFAULT_CDN = "https://dsq73kname7kn.cloudfront.net";

export const CDN_BASE = (
  process.env.NEXT_PUBLIC_CDN_URL || DEFAULT_CDN
).replace(/\/+$/, "");

export function cdnUrl(key: string | undefined | null): string {
  if (!key) return "";
  if (/^https?:\/\//i.test(key)) return key; // already absolute
  return `${CDN_BASE}/${key.replace(/^\/+/, "")}`;
}
