import Navbar from "@/ui/Navbar";
import { useLocale, useTranslations } from "next-intl";
import HorsePageContent from "./HorsePageContent";
import OnlySmall from "@/ui/components/OnlySmall";
import { LogoSvg } from "@/ui/svg/LogoSvg";
import OnlyLarge from "@/ui/components/OnlyLarge";
import themeVariables from "@/utils/themeVariables";
import Image from "next/image";

export default function HorsePage({ params }: { params: { horseId: string } }) {
  const locale = useLocale();
  const t = useTranslations("HorsePage");
  const nt = useTranslations("Navbar");
  return (
    <main
      style={{
        position: "relative",
        height: "auto",
        width: "100vw",
      }}
    >
      <Image
        src="https://dsq73kname7kn.cloudfront.net/ldgexportsquentin/horse/horsepagebg.png"
        alt="horse page background"
        fill
        style={{ objectFit: "cover" }}
      />
      <OnlySmall>
        <LogoSvg
          size={150}
          color={themeVariables.lightForeground}
          style={{
            position: "fixed",
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
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 60,
          }}
        />
      </OnlyLarge>
      <Navbar
        active={"horses"}
        locale={locale}
        home={nt("home")}
        about={nt("about")}
        horses={nt("horses")}
        news={nt("news")}
        contact={nt("contact")}
      />
      <HorsePageContent locale={locale} id={params.horseId} />
    </main>
  );
}
