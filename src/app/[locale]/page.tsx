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
  const logoSize = 140;
  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        msScrollLimit: "0 0",
      }}
    >
      <OnlySmall>
        <LogoSvg
          size={logoSize}
          color={themeVariables.lightForeground}
          style={{
            position: "absolute",
            top: 1,
            left: 1,
            zIndex: 1,
          }}
        />
      </OnlySmall>
      <Navbar
        active="home"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        about1={nt("about1")}
        about2={nt("about2")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <Hero title={t("title")} description={t("description")} />
    </main>
  );
}
