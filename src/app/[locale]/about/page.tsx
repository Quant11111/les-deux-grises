"use client";

import OnlySmall from "@/ui/components/OnlySmall";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import { AppProvider } from "@/utils/context";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import AboutContent from "./AboutContent";

export default function About() {
  const locale = useLocale();
  const t = useTranslations("AboutPage");
  const nt = useTranslations("Navbar");
  const logoSize = 400;
  return (
    <AppProvider>
      {" "}
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
          active="about"
          locale={locale}
          home={nt("home")}
          about={nt("about")}
          about1={nt("about1")}
          about2={nt("about2")}
          horses={nt("horses")}
          news={nt("news")}
          contact={nt("contact")}
        />

        <AboutContent
          title1={t("whoTitle")}
          content1={t("whoContent")}
          title2={t("whatTitle")}
          content2={t("whatContent")}
        />
      </main>
    </AppProvider>
  );
}
