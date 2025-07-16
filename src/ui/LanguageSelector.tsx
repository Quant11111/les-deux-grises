"use client";
"use client";

import themeVariables from "@/utils/themeVariables";
import { useRouter } from "next/navigation";
import NavButton from "./components/NavButton";

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
      <NavButton
        text="FR"
        onClick={() => goFrench()}
        isActive={locale === "fr"}
      />
      <div
        style={{
          width: "2px",
          background: themeVariables.cloudyMist,
        }}
      />
      <NavButton
        text="EN"
        onClick={() => goEnglish()}
        isActive={locale === "en"}
      />
    </div>
  );
}
function usePath() {
  throw new Error("Function not implemented.");
}
