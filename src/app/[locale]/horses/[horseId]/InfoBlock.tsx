import themeVariables from "@/utils/themeVariables";
import { ReactNode } from "react";
import styled from "styled-components";

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

const BlockContainer = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
  @media (min-width: 1200px) {
    padding: 1rem !important;
  }
`;

const Title = styled.h3`
  color: ${themeVariables.corporateBlue};
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  font-weight: 600;
  @media (min-width: 1200px) {
    font-size: calc(1.4vw / 0.85) !important;
  }
`;

const InfoGrid = styled.div`
  display: flex;
  gap: 0.2rem;
  line-height: 0.2rem;
  flex-wrap: wrap;
  @media (min-width: 1200px) {
    line-height: calc(0.8vw / 0.85) !important;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.span`
  color: #4a5568;
  font-size: 0.85rem;
  font-weight: 500;
  display: block;
`;

const Value = styled.span`
  color: #1a202c;
  font-size: 0.5rem;
  display: block;
  word-break: break-word;
  @media (min-width: 1200px) {
    font-size: calc(1vw / 0.85) !important;
  }
`;

const DistinctionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

export const InfoBlock = ({ data }: InfoBlockProps) => {
  // Fonction pour formater l'affichage des valeurs
  const formatValue = (key: string, value: any): ReactNode => {
    if (Array.isArray(value)) {
      return (
        <Value data-full-text={value.join(", ")}>
          {" "}
          {value.join(", ").length > 10
            ? value.join(", ").slice(0, 10) + "..."
            : value.join(", ")}
        </Value>
      );
    }
    return <Value>{value}</Value>;
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
    <BlockContainer>
      <Title className="title">{data.name}</Title>
      <InfoGrid className="info-grid">
        {displayableProperties.map(([key, value]) => (
          <InfoItem key={key}>{formatValue(key, value)}</InfoItem>
        ))}
        {data.distinctions && (
          <InfoItem className="distinctions">
            {formatValue("distinctions", data.distinctions)}
          </InfoItem>
        )}
        {data.licenses && (
          <InfoItem className="licenses">
            {formatValue("licenses", data.licenses)}
          </InfoItem>
        )}
      </InfoGrid>
      <style jsx>{`
        @media (min-width: 1200px) {
          .title {
            font-size: 7rem !important;
          }
          .info-grid {
            font-size: 7rem !important;
          }
        }
      `}</style>
    </BlockContainer>
  );
};

export default InfoBlock;
