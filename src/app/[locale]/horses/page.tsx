import HorsesSection from "@/ui/components/HorsesSection";
import OnlyLarge from "@/ui/components/OnlyLarge";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import FooterMinimal from "@/ui/components/FooterMinimal";

export default function Horses() {
  const locale = useLocale();
  const t = useTranslations("HorsesPage");
  const nt = useTranslations("Navbar");
  return (
    <main
      className="hide-scrollbar"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100dvh",
        background: themeVariables.grassGreen,
        overflow: "hidden",
      }}
    >
      <h1
        className="hidden-title"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
          opacity: 0,
        }}
      >
        {t("title")}
      </h1>
      <OnlyLarge>
        <LogoSvg
          size={150}
          color={themeVariables.lightForeground}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 60,
          }}
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
