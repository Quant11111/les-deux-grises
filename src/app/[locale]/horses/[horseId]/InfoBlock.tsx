import { ReactNode } from "react";
import { rawengulkDemibold } from "@/app/fonts/fonts";
import styles from "./InfoBlock.module.css";

interface HorseData {
  name?: string;
  gender?: string;
  birthYear?: number;
  color?: string;
  studbook?: string;
  registration?: string;
  height?: string;
  distinctions?: string[];
  licenses?: string[];
  performance?: string;
  [key: string]: any; // Pour les autres propriétés possibles
}

interface InfoBlockProps {
  data: HorseData;
}

export const InfoBlock = ({ data }: InfoBlockProps) => {
  // Fonction pour formater l'affichage des valeurs
  const formatValue = (key: string, value: any): ReactNode => {
    if (Array.isArray(value)) {
      return (
        <span
          className={`${styles.value} ${rawengulkDemibold.className}`}
          data-full-text={value.join(", ")}
        >
          {value.join(", ").length > 10
            ? value.join(", ").slice(0, 10) + "..."
            : value.join(", ")}
        </span>
      );
    }
    return <span className={`${styles.value} ${rawengulkDemibold.className}`}>{value}</span>;
  };

  // Fonction pour formater les clés en labels lisibles
  const formatLabel = (key: string): string => {
    return key
      .split(/(?=[A-Z])|_/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Filtrer les propriétés à afficher
  const displayableProperties = Object.entries(data).filter(([key, value]) => {
    return (
      key !== "url" &&
      key !== "name" &&
      key !== "dad" &&
      key !== "mom" &&
      key !== "img" &&
      value !== undefined &&
      value !== null &&
      value !== "" &&
      typeof value !== "object"
    );
  });

  return (
    <div className={styles.blockContainer}>
      <h3 className={styles.title}>{data.name}</h3>
      <div className={styles.infoGrid}>
        {displayableProperties.map(([key, value]) => (
          <div key={key} className={styles.infoItem}>
            {formatValue(key, value)}
          </div>
        ))}
        {data.distinctions && (
          <div className={`${styles.infoItem} distinctions`}>
            {formatValue("distinctions", data.distinctions)}
          </div>
        )}
        {data.licenses && (
          <div className={`${styles.infoItem} licenses`}>
            {formatValue("licenses", data.licenses)}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBlock;