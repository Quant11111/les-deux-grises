import OnlySmall from "@/ui/components/OnlySmall";
import ContactSection from "./content/ContactSection";
import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import OnlyLarge from "@/ui/components/OnlyLarge";
import FooterMinimal from "@/ui/components/FooterMinimal";
import styles from "./page.module.css";

export default function Contact() {
  const locale = useLocale();
  const nt = useTranslations("Navbar");

  return (
    <main className={`${styles.main} hide-scrollbar`}>
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
        active="contact"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <ContactSection locale={locale} />

      <FooterMinimal locale={locale} />
    </main>
  );
}
