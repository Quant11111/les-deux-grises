"use client";
"use client";

import { rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
const AboutButton = styled.button`
  color: inherit;
  text-decoration: none;
  background: transparent;
  border: none;
  color: ${themeVariables.cloudyMist};
  &:hover {
    text-shadow: currentColor 0 0 1px;
    color: "lightgray";
  }
  cursor: pointer;
`;

export default function AboutContent({
  title1,
  content1,
  title2,
  content2,
}: {
  title1: string;
  content1: string;
  title2: string;
  content2: string;
}) {
  return (
    <div className="about-content">
      <section
        className="what-we-do"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="what-we-do-background"
          style={{
            position: "relative",
            maxWidth: "calc(200dvh - 32rem)",
            height: "calc(100dvh - 10rem)",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className="what-we-do-background-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+28.png"
            alt="What We Do background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          <div className="what-we-do-card">
            <h2 className="what-we-do-card-title">{title1}</h2>
            <p className="what-we-do-card-content">{content1}</p>
            <div className="what-we-do-card-image-container">
              <Image
                className="what-we-do-card-image"
                src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+29.png"
                alt="What We Do card image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
      {/*       <section className="who-we-are">
        <div className="who-we-are-image-container">
          <Image
            className="backgroundImage"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+30.png"
            alt="Who We Are"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="who-we-are-card">
          <h2 className="who-we-are-card-title">{title2}</h2>
          <p className="who-we-are-card-content">{content2}</p>
        </div>
      </section> */}

      <style jsx>{`
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .what-we-do-card {
          position: absolute;
          display: grid;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          grid-template-areas:
            "image title"
            "image content";
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 20px 1fr;
          gap: 1rem;
          width: 1000px;
          height: auto;
          padding: 1rem;
          background-color: ${themeVariables.cloudyMist};
        }
        .what-we-do-card-title {
          grid-area: title;
          font-size: 1.2rem;
        }
        .what-we-do-card-content {
          grid-area: content;
          font-size: 1rem;
        }
        .what-we-do-card-image-container {
          position: relative;
          grid-area: image;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
