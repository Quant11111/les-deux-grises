"use client";

import { rawengulk } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { LogoSvg } from "../svg/LogoSvg";
import OnlyLarge from "./OnlyLarge";
import OnlySmall from "./OnlySmall";

const HeroTitle = styled.h1<{ imgZoom: number }>`
  position: absolute;
  font-size: ${({ imgZoom }) => imgZoom * 9 * 16}px;
  font-weight: lighter;
  letter-spacing: ${({ imgZoom }) => imgZoom * 2.7 * 16}px;
  color: ${themeVariables.lightForeground};
  left: 50%;
  bottom: 27%;
  z-index: 1;
  @media (max-width: 1100px) {
    left: 50%;
    transform: translate(-49%, 60%);
    letter-spacing: ${({ imgZoom }) => imgZoom * 2 * 16}px;
    text-align: center;
  }
  @media (max-width: 800px) {
    font-size: 2rem;
    transform: translate(-49%, 0%);
    letter-spacing: ${({ imgZoom }) => imgZoom * 1.5 * 16}px;
    text-align: center;
  }
`;

const HeroDescription = styled.p<{ imgZoom: number }>`
  text-align: justify;
  color: ${themeVariables.neutralEarth};
  font-size: ${({ imgZoom }) => imgZoom * 67}px;
  font-weight: bold;
  position: absolute;
  width: ${({ imgZoom }) => imgZoom * 1000}px;
  top: 73%;
  left: calc(50% + ${({ imgZoom }) => imgZoom * 660}px);
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
    <>
      <OnlySmall>
        <LogoSvg
          size={300}
          color={themeVariables.lightForeground}
          style={{
            scale: 1.5,
            position: "absolute",
            top: "-100px",
            left: "-100px",
            zIndex: 1,
          }}
        />
      </OnlySmall>
      <div
        style={{
          position: "relative",
          height: "calc(100vh - 80px)",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <OnlyLarge>
          <LogoSvg
            size={600}
            color={themeVariables.lightForeground}
            style={{
              scale: 2.5, //crée un scroll jsp pourquoi ??
              position: "absolute",
              top: "50%",
              left: "25%",
              transform: "translate(-25%, -20%)",
              zIndex: 1,
            }}
          />
        </OnlyLarge>

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: "translateY(-2%)",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          ></div>
          <div
            style={{
              height: "85%",
              aspectRatio: "1/1.52",
              backgroundImage: "url(/images/twohorses.jpg)",
              zoom: imgzoom,
              transform: "scaleX(-1)",
              backgroundPosition: "center left 30%",
              borderTopLeftRadius: "5000000000rem",
              borderTopRightRadius: "5000000000rem",
              maxWidth: "88%",
            }}
          />

          <HeroTitle imgZoom={imgzoom}>{title}</HeroTitle>

          <HeroDescription className={rawengulk.className} imgZoom={imgzoom}>
            {description}
          </HeroDescription>
        </div>
      </div>
    </>
  );
}
