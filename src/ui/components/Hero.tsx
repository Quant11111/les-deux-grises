"use client";

import { rawengulkDemibold, arkhipRegular, rawengulk } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { LogoSvg } from "../svg/LogoSvg";
import OnlyLarge from "./OnlyLarge";

const HeroTitle = styled.h1<{ $imgzoom: number }>`
  position: absolute;
  font-size: ${({ $imgzoom }) => $imgzoom * 9 * 16}px;
  font-weight: lighter;
  letter-spacing: ${({ $imgzoom }) => $imgzoom * 2.6 * 16}px;
  color: ${themeVariables.lightForeground};
  left: 50%;
  bottom: 27%;
  z-index: 1;
  @media (max-width: 1100px) {
    left: 50%;
    transform: translate(-49%, 60%);
    letter-spacing: ${({ $imgzoom }) => $imgzoom * 2 * 16}px;
    text-align: center;
  }
  @media (max-width: 800px) {
    font-size: 2rem;
    transform: translate(-49%, 0%);
    letter-spacing: ${({ $imgzoom }) => $imgzoom * 1.5 * 16}px;
    text-align: center;
  }
`;

const HeroDescription = styled.p<{ $imgzoom: number }>`
  color: ${themeVariables.neutralEarth};
  font-size: ${({ $imgzoom }) => $imgzoom * 67}px;
  font-weight: bold;
  position: absolute;
  width: ${({ $imgzoom }) => $imgzoom * 1100}px;
  top: 73%;
  left: calc(50% + ${({ $imgzoom }) => $imgzoom * 660}px);
  z-index: 1;
  @media (max-width: 1100px) {
    left: 50%;

    transform: translate(-50%, 50%);
    text-align: center;
  }
  @media (max-width: 800px) {
    transform: translate(-49%, 0%);
    text-align: center;
  }
`;

export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);

      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const imgzoom = windowHeight / 2500;
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
      }}
    >
      <OnlyLarge>
        <LogoSvg
          size={225}
          color={themeVariables.lightForeground}
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      </OnlyLarge>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "1rem",
        }}
      >
        <div
          style={{
            height: "85%",
            aspectRatio: "1/1.52",
            backgroundImage:
              "url(https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/landing/landing.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: "5000000000rem",
            borderTopRightRadius: "5000000000rem",
            maxWidth: "88%",
          }}
        />

        <HeroTitle className={arkhipRegular.className} $imgzoom={imgzoom}>
          {title}
        </HeroTitle>

        <HeroDescription
          className={rawengulkDemibold.className}
          $imgzoom={imgzoom}
        >
          {description}
        </HeroDescription>
      </div>
    </div>
  );
}
