"use client";

import horsesData from "@/horses/horses.json";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomScrollbar from "./CustomScrollbar";
import HorsesRadios from "./HorsesRadios";
import styles from "./HorsesSection.module.css";

export default function HorsesSection({ locale }: { locale: string }) {
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
    <div className={styles.mainContainer}>
      <HorsesRadios
        selectedCategory={selectedType}
        setSelectedCategory={setSelectedType}
        categories={categories}
        locale={locale}
      />

      <div
        className={`${styles.scrollableContainer} hide-scrollbar hide-scrollbar::-webkit-scrollbar`}
      >
        <CustomScrollbar
          style={{
            display: "flex",
            flexDirection: "column" as const,
            height: "100%",
            alignItems: "center" as const,
            width: "600px",
            maxWidth: "60vw",
            marginTop: "20vh",
            marginBottom: "5vh",
            transform: "translateX(10px)",
          }}
        >
          {filteredHorses.map((horse) => (
            <div
              key={horse.name}
              className={styles.horseCard}
              onClick={() => {
                const formattedName = encodeURIComponent(
                  horse.name.toLowerCase(),
                );
                router.push(`/${locale}/horses/${formattedName}`);
              }}
            >
              {horse.category === "foal" || horse.category === "future foal" ? (
                <h2 className={styles.horseName}>
                  {horse.name + " X " + horse.dad.name + " X " + horse.mom.name}
                </h2>
              ) : (
                <h2 className={styles.horseName}>{horse.name}</h2>
              )}
            </div>
          ))}
        </CustomScrollbar>
      </div>
    </div>
  );
}
