import Hero from "@/ui/components/Hero";
import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";

export default function News() {
  const locale = useLocale();
  const t = useTranslations("NewsPage");
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
      <Navbar active="news" locale={locale} t={nt} />

      <Hero t={t} />
    </main>
  );
}
