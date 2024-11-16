import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import { rawengulk } from "../fonts/fonts";

export default function Home() {
  const nt = useTranslations("Navbar");
  const t = useTranslations("HomePage");
  const locale = useLocale();
  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden", //ajouté pour corriger le scroll (jsp d'ou il)
      }}
    >
      <Navbar active="home" locale={locale} t={nt} />

      <LogoSvg
        size={600}
        color={themeVariables.cloudyMist}
        style={{
          scale: 2, //crée un scroll jsp pourquoi ??
          position: "absolute",
          top: "50%",
          left: "20%",
          transform: "translate(-25%, -20%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          width: "100%",
          height: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "85%",
            width: "27%",
            position: "absolute",
            backgroundImage: "url(/images/twohorses.jpg)",
            zoom: 0.5,
            transform: "scaleX(-1)",
            backgroundPosition: "center left 35% top 40%",
            borderTopLeftRadius: "calc(50% + 2000px)",
            borderTopRightRadius: "calc(50% + 2000px)",
            boxShadow: `0 0 30px 10px ${themeVariables.nightGrey}`,
          }}
        />

        <h1
          style={{
            position: "absolute",
            fontSize: "4rem",
            fontWeight: "lighter",
            color: themeVariables.cloudyMist,
            left: "50%",
            bottom: "25%",
            zIndex: 1,
          }}
        >
          {t("title")}
        </h1>
        <p
          className={rawengulk.className}
          style={{
            color: themeVariables.neutralEarth,
            fontSize: "1.2rem",
            fontWeight: "bold",
            position: "absolute",
            left: "87%",
            width: "50%",
            top: "75%",
            zIndex: 1,
          }}
        >
          {t("description")}
        </p>
      </div>

      <div
        style={{
          minWidth: "1/3",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          background: "white",
        }}
      />
    </main>
  );
}
