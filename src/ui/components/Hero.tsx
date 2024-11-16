import { rawengulk } from "@/app/fonts/fonts";
import themeVariables from "@/utils/themeVariables";
import { LogoSvg } from "../svg/LogoSvg";

export default function Hero({ t }: { t: any }) {
  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 5rem)",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <LogoSvg
        size={600}
        color={themeVariables.cloudyMist}
        style={{
          scale: 2.5, //crée un scroll jsp pourquoi ??
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
          height: "100%",
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
            zoom: 0.4,
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
            left: "55%",
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
            width: "22rem",
            top: "75%",
            left: "65%",
            zIndex: 1,
          }}
        >
          {t("description")}
        </p>
      </div>
    </div>
  );
}
