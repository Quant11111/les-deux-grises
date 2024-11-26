import Hero from "@/ui/components/Hero";
import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";

export default function Contact() {
  const locale = useLocale();
  const t = useTranslations("ContactPage");
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
      <Navbar active="contact" locale={locale} t={nt} />

      <Hero title={t("title")} description={t("description")} />
    </main>
  );
}
