"use client";

import themeVariables from "@/utils/themeVariables";
import { useRouter } from "next/navigation";

export default function LanguageSelector({ locale }: { locale: string }) {
  const router = useRouter();
  function goFrench() {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      if (currentUrl.endsWith("/en")) {
        router.push("/fr");
      } else {
        const newUrl = currentUrl.replace("/en/", "/fr/");
        router.push(newUrl);
        console.log("newUrl :", newUrl);
      }
    } else {
      router.push("/fr");
    }
  }
  function goEnglish() {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      if (currentUrl.endsWith("/fr")) {
        router.push("/en");
      } else {
        const newUrl = currentUrl.replace("/fr/", "/en/");
        router.push(newUrl);
        console.log("newUrl :", newUrl);
      }
    } else {
      router.push("/en");
    }
  }
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        style={{
          background: "transparent",
          color:
            locale === "fr"
              ? themeVariables.neutralEarth
              : themeVariables.cloudyMist,
          border: "none",
        }}
        onClick={() => goFrench()}
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
          color:
            locale === "en"
              ? themeVariables.neutralEarth
              : themeVariables.cloudyMist,
          border: "none",
        }}
        onClick={() => goEnglish()}
      >
        EN
      </button>
    </div>
  );
}
function usePath() {
  throw new Error("Function not implemented.");
}
