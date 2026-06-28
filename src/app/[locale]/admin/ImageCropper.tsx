"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./admin.module.css";

interface Props {
  file: File;
  /** Output aspect ratio (width / height). Defaults to the 4:3 horse frame. */
  aspect?: number;
  /** Longest output edge in pixels. */
  outputWidth?: number;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
}

/**
 * Profile-photo framing tool: drag to reposition, slider to zoom, with a live
 * preview that is exactly what gets saved. Exports a PNG (transparency-safe for
 * the horse cut-outs) cropped to the requested aspect ratio.
 */
export default function ImageCropper({
  file,
  aspect = 4 / 3,
  outputWidth = 1200,
  onCancel,
  onConfirm,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);

  const [objectUrl, setObjectUrl] = useState<string>("");
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [viewport, setViewport] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [working, setWorking] = useState(false);

  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(
    null
  );

  // Load the selected file into an object URL.
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Track the viewport size (it is responsive).
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () =>
      setViewport({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const baseScale =
    natural && viewport.w
      ? Math.max(viewport.w / natural.w, viewport.h / natural.h)
      : 1;
  const eff = baseScale * zoom;
  const dw = natural ? natural.w * eff : 0;
  const dh = natural ? natural.h * eff : 0;

  const clamp = useCallback(
    (x: number, y: number) => {
      const minX = viewport.w - dw; // <= 0
      const minY = viewport.h - dh; // <= 0
      return {
        x: Math.min(0, Math.max(minX, x)),
        y: Math.min(0, Math.max(minY, y)),
      };
    },
    [viewport.w, viewport.h, dw, dh]
  );

  // Center the image once we know both sizes.
  useEffect(() => {
    if (!natural || !viewport.w) return;
    setTx((viewport.w - natural.w * baseScale) / 2);
    setTy((viewport.h - natural.h * baseScale) / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [natural, viewport.w, viewport.h]);

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    imgElRef.current = img;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
  };

  const onZoom = (nextZoom: number) => {
    // Keep the viewport center anchored while zooming.
    const centerImgX = (viewport.w / 2 - tx) / eff;
    const centerImgY = (viewport.h / 2 - ty) / eff;
    const nextEff = baseScale * nextZoom;
    const nextTx = viewport.w / 2 - centerImgX * nextEff;
    const nextTy = viewport.h / 2 - centerImgY * nextEff;
    const c = (() => {
      const ndw = (natural?.w ?? 0) * nextEff;
      const ndh = (natural?.h ?? 0) * nextEff;
      const minX = viewport.w - ndw;
      const minY = viewport.h - ndh;
      return {
        x: Math.min(0, Math.max(minX, nextTx)),
        y: Math.min(0, Math.max(minY, nextTy)),
      };
    })();
    setZoom(nextZoom);
    setTx(c.x);
    setTy(c.y);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, tx, ty };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    const c = clamp(drag.current.tx + dx, drag.current.ty + dy);
    setTx(c.x);
    setTy(c.y);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleConfirm = async () => {
    if (!natural || !imgElRef.current) return;
    setWorking(true);
    try {
      const k = outputWidth / viewport.w;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(outputWidth);
      canvas.height = Math.round(outputWidth / aspect);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas indisponible");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgElRef.current, tx * k, ty * k, dw * k, dh * k);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (blob) onConfirm(blob);
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className={styles.cropOverlay} onClick={onCancel}>
      <div className={styles.cropCard} onClick={(e) => e.stopPropagation()}>
        <h3>Cadrer la photo de profil</h3>

        <div
          className={styles.cropViewport}
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {objectUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={objectUrl}
              alt="à cadrer"
              className={styles.cropImage}
              onLoad={onImgLoad}
              draggable={false}
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${eff})`,
              }}
            />
          )}
        </div>

        <div className={styles.cropControls}>
          <span className={styles.label}>Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => onZoom(parseFloat(e.target.value))}
          />
        </div>

        <p className={styles.hint}>
          Glissez l&apos;image pour la déplacer, utilisez le curseur pour zoomer.
          L&apos;aperçu ci-dessus correspond exactement au rendu final.
        </p>

        <div className={styles.editorFooter}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onCancel}
            disabled={working}
          >
            Annuler
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleConfirm}
            disabled={working || !natural}
          >
            {working ? "Traitement…" : "Valider le cadrage"}
          </button>
        </div>
      </div>
    </div>
  );
}
