"use client";

import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";

import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import WhoWeAre from "./WhoWeAre";
import React, { CSSProperties } from "react";
import Footer from "@/ui/components/Footer";
import WhatWeDo from "./WhatWeDo";

export default function About() {
  const locale = useLocale();
  const t = useTranslations("AboutPage");
  const nt = useTranslations("Navbar");
  const logoSize = 600;

  // Personnalisation des composants de la scrollbar
  const renderThumb = ({
    style,
    ...props
  }: {
    style?: CSSProperties;
    [key: string]: any;
  }) => {
    const thumbStyle = {
      backgroundColor: themeVariables.lightForeground,
      borderRadius: "4px",
      opacity: 1,
      width: "12px !important",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderTrack = ({
    style,
    ...props
  }: {
    style?: CSSProperties;
    [key: string]: any;
  }) => {
    const trackStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: "4px",
      right: "10px",
      width: "12px",
      height: "100%",
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  return (
    <main
      className="main-about"
      style={{
        alignItems: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Hauteur fixe pour activer le scroll
      }}
    >
      <Navbar
        active="about"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <LogoSvg
        size={150}
        color={themeVariables.lightForeground}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      />

      <div style={{ flex: 1, maxWidth: "1301px" }}>
        {/* <AboutContent
              title1={t("whoTitle")}
              content1={t("whoContent")}
              title2={t("whatTitle")}
              content2={t("whatContent")}
            /> */}
        <WhatWeDo title={t("whatTitle")} content={t("whatContent")} />
        <WhoWeAre title={t("whoTitle")} content={t("whoContent")} />
      </div>
    </main>
  );
}
