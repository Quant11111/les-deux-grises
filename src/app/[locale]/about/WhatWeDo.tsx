import { arkhipRegular, rawengulkDemibold } from "@/app/fonts/fonts";
import Image from "next/image";
import styles from "./WhatWeDo.module.css";

interface WhatWeDoProps {
  title: string;
  content: string;
}

export default function WhatWeDo({ title, content }: WhatWeDoProps) {
  return (
    <section className={styles.whatWeDo}>
      <div className={styles.whatWeDoBackground}>
        <Image
          className={styles.whatWeDoBackgroundImage}
          src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+28.png"
          alt="What We Do background"
          fill
        />
        <div className={styles.whatWeDoCard}>
          <h2 className={`${styles.whatWeDoCardTitle} ${arkhipRegular.className}`}>
            {title}
          </h2>
          <p className={`${styles.whatWeDoCardContent} ${rawengulkDemibold.className}`}>
            {content}
          </p>
          <div className={styles.whatWeDoCardImageContainer}>
            <Image
              className={styles.whatWeDoCardImage}
              src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/about/Fichier+29.png"
              alt="What We Do card image"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}