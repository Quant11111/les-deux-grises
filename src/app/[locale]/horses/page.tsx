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
      <Navbar
        active="horses"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        about1={nt("about1")}
        about2={nt("about2")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <HorsesSection locale={locale} />
    </main>
  );
}
