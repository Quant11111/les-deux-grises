import HorsesSection from "@/ui/components/HorsesSection";
import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";

export default function Horses() {
  const locale = useLocale();
  const t = useTranslations("HorsesPage");
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
      <Navbar active="horses" locale={locale} t={nt} />

      <HorsesSection locale={locale} />
    </main>
  );
}
