"use client";

import { rawengulkDemibold, arkhipRegular, rawengulk } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { useEffect, useState, useCallback } from "react";
import { LogoSvg } from "../svg/LogoSvg";
import Image from "next/image";
import OnlyLarge from "./OnlyLarge";
import styles from "./Hero.module.css";

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
    <div className={styles.heroContainer}>
      <OnlyLarge>
        <div className={styles.logoContainer}>
          <LogoSvg size={225} color={themeVariables.lightForeground} />
        </div>
      </OnlyLarge>

      <div className={styles.contentContainer}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.styledImage}
            src={imageUrl}
            alt="Hero"
            fill
            priority
            sizes="(max-width: 800px) 100vw, (max-width: 1100px) 88vw, 70vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+F/PQAJJANm19bNwAAAAABJRU5ErkJggg=="
          />
        </div>

        <h1
          className={`${styles.heroTitle} ${arkhipRegular.className}`}
          style={{
            fontSize: `${imgzoom * 9 * 16}px`,
            letterSpacing: `${imgzoom * 2.6 * 16}px`,
            color: themeVariables.lightForeground,
          }}
        >
          {title}
        </h1>

        <p
          className={`${styles.heroDescription} ${rawengulkDemibold.className}`}
          style={{
            color: themeVariables.neutralEarth,
            fontSize: `${imgzoom * 67}px`,
            width: `${imgzoom * 1100}px`,
            left: `calc(50% + ${imgzoom * 660}px)`,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}