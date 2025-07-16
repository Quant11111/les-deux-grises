"use client";

import themeVariables from "@/utils/themeVariables";
import { useRouter } from "next/navigation";
import { useState } from "react";
import horsesData from "@/horses/horses.json";
import HorsesRadios from "./HorsesRadios";
import CustomScrollbar from "./CustomScrollbar";
import styled from "styled-components";

const getImagePath = (path: string) => {
  try {
    return require(`/src/img/${path}`).default;
  } catch (error) {
    console.error(`Erreur de chargement de l'image: ${path}`, error);
    return ""; // ou une image par défaut
  }
};

// Styled Components
const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100dvh - 8rem);
  height: calc(100dvh - 8rem);
  padding-bottom: 1rem;
  background-color: ${themeVariables.grassGreen};
`;

const ScrollableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
  background-image: url("https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/horses/horsesbg.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 80%;
  border-top-left-radius: 20000000000000000000000000000px;
  border-top-right-radius: 20000000000000000000000000000px;
  height: calc(100dvh - 10rem);
  padding-left: calc(15dvh - 3rem);
  padding-right: calc(15dvh - 3rem);
  max-width: calc(200dvh - 32rem);
`;

const scrollbarStyle = {
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
  alignItems: "center" as const,
  width: "600px",
  maxWidth: "60vw",
  marginTop: "20vh",
  marginBottom: "5vh",
};

const HorseCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  min-height: 3rem;
  background-color: ${themeVariables.cloudyMist};
  padding: 0.5rem;
  margin-bottom: 1rem;
  transform: translateY(-1rem);
  transition: all 0.3s ease-in-out;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(calc(-1rem - 5px));
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
    outline: 2px solid ${themeVariables.grassGreen};
  }
`;

const HorseName = styled.h2`
  color: ${themeVariables.grassGreen};
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1100px) {
    font-size: 0.7rem;
  }
`;

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
    <MainContainer>
      <HorsesRadios
        selectedCategory={selectedType}
        setSelectedCategory={setSelectedType}
        categories={categories}
        locale={locale}
      />

      <ScrollableContainer className="hide-scrollbar hide-scrollbar::-webkit-scrollbar">
        <CustomScrollbar style={scrollbarStyle}>
          {filteredHorses.map((horse) => (
            <HorseCard
              key={horse.name}
              onClick={() => {
                const formattedName = encodeURIComponent(
                  horse.name.toLowerCase()
                );
                router.push(`/${locale}/horses/${formattedName}`);
              }}
            >
              {horse.category === "foal" || horse.category === "future foal" ? (
                <HorseName>
                  {horse.name + " X " + horse.dad.name + " X " + horse.mom.name}
                </HorseName>
              ) : (
                <HorseName>{horse.name}</HorseName>
              )}
            </HorseCard>
          ))}
        </CustomScrollbar>
      </ScrollableContainer>
    </MainContainer>
  );
}
