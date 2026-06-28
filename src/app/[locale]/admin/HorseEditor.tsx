"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Horse } from "@/horses/types";
import { pruneHorse } from "@/horses/normalize";
import { cdnUrl } from "@/utils/cdn";
import AncestorForm from "./AncestorForm";
import CommaListInput from "./CommaListInput";
import ImageCropper from "./ImageCropper";
import styles from "./admin.module.css";

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "— (non classé)" },
  { value: "horse", label: "Cheval (étalon / hongre)" },
  { value: "mare", label: "Jument" },
  { value: "youngster", label: "Jeune" },
  { value: "foal", label: "Poulain" },
  { value: "future foal", label: "À venir" },
];

async function uploadImage(
  fileOrBlob: Blob,
  horseName: string,
  kind: "profile" | "gallery",
  filename: string
): Promise<string | null> {
  const form = new FormData();
  form.append("file", fileOrBlob, filename);
  form.append("horse", horseName || "horse");
  form.append("kind", kind);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    toast.error(json?.error || "Échec de l'upload de l'image");
    return null;
  }
  return json.key as string;
}

export default function HorseEditor({
  initial,
  onCancel,
  onSubmit,
}: {
  initial: Horse | null;
  onCancel: () => void;
  /** Returns true on success (parent then closes the editor). */
  onSubmit: (horse: Horse) => Promise<boolean>;
}) {
  const [horse, setHorse] = useState<Horse>(
    initial ?? { name: "", category: "" }
  );
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saving, setSaving] = useState(false);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<Horse>) => setHorse((h) => ({ ...h, ...patch }));

  const onProfileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCropFile(file);
    e.target.value = "";
  };

  const onCropConfirm = async (blob: Blob) => {
    setCropFile(null);
    setUploadingProfile(true);
    const key = await uploadImage(blob, horse.name, "profile", "profile.png");
    setUploadingProfile(false);
    if (key) {
      set({ img: key });
      toast.success("Photo de profil mise à jour");
    }
  };

  const onGallerySelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setUploadingGallery(true);
    const newKeys: string[] = [];
    for (const file of files) {
      const key = await uploadImage(file, horse.name, "gallery", file.name);
      if (key) newKeys.push(key);
    }
    setUploadingGallery(false);
    if (newKeys.length) {
      set({ imgs: [...(horse.imgs ?? []), ...newKeys] });
      toast.success(`${newKeys.length} photo(s) ajoutée(s)`);
    }
  };

  const removeGalleryImage = (index: number) =>
    set({ imgs: (horse.imgs ?? []).filter((_, i) => i !== index) });

  const handleSave = async () => {
    const cleaned = pruneHorse(horse);
    if (!cleaned.name) {
      toast.error("Le nom du cheval est requis");
      return;
    }
    setSaving(true);
    const ok = await onSubmit(cleaned);
    setSaving(false);
    // Parent closes the editor on success.
    if (!ok) return;
  };

  const busy = saving || uploadingProfile || uploadingGallery;

  return (
    <div className={styles.editorOverlay} onClick={onCancel}>
      <div className={styles.editor} onClick={(e) => e.stopPropagation()}>
        <div className={styles.editorHeader}>
          <h2>{initial ? "Modifier le cheval" : "Ajouter un cheval"}</h2>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
            onClick={onCancel}
          >
            Fermer
          </button>
        </div>

        {/* General */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Informations générales</h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Nom *</label>
              <input
                className={styles.input}
                value={horse.name}
                onChange={(e) => set({ name: e.target.value })}
                placeholder="NIKITA"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Catégorie</label>
              <select
                className={styles.select}
                value={horse.category ?? ""}
                onChange={(e) => set({ category: e.target.value })}
              >
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.grid3}>
            <div className={styles.field}>
              <label className={styles.label}>Sexe</label>
              <select
                className={styles.select}
                value={horse.gender ?? ""}
                onChange={(e) => set({ gender: e.target.value || undefined })}
              >
                <option value="">—</option>
                <option value="m">Mâle</option>
                <option value="f">Femelle</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Année de naissance</label>
              <input
                className={styles.input}
                type="number"
                value={horse.birthYear ?? ""}
                onChange={(e) =>
                  set({
                    birthYear: e.target.value
                      ? parseInt(e.target.value, 10)
                      : undefined,
                  })
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Robe</label>
              <input
                className={styles.input}
                value={horse.color ?? ""}
                onChange={(e) => set({ color: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className={styles.grid3}>
            <div className={styles.field}>
              <label className={styles.label}>Studbook</label>
              <input
                className={styles.input}
                value={horse.studbook ?? ""}
                onChange={(e) => set({ studbook: e.target.value || undefined })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Immatriculation</label>
              <input
                className={styles.input}
                value={horse.registration ?? ""}
                onChange={(e) =>
                  set({ registration: e.target.value || undefined })
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Taille</label>
              <input
                className={styles.input}
                value={horse.height ?? ""}
                onChange={(e) => set({ height: e.target.value || undefined })}
                placeholder="1.63"
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Distinctions (séparées par ,)</label>
              <CommaListInput
                value={horse.distinctions}
                onChange={(v) => set({ distinctions: v })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Lien externe (horsetelex…)</label>
              <input
                className={styles.input}
                value={horse.url ?? ""}
                onChange={(e) => set({ url: e.target.value || undefined })}
                placeholder="https://www.horsetelex.com/…"
              />
            </div>
          </div>
        </div>

        {/* Profile image */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Photo de profil</h3>
          <div className={styles.profileRow}>
            {horse.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cdnUrl(horse.img)}
                alt="profil"
                className={styles.profilePreview}
              />
            ) : (
              <div
                className={styles.profilePreview}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className={styles.muted}>Aucune</span>
              </div>
            )}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => profileInputRef.current?.click()}
                disabled={uploadingProfile}
              >
                {uploadingProfile
                  ? "Envoi…"
                  : horse.img
                  ? "Changer la photo"
                  : "Ajouter une photo"}
              </button>
              {horse.img && (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => set({ img: undefined })}
                >
                  Retirer
                </button>
              )}
            </div>
            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenFileInput}
              onChange={onProfileSelected}
            />
          </div>
          <p className={styles.hint}>
            Après sélection, vous pourrez déplacer et zoomer l&apos;image avec un
            aperçu avant validation.
          </p>
        </div>

        {/* Gallery */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Galerie ({horse.imgs?.length ?? 0})
          </h3>
          {horse.imgs && horse.imgs.length > 0 && (
            <div className={styles.galleryGrid}>
              {horse.imgs.map((key, i) => (
                <div key={key + i} className={styles.galleryItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cdnUrl(key)}
                    alt={`galerie ${i + 1}`}
                    className={styles.galleryImg}
                    style={{ width: "100%", height: "100%" }}
                  />
                  <button
                    type="button"
                    className={styles.galleryRemove}
                    onClick={() => removeGalleryImage(i)}
                    aria-label="Retirer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => galleryInputRef.current?.click()}
            disabled={uploadingGallery}
            style={{ alignSelf: "flex-start" }}
          >
            {uploadingGallery ? "Envoi…" : "Ajouter des photos"}
          </button>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className={styles.hiddenFileInput}
            onChange={onGallerySelected}
          />
        </div>

        {/* Pedigree */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Pedigree</h3>
          <AncestorForm
            label="Père"
            value={horse.dad ?? {}}
            onChange={(d) => set({ dad: d })}
          />
          <AncestorForm
            label="Mère"
            value={horse.mom ?? {}}
            onChange={(m) => set({ mom: m })}
          />
        </div>

        <div className={styles.editorFooter}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onCancel}
            disabled={busy}
          >
            Annuler
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSave}
            disabled={busy}
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>

        {cropFile && (
          <ImageCropper
            file={cropFile}
            onCancel={() => setCropFile(null)}
            onConfirm={onCropConfirm}
          />
        )}
      </div>
    </div>
  );
}
