"use client";

import horsesData from "@/horses/horses.json";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import InfoBlock from "./InfoBlock";
import { rawengulkBold } from "@/app/fonts/fonts";
import { useTranslations } from "next-intl";
import { Divider } from "@mui/material";
import styles from "./HorsePageContent.module.css";

export default function HorsePageContent({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
  const t = useTranslations("HorsePage");
  const dataGridRef = useRef<HTMLDivElement>(null);
  const [dataGridHeight, setDataGridHeight] = useState<number | null>(null);

  // Décodage de l'ID pour gérer les caractères spéciaux
  const decodedId = decodeURIComponent(id);

  // Recherche du cheval en utilisant une comparaison plus robuste
  const horse = horsesData.find(
    (horse) => horse.name.toLowerCase() === decodedId
  );

  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (horse?.img) {
      setImageSrc(`https://dsq73kname7kn.cloudfront.net/${horse.img}`);
    }
  }, [horse]);

  // Mesurer la hauteur réelle du contenu de data-grid
  useEffect(() => {
    const currentRef = dataGridRef.current;
    if (currentRef) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Obtenir la hauteur du contenu
          const contentHeight = entry.contentRect.height;
          setDataGridHeight(contentHeight);
        }
      });

      resizeObserver.observe(currentRef);
      return () => {
        if (currentRef) {
          resizeObserver.unobserve(currentRef);
        }
      };
    }
  }, []);

  return (
    <div className={`${styles.horsePageContent} hide-scrollbar::-webkit-scrollbar hide-scrollbar`}>
      <div
        className={`${styles.arc} ${styles.fixSmPadding} hide-scrollbar`}
        style={{
          minHeight: dataGridHeight
            ? `calc(${dataGridHeight}px + 40vh)`
            : "auto",
        }}
      >
        <div className={styles.genderContainer}>
          <h2 className={styles.gender}>
            {horse?.category.toUpperCase()}
          </h2>
        </div>

        <Image
          className={styles.horseImage}
          src={imageSrc}
          alt={horse?.name || "Horse image"}
          width={800}
          height={600}
        />

        <div className={styles.horseNameContainer}>
          <h1 className={styles.horseName}>
            {horse?.name}
          </h1>
        </div>

        <div
          className={styles.dataGrid}
          ref={dataGridRef}
        >
          {/* Column 1: Horse Info */}
          <div className={styles.dataColumn}>
            <InfoBlock data={horse || {}} />
          </div>

          {/* Column 2: Parents */}
          <div className={styles.parentsColumn}>
            {horse?.dad && <InfoBlock data={horse.dad} />}
            {horse?.mom && <InfoBlock data={horse.mom} />}
          </div>

          {/* Column 3: Grandparents */}
          <div className={styles.grandparentsColumn}>
            <div className={styles.grandparentGroup}>
              {horse?.dad?.dad && <InfoBlock data={horse.dad.dad} />}
              <Divider className={styles.divider} />
              {horse?.dad?.mom && <InfoBlock data={horse.dad.mom} />}
            </div>

            <div className={styles.grandparentGroup}>
              {horse?.mom?.dad && <InfoBlock data={horse.mom.dad} />}
              <Divider className={styles.divider} />
              {horse?.mom?.mom && <InfoBlock data={horse.mom.mom} />}
            </div>
          </div>
        </div>

        {horse?.url && (
          <a
            className={`${styles.horseRedirect} ${rawengulkBold.className}`}
            href={horse?.url}
            target="_blank"
          >
            {t("linkMessage")}
          </a>
        )}
      </div>
    </div>
  );
}