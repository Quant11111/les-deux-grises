"use client";

import themeVariables from "@/utils/themeVariables";
import { useRouter } from "next/navigation";
import { useState } from "react";
import horsesData from "@/horses/horses.json";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 4rem);
  height: fill-available;
  overflow-y: scroll;
`;

const Title = styled.h1`
  position: fixed;
  top: 6rem;
  display: none;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeVariables.grassGreen};
  gap: 2rem;
  position: fixed;
  top: 1.5rem;
  padding-top: 4rem;
  padding-bottom: 2rem;
  z-index: 50;
  min-width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20rem);
  gap: 2.5rem;
  width: 100%;
  padding: 2rem;
  margin-top: 8rem;
  justify-content: center;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  input {
    display: none;
  }
  input:checked {
    color: ${themeVariables.cloudyMist};
  }
  span {
    color: ${themeVariables.neutralEarth};
    text-decoration: none;
    transition: color 0.3s ease, text-decoration 0.3s ease;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${(props) =>
    props.type === "horse"
      ? themeVariables.terracotaEarth
      : props.type === "mare"
      ? themeVariables.grassGreen
      : themeVariables.coolBlueGrey};

  border-radius: 300px 300px 0 0;
  height: 25rem;
  overflow: hidden;
  transition: ease-in-out 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  min-width: 100%;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: end;
  gap: 0.5rem;
`;

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
    <Container
      style={{
        backgroundImage: "url('/images/ecurie.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Title>{locale === "en" ? "Horses" : "Chevaux"}</Title>
      <FilterContainer>
        <FilterLabel>
          <input
            type="radio"
            name="type"
            value="all"
            checked={selectedType === "all"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span
            style={{
              color:
                selectedType === "all"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
            }}
          >
            {locale === "en" ? "All" : "Tous"}
          </span>
        </FilterLabel>
        <FilterLabel>
          <input
            type="radio"
            name="type"
            value="horse"
            checked={selectedType === "horse"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span
            style={{
              color:
                selectedType === "horse"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
            }}
          >
            {locale === "en" ? "Horses" : "Chevaux"}
          </span>
        </FilterLabel>
        <FilterLabel>
          <input
            type="radio"
            name="type"
            value="mare"
            checked={selectedType === "mare"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span
            style={{
              color:
                selectedType === "mare"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
            }}
          >
            {locale === "en" ? "Mares" : "Juments"}
          </span>
        </FilterLabel>
        <FilterLabel>
          <input
            type="radio"
            name="type"
            value="youngster"
            checked={selectedType === "youngster"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span
            style={{
              color:
                selectedType === "youngster"
                  ? themeVariables.cloudyMist
                  : themeVariables.neutralEarth,
            }}
          >
            {locale === "en" ? "Youngsters" : "Jeunes"}
          </span>
        </FilterLabel>
      </FilterContainer>

      <GridContainer>
        {filteredHorses.map((horse) => (
          <Card
            key={horse.name}
            type={getHorseType(horse)}
            onClick={() => {
              router.push(`/${locale}/horses/${horse.name.toLowerCase()}`);
            }}
          >
            <CardHeader>
              <Image
                src={getImagePath(horse.images.avatar)}
                alt={`Avatar de ${horse.name}`}
                width={110}
                height={110}
                style={{ borderRadius: "50%" }}
              />

              <h2 style={{ textAlign: "center" }}>{horse.name}</h2>
            </CardHeader>

            <CardContent>
              <p>
                {horse.studbook} - {getHorseType(horse)}
              </p>
              <p>
                {locale === "en"
                  ? `By ${horse.parents.sire.name} out of ${horse.parents.dam.name}`
                  : `Par ${horse.parents.sire.name}, mère ${horse.parents.dam.name}`}
              </p>
              {horse.url && (
                <a
                  href={horse.url}
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
              )}
            </CardContent>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
}
