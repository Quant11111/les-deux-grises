import Hero from "@/ui/components/Hero";
import OnlyLarge from "@/ui/components/OnlyLarge";
import Navbar from "@/ui/Navbar";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import ContactContentSection from "./content/ContactContentSection";

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
      <Navbar
        active="contact"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        about1={nt("about1")}
        about2={nt("about2")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          msScrollLimit: "0 0",
        }}
      >
        <OnlyLarge>
          <LogoSvg
            size={600}
            color={themeVariables.lightForeground}
            style={{
              scale: 2.5, //crée un scroll jsp pourquoi ??

              zIndex: 1,
            }}
          />
        </OnlyLarge>

        <ContactContentSection />
      </div>
    </main>
  );
}
