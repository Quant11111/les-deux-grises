import HorsesSection from "@/ui/components/HorsesSection";
import OnlyLarge from "@/ui/components/OnlyLarge";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import { useLocale, useTranslations } from "next-intl";
import FooterMinimal from "@/ui/components/FooterMinimal";
import styles from "./page.module.css";

export default function Horses() {
  const locale = useLocale();
  const t = useTranslations("HorsesPage");
  const nt = useTranslations("Navbar");

  return (
    <main className={`${styles.main} hide-scrollbar`}>
      <h1 className={styles.hiddenTitle}>
        {t("title")}
      </h1>
      <OnlyLarge>
        <LogoSvg
          size={150}
          color="rgb(var(--light-foreground))"
          className={styles.logo}
        />
      </OnlyLarge>
      <Navbar
        active="horses"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <HorsesSection locale={locale} />

      <FooterMinimal locale={locale} />
    </main>
  );
}