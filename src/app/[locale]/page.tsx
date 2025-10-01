import Hero from "@/ui/components/Hero";
import OnlySmall from "@/ui/components/OnlySmall";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import FooterMinimal from "@/ui/components/FooterMinimal";
import styles from "./page.module.css";

export default function Home() {
  const nt = useTranslations("Navbar");
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const logoSize = 140;

  return (
    <main className={styles.main}>
      <h1 className={styles.hiddenTitle}>
        {t("hiddenTitle")}
      </h1>
      <OnlySmall>
        <LogoSvg
          size={logoSize}
          color={themeVariables.lightForeground}
          className={styles.logo}
        />
      </OnlySmall>
      <Navbar
        active="home"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <Hero title={t("title")} description={t("description")} />

      <div className={styles.footer}>
        <FooterMinimal locale={locale} />
      </div>
    </main>
  );
}
