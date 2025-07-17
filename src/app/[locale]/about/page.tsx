"use client";
"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Suspense,
  lazy,
  CSSProperties,
  useState,
  useEffect,
  useRef,
} from "react";
import dynamic from "next/dynamic";
import themeVariables from "@/utils/themeVariables";

import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import PicturesGrid from "./PicturesGrid";
import Footer from "@/ui/components/Footer";

// Chargement optimisé des composants
const WhatWeDo = lazy(() => import("./WhatWeDo"));
const WhoWeAre = lazy(() => import("./WhoWeAre"));
const Team = lazy(() => import("./Team"));

// Chargement optimisé de la scrollbar
const Scrollbars = dynamic(
  () => import("react-custom-scrollbars-2").then((mod) => mod.Scrollbars),
  { ssr: false }
);

// Placeholder pour les sections pendant le chargement
const SectionLoader = () => (
  <div
    style={{
      height: "300px",
      backgroundColor: themeVariables.cloudyMist,
      width: "100%",
      marginBottom: "2rem",
    }}
  />
);

export default function About() {
  const locale = useLocale();
  const t = useTranslations("AboutPage");
  const nt = useTranslations("Navbar");
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [scrollHeight, setScrollHeight] = useState("100%");

  // Gestion de l'affichage pour éviter le CLS
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Calcul de la hauteur disponible pour le scrollbar
  useEffect(() => {
    const calculateScrollHeight = () => {
      if (mainRef.current) {
        // Récupérer la hauteur totale du conteneur principal
        const mainHeight = mainRef.current.clientHeight;
        // Hauteur du logo et de la navigation (approximativement)
        const navHeight = 150;
        // Définir la hauteur du scrollbar
        setScrollHeight(`${mainHeight - navHeight}px`);
      }
    };

    calculateScrollHeight();

    // Recalculer lors du redimensionnement
    window.addEventListener("resize", calculateScrollHeight);
    return () => window.removeEventListener("resize", calculateScrollHeight);
  }, [isLoaded]);

  // Préchargement des sections
  useEffect(() => {
    // Prefetch des composants pour un affichage plus rapide après le chargement initial
    const prefetchComponents = async () => {
      const whatWeDoPromise = import("./WhatWeDo");
      const whoWeArePromise = import("./WhoWeAre");
      await Promise.all([whatWeDoPromise, whoWeArePromise]);
      // Team sera chargé plus tard car moins prioritaire
    };

    prefetchComponents();
  }, []);

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
      ref={mainRef}
      className="main-about"
      style={{
        alignItems: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s ease-in",
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
      <LogoSvg
        size={150}
        color={themeVariables.lightForeground}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      />

      <Navbar
        active="about"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <div
        className="hide-scrollbar hide-scrollbar::-webkit-scrollbar"
        style={{
          flex: 1,
          maxWidth: "1301px",
          width: "100%",
          height: "calc(100vh - 100px)",
          position: "relative",
          overflow: "scroll",
        }}
      >
        {/* 
        <Scrollbars
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          renderThumbVertical={renderThumb}
          renderTrackVertical={renderTrack}
          universal={true}
          autoHide={false}
          thumbSize={120}
        > */}
        <div style={{ minHeight: "100%" }}>
          <Suspense fallback={<SectionLoader />}>
            <WhatWeDo title={t("whatTitle")} content={t("whatContent")} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <WhoWeAre title={t("whoTitle")} content={t("whoContent")} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Team title={t("teamTitle")} />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <PicturesGrid />
          </Suspense>

          <Footer locale={locale} />
        </div>
        {/*        </Scrollbars> */}
      </div>
    </main>
  );
}
