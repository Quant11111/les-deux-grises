"use client";

import themeVariables from "@/utils/themeVariables";
import horsesData from "@/horses/horses.json";
import Image from "next/image";
import { useEffect, useState } from "react";
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

  const horse = horsesData.find(
    (horse) => horse.name.toLowerCase().replace(/\s+/g, "%20") === id
  );
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (horse?.img) {
      setImageSrc(`https://dsq73kname7kn.cloudfront.net/${horse.img}`);
    }
  }, [horse]);
  return (
    <div
      className="horse-page-content"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "1rem",
        height: "calc(100dvh - 5rem)",
        overflow: "scroll",
      }}
    >
      <div
        className="hide-scrollbar fix-sm-padding arc"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateRows: "0fr 3.5fr  0.3fr 5fr",
          backgroundColor: themeVariables.grassGreen,
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",

          overflowY: "scroll",
          // paddingLeft: "calc(15dvh - 3rem) ",
          // paddingRight: "calc(15dvh - 3rem) ",
          // paddingBottom: "calc((100dvh - 10rem)*7/100) ",
          padding: "1.5rem",
          scale: "0.9",
          gap: "0.5rem",
          aspectRatio: "0.85/1",
          maxWidth: "calc(95vw)",
          overflowX: "hidden",
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
            {horse?.gender.toUpperCase()}
          </h2>
        </div>
        <div
          className="horse-image"
          style={{
            position: "relative",
            height: "calc((100dvh - 8rem) * 0.32)",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Image
            style={{
              width: "auto",
              maxWidth: "70%",
              height: "100%", // prendra 100% de la hauteur du parent
              objectFit: "contain",
              pointerEvents: "none",
              scale: "1.1",
            }}
            src={imageSrc}
            alt={horse?.name || "Horse image"}
            width={800} // Add a default width
            height={600} // Add a default height
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
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
          style={{
            overflow: "scroll",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            placeItems: "center",
            gap: "20px",
            backgroundColor: themeVariables.neutralEarth,
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
        @media (max-width: 800px) {
          .arc {
            grid-template-rows: 0fr 3.5fr 1rem 5fr !important;
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
        }
        @media (min-width: 800px) and (max-width: 1200px) {
          .arc {
            grid-template-rows: 0fr 3.5fr 1.2rem 5fr !important;
          }
          h1 {
            font-size: 1rem !important;
          }
          h2 {
            font-size: 1rem !important;
          }
          a {
            font-size: 0.7rem !important;
          }
          .horseredirect {
            bottom: 0.3rem !important;
          }
        }
        @media (min-width: 1200px) and (max-width: 1600px) {
          h1 {
            font-size: 1rem !important;
          }
          h2 {
            font-size: 1rem !important;
          }
          a {
            font-size: 0.7rem !important;
          }
          .horseredirect {
            bottom: 0.3rem !important;
          }
        }
        @media (min-width: 1200px) {
          .arc {
            width: 70% !important;
            min-height: calc(80vw / 0.85) !important;
            padding: calc(4vw / 0.85) !important;
            gap: calc(0.5vw / 0.85) !important;
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
