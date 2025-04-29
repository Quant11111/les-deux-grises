"use client";

import OnlySmall from "@/ui/components/OnlySmall";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import { AppProvider } from "@/utils/context";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import AboutContent from "./AboutContent";
import OnlyLarge from "@/ui/components/OnlyLarge";

export default function About() {
  const locale = useLocale();
  const t = useTranslations("AboutPage");
  const nt = useTranslations("Navbar");
  const logoSize = 600;
  return (
    <AppProvider>
      {" "}
      <main
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <OnlySmall>
          <LogoSvg
            size={150}
            color={themeVariables.lightForeground}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        </OnlySmall>
        <OnlyLarge>
          <LogoSvg
            size={150}
            color={themeVariables.lightForeground}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        </OnlyLarge>
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
