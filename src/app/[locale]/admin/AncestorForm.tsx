"use client";

import { useState } from "react";
import type { Ancestor } from "@/horses/types";
import CommaListInput from "./CommaListInput";
import styles from "./admin.module.css";

const toYear = (s: string): number | undefined => {
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
};

export default function AncestorForm({
  value,
  onChange,
  label,
  depth = 0,
}: {
  value: Ancestor;
  onChange: (next: Ancestor) => void;
  label: string;
  /** 0 = parent (can hold grandparents), 1 = grandparent (no further). */
  depth?: number;
}) {
  const [open, setOpen] = useState(depth === 0);
  const set = (patch: Partial<Ancestor>) => onChange({ ...value, ...patch });

  return (
    <div className={styles.subSection}>
      <button
        type="button"
        className={styles.collapseHeader}
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          {label}
          {value.name ? ` — ${value.name}` : ""}
        </span>
        <span>{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Nom</label>
              <input
                className={styles.input}
                value={value.name ?? ""}
                onChange={(e) => set({ name: e.target.value || undefined })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Studbook</label>
              <input
                className={styles.input}
                value={value.studbook ?? ""}
                onChange={(e) => set({ studbook: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className={styles.grid3}>
            <div className={styles.field}>
              <label className={styles.label}>Année de naissance</label>
              <input
                className={styles.input}
                type="number"
                value={value.birthYear ?? ""}
                onChange={(e) => set({ birthYear: toYear(e.target.value) })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Robe</label>
              <input
                className={styles.input}
                value={value.color ?? ""}
                onChange={(e) => set({ color: e.target.value || undefined })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Taille</label>
              <input
                className={styles.input}
                value={value.height ?? ""}
                onChange={(e) => set({ height: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Immatriculation</label>
              <input
                className={styles.input}
                value={value.registration ?? ""}
                onChange={(e) =>
                  set({ registration: e.target.value || undefined })
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Performance</label>
              <input
                className={styles.input}
                value={value.performance ?? ""}
                onChange={(e) =>
                  set({ performance: e.target.value || undefined })
                }
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Licences (séparées par ,)</label>
              <CommaListInput
                value={value.licenses}
                onChange={(v) => set({ licenses: v })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                Distinctions (séparées par ,)
              </label>
              <CommaListInput
                value={value.distinctions}
                onChange={(v) => set({ distinctions: v })}
              />
            </div>
          </div>

          {depth < 1 && (
            <>
              <AncestorForm
                label="Père"
                depth={depth + 1}
                value={value.dad ?? {}}
                onChange={(d) => set({ dad: d })}
              />
              <AncestorForm
                label="Mère"
                depth={depth + 1}
                value={value.mom ?? {}}
                onChange={(m) => set({ mom: m })}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
