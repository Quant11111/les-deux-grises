import OnlySmall from "@/ui/components/OnlySmall";
import ContactSection from "./content/ContactSection";
import Navbar from "@/ui/Navbar";
import themeVariables from "@/utils/themeVariables";
import { useLocale, useTranslations } from "next-intl";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import OnlyLarge from "@/ui/components/OnlyLarge";

export default function Contact() {
  const locale = useLocale();
  const t = useTranslations("ContactPage");
  const nt = useTranslations("Navbar");

  return (
    <main
      className="hide-scrollbar"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100dvh",
        background: themeVariables.grassGreen,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <OnlySmall>
        <LogoSvg
          size={150}
          color={themeVariables.lightForeground}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 60,
          }}
        />
      </OnlySmall>
      <OnlyLarge>
        <LogoSvg
          size={150}
          color={themeVariables.lightForeground}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 60,
          }}
        />
      </OnlyLarge>
      <Navbar
        active="contact"
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />

      <ContactSection locale={locale} />
    </main>
  );
}
