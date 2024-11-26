import Hero from "@/ui/components/Hero";
import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";

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
      }}
    >
      <Navbar active="home" locale={locale} t={nt} />

      <Hero title={t("title")} description={t("description")} />
    </main>
  );
}
