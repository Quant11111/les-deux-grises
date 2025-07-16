"use client";

import { rawengulkDemibold, arkhipRegular, rawengulk } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { LogoSvg } from "../svg/LogoSvg";
import Image from "next/image";
import OnlyLarge from "./OnlyLarge";

const HeroContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 85%;
  aspect-ratio: 1/1.6;
  border-top-left-radius: 5000000000rem;
  border-top-right-radius: 5000000000rem;
  max-width: 88%;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-top-left-radius: 5000000000rem;
  border-top-right-radius: 5000000000rem;
`;

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

  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  const imgzoom = windowHeight / 2500;
  const imageUrl =
    "https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/landing/landing.png";

  return (
    <HeroContainer>
      <OnlyLarge>
        <LogoContainer>
          <LogoSvg size={225} color={themeVariables.lightForeground} />
        </LogoContainer>
      </OnlyLarge>

      <ContentContainer>
        <ImageContainer>
          <StyledImage
            src={imageUrl}
            alt="Hero"
            fill
            priority
            sizes="(max-width: 800px) 100vw, (max-width: 1100px) 88vw, 70vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+F/PQAJJANm19bNwAAAAABJRU5ErkJggg=="
          />
        </ImageContainer>

        <HeroTitle className={arkhipRegular.className} $imgzoom={imgzoom}>
          {title}
        </HeroTitle>

        <HeroDescription
          className={rawengulkDemibold.className}
          $imgzoom={imgzoom}
        >
          {description}
        </HeroDescription>
      </ContentContainer>
    </HeroContainer>
  );
}
