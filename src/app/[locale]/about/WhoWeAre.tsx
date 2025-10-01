import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import Image from "next/image";
import styles from "./WhoWeAre.module.css";

interface WhoWeAreProps {
  title: string;
  content: string;
}

export default function WhoWeAre({ title, content }: WhoWeAreProps) {
  return (
    <section className={styles.whoWeAre}>
      <div className={styles.whoWeAreBackgroundImageContainer}>
        <Image
          className={styles.whoWeAreBackgroundImage}
          src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+30.png"
          alt="What We Do background"
          fill
        />
      </div>

      <div className={styles.whoWeAreCard}>
        <h2 className={`${styles.whoWeAreCardTitle} ${arkhipRegular.className}`}>
          {title}
        </h2>
        <p className={`${styles.whoWeAreCardContent} ${rawengulkDemibold.className}`}>
          {content}
        </p>
      </div>
    </section>
  );
}