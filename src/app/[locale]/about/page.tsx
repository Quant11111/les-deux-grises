import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import AboutContent from "./AboutContent";

export default function About() {
  const locale = useLocale();
  const t = useTranslations("AboutPage");
  const nt = useTranslations("Navbar");
  return (
    <main
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar active="about" locale={locale} t={nt} />

      <AboutContent
        title1={t("whoTitle")}
        content1={t("whoContent")}
        title2={t("whatTitle")}
        content2={t("whatContent")}
      />
    </main>
  );
}
