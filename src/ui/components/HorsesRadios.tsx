import React from "react";
import { useTranslations } from "next-intl";
import styles from "./HorsesRadios.module.css";

interface HorsesRadiosProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  categories: string[];
  locale: string;
}

export default function HorsesRadios({
  selectedCategory,
  setSelectedCategory,
  categories,
  locale,
}: HorsesRadiosProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const t = useTranslations("HorsesPage.sections");

  return (
    <div className={styles.horsesRadios}>
      {categories.map((category) => (
        <label key={category} className={styles.radioLabel}>
          <input
            type="radio"
            name="type"
            value={category}
            checked={selectedCategory === category}
            onChange={handleChange}
            className={styles.radioInput}
          />
          <span
            className={
              selectedCategory === category
                ? styles.radioTextActive
                : styles.radioText
            }
          >
            {t(`${category}`)}
          </span>
        </label>
      ))}
    </div>
  );
}