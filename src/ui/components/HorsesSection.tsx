"use client";

import themeVariables from "@/utils/themeVariables";
import { useRouter } from "next/navigation";
import { useState } from "react";
import horsesData from "@/horses/horses.json";
import Image from "next/image";

const getImagePath = (path: string) => {
  try {
    return require(`/src/img/${path}`).default;
  } catch (error) {
    console.error(`Erreur de chargement de l'image: ${path}`, error);
    return ""; // ou une image par défaut
  }
};

const getHorseType = (horse: any) => {
  const currentYear = new Date().getFullYear();
  if (currentYear - horse.birthYear < 1) {
    return "youngster";
  } else if (horse.gender.toLowerCase() === "stallion") {
    return "horse";
  } else if (horse.gender.toLowerCase() === "mare") {
    return "mare";
  }
  return "unknown";
};

export default function Horses({ locale }: { locale: string }) {
  const [searchParam, setSearchParam] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const router = useRouter();

  const filteredHorses = horsesData.filter((horse) => {
    const matchesSearch =
      horse.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      horse.studbook.toLowerCase().includes(searchParam.toLowerCase());

    const horseType = getHorseType(horse);
    const matchesType = selectedType === "all" || horseType === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "calc(100dvh - 5rem)",
        height: "calc(100dvh - 5rem)",
        overflow: "hidden",
        paddingBottom: "4vw",
        backgroundColor: themeVariables.grassGreen,
      }}
    >
      <div
        className="horses-radios"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: themeVariables.grassGreen,
          gap: "2rem",

          zIndex: 50,
          minWidth: "100%",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="all"
            checked={selectedType === "all"}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                selectedType === "all"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {locale === "en" ? "ALL" : "TOUS"}
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="horse"
            checked={selectedType === "horse"}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                selectedType === "horse"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {locale === "en" ? "HORSES" : "CHEVAUX"}
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="mare"
            checked={selectedType === "mare"}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                selectedType === "mare"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {locale === "en" ? "MARES" : "JUMENTS"}
          </span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="type"
            value="youngster"
            checked={selectedType === "youngster"}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                selectedType === "youngster"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {locale === "en" ? "YOUNGSTERS" : "JEUNES"}
          </span>
        </label>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "2.5rem",
          alignItems: "center",
          backgroundImage: "url('/images/paille.jpg')",
          backgroundSize: "cover",

          overflowY: "scroll",
          padding: "6rem",
          paddingTop: "16vw",
          overflowX: "hidden",
          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100dvh - 10rem)",

          paddingLeft: "calc(15dvh - 3rem) ",
          paddingRight: "calc(15dvh - 3rem) ",
          paddingBottom: "calc((100dvh - 10rem)*7/100) ",

          maxWidth: "calc(200dvh - 32rem)",
        }}
      >
        {filteredHorses.map((horse) => (
          <div
            key={horse.name}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              width: "600px",
              maxWidth: "60vw",
              minHeight: "2rem",
              backgroundColor: themeVariables.lightForeground,
              padding: "0.5rem",
              transition: "ease-in-out 0.3s",

              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => {
              const formattedName = encodeURIComponent(
                horse.name.toLowerCase()
              );
              router.push(`/${locale}/horses/${formattedName}`);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.8)";
              e.currentTarget.style.outline = `2px solid ${themeVariables.grassGreen}`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.outline = `none`;
            }}
          >
            <h2 className="horse-name">{horse.name}</h2>
          </div>
        ))}
      </div>
      <style jsx>{`
        .radio-label {
          cursor: pointer;
          font-size: 0.9rem;
        }
        .horse-name {
          font-size: 0.9rem;
          white-space: "nowrap",
              overflow: "hidden",
              text-overflow: "ellipsis",
        }
        @media (max-width: 1100px) {
          .horse-name {
            font-size: 0.7rem;
          }
          .horses-radios {
            margin-top: 1rem;
          }
          .radio-label {

          font-size: 0.7rem !important;
        }
        }
      `}</style>
    </div>
  );
}
