import Hero from "@/ui/components/Hero";
import OnlySmall from "@/ui/components/OnlySmall";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const nt = useTranslations("Navbar");
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const logoSize = 400;
  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <OnlySmall>
        <LogoSvg
          size={logoSize}
          color={themeVariables.lightForeground}
          style={{
            scale: 1.5,
            position: "absolute",
            top: -logoSize / 2.7,
            left: -logoSize / 2.7,
            zIndex: 1,
          }}
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
    </main>
  );
}
