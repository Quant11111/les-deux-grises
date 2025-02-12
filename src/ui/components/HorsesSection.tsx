"use client";

import themeVariables from "@/utils/themeVariables";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function Horses({ locale }: { locale: string }) {
  const [searchParam, setSearchParam] = useState("");
  const [selectedType, setSelectedType] = useState("all"); // nouveau state pour le filtre
  const router = useRouter();

  // Filtrer les chevaux en fonction de searchParam ET du type sélectionné
  const filteredHorses = horsesData.filter((horse) => {
    const matchesSearch =
      horse.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      horse.studbook.toLowerCase().includes(searchParam.toLowerCase());

    // Si "all" est sélectionné, on ignore le filtre de type
    const matchesType = selectedType === "all" || horse.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div
      className="hide-scrollbar"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "fill-available",
        overflowY: "scroll",
      }}
    >
      <h1
        style={{
          position: "fixed",
          top: "6rem",
          display: "none",
        }}
      >
        {locale === "en" ? "Horses" : "Chevaux"}
      </h1>

      {/* Radio buttons pour le filtrage */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          position: "fixed",
          top: "6rem",
          backgroundColor: themeVariables.cloudyMist,
          padding: "1rem",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 50,
          maxWidth: "100%",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="radio"
            name="type"
            value="all"
            checked={selectedType === "all"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          {locale === "en" ? "All" : "Tous"}
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="radio"
            name="type"
            value="horse"
            checked={selectedType === "horse"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          {locale === "en" ? "Horses" : "Chevaux"}
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="radio"
            name="type"
            value="mare"
            checked={selectedType === "mare"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          {locale === "en" ? "Mares" : "Juments"}
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="radio"
            name="type"
            value="youngster"
            checked={selectedType === "youngster"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          {locale === "en" ? "Youngsters" : "Jeunes"}
        </label>
      </div>

      {/* Grid des chevaux */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
          gap: "20px",
          width: "100%",
          padding: "2rem",
          marginTop: "8rem",
        }}
      >
        {filteredHorses.map((horse) => (
          <div
            className="card"
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              backgroundColor:
                horse.type === "horse"
                  ? themeVariables.terracotaEarth
                  : horse.type === "mare"
                  ? themeVariables.grassGreen
                  : themeVariables.coolBlueGrey,
              border: "1px solid #000",
              borderRadius: "5px",
              height: "15rem",
              overflow: "hidden",
              transition: "ease-in-out 0.3s",
            }}
            key={horse.name}
            onClick={() => {
              router.push(`/${locale}/horses/${horse.name.toLowerCase()}`);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Image
                src={getImagePath(horse.images.avatar)}
                alt={`Avatar de ${horse.name}`}
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
              <h2>{horse.name}</h2>
            </div>

            <div>
              <p>
                {horse.studbook} - {horse.type}
              </p>
              <p>
                {locale === "en"
                  ? `By ${horse.fatherName} out of ${horse.motherName}`
                  : `Par ${horse.fatherName}, mère ${horse.motherName}`}
              </p>
              <a
                href={horse.horsetelex}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  color: themeVariables.neutralEarth,
                  textDecoration: "underline",
                }}
              >
                Horsetelex
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
