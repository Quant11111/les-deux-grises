/**
 * Server-only data-access layer for horses.
 *
 * The public site (horses list + horse detail) and the admin panel both go
 * through this module so the database is the single source of truth. The data
 * shape returned here is identical to the legacy `horses.json` objects, which
 * keeps the existing rendering untouched.
 *
 * Do NOT import this from a client component — it uses the Prisma client.
 */
import { Prisma } from "@prisma/client";
import prisma from "@/app/db";
import type { Horse } from "./types";
import seedHorses from "./horses.json";

/** Row shape exposed to the admin UI (carries the DB id for edit/delete). */
export interface HorseRecord {
  id: string;
  position: number;
  data: Horse;
}

/** Pull a few queryable/orderable scalars out of the full horse object. */
function scalarsFrom(data: Horse) {
  return {
    name: data.name,
    category: data.category ?? "",
  };
}

function asJson(data: Horse): Prisma.InputJsonValue {
  return data as unknown as Prisma.InputJsonValue;
}

const seededHorses = seedHorses as unknown as Horse[];

/**
 * All horses for the public list, in display order.
 *
 * Falls back to the bundled `horses.json` when the DB table is empty or not yet
 * migrated, so the public site keeps rendering exactly as before during the
 * migration window. Once the table is seeded, the DB becomes the source of
 * truth and admin edits show up live.
 */
export async function getAllHorses(): Promise<Horse[]> {
  try {
    const rows = await prisma.horse.findMany({
      orderBy: [{ position: "asc" }, { name: "asc" }],
      select: { data: true },
    });
    if (rows.length > 0) return rows.map((r) => r.data as unknown as Horse);
  } catch (error) {
    console.warn(
      "[horses] base indisponible, repli sur horses.json:",
      error instanceof Error ? error.message : error
    );
  }
  return seededHorses;
}

/**
 * Look up a single horse by name (case-insensitive), matching the public URL
 * scheme where the id is `encodeURIComponent(name.toLowerCase())`.
 * Falls back to `horses.json` while the DB table is empty / not yet migrated.
 */
export async function getHorseByName(name: string): Promise<Horse | null> {
  const fromSeed = () =>
    seededHorses.find((h) => h.name.toLowerCase() === name.toLowerCase()) ??
    null;
  try {
    const row = await prisma.horse.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
      select: { data: true },
    });
    if (row) return row.data as unknown as Horse;
    // Not in DB: if the table is still empty, fall back to the seed source;
    // otherwise the horse genuinely doesn't exist (→ 404).
    return (await prisma.horse.count()) === 0 ? fromSeed() : null;
  } catch (error) {
    console.warn(
      "[horses] base indisponible, repli sur horses.json:",
      error instanceof Error ? error.message : error
    );
    return fromSeed();
  }
}

/** All horses with their DB id/position, for the admin panel. */
export async function listHorsesForAdmin(): Promise<HorseRecord[]> {
  const rows = await prisma.horse.findMany({
    orderBy: [{ position: "asc" }, { name: "asc" }],
    select: { id: true, position: true, data: true },
  });
  return rows.map((r) => ({
    id: r.id,
    position: r.position,
    data: r.data as unknown as Horse,
  }));
}

export async function getHorseById(id: string): Promise<HorseRecord | null> {
  const row = await prisma.horse.findUnique({
    where: { id },
    select: { id: true, position: true, data: true },
  });
  return row
    ? { id: row.id, position: row.position, data: row.data as unknown as Horse }
    : null;
}

export async function createHorse(data: Horse): Promise<HorseRecord> {
  const last = await prisma.horse.findFirst({
    orderBy: { position: "desc" },
    select: { position: true },
  });
  const position = (last?.position ?? -1) + 1;
  const row = await prisma.horse.create({
    data: { ...scalarsFrom(data), position, data: asJson(data) },
    select: { id: true, position: true, data: true },
  });
  return { id: row.id, position: row.position, data: row.data as unknown as Horse };
}

export async function updateHorse(id: string, data: Horse): Promise<HorseRecord> {
  const row = await prisma.horse.update({
    where: { id },
    data: { ...scalarsFrom(data), data: asJson(data) },
    select: { id: true, position: true, data: true },
  });
  return { id: row.id, position: row.position, data: row.data as unknown as Horse };
}

export async function deleteHorse(id: string): Promise<void> {
  await prisma.horse.delete({ where: { id } });
}

/** Persist a new display order (array of horse ids, top to bottom). */
export async function reorderHorses(orderedIds: string[]): Promise<void> {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.horse.update({ where: { id }, data: { position: index } })
    )
  );
}

/**
 * Seed / re-sync the table from the bundled `horses.json`.
 * Upserts by name (existing rows are refreshed, new ones created) and assigns
 * positions following the JSON order. Returns the number of horses processed.
 */
export async function seedFromJson(): Promise<number> {
  const horses = seedHorses as unknown as Horse[];
  await prisma.$transaction(
    horses.map((horse, index) =>
      prisma.horse.upsert({
        where: { name: horse.name },
        create: {
          ...scalarsFrom(horse),
          position: index,
          data: asJson(horse),
        },
        update: {
          ...scalarsFrom(horse),
          position: index,
          data: asJson(horse),
        },
      })
    )
  );
  return horses.length;
}

export async function countHorses(): Promise<number> {
  return prisma.horse.count();
}
