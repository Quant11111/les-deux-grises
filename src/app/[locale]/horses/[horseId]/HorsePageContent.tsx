"use client";

import themeVariables from "@/utils/themeVariables";
import horsesData from "@/horses/horses.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import OnlyLarge from "@/ui/components/OnlyLarge";
import OnlySmall from "@/ui/components/OnlySmall";

export default function HorsePageContent({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
  const horse = horsesData.find((horse) => horse.name.toLowerCase() === id);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (horse?.images?.detoured) {
      import(`@/img/horses/${horse.images.detoured}`)
        .then((module) => setImageSrc(module.default))
        .catch(() => setImageSrc(""));
    }
  }, [horse]);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          gridTemplateRows: "7fr 1fr 1fr 4fr",
          backgroundColor: themeVariables.grassGreen,
          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100vh - 10rem)",
          overflowY: "scroll",
          paddingLeft: "calc(15vh - 3rem) ",
          paddingRight: "calc(15vh - 3rem) ",
          paddingBottom: "calc((100vh - 10rem)*7/100) ",
          gap: "0.5rem",
          maxWidth: "calc(200vh - 32rem)",
          overflowX: "hidden",
        }}
      >
        <div></div>
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
            width: "100%",
            backgroundColor: themeVariables.lightForeground,
            color: themeVariables.corporateBlue,
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1 style={{ padding: "5px", paddingLeft: "12px" }}>{horse?.name}</h1>
        </div>
        <div
          className="light-scrollbar"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            paddingLeft: "12px",
            gap: "7px",
            backgroundColor: themeVariables.neutralEarth,
            color: themeVariables.darkForeground,
            overflowY: "scroll",
          }}
        >
          <p>FATHER: {horse?.parents.sire.name}</p>
          <p>MOTHER: {horse?.parents.dam.name}</p>
          <p>STUDBOOK: {horse?.studbook}</p>
          <p>SEX: {horse?.gender}</p>
          <p>BORN IN: {horse?.birthYear}</p>
          <a
            href={horse?.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              borderRadius: "50px",
              backgroundColor: "transparent",
              textDecoration: "underline",
              transition: "background-color 0.3s ease, text-align 0.3s ease",
              display: "inline-block",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themeVariables.grassGreen;
              e.currentTarget.style.textDecoration = "none";
              e.currentTarget.style.textAlign = "center";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.textDecoration = "underline";
              e.currentTarget.style.textAlign = "left";
            }}
          >
            horsetelex.com
          </a>
        </div>
      </div>
      <OnlyLarge>
        <Image
          style={{
            position: "absolute",
            bottom: "-1vw",
            right: "-1vw",
            width: "85vw", // Adjust the width based on viewport width
            height: "auto",
            pointerEvents: "none",
          }}
          src={imageSrc}
          alt={horse?.name || "Horse image"}
          width={800} // Add a default width
          height={600} // Add a default height
        />
      </OnlyLarge>
      <OnlySmall>
        <Image
          style={{
            position: "absolute",
            top: "13%",
            left: "50%",
            transform: "translate(-50%, -0%)",
            maxWidth: "90vw", // Adjust the width based on viewport width
            maxHeight: "50vh",
            width: "auto",
            height: "auto",
            pointerEvents: "none",
          }}
          src={imageSrc}
          alt={horse?.name || "Horse image"}
          width={800} // Add a default width
          height={600} // Add a default height
        />
      </OnlySmall>
      <style jsx>{`
        @media (max-width: 800px) {
          .fix-sm-padding {
            padding-left: 2rem !important;
            padding-right: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
