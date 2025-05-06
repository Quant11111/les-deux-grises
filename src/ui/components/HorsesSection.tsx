"use client";

import themeVariables from "@/utils/themeVariables";
import { useRouter } from "next/navigation";
import { useState } from "react";
import horsesData from "@/horses/horses.json";
import Image from "next/image";
import HorsesRadios from "./HorsesRadios";
import CustomScrollbar from "./CustomScrollbar";

const getImagePath = (path: string) => {
  try {
    return require(`/src/img/${path}`).default;
  } catch (error) {
    console.error(`Erreur de chargement de l'image: ${path}`, error);
    return ""; // ou une image par défaut
  }
};

export default function Horses({ locale }: { locale: string }) {
  const [selectedType, setSelectedType] = useState("all");
  const router = useRouter();

  const categories = [
    "all",
    "horse",
    "mare",
    "youngster",
    "foal",
    "future foal",
  ];

  const filteredHorses = horsesData.filter((horse) => {
    const horseType = horse.category;
    const matchesType = selectedType === "all" || horseType === selectedType;

    return matchesType;
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
        paddingBottom: "4vw",
        backgroundColor: themeVariables.grassGreen,
      }}
    >
      <HorsesRadios
        selectedCategory={selectedType}
        setSelectedCategory={setSelectedType}
        categories={categories}
        locale={locale}
      />

      <div
        className="hide-scrollbar hide-scrollbar::-webkit-scrollbar"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          alignItems: "center",
          backgroundImage:
            "url('https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/horses/horsesbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          width: "80%",
          borderTopLeftRadius: "20000000000000000000000000000px",
          borderTopRightRadius: "20000000000000000000000000000px",
          height: "calc(100dvh - 10rem)",

          paddingLeft: "calc(15dvh - 3rem) ",
          paddingRight: "calc(15dvh - 3rem) ",

          maxWidth: "calc(200dvh - 32rem)",
        }}
      >
        <CustomScrollbar
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: "center",
            width: "600px",
            maxWidth: "60vw",
            marginTop: "20vh",
            marginBottom: "5vh",
          }}
        >
          {filteredHorses.map((horse) => (
            <div
              key={horse.name}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                width: "calc(100% - 20px)",
                minHeight: "3rem",
                backgroundColor: themeVariables.cloudyMist,
                padding: "0.5rem",
                marginBottom: "1rem",
                transition: "ease-in-out 0.3s",
                justifyContent: "center",
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
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.8)";
                e.currentTarget.style.outline = `2px solid ${themeVariables.grassGreen}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.outline = `none`;
              }}
            >
              {horse.category === "foal" || horse.category === "future foal" ? (
                <h2 className="horse-name">
                  {horse.name + " X " + horse.dad.name + " X " + horse.mom.name}
                </h2>
              ) : (
                <h2 className="horse-name">{horse.name}</h2>
              )}
            </div>
          ))}
        </CustomScrollbar>
      </div>
      <style jsx>{`
        .radio-label {
          cursor: pointer;
          font-size: 0.7rem;
        }
        .horse-name {
          color: ${themeVariables.grassGreen};
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
