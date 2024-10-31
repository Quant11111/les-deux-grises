import { LogoSvg } from "@/ui/svg/LogoSvg";
import themeVariables from "@/utils/themeVariables";
import { Box } from "@mui/material";
import { rawengulk } from "./fonts/fonts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div
          style={{
            position: "absolute",
            top: "3rem",
            right: "0",
            display: "flex",
            justifyContent: "space-around",
            width: "50%",
            marginTop: "1rem",
          }}
        >
          <a style={{ color: themeVariables.cloudyMist }}>ABOUT US</a>
          <a style={{ color: themeVariables.neutralEarth }}>OUR HORSES</a>
          <a style={{ color: themeVariables.cloudyMist }}>NEWS</a>
          <a style={{ color: themeVariables.cloudyMist }}>CONTACT US</a>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              style={{
                background: "transparent",
                color: themeVariables.cloudyMist,
                border: "none",
              }}
            >
              FR
            </button>
            <div
              style={{
                width: "2px",
                height: "100%",
                background: themeVariables.cloudyMist,
              }}
            />
            <button
              style={{
                background: "transparent",
                color: themeVariables.neutralEarth,
                border: "none",
              }}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      <LogoSvg
        size={300}
        color={themeVariables.cloudyMist}
        style={{
          position: "absolute",
          top: "50%",
          left: "20%",
          transform: "translate(-50%, -40%)",
          zIndex: 1,
        }}
      />

      <Box
        width={"70vh"}
        height={"70vh"}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          height={"100%"}
          width={"70%"}
          sx={{
            position: "absolute",
            background:
              "url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnBhMGxybDhyb2VoeW84bTU5ZzBsMHQ4N2owMHdsczd6eHcxaDU0eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fksRZZLwmDGQVE6JNh/giphy.gif)",
            backgroundSize: "cover",
            backgroundPosition: "center right 30%",
            borderTopLeftRadius: "calc(50% + 2000px)",
            borderTopRightRadius: "calc(50% + 2000px)",
            boxShadow: `0 0 30px 10px ${themeVariables.nightGrey}`,
            borderBottom: `6px solid ${themeVariables.cloudyMist}`,
            borderLeft: `6px solid ${themeVariables.cloudyMist}`,
          }}
        />

        <h1
          style={{
            fontSize: "4rem",
            color: themeVariables.cloudyMist,
            position: "absolute",
            left: "50%",
            bottom: "25%",
            zIndex: 1,
          }}
        >
          EXCELLENCE
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
          A promise to deliver a high caliber of horses and jumping mares with
          outstanding genetic profile(s).
        </p>
      </Box>
    </main>
  );
}
