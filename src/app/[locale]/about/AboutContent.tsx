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
      <section className="what-we-do">
        <Image
          className="backgroundImage"
          src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+28.png"
          alt="What We Do background"
          width={1920}
          height={1080}
        />
        <div className="what-we-do-card">
          <h2 className="what-we-do-card-title">{title1}</h2>
          <p className="what-we-do-card-content">{content1}</p>
          <Image
            className="what-we-do-card-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+29.png"
            alt="What We Do card image"
            width={800}
            height={600}
          />
        </div>
      </section>
      <section className="who-we-are">
        <Image
          className="backgroundImage"
          src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+30.png"
          alt="Who We Are"
          width={1920}
          height={1080}
        />
        <div className="who-we-are-card">
          <h2 className="who-we-are-card-title">{title2}</h2>
          <p className="who-we-are-card-content">{content2}</p>
        </div>
      </section>
      <section className="our-team">
        <h2 className="our-team-title">Our Team</h2>
        <div className="our-team-carousel">
          <Image
            className="our-team-carousel-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team1.jpg"
            alt="Our Team 1"
            width={400}
            height={400}
          />
          <Image
            className="our-team-carousel-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team2.jpg"
            alt="Our Team 2"
            width={400}
            height={400}
          />
          <Image
            className="our-team-carousel-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team3.jpg"
            alt="Our Team 3"
            width={400}
            height={400}
          />
          <Image
            className="our-team-carousel-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team4.jpg"
            alt="Our Team 4"
            width={400}
            height={400}
          />
          <Image
            className="our-team-carousel-image"
            src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/team/team5.jpg"
            alt="Our Team 5"
            width={400}
            height={400}
          />
        </div>
      </section>
      <section className="images-mosaic">
        <div className="images-mosaic-grid">
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid1.jpg"
            alt="Images Mosaic 1 "
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid2.jpg"
            alt="Images Mosaic 2"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid3.jpg"
            alt="Images Mosaic 3"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid4.jpg"
            alt="Images Mosaic 4"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid5.jpg"
            alt="Images Mosaic 5"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid6.jpg"
            alt="Images Mosaic 6"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid7.jpg"
            alt="Images Mosaic 7"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid8.jpg"
            alt="Images Mosaic 8"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid9.jpg"
            alt="Images Mosaic 9"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid10.jpg"
            alt="Images Mosaic 10"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid11.jpg"
            alt="Images Mosaic 11"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid12.jpg"
            alt="Images Mosaic 12"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid13.jpg"
            alt="Images Mosaic 13"
            width={300}
            height={300}
          />
          <Image
            className="images-mosaic-grid-image"
            src="https://dsq73kname7kn.cloudfront.net/grid/grid14.jpg"
            alt="Images Mosaic 14"
            width={300}
            height={300}
          />
        </div>
      </section>
    </div>
  );
}
