import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import Image from "next/image";
import { LogoSvg } from "../svg/LogoSvg";
import styles from "./Hero.module.css";
import OnlyLarge from "./OnlyLarge";

export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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

        <h1 className={`${styles.heroTitle} ${arkhipRegular.className}`}>
          {title}
        </h1>

        <p className={`${styles.heroDescription} ${rawengulkDemibold.className}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
