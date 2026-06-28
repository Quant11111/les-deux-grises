"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Horse } from "@/horses/types";
import { cdnUrl } from "@/utils/cdn";
import HorseEditor from "./HorseEditor";
import styles from "./admin.module.css";

interface HorseRecord {
  id: string;
  position: number;
  data: Horse;
}

export default function AdminHorses() {
  const [records, setRecords] = useState<HorseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editing, setEditing] = useState<{
    id?: string;
    data: Horse | null;
  } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/horses");
      if (!res.ok) throw new Error("load failed");
      setRecords(await res.json());
    } catch {
      toast.error("Erreur lors du chargement des chevaux");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (horse: Horse): Promise<boolean> => {
    const isEdit = Boolean(editing?.id);
    const url = isEdit ? `/api/admin/horses/${editing!.id}` : "/api/admin/horses";
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(horse),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast.error(json?.error || "Erreur lors de l'enregistrement");
      return false;
    }
    toast.success(isEdit ? "Cheval mis à jour" : "Cheval ajouté");
    setEditing(null);
    await load();
    return true;
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= records.length) return;
    const next = [...records];
    [next[index], next[target]] = [next[target], next[index]];
    setRecords(next);
    const res = await fetch("/api/admin/horses/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: next.map((r) => r.id) }),
    });
    if (!res.ok) {
      toast.error("Échec du réordonnancement");
      await load();
    }
  };

  const remove = async (rec: HorseRecord) => {
    if (!window.confirm(`Supprimer définitivement « ${rec.data.name} » ?`)) return;
    const res = await fetch(`/api/admin/horses/${rec.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Cheval supprimé");
      await load();
    } else {
      toast.error("Échec de la suppression");
    }
  };

  const seed = async () => {
    if (
      !window.confirm(
        "Importer / synchroniser les chevaux depuis horses.json ?\nLes chevaux existants (même nom) seront mis à jour."
      )
    )
      return;
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(`${json.count} chevaux importés`);
        await load();
      } else {
        toast.error(json?.error || "Échec de l'import");
      }
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <span className={styles.muted}>
          {loading ? "Chargement…" : `${records.length} cheval(aux)`}
        </span>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={seed}
            disabled={seeding}
          >
            {seeding ? "Import…" : "Importer depuis horses.json"}
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setEditing({ data: null })}
          >
            + Ajouter un cheval
          </button>
        </div>
      </div>

      {!loading && records.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            Aucun cheval dans la base. Importez les chevaux existants depuis
            horses.json, ou ajoutez-en un manuellement.
          </p>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={seed}
            disabled={seeding}
          >
            {seeding ? "Import…" : "Importer depuis horses.json"}
          </button>
        </div>
      ) : (
        <div className={styles.horseList}>
          {records.map((rec, index) => (
            <div key={rec.id} className={styles.horseRow}>
              <div className={styles.reorderCol}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Monter"
                >
                  ▲
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => move(index, 1)}
                  disabled={index === records.length - 1}
                  aria-label="Descendre"
                >
                  ▼
                </button>
              </div>

              {rec.data.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cdnUrl(rec.data.img)}
                  alt={rec.data.name}
                  className={styles.horseThumb}
                />
              ) : (
                <div className={styles.horseThumbEmpty}>—</div>
              )}

              <div className={styles.horseMeta}>
                <div className={styles.horseName}>{rec.data.name}</div>
                <div className={styles.horseCategory}>
                  {rec.data.category || "non classé"}
                </div>
              </div>

              <div className={styles.rowActions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}
                  onClick={() => setEditing({ id: rec.id, data: rec.data })}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`}
                  onClick={() => remove(rec)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <HorseEditor
          initial={editing.data}
          onCancel={() => setEditing(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
