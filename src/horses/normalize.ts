import type { Ancestor, Horse } from "./types";

/** True when an ancestor (and its whole subtree) carries no real data. */
export function isEmptyAncestor(a?: Ancestor): boolean {
  if (!a) return true;
  const scalars = [
    a.name,
    a.gender,
    a.studbook,
    a.registration,
    a.color,
    a.height,
    a.performance,
  ];
  const hasScalar = scalars.some(
    (v) => typeof v === "string" && v.trim() !== ""
  );
  const hasYear = a.birthYear != null;
  const hasArrays =
    (a.licenses?.length ?? 0) > 0 || (a.distinctions?.length ?? 0) > 0;
  const hasChildren = !isEmptyAncestor(a.dad) || !isEmptyAncestor(a.mom);
  return !(hasScalar || hasYear || hasArrays || hasChildren);
}

function trimmed(v: string | undefined): string | undefined {
  const t = v?.trim();
  return t ? t : undefined;
}

function cleanArray(a: string[] | undefined): string[] | undefined {
  const arr = (a ?? []).map((x) => x.trim()).filter(Boolean);
  return arr.length ? arr : undefined;
}

/** Recursively strip empty fields and empty ancestor branches. */
export function pruneAncestor(a?: Ancestor): Ancestor | undefined {
  if (isEmptyAncestor(a) || !a) return undefined;
  const out: Ancestor = {
    name: trimmed(a.name),
    gender: trimmed(a.gender),
    studbook: trimmed(a.studbook),
    registration: trimmed(a.registration),
    birthYear: a.birthYear ?? undefined,
    color: trimmed(a.color),
    height: trimmed(a.height),
    licenses: cleanArray(a.licenses),
    distinctions: cleanArray(a.distinctions),
    performance: trimmed(a.performance),
    dad: pruneAncestor(a.dad),
    mom: pruneAncestor(a.mom),
  };
  // Drop undefined keys for a clean payload.
  (Object.keys(out) as (keyof Ancestor)[]).forEach((k) => {
    if (out[k] === undefined) delete out[k];
  });
  return out;
}

/** Produce a clean horse object ready to persist. */
export function pruneHorse(h: Horse): Horse {
  const out: Horse = {
    name: (h.name ?? "").trim(),
    gender: trimmed(h.gender),
    category: (h.category ?? "").trim(),
    birthYear: h.birthYear ?? undefined,
    color: trimmed(h.color),
    studbook: trimmed(h.studbook),
    registration: trimmed(h.registration),
    height: trimmed(h.height),
    distinctions: cleanArray(h.distinctions),
    img: trimmed(h.img),
    imgs: (h.imgs ?? []).filter(Boolean).length
      ? h.imgs!.filter(Boolean)
      : undefined,
    url: trimmed(h.url),
    dad: pruneAncestor(h.dad),
    mom: pruneAncestor(h.mom),
  };
  (Object.keys(out) as (keyof Horse)[]).forEach((k) => {
    if (out[k] === undefined) delete out[k];
  });
  return out;
}
