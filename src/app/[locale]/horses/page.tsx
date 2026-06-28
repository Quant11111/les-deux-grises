import HorsesSection from "@/ui/components/HorsesSection";
import OnlyLarge from "@/ui/components/OnlyLarge";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import { getLocale, getTranslations } from "next-intl/server";
import FooterMinimal from "@/ui/components/FooterMinimal";
import { getAllHorses } from "@/horses/horsesRepository";
import styles from "./page.module.css";

// Liste des chevaux issue de la base de données, rendue à la demande pour
// refléter immédiatement les changements faits dans l'admin. Rendu identique.
export const dynamic = "force-dynamic";

export default async function Horses() {
  const locale = await getLocale();
  const t = await getTranslations("HorsesPage");
  const nt = await getTranslations("Navbar");
  const horses = await getAllHorses();

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

      <HorsesSection locale={locale} horses={horses} />

      <FooterMinimal locale={locale} />
    </main>
  );
}
