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
import styles from "./page.module.css";

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
const SectionLoader = () => <div className={styles.sectionLoader} />;

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
      backgroundColor: "rgb(var(--light-foreground))",
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
      className={`${styles.main} ${isLoaded ? styles.mainLoaded : ""}`}
    >
      <h1 className={styles.hiddenTitle}>{t("title")}</h1>
      <LogoSvg
        size={150}
        color="rgb(var(--light-foreground))"
        className={styles.logo}
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
        className={`${styles.contentContainer} hide-scrollbar hide-scrollbar::-webkit-scrollbar`}
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
        <div className={styles.contentWrapper}>
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
