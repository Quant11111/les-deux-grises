"use client";

import themeVariables from "@/utils/themeVariables";
import horsesData from "@/horses/horses.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfoBlock from "./InfoBlock";

export default function HorsePageContent({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
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
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "1rem",
        height: "calc(100vh - 5rem)",
        overflow: "hidden",
      }}
    >
      <div
        className="hide-scrollbar fix-sm-padding"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateRows: "5fr 1fr 1fr 7fr 0.5fr",
          backgroundColor: themeVariables.grassGreen,
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          maxHeight: "calc(100vh - 10rem)",
          overflowY: "scroll",
          // paddingLeft: "calc(15vh - 3rem) ",
          // paddingRight: "calc(15vh - 3rem) ",
          // paddingBottom: "calc((100vh - 10rem)*7/100) ",
          padding: "1rem",

          gap: "0.5rem",
          aspectRatio: "0.85/1",
          maxWidth: "calc(95vw)",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              position: "absolute",
              top: "1rem",
              left: "50%",
              transform: "translate(-50%, -0%)",
              scale: "1.2",
              maxWidth: "100%", // Adjust the width based on viewport width
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              pointerEvents: "none",
            }}
            src={imageSrc}
            alt={horse?.name || "Horse image"}
            width={800} // Add a default width
            height={600} // Add a default height
          />
        </div>
        <div
          style={{
            display: "flex",
            color: themeVariables.lightForeground,
            alignItems: "end",
          }}
        >
          <h2>{horse?.gender.toUpperCase()}</h2>
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
            style={{
              padding: "5px",
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
            <InfoBlock title={horse?.name || "Horse"} data={horse || {}} />
          </div>
          {/* Column 2: Parents */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 1fr ",
            }}
          >
            {horse?.dad && <InfoBlock title="Father" data={horse.dad} />}
            {horse?.mom && <InfoBlock title="Mother" data={horse.mom} />}
          </div>

          {/* Column 3: Grandparents */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 1fr 1fr 1fr",
            }}
          >
            {horse?.dad?.dad && (
              <InfoBlock title="Paternal Grandfather" data={horse.dad.dad} />
            )}
            {horse?.dad?.mom && (
              <InfoBlock title="Paternal Grandmother" data={horse.dad.mom} />
            )}
            {horse?.mom?.dad && (
              <InfoBlock title="Maternal Grandfather" data={horse.mom.dad} />
            )}
            {horse?.mom?.mom && (
              <InfoBlock title="Maternal Grandmother" data={horse.mom.mom} />
            )}
          </div>
        </div>
        <a
          style={{
            color: themeVariables.lightForeground,
            cursor: "pointer",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
          href={horse?.url}
          target="_blank"
        >
          - click here to learn more
        </a>
      </div>

      <style jsx>{`
        @media (max-width: 800px) {
          .fix-sm-padding {
            padding-left: 2rem !important;
            padding-right: 2rem !important;
            padding-bottom: 2rem !important;
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
          h1 {
            font-size: 1rem !important;
          }
          h2 {
            font-size: 1rem !important;
          }
          a {
            font-size: 0.7rem !important;
          }
        }
        @media (min-width: 1200px) and (max-width: 1600px) {
          h1 {
            font-size: 1.5rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          a {
            font-size: 0.7rem !important;
          }
        }
      `}</style>
    </div>
  );
}
