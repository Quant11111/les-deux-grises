/**
 * Shared type definitions for horse data.
 *
 * These mirror the shape historically stored in `src/horses/horses.json`,
 * which is now the seed source for the `Horse` table in the database.
 * The public pages and the admin panel both consume this exact shape, so the
 * rendering stays identical whether the data comes from the JSON seed or the DB.
 */

/** A pedigree ancestor (dad / mom and their own dad / mom). */
export interface Ancestor {
  name?: string;
  gender?: string;
  studbook?: string;
  registration?: string;
  birthYear?: number;
  color?: string;
  height?: string;
  licenses?: string[];
  distinctions?: string[];
  performance?: string;
  dad?: Ancestor;
  mom?: Ancestor;
}

/** A horse as displayed on the public site. */
export interface Horse {
  name: string;
  gender?: string;
  category?: string;
  birthYear?: number;
  color?: string;
  studbook?: string;
  registration?: string;
  height?: string;
  distinctions?: string[];
  /** Profile picture S3 key (served through the CDN). */
  img?: string;
  /** Gallery image S3 keys (served through the CDN). */
  imgs?: string[];
  /** External pedigree link (e.g. horsetelex). */
  url?: string;
  dad?: Ancestor;
  mom?: Ancestor;
}

/** Categories used by the public filter on the horses page. */
export const HORSE_CATEGORIES = [
  "horse",
  "mare",
  "youngster",
  "foal",
  "future foal",
] as const;

export type HorseCategory = (typeof HORSE_CATEGORIES)[number];
