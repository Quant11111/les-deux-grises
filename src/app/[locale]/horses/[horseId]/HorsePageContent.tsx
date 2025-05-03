"use client";

import themeVariables from "@/utils/themeVariables";
import horsesData from "@/horses/horses.json";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import InfoBlock from "./InfoBlock";
import { rawengulkBold } from "@/app/fonts/fonts";
import { useTranslations } from "next-intl";
import { Divider } from "@mui/material";

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
    <div
      className="horse-page-content hide-scrollbar::-webkit-scrollbar hide-scrollbar"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "1rem",
        minHeight: "calc(100dvh - 5rem)",
      }}
    >
      <div
        className="hide-scrollbar fix-sm-padding arc"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateRows: "0fr 5fr 0.5fr auto",
          backgroundColor: themeVariables.grassGreen,
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          overflowY: "auto",
          padding: "1.5rem",
          scale: "0.9",
          gap: "0.5rem",
          maxWidth: "calc(95vw)",
          overflowX: "hidden",
          minHeight: dataGridHeight
            ? `calc(${dataGridHeight}px + 40vh)`
            : "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            color: themeVariables.lightForeground,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 className="gender" style={{ position: "absolute", top: "1rem" }}>
            {horse?.category.toUpperCase()}
          </h2>
        </div>

        <Image
          style={{
            width: "auto",
            maxWidth: "90%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            scale: "1.2",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
          src={imageSrc}
          alt={horse?.name || "Horse image"}
          width={800} // Add a default width
          height={600} // Add a default height
        />

        <div
          className="horse-name-container"
          style={{
            position: "relative",
            width: "100%",
            minHeight: "100%",
            overflow: "hidden",
            backgroundColor: themeVariables.lightForeground,
            color: themeVariables.corporateBlue,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            className="horse-name"
            style={{
              paddingLeft: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {horse?.name}
          </h1>
        </div>
        <div
          className="data-grid"
          ref={dataGridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            placeItems: "center",
            gap: "20px",
            backgroundColor: themeVariables.neutralEarth,
            padding: "1rem",
            width: "100%",
            overflow: "visible",
          }}
        >
          {/* Column 1: Horse Info */}
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <InfoBlock data={horse || {}} />
          </div>
          {/* Column 2: Parents */}
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {horse?.dad && <InfoBlock data={horse.dad} />}
            {horse?.mom && <InfoBlock data={horse.mom} />}
          </div>

          {/* Column 3: Grandparents */}
          <div
            style={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {horse?.dad?.dad && <InfoBlock data={horse.dad.dad} />}
              <Divider
                sx={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: themeVariables.lightForeground,
                }}
              />
              {horse?.dad?.mom && <InfoBlock data={horse.dad.mom} />}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              {horse?.mom?.dad && <InfoBlock data={horse.mom.dad} />}
              <Divider
                sx={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: themeVariables.lightForeground,
                }}
              />
              {horse?.mom?.mom && <InfoBlock data={horse.mom.mom} />}
            </div>
          </div>
        </div>
        {horse?.url && (
          <a
            className={`horseredirect ${rawengulkBold.className}`}
            style={{
              color: themeVariables.lightForeground,
              position: "absolute",
              cursor: "pointer",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: "100%",
              fontSize: "0.7rem",
              bottom: "0.3rem",
            }}
            href={horse?.url}
            target="_blank"
          >
            {t("linkMessage")}
          </a>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 750px) {
          .arc {
            grid-template-rows: 0fr 3.5fr 1rem auto !important;
            aspect-ratio: unset !important;
          }
          .fix-sm-padding {
            padding: 1rem !important;
          }
          .horseredirect {
            bottom: 0.15rem !important;
          }
          h1 {
            font-size: 0.7rem !important;
          }
          h2 {
            font-size: 0.7rem !important;
          }
          a {
            font-size: 0.5rem !important;
          }
          .data-grid {
            font-size: 0.8rem !important;
          }
        }
        @media (min-width: 750px) {
          .horse-name-container {
            min-height: 25px !important;
          }
          .arc {
            width: 70% !important;
            min-height: calc(80vw / 0.85) !important;
            padding: calc(4vw / 0.85) !important;
            gap: calc(0.5vw / 0.85) !important;
            grid-template-rows: 0fr 3.5fr 0.3fr auto !important;
            aspect-ratio: unset !important;
          }
          .gender {
            font-size: calc(1.4vw / 0.85) !important;
            top: calc(4vw / 0.85) !important;
          }
          .horse-image {
            height: calc(25vw / 0.85) !important;
            margin-bottom: calc(2vw / 0.85) !important;
          }
          .horse-page-content {
            justify-content: flex-start !important;
            overflow: scroll !important;
          }
          .horseredirect {
            font-size: calc(1vw / 0.85) !important;
            bottom: calc(1.5vw / 0.85) !important;
          }
          .horse-name {
            font-size: calc(1.5vw / 0.85) !important;
          }
          .data-grid {
            padding: calc(2vw / 0.85) !important;
          }
        }
      `}</style>
    </div>
  );
}
