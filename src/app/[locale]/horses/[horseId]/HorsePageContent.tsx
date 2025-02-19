"use client";

import themeVariables from "@/utils/themeVariables";
import horsesData from "@/horses/horses.json";

export default function HorsePageContent({
  locale,
  id,
}: {
  locale: string;
  id: string;
}) {
  const horse = horsesData.find((horse) => horse.name.toLowerCase() === id);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 5rem)",
      }}
    >
      <div
        className="hide-scrollbar"
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
          paddingLeft: "calc(15vh - 1rem) ",
          paddingRight: "calc(15vh - 1rem) ",
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
    </div>
  );
}
