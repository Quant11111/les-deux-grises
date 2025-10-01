import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import HorsePageContent from "./HorsePageContent";
import OnlySmall from "@/ui/components/OnlySmall";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import OnlyLarge from "@/ui/components/OnlyLarge";
import Image from "next/image";
import FooterMinimal from "@/ui/components/FooterMinimal";
import styles from "./page.module.css";

export default function HorsePage({ params }: { params: { horseId: string } }) {
  const locale = useLocale();
  const t = useTranslations("HorsePage");
  const nt = useTranslations("Navbar");
  return (
    <main className={styles.main}>
      <Image
        src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/horse/horsepagebg.png"
        alt="horse page background"
        fill
        className={styles.backgroundImage}
      />
      <OnlySmall>
        <LogoSvg
          size={150}
          color="rgb(var(--light-foreground))"
          className={styles.logo}
        />
      </OnlySmall>
      <OnlyLarge>
        <LogoSvg
          size={150}
          color="rgb(var(--light-foreground))"
          className={styles.logo}
        />
      </OnlyLarge>
      <Navbar
        active={"horses"}
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <div className={styles.contentWrapper}>
        <HorsePageContent locale={locale} id={params.horseId} />
      </div>
      <FooterMinimal locale={locale} />
    </main>
  );
}
