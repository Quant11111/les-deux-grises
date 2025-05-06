import React from "react";
import themeVariables from "@/utils/themeVariables";
import { useTranslations } from "next-intl";

export default function HorsesRadios({
  selectedCategory,
  setSelectedCategory,
  categories,
  locale,
}: {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
  locale: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const t = useTranslations("HorsesPage.sections");

  return (
    <div
      className="horses-radios"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: themeVariables.grassGreen,
        gap: "2rem",
        zIndex: 30,
        minWidth: "100%",
        flexWrap: "wrap",
        padding: "0.5rem",
      }}
    >
      {categories.map((category) => (
        <label
          key={category}
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
            value={category}
            checked={selectedCategory === category}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <span
            className="radio-label"
            style={{
              color:
                selectedCategory === category
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
              textDecoration: "none",
              transition: "color 0.3s ease, text-decoration 0.3s ease",
            }}
          >
            {t(`${category}`)}
          </span>
        </label>
      ))}
    </div>
  );
}
