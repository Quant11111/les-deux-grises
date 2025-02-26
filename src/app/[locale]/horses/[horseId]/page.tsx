import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import HorsePageContent from "./HorsePageContent";

export default function HorsePage({ params }: { params: { horseId: string } }) {
  const locale = useLocale();
  const t = useTranslations("HorsePage");
  const nt = useTranslations("Navbar");
  return (
    <main
      style={{
        height: "100dvh",
        width: "100vw",
        backgroundImage: "url('/images/paille.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Navbar
        active={"horses"}
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        about1={nt("about1")}
        about2={nt("about2")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <HorsePageContent locale={locale} id={params.horseId} />
    </main>
  );
}
