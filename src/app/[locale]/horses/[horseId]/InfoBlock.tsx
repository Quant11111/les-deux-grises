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
  title: string;
  data: HorseData;
}

const BlockContainer = styled.div`
  padding: 0.5rem;
  border-radius: 8px;
`;

const Title = styled.h3`
  color: #2c5282;
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  font-weight: 600;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 300px));
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
`;

const DistinctionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

export const InfoBlock = ({ title, data }: InfoBlockProps) => {
  // Fonction pour formater l'affichage des valeurs
  const formatValue = (key: string, value: any): ReactNode => {
    if (Array.isArray(value)) {
      return (
        <>
          {" "}
          {value.map((item, index) => (
            <Value key={index}>{item}</Value>
          ))}
        </>
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
      <Title>{title}</Title>
      <InfoGrid>
        {displayableProperties.map(([key, value]) => (
          <InfoItem key={key}>{formatValue(key, value)}</InfoItem>
        ))}
        {data.distinctions && (
          <InfoItem>{formatValue("distinctions", data.distinctions)}</InfoItem>
        )}
        {data.licenses && (
          <InfoItem>{formatValue("licenses", data.licenses)}</InfoItem>
        )}
      </InfoGrid>
    </BlockContainer>
  );
};

export default InfoBlock;
