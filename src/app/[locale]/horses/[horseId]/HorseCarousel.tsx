"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cdnUrl } from "@/utils/cdn";
import styles from "./HorseCarousel.module.css";

const ArrowLeft = () => (
  <svg viewBox="0 0 64.89 75.65" width="22" height="22" fill="none" aria-hidden>
    <path
      d="M37.83,75.65h27.06V0h-27.06C16.94,0,0,16.94,0,37.83h0c0,20.89,16.94,37.83,37.83,37.83ZM38.2,24.65c.71-.71,1.86-.71,2.57,0,.71.71.71,1.86,0,2.57l-12.41,12.41,12.41,12.41c.71.71.71,1.86,0,2.57h0c-.71.71-1.86.71-2.57,0l-14.96-14.96h0s0-.02,0-.02l14.96-14.96Z"
      fill="#ece3cd"
    />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 64.89 75.65" width="22" height="22" fill="none" aria-hidden>
    <path
      d="M27.06,0H0v75.65h27.06c20.89,0,37.83-16.94,37.83-37.83h0C64.89,16.94,47.95,0,27.06,0ZM26.68,51c-.71.71-1.86.71-2.57,0-.71-.71-.71-1.86,0-2.57l12.41-12.41-12.41-12.41c-.71-.71-.71-1.86,0-2.57h0c.71-.71,1.86-.71,2.57,0l14.96,14.96h0s0,.02,0,.02l-14.96,14.96Z"
      fill="#ece3cd"
    />
  </svg>
);

const Close = () => (
  <svg viewBox="0 0 34.84 34.84" width="20" height="20" fill="none" aria-hidden>
    <rect
      x="15.18"
      y="-6.29"
      width="4.48"
      height="47.41"
      rx="2.24"
      ry="2.24"
      transform="translate(17.42 -7.22) rotate(45)"
      fill="#ece3cd"
    />
    <rect
      x="15.18"
      y="-6.29"
      width="4.48"
      height="47.41"
      rx="2.24"
      ry="2.24"
      transform="translate(42.05 17.42) rotate(135)"
      fill="#ece3cd"
    />
  </svg>
);

export default function HorseCarousel({
  images,
  name,
}: {
  images: string[];
  name?: string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const urls = images.map((key) => cdnUrl(key)).filter(Boolean);
  const count = urls.length;

  // Track scroll position to toggle the strip arrows.
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      setCanLeft(scrollLeft > 1);
      setCanRight(scrollLeft < scrollWidth - clientWidth - 1);
    };
    slider.addEventListener("scroll", update);
    update();
    window.addEventListener("resize", update);
    return () => {
      slider.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [count]);

  // Keyboard navigation inside the lightbox.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      else if (e.key === "ArrowLeft")
        setSelected((p) => (p === null ? null : (p - 1 + count) % count));
      else if (e.key === "ArrowRight")
        setSelected((p) => (p === null ? null : (p + 1) % count));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, count]);

  if (count === 0) return null;

  const scrollBy = (delta: number) =>
    sliderRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderRow}>
        {canLeft && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navLeft}`}
            onClick={() => scrollBy(-420)}
            aria-label="Images précédentes"
          >
            <ArrowLeft />
          </button>
        )}

        <div className={styles.slider} ref={sliderRef}>
          {urls.map((url, index) => (
            <div
              key={url + index}
              className={styles.thumb}
              onClick={() => setSelected(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(index);
              }}
              aria-label={`Agrandir la photo ${index + 1}`}
            >
              <Image
                src={url}
                alt={`${name ?? "Cheval"} — photo ${index + 1}`}
                fill
                sizes="200px"
                className={styles.thumbImage}
                loading="lazy"
                quality={70}
              />
            </div>
          ))}
        </div>

        {canRight && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navRight}`}
            onClick={() => scrollBy(420)}
            aria-label="Images suivantes"
          >
            <ArrowRight />
          </button>
        )}
      </div>

      <div
        className={`${styles.modalOverlay} ${
          selected !== null ? styles.modalOverlayVisible : ""
        }`}
        onClick={() => setSelected(null)}
      >
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {selected !== null && (
            <>
              <Image
                src={urls[selected]}
                alt={`${name ?? "Cheval"} — photo ${selected + 1}`}
                width={1400}
                height={1050}
                className={styles.modalImage}
                priority
              />

              {count > 1 && (
                <>
                  <button
                    type="button"
                    className={`${styles.modalButton} ${styles.modalLeft}`}
                    onClick={() =>
                      setSelected((p) =>
                        p === null ? null : (p - 1 + count) % count
                      )
                    }
                    aria-label="Photo précédente"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    className={`${styles.modalButton} ${styles.modalRight}`}
                    onClick={() =>
                      setSelected((p) => (p === null ? null : (p + 1) % count))
                    }
                    aria-label="Photo suivante"
                  >
                    <ArrowRight />
                  </button>
                </>
              )}

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setSelected(null)}
                aria-label="Fermer"
              >
                <Close />
              </button>

              <div className={styles.counter}>
                {selected + 1} / {count}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
